import React, { useEffect, useRef, useState } from 'react'
import SERVICES from '../../../../../services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { initRFPs, selectRFPs, updateRFP } from '../../../../../redux/slices/rfpSlice';
import LoadingSpinner from '../../../../../Main/Loader/Loader';
import './Table.css'
import TFChip from '../../../../../components/form/TFChip/TFChip';
import { Button, Form } from 'react-bootstrap';
import open from '../../../../../Images/openinDrive.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { selectPrivileges } from '../../../../../redux/slices/privilegeSlice';
import TFDateChip from '../../../../../components/form/TFDateChip/TFDateChip';
import TFDeleteModal from '../../../../../components/modals/TFDeleteModal/TFDeleteModal';
import { PRIMARY_COLOR } from '../../../../../Main/Constants/Constants';
import TFConversionModal from '../../../../../components/modals/TFConversionModal/TFConversionModal';
import AddNewRfp from '../../forms/AddNewRfp/AddNewRfp';
import TFClientModal from '../../../../../components/modals/TFClientModal/TFClientModal';

interface FilterType {
  dept: (string | number)[],
  cat: (string | number)[],
  city: (string | number)[],
  manager: (string | number)[],
  source: (string | number)[]
}

type Props = {
  api: number,
  setApi: Function,
  currPage: number,
  setPages: Function,
  filter: FilterType,
  search: string,
  isCollapsed: boolean
}

const Table = ({ api, setApi, currPage, filter, search, setPages, isCollapsed }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRfps, setselectedRfps] = useState<number[]>([]);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const rfps = useSelector(selectRFPs);
  const privileges = useSelector(selectPrivileges);

  const [showDelete, setShowDelete] = useState<boolean>(false);
  const [showConversionModal, setShowConversionModal] = useState<boolean>(false);
  const [showClientModal, setshowClientModal] = useState<number | null>(null);
  
  const sortRef = useRef<HTMLDivElement>(null);
  const [showSortModal, setShowSortModal] = useState<string>("");
  const [transitionRFPId, setTransitionRFPId] = useState<number>(0);
  const [sort, setSort] = useState<string>('RFP_ID DESC');
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event: MouseEvent) => {
    if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
      setShowSortModal('');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await SERVICES.getRfps(50, currPage, filter, search, sort);
        console.log(response.res[0])
        dispatch(initRFPs(response.res));
        setPages(response.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [api, currPage]);
  const handleStatusUpdate = async (rfpId: number, action: string) => {
    if(action==="Go") {
      setShowConversionModal(true);
      setTransitionRFPId(rfpId);
    } else if (action === 'External') {
      setshowClientModal(rfpId)
    } else {
      const prevRfp = rfps.filter(rfp => rfp.rfp_id === rfpId);
      try {
        dispatch(updateRFP({ rfpId, data: { 'action': action } }))
        await SERVICES.updateRfpStatus(rfpId, action);
      } catch (error) {
        console.log(error);
        dispatch(updateRFP({ rfpId, data: { action: prevRfp[0].action } }));
      }
    }
  };

  const handleRatingUpdate = async (rfpId: number, rating: string) => {
      const prevRfp = rfps.filter(rfp => rfp.rfp_id === rfpId);
      try {
        dispatch(updateRFP({ rfpId, data: { 'rating': parseInt(rating)  } }))
        await SERVICES.updateRfpRating(rfpId, parseInt(rating));
      } catch (error) {
        console.log(error);
        dispatch(updateRFP({ rfpId, data: { rating: prevRfp[0].rating } }));
      }
  };

  const handleStatusGoUpdate = async () => {
      const prevRfp = rfps.filter(rfp => rfp.rfp_id === transitionRFPId);
      try {
        dispatch(updateRFP({ rfpId: transitionRFPId, data: { 'action': "Go" } }))
        await SERVICES.updateRfpStatus(transitionRFPId, "Go");
      } catch (error) {
        console.log(error);
        dispatch(updateRFP({ rfpId: transitionRFPId , data: { action: prevRfp[0].action } }));
      }
      // await SERVICES.addProposal(
      //   transitionRFPData?.department_id,
      //   transitionRFPData?.project_cat_id,
      //   "",
      //   "",
      //   "",
      //   transitionRFPData?.project_manager_id,
      //   transitionRFPData?.project_name,
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   "",
      //   transitionRFPData?.city_id,
      //   transitionRFPId,
      // )
      setShowConversionModal(false);
  }
  const handleDateUpdate = async (rfpId: number, key: keyof RFP, date: string) => {
    const prevRfp = rfps.filter(rfp => rfp.rfp_id === rfpId);
    try {
      dispatch(updateRFP({ rfpId, data: { [key]: date } }))
      await SERVICES.updateRfpDate(rfpId, key, date);
    } catch (error) {
      console.log(error);
      dispatch(updateRFP({ rfpId, data: { [key]: prevRfp[0][key] } }));
    }
  }

  const handleDelete = async () => {
    try {
      await SERVICES.deleteRfps(selectedRfps);
      setApi(api + 1);
    } catch (error) {
      console.log(error);
    } finally {
      setShowDelete(false);
      setselectedRfps([]);
    }
  }

  const [editForm, setEditForm] = useState<RFP | null>(null);
  const [show, setShow] = useState<boolean>(false);
  const handleClickUpdate = () => {
    const rfp = rfps.find(rfp => rfp.rfp_id === selectedRfps[0]);
    if (!rfp) return;

    setEditForm(rfp);
    setShow(true);
  }

  const openDriveLink = async (id: string) => {
    try {
      const response = await SERVICES.getGoogleDriveUrl(id);
      if (response.res && response.res !== "") window.open(response.res, '_blank');
    } catch (error) {
      console.log(error);
    }
  }

  const sortModal = (column: string) =>
    showSortModal === column
      ? <div className='d-flex flex-column justify-content-between sort-container' ref={sortRef}>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={() => {
            setSort(column);
            setApi(api + 1);
            setShowSortModal("");
          }}
        >
          <FontAwesomeIcon icon={faArrowUp} />
          <p className='sort-text'>Sort Ascending</p>
        </div>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={() => {
            setSort(`${column} DESC`);
            setApi(api + 1);
            setShowSortModal("");
          }}
        >
          <FontAwesomeIcon icon={faArrowDown} />
          <p className='sort-text'>Sort Descending</p>
        </div>
      </div>
      : <></>;
      
  const handleOrganizations = async (orgs:TypeaheadOptions) => {
    const valuesArray = orgs.map((item) => parseInt(item.value));
    const prevRfp = rfps.filter(rfp => rfp.rfp_id === showClientModal);
      try {
        dispatch(updateRFP({ rfpId: showClientModal!, data: { 'action': 'External' } }))
        await SERVICES.updateRfpStatus(showClientModal!, 'External', valuesArray);
      } catch (error) {
        console.log(error);
        dispatch(updateRFP({ rfpId: showClientModal!, data: { action: prevRfp[0].action } }));
      }
      finally {
        setshowClientModal(null)
      }
  }
  return (
    <>
      {
        isLoading ?
          <div className='w-100' style={{ height: '492px' }}>
            <LoadingSpinner />
          </div>
          : <div className='table-wrapper' ref={tableRef}>
            <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
              <thead className='table-header fixed-table-header'>
                <tr>
                  <th className='table-heading fixed-header-column' style={{ width: "300px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Project_Name')}>RFP Name</p>
                    {sortModal('Project_Name')}
                  </th>
                  <th className='table-heading' style={{ width: "150px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('City')}>City</p>
                    {sortModal('City')}
                  </th>
                  <th className='table-heading' style={{ width: "150px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Client')}>Client</p>
                    {sortModal('Client')}
                  </th>
                  <th className='table-heading' style={{ width: "190px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Source')}>Source</p>
                    {sortModal('Source')}
                  </th>
                  <th className='table-heading' style={{ width: "120px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Action')}>Action</p>
                    {sortModal('Action')}
                  </th>
                  <th className='table-heading' style={{ width: "180px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Submission_Date')}>Submission Date</p>
                    {sortModal('Submission_Date')}
                  </th>
                  <th className='table-heading' style={{ width: "180px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('RFP_Number')}>RFP Number</p>
                    {sortModal('RFP_Number')}
                  </th>
                  <th className='table-heading' style={{ width: "250px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Remarks')}>Remarks</p>
                    {sortModal('Remarks')}
                  </th>
                  <th className='table-heading' style={{ width: "200px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Rating')}>Rating</p>
                    {sortModal('Rating')}
                  </th>
                  <th className='table-heading' style={{ width: "180px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Start_Date')}>Start Date</p>
                    {sortModal('Start_Date')}
                  </th>
                  <th className='table-heading' style={{ width: "200px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Project_Manager')}>Project Manager</p>
                    {sortModal('Project_Manager')}
                  </th>
                  <th className='table-heading' style={{ width: "250px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Department')}>Department</p>
                    {sortModal('Department')}
                  </th>
                  <th className='table-heading' style={{ width: "200px" }}>
                    <p className='table-heading-text' onClick={() => setShowSortModal('Project_Category')}>Project Category</p>
                    {sortModal('Project_Category')}
                  </th>
                </tr>
              </thead>
              <tbody style={{ background: "#FFFFFF" }}>
                {
                  rfps && rfps.map(rfp => (
                    <tr style={{ width: "100%", backgroundColor: selectedRfps.includes(rfp.rfp_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={rfp.rfp_id.toString()}>
                      <td className='table-cell fixed-column' style={{ fontWeight: "500", backgroundColor: selectedRfps.includes(rfp.rfp_id) ? "#F5F3FE" : "white" }}>
                        <div className='d-flex flex-row align-items-center'>
                          <Form.Check
                            inline
                            type="checkbox"
                            checked={selectedRfps.includes(rfp.rfp_id)}
                            readOnly={true}
                            onClick={() => {
                              if (!selectedRfps.includes(rfp.rfp_id)) {
                                setselectedRfps(prev => [...prev, rfp.rfp_id]);
                              } else {
                                setselectedRfps(prev => prev.filter(ele => ele !== rfp.rfp_id));
                              }
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{rfp.project_name}</div>
                            <div className='open-in-drive' onClick={() => openDriveLink(rfp.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>
                          </div>
                        </div>
                      </td>
                      <td className='table-cell'>{rfp.city}</td>
                      <td className='table-cell'>{rfp.client}</td>
                      <td className='table-cell'>{rfp.source}</td>
                      <td className='table-cell'>
                        <TFChip
                          value={rfp.action ?? ""}
                          tableRef={tableRef}
                          name={rfp.rfp_id}
                          onChange={handleStatusUpdate}
                          options={["No Go", "Review", "Go", "External"]}
                        />
                      </td>
                      <td className='table-cell'>
                        {rfp.submission_date.isValid() && <TFDateChip
                            value={rfp.submission_date}
                            name={rfp.rfp_id}
                            tableRef={tableRef}
                            onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                          />}
                      </td>
                      <td className='table-cell'>{rfp.rfp_number}</td>
                      <td className='table-cell'>{rfp.remarks}</td>
                      <td className='table-cell'>
                        <TFChip
                          value={`${rfp.rating?rfp.rating:0}` ?? ""}
                          tableRef={tableRef}
                          name={rfp.rfp_id}
                          onChange={handleRatingUpdate}
                          options={["0", "1", "2", "3", "4", "5"]}
                        />
                      </td>
                      <td className='table-cell'>
                        {rfp.start_date.isValid() && <TFDateChip
                            value={rfp.start_date}
                            name={rfp.rfp_id}
                            tableRef={tableRef}
                            onChange={(name: number, value: string) => handleDateUpdate(name, 'start_date', value)}
                          />}
                      </td>
                      <td className='table-cell'>{rfp.manager_name}</td>
                      <td className='table-cell'>{rfp.department}</td>
                      <td className='table-cell'>{rfp.project_category}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
      }

      <div style={{ display: selectedRfps.length === 0 ? "none" : "", visibility: selectedRfps.length === 0 ? "hidden" : "visible", left: isCollapsed ? "34.236vw" : "45.347vw" }} className='floating-container'>
        <p className='floating-container-text'>{selectedRfps.length}</p>
        <p className='floating-container-text2'>Items Selected</p>
        <div style={{ marginLeft: "-23px" }} className='floating-container-line'></div>
        {
          privileges.includes("Delete RFP")
            ? <div
              style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "90px", cursor: "pointer" }}
            onClick={() => setShowDelete(true)}
            >
              <FontAwesomeIcon icon={faTrash} style={{ height: "20px" }} />
              <p className='floating-container-icon-text'>Delete</p>
            </div>
            : <></>
        }
        {
          privileges.includes('Update RFP')
            ? <Button
              style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginLeft: "35px", cursor: "pointer", backgroundColor: "transparent", border: "none" }}
              disabled={selectedRfps.length !== 1}
              onClick={handleClickUpdate}
            >
              <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
              <p className='floating-container-icon-text'>Edit</p>
            </Button>
            : <></>}

        <div style={{ marginLeft: "10px" }} className='floating-container-line'></div>

        <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={() => setselectedRfps([])} />
        </div>
      </div>
      {<TFDeleteModal show={showDelete} onHide={()=>setShowDelete(false)} onDelete={handleDelete} label='RFP(s)'/>}
      {<TFConversionModal show={showConversionModal} onConfirm={handleStatusGoUpdate} onHide={()=>setShowConversionModal(false)} />}
      {show
        && <AddNewRfp
          api={api}
          setApi={setApi}
          show={show}
          setShow={setShow}
          isEditing={true}
          editForm={editForm}
        />}

      {showClientModal!==null && <TFClientModal show={showClientModal!==null} onHide={() => setshowClientModal(null)} onSubmit={handleOrganizations} />}
    </>
  )
}

export default Table