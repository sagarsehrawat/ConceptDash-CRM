import React, { useEffect, useRef, useState } from 'react'
import SERVICES from '../../../../services/Services';
import { useDispatch, useSelector } from 'react-redux';
import { initRFPs, selectRFPs } from '../../../../redux/slices/rfpSlice';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import './Table.css'

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

  // const handleStatusUpdate = async (rfpId, action) => {
  //   dispatch(updateRFP({rfpId, data: {'Action' : action}}))
  //   const response = await axios.post(
  //     HOST + UPDATE_RFP_STATUS,
  //     {
  //       rfpId,
  //       action,
  //     },
  //     {
  //       headers: { auth: "Rose " + localStorage.getItem("auth") },
  //     }
  //   );

  //   return response;
  // };

  return (
    <>
      {
        isLoading ?
          <div>
              <LoadingSpinner />
          </div>
          : <div className='table-wrapper' ref={tableRef}>
            <table className='w-100' style={{overflowX : "hidden"}}>
              <thead className='table-header'>
                <tr>
                  <th>RFP Name</th>
                  <th>Client</th>
                  <th>Source</th>
                  <th>Action</th>
                  <th>Submission Date</th>
                  <th>RFP Number</th>
                  <th>Remarks</th>
                  <th>Rating</th>
                  <th>Start Date</th>
                  <th>Project Manager</th>
                  <th>Department</th>
                  <th>Project Category</th>
                </tr>
              </thead>
              <tbody>
                {
                  rfps.map(rfp => (
                    <tr>
                      <td>{rfp.Project_Name}</td>
                      <td>{rfp.Client}</td>
                      <td>{rfp.Source}</td>
                      <td>{rfp.Action}</td>
                      <td>{rfp.Submission_Date?.format('D MMM, YYYY')}</td>
                      <td>{rfp.RFP_Number}</td>
                      <td>{rfp.Remarks}</td>
                      <td>{rfp.Rating}</td>
                      <td>{rfp.Start_Date?.format('D MMM, YYYY')}</td>
                      <td>{rfp.Project_Manager}</td>
                      <td>{rfp.Department}</td>
                      <td>{rfp.Project_Category}</td>
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