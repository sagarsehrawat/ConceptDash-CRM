import React, { useEffect, useRef, useState } from 'react'
import SERVICES from '../../../../services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { initRFPs, selectRFPs, updateRFP } from '../../../../redux/slices/rfpSlice';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import './Table.css'
import TFChip from '../../../../components/form/TFChip/TFChip';
import { Button, Form } from 'react-bootstrap';
import open from '../../../../Images/openinDrive.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { PRIMARY_COLOR } from '../../../../Main/Constants/Constants';
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';

interface FilterType {
  dept: (string | number)[],
  cat: (string | number)[],
  city: (string | number)[],
  manager: (string | number)[],
  source: (string | number)[]
}

type Props = {
  api: number,
  currPage: number,
  setPages: Function,
  filter: FilterType,
  search: string,
  isCollapsed: boolean
}

const Table = ({ api, currPage, filter, search, setPages, isCollapsed }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRfps, setselectedRfps] = useState<number[]>([])
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const rfps = useSelector(selectRFPs);
  const privileges = useSelector(selectPrivileges);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await SERVICES.getRfps(50, currPage, filter, search, 'RFP_ID DESC');
        console.log(response)
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
    const prevRfp = rfps.filter(rfp => rfp.RFP_ID === rfpId);
    try {
      dispatch(updateRFP({ rfpId, data: { 'Action': action } }))
      await SERVICES.updateRfpStatus(rfpId, action);
    } catch (error) {
      console.log(error);
      dispatch(updateRFP({ rfpId, data: { Action: prevRfp[0].Action } }));
    }
  };

  const handleDateUpdate = async (rfpId : number, key: keyof RFP, date : string) => {
    const prevRfp = rfps.filter(rfp => rfp.RFP_ID === rfpId);
    try {
      dispatch(updateRFP({ rfpId, data: { [key]: date } }))
      await SERVICES.updateRfpDate(rfpId, key, date);
    } catch (error) {
      console.log(error);
      dispatch(updateRFP({ rfpId, data: { [key]: prevRfp[0][key] } }));
    }
  }

  const openDriveLink = async (id: string) => {
    try {
      const response = await SERVICES.getGoogleDriveUrl(id);
      if (response.res && response.res !== "") window.open(response.res, '_blank');
    } catch (error) {
      console.log(error);
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
                  <th className='table-heading fixed-header-column' style={{ width: "300px" }}>RFP Name</th>
                  <th className='table-heading' style={{ width: "150px" }}>Client</th>
                  <th className='table-heading' style={{ width: "190px" }}>Source</th>
                  <th className='table-heading' style={{ width: "120px" }}>Action</th>
                  <th className='table-heading' style={{ width: "180px" }}>Submission Date</th>
                  <th className='table-heading' style={{ width: "180px" }}>RFP Number</th>
                  <th className='table-heading' style={{ width: "250px" }}>Remarks</th>
                  <th className='table-heading' style={{ width: "200px" }}>Rating</th>
                  <th className='table-heading' style={{ width: "180px" }}>Start Date</th>
                  <th className='table-heading' style={{ width: "200px" }}>Project Manager</th>
                  <th className='table-heading' style={{ width: "250px" }}>Department</th>
                  <th className='table-heading' style={{ width: "200px" }}>Project Category</th>
                </tr>
              </thead>
              <tbody style={{ background: "#FFFFFF" }}>
                {
                  rfps && rfps.map(rfp => (
                    <tr style={{ width: "100%", backgroundColor: selectedRfps.includes(rfp.RFP_ID) ? "#F5F3FE" : "white", verticalAlign: "top" }} id={rfp.RFP_ID.toString()}>
                      <td className='table-cell fixed-column' style={{ fontWeight: "500", backgroundColor: selectedRfps.includes(rfp.RFP_ID) ? "#F5F3FE" : "white" }}>
                        <div className='d-flex flex-row align-items-center'>
                          <Form.Check
                            inline
                            type="checkbox"
                            checked={selectedRfps.includes(rfp.RFP_ID)}
                            readOnly={true}
                            onClick={(e) => {
                              if (!selectedRfps.includes(rfp.RFP_ID)) {
                                setselectedRfps(prev => [...prev, rfp.RFP_ID]);
                              } else {
                                setselectedRfps(prev => prev.filter(ele => ele !== rfp.RFP_ID));
                              }
                            }}
                          />
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ WebkitLineClamp: "2", WebkitBoxOrient: "vertical", display: "-webkit-box", overflow: "hidden", margin: "0px" }}>{rfp.Project_Name}</div>
                            <div className='open-in-drive' onClick={(e) => openDriveLink(rfp.Folder_ID ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>
                          </div>
                        </div>
                      </td>
                      <td className='table-cell'>{rfp.Client}</td>
                      <td className='table-cell'>{rfp.Source}</td>
                      <td className='table-cell'>
                        <TFChip
                          value={rfp.Action ?? ""}
                          tableRef={tableRef}
                          name={rfp.RFP_ID}
                          onChange={handleStatusUpdate}
                          options={["No Go", "Review", "Go"]}
                        />
                      </td>
                      <td className='table-cell'>
                        {rfp.Submission_Date
                          ? (<TFDateChip
                            value={rfp.Submission_Date}
                            name={rfp.RFP_ID}
                            tableRef={tableRef}
                            onChange={(name:number, value : string) => handleDateUpdate(name, 'Submission_Date', value)}
                          />)
                          : ""
                        }
                      </td>
                      <td className='table-cell'>{rfp.RFP_Number}</td>
                      <td className='table-cell'>{rfp.Remarks}</td>
                      <td className='table-cell'>{rfp.Rating}</td>
                      <td className='table-cell'>
                      {rfp.Start_Date
                          ? (<TFDateChip
                            value={rfp.Start_Date}
                            name={rfp.RFP_ID}
                            tableRef={tableRef}
                            onChange={(name:number, value : string) => handleDateUpdate(name, 'Start_Date', value)}
                          />)
                          : ""
                        }
                      </td>
                      <td className='table-cell'>{rfp.Project_Manager}</td>
                      <td className='table-cell'>{rfp.Department}</td>
                      <td className='table-cell'>{rfp.Project_Category}</td>
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
            // onClick={(e) => handleShowDelete()}
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
            // onClick={handleUpdate}
            >
              <FontAwesomeIcon icon={faEdit} style={{ height: "20px" }} color="black" />
              <p className='floating-container-icon-text'>Edit</p>
            </Button>
            : <></>}

        <div style={{ marginLeft: "10px" }} className='floating-container-line'></div>

        <div style={{ display: "inline-block", textAlign: "center", verticalAlign: "middle", marginBottom: "11px", marginLeft: "10px" }}>
          <FontAwesomeIcon icon={faXmark} style={{ height: "20px", cursor: "pointer" }} color={PRIMARY_COLOR} onClick={(e) => setselectedRfps([])} />
        </div>
      </div>
    </>
  )
}

export default Table