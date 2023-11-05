import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { selectProjects } from '../../../../redux/slices/projectSlice';
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice';
import SERVICES from '../../../../services/Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Main/Loader/Loader';

interface FilterType {
  dept: (string | number)[],
  cat: (string | number)[],
  city: (string | number)[],
  manager: (string | number)[],
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
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProjects, setselectedProjects] = useState<number[]>([]);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);
  const privileges = useSelector(selectPrivileges);

  const sortRef = useRef<HTMLDivElement>(null);
  const [showSortModal, setShowSortModal] = useState<string>("");
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
        // const response = await SERVICES.getProjects(50, currPage, filter, search, sort);
        // console.log(response)
        // dispatch(initProjects(response.res));
        // setPages(response.totalPages);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [api, currPage]);

  const sortModal = (column: string) =>
    showSortModal === column
      ? <div className='d-flex flex-column justify-content-between sort-container' ref={sortRef}>
        <div
          className='d-flex flex-row justify-content-around sort-hover'
          onClick={(e) => {
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
          onClick={(e) => {
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

  return isLoading
    ? (<div className='w-100' style={{ height: '492px' }}>
      <LoadingSpinner />
    </div>)
    : <>
      <div className='table-wrapper'>
        <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
          <thead className='table-header fixed-table-header'>
            <tr>
              <th className='table-heading' style={{ width: "272px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Name')}>Project Name</p>
                {sortModal('Project_Name')}
              </th>
              <th className='table-heading' style={{ width: "133px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Code')}>Project Code</p>
                {sortModal('Project_Code')}
              </th>
              <th className='table-heading' style={{ width: "172px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('City')}>City</p>
                {sortModal('City')}
              </th>
              <th className='table-heading' style={{ width: "103px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Status')}>Status</p>
                {sortModal('Status')}
              </th>
              <th className='table-heading' style={{ width: "99px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Due_Date')}>Due Date</p>
                {sortModal('Project_Due_Date')}
              </th>
              <th className='table-heading' style={{ width: "99px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Next_Follow_Up')}>Next Follow-Up</p>
                {sortModal('Next_Follow_Up')}
              </th>
              <th className='table-heading' style={{ width: "152px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Manager')}>Project Manager</p>
                {sortModal('Project_Manager')}
              </th>
              <th className='table-heading' style={{ width: "152px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Manager')}>Project Manager</p>
                {sortModal('Project_Manager')}
              </th>
              <th className='table-heading' style={{ width: "89px" }}>
                Progress
              </th>
              <th className='table-heading' style={{ width: "194px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Department')}>Project Department</p>
                {sortModal('Department')}
              </th>
              <th className='table-heading' style={{ width: "136px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('Project_Value')}>Project Value</p>
                {sortModal('Project_Value')}
              </th>
            </tr>
          </thead>
          <tbody style={{ background: "#FFFFFF" }}>
            {
              projects && projects.map(project => {
                if (project.project_type === 'Roster Project') {
                  return (
                    <tr style={{ width: "100%", verticalAlign: "top" }} key={project.Project_Id}>
                      <td className='table-cell'>{project.Project_Name}</td>
                      <td className='table-cell'>{project.Project_Code}</td>
                      <td className='table-cell'>{project.City}</td>
                      <td className='table-cell'>{project.Status}</td>
                      <td className='table-cell'>{project.Project_Due_Date.toString()}</td>
                      <td className='table-cell'>{project.Next_Follow_Up?.toString()}</td>
                      <td className='table-cell'>{project.Manager_Name}</td>
                      <td className='table-cell'>{project.Project_Name}</td>
                      <td className='table-cell'>{project.Department}</td>
                      <td className='table-cell'>{project.Project_Value}</td>
                    </tr>
                  )
                } else if (project.project_type === 'Independent Project') {
                  return (
                    <tr style={{ width: "100%", verticalAlign: "top" }} key={project.Project_Id}>
                      <td className='table-cell'>{project.Project_Name}</td>
                      <td className='table-cell'>{project.Project_Code}</td>
                      <td className='table-cell'>{project.City}</td>
                      <td className='table-cell'>{project.Status}</td>
                      <td className='table-cell'>{project.Project_Due_Date.toString()}</td>
                      <td className='table-cell'>{project.Next_Follow_Up?.toString()}</td>
                      <td className='table-cell'>{project.Manager_Name}</td>
                      <td className='table-cell'>{project.Project_Name}</td>
                      <td className='table-cell'>{project.Department}</td>
                      <td className='table-cell'>{project.Project_Value}</td>
                    </tr>
                  )
                }
              })
            }
          </tbody>
        </table>
      </div>
    </>
}

export default Table