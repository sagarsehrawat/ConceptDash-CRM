import React, { useEffect, useRef, useState } from 'react'
import SERVICES from '../../../../services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { initRFPs, selectRFPs, updateRFP } from '../../../../redux/slices/rfpSlice';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import './Table.css'
import TFChip from '../../../../components/form/TFChip/TFChip';

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
  search: string
}

const Table = ({ api, currPage, filter, search, setPages }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const rfps = useSelector(selectRFPs);

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

  const handleStatusUpdate = async (rfpId : number, action : string) => {
    const prevAction = rfps.filter(rfp => rfp.RFP_ID === rfpId);
    try{
      dispatch(updateRFP({rfpId, data: {'Action' : action}}))
      await SERVICES.updateRfpStatus(rfpId, action);
    } catch (error) {
      console.log(error);
      dispatch(updateRFP({rfpId, data: {Action : prevAction[0].Action}}));
    }
  };

  return (
    <>
      {
        isLoading ?
          <div className='w-100' style={{ height: '492px' }}>
            <LoadingSpinner />
          </div>
          : <div className='table-wrapper' ref={tableRef}>
            <table className='w-100' style={{ overflowX: "hidden", borderCollapse: "separate" }}>
              <thead className='table-header fixed-table-header'>
                <tr>
                  <th className='table-heading fixed-header-column' style={{width: "300px"}}>RFP Name</th>
                  <th className='table-heading' style={{width: "150px"}}>Client</th>
                  <th className='table-heading' style={{width: "190px"}}>Source</th>
                  <th className='table-heading' style={{width: "120px"}}>Action</th>
                  <th className='table-heading' style={{width: "180px"}}>Submission Date</th>
                  <th className='table-heading' style={{width: "180px"}}>RFP Number</th>
                  <th className='table-heading' style={{width: "250px"}}>Remarks</th>
                  <th className='table-heading' style={{width: "200px"}}>Rating</th>
                  <th className='table-heading' style={{width: "180px"}}>Start Date</th>
                  <th className='table-heading' style={{width: "200px"}}>Project Manager</th>
                  <th className='table-heading' style={{width: "250px"}}>Department</th>
                  <th className='table-heading' style={{width: "200px"}}>Project Category</th>
                </tr>
              </thead>
              <tbody style={{ background: "#FFFFFF" }}>
                {
                  rfps && rfps.map(rfp => (
                    <tr style={{ width: "100%", background: "#FFFFFF", verticalAlign: "top" }}>
                      <td className='table-cell fixed-column'>{rfp.Project_Name}</td>
                      <td className='table-cell'>{rfp.Client}</td>
                      <td className='table-cell'>{rfp.Source}</td>
                      <td className='table-cell'>
                        <TFChip
                          value={rfp.Action ?? ""}
                          tableRef={tableRef}
                          name={rfp.RFP_ID.toString()}
                          onChange={handleStatusUpdate}
                          options={["No Go", "Review", "Go"]}
                        />
                      </td>
                      <td className='table-cell'>{rfp.Submission_Date?.format('D MMM, YYYY')}</td>
                      <td className='table-cell'>{rfp.RFP_Number}</td>
                      <td className='table-cell'>{rfp.Remarks}</td>
                      <td className='table-cell'>{rfp.Rating}</td>
                      <td className='table-cell'>{rfp.Start_Date?.format('D MMM, YYYY')}</td>
                      <td className='table-cell'>{rfp.Project_Manager}</td>
                      <td className='table-cell'>{rfp.Department}</td>
                      <td className='table-cell'>{rfp.Project_Category}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>}
    </>
  )
}

export default Table