import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { initProjects, selectProjects, updateProject } from '../../../../redux/slices/projectSlice';
import SERVICES from '../../../../services/Services';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from '../../../../Main/Loader/Loader';
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { Form } from 'react-bootstrap';
import './Table.css'
import open from '../../../../Images/openinDrive.svg'
import { showErrorModal } from '../../../../redux/slices/alertSlice';

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


const Table = ({ api, setApi, currPage, filter, search, setPages }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedProjects, setselectedProjects] = useState<number[]>([]);
  const [selectedRosters, setSelectedRosters] = useState<number[]>([]);
  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const projects = useSelector(selectProjects);

  const sortRef = useRef<HTMLDivElement>(null);
  const [showSortModal, setShowSortModal] = useState<string>("");
  const [sort, setSort] = useState<string>('date_created DESC');
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
        setselectedProjects([]);
        setSelectedRosters([]);

        const response = await SERVICES.getProjects(50, currPage, filter, search, sort);
        console.log(response);
        dispatch(initProjects(response.res));
        setPages(response.totalPages);

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

  const handleStatusUpdate = async (id: number, option: string, projectType: string, parentId : number | null = null) => {
    const prev = projects.filter(project => project.project_id === id);
    try{
      dispatch(updateProject({projectId : id, data: {'status': option}, parentId}))
      await SERVICES.updateProjectStatus(id, option, projectType);
    } catch(error) {
      console.log(error);
      dispatch(updateProject({projectId : id, data: {'status': prev[0].status}, parentId}));
      dispatch(showErrorModal('Something went wrong!'));
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

  return isLoading
    ? (<div className='w-100' style={{ height: '492px' }}>
      <LoadingSpinner />
    </div>)
    : <>
      <div className='table-wrapper' ref={tableRef}>
        <table className='w-100' style={{ borderCollapse: "separate" }} ref={tableRef}>
          <thead className='table-header fixed-table-header'>
            <tr>
              <th className='table-heading fixed-header-column' style={{ width: "272px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('project_name')}>Project Name</p>
                {sortModal('project_name')}
              </th>
              <th className='table-heading' style={{ width: "172px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('project_code')}>Project Code</p>
                {sortModal('project_code')}
              </th>
              <th className='table-heading' style={{ width: "172px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('city')}>City</p>
                {sortModal('city')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('status')}>Status</p>
                {sortModal('status')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('due_date')}>Due Date</p>
                {sortModal('due_date')}
              </th>
              <th className='table-heading' style={{ width: "180px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('follow_up_date')}>Next Follow-Up</p>
                {sortModal('follow_up_date')}
              </th>
              <th className='table-heading' style={{ width: "202px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('project_manager')}>Project Manager</p>
                {sortModal('project_manager')}
              </th>
              <th className='table-heading' style={{ width: "89px" }}>
                Progress
              </th>
              <th className='table-heading' style={{ width: "250px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('department')}>Project Department</p>
                {sortModal('department')}
              </th>
              <th className='table-heading' style={{ width: "186px" }}>
                <p className='table-heading-text' onClick={() => setShowSortModal('project_value')}>Project Value</p>
                {sortModal('project_value')}
              </th>
            </tr>
          </thead>
          <tbody style={{ background: "#FFFFFF" }}>
            {
              projects && projects.map((project: Project, idx: number) => {
                if (project.project_type === 'Roster Project') {
                  return (
                    <>
                      <tr style={{ width: "100%", backgroundColor: selectedProjects.includes(idx) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={idx}>
                        <td className='table-cell fixed-column' style={{ backgroundColor: selectedProjects.includes(idx) ? "#F5F3FE" : "white" }}>
                          <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                            {
                              selectedRosters.includes(idx)
                                ? <FontAwesomeIcon
                                  icon={faChevronDown}
                                  onClick={() => setSelectedRosters(prev => prev.filter(ele => ele !== idx))}
                                  style={{ cursor: "pointer" }}
                                />
                                : <FontAwesomeIcon
                                  icon={faChevronRight}
                                  onClick={() => setSelectedRosters(prev => [...prev, idx])}
                                  style={{ cursor: "pointer" }}
                                />
                            }
                            <Form.Check
                              inline
                              type="checkbox"
                              checked={selectedProjects.includes(idx)}
                              readOnly={true}
                              onClick={() => {
                                if (!selectedProjects.includes(idx)) {
                                  setselectedProjects(prev => [...prev, idx]);
                                } else {
                                  setselectedProjects(prev => prev.filter(ele => ele !== idx));
                                }
                              }}
                            />
                            <p className='table-project-name-text'>{project.project_name}</p>
                          </div>
                        </td>
                        <td className='table-cell'>
                          <div className='d-flex flex-column align-items-center justify-content-start'>
                            <p>{project.project_code}</p>
                            {project.folder_id && <div className='open-in-drive' onClick={() => openDriveLink(project.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>}
                          </div>
                        </td>
                        <td className='table-cell'>{project.city}</td>
                        <td className='table-cell'>
                          <TFChip
                            value={project.status}
                            tableRef={tableRef}
                            name={project.project_id}
                            onChange={(id, option) => handleStatusUpdate(id, option, project.project_type)}
                            options={["Not Started", "In Progress", "Completed"]}
                          />
                        </td>
                        <td className='table-cell'>
                          {project.due_date.isValid() && <TFDateChip
                            value={project.due_date}
                            name={project.project_id}
                            tableRef={tableRef}
                          // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                          />}
                        </td>
                        <td className='table-cell'>
                          {project.follow_up_date.isValid() && <TFDateChip
                            value={project.follow_up_date}
                            name={project.project_id}
                            tableRef={tableRef}
                          // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                          />}
                        </td>
                        <td className='table-cell'>{project.project_manager}</td>
                        <td className='table-cell'>0</td>
                        <td className='table-cell'>{project.department}</td>
                        <td className='table-cell'>$ {project.project_value}</td>
                      </tr>
                      {
                        project.child_projects_info && selectedRosters.includes(idx) && project.child_projects_info.map((childProject) => (
                          <tr style={{ width: "100%", backgroundColor: selectedProjects.includes(childProject.project_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={childProject.project_id}>
                            <td className='table-cell fixed-column' style={{ backgroundColor: selectedProjects.includes(childProject.project_id) ? "#F5F3FE" : "white" }}>
                              <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                                <Form.Check
                                  inline
                                  type="checkbox"
                                  checked={selectedProjects.includes(childProject.project_id)}
                                  readOnly={true}
                                  onClick={() => {
                                    if (!selectedProjects.includes(childProject.project_id)) {
                                      setselectedProjects(prev => [...prev, childProject.project_id]);
                                    } else {
                                      setselectedProjects(prev => prev.filter(ele => ele !== childProject.project_id));
                                    }
                                  }}
                                />
                                <p className='table-project-name-text'>{childProject.project_name}</p>
                              </div>
                            </td>
                            <td className='table-cell'>
                              <div className='d-flex flex-column align-items-center justify-content-start'>
                                <p>{childProject.project_code}</p>
                                {project.folder_id && <div className='open-in-drive' onClick={() => openDriveLink(childProject.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>}
                              </div>
                            </td>
                            <td className='table-cell'>{childProject.city}</td>
                            <td className='table-cell'>
                              <TFChip
                                value={childProject.status}
                                tableRef={tableRef}
                                name={childProject.project_id}
                                onChange={(id, option) => handleStatusUpdate(id, option, childProject.project_type, project.project_id)}
                                options={["Not Started", "In Progress", "Completed"]}
                              />
                            </td>
                            <td className='table-cell'>
                              {childProject.due_date && <TFDateChip
                                value={childProject.due_date}
                                name={childProject.project_id}
                                tableRef={tableRef}
                              // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                              />}
                            </td>
                            <td className='table-cell'>
                              {childProject.follow_up_date && <TFDateChip
                                value={childProject.follow_up_date}
                                name={childProject.project_id}
                                tableRef={tableRef}
                              // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                              />}
                            </td>
                            <td className='table-cell'>{childProject.project_manager}</td>
                            <td className='table-cell'>0</td>
                            <td className='table-cell'>{childProject.department}</td>
                            <td className='table-cell'>$ {childProject.project_value}</td>
                          </tr>
                        ))
                      }
                    </>
                  )
                } else if (project.project_type === 'Independent Project') {
                  return (
                    <tr style={{ width: "100%", backgroundColor: selectedProjects.includes(idx) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={idx}>
                      <td className='table-cell fixed-column' style={{ backgroundColor: selectedProjects.includes(idx) ? "#F5F3FE" : "white" }}>
                        <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                          <Form.Check
                            inline
                            type="checkbox"
                            checked={selectedProjects.includes(idx)}
                            readOnly={true}
                            onClick={() => {
                              if (!selectedProjects.includes(idx)) {
                                setselectedProjects(prev => [...prev, idx]);
                              } else {
                                setselectedProjects(prev => prev.filter(ele => ele !== idx));
                              }
                            }}
                          />
                          <p className='table-project-name-text'>{project.project_name}</p>
                        </div>
                      </td>
                      <td className='table-cell'>
                        <div className='d-flex flex-column align-items-center justify-content-start'>
                          <p>{project.project_code}</p>
                          {project.folder_id && <div className='open-in-drive' onClick={() => openDriveLink(project.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>}
                        </div>
                      </td>
                      <td className='table-cell'>{project.city}</td>
                      <td className='table-cell'>
                        <TFChip
                          value={project.status}
                          tableRef={tableRef}
                          name={project.project_id}
                          onChange={(id, option) => handleStatusUpdate(id, option, project.project_type)}
                          options={["Not Started", "In Progress", "Completed"]}
                        />
                      </td>
                      <td className='table-cell'>
                        {project.due_date.isValid() && <TFDateChip
                          value={project.due_date}
                          name={project.project_id}
                          tableRef={tableRef}
                        // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                        />}
                      </td>
                      <td className='table-cell'>
                        {project.follow_up_date.isValid() && <TFDateChip
                          value={project.follow_up_date}
                          name={project.project_id}
                          tableRef={tableRef}
                        // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                        />}
                      </td>
                      <td className='table-cell'>{project.project_manager}</td>
                      <td className='table-cell'>0</td>
                      <td className='table-cell'>{project.department}</td>
                      <td className='table-cell'>$ {project.project_value}</td>
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