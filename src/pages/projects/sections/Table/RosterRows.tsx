import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MutableRefObject } from 'react'
import { Form } from 'react-bootstrap';
import open from '../../../../Images/openinDrive.svg'
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';

type Props = {
    project: Project;
    selectedRosters: number[];
    selectedProjects: number[];
    setSelectedRosters: Function;
    setSelectedProjects: Function;
    tableRef: MutableRefObject<null>;
    openDriveLink: Function;
    handleStatusUpdate: Function;
    setProjectId: Function;
}

const RosterRows = ({ project, selectedRosters, setSelectedRosters, selectedProjects, setSelectedProjects, openDriveLink, tableRef, handleStatusUpdate, setProjectId }: Props) => {
    return (
        <>
            <tr style={{ width: "100%", backgroundColor: selectedProjects.includes(project.project_id) ? "#F5F3FE" : "#EFF1FA", verticalAlign: "top" }} key={project.project_id}>
                <td className='table-cell fixed-column' style={{ backgroundColor: selectedProjects.includes(project.project_id) ? "#F5F3FE" : "white" }}>
                    <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                        {
                            selectedRosters.includes(project.project_id)
                                ? <FontAwesomeIcon
                                    icon={faChevronDown}
                                    onClick={() => setSelectedRosters((prev: number[]) => prev.filter(ele => ele !== project.project_id))}
                                    style={{ cursor: "pointer" }}
                                />
                                : <FontAwesomeIcon
                                    icon={faChevronRight}
                                    onClick={() => setSelectedRosters((prev: number[]) => [...prev, project.project_id])}
                                    style={{ cursor: "pointer" }}
                                />
                        }
                        <Form.Check
                            inline
                            type="checkbox"
                            checked={selectedProjects.includes(project.project_id)}
                            readOnly={true}
                            onClick={() => {
                                if (!selectedProjects.includes(project.project_id)) {
                                    setSelectedProjects((prev: number[]) => [...prev, project.project_id]);
                                } else {
                                    setSelectedProjects((prev: number[]) => prev.filter(ele => ele !== project.project_id));
                                }
                            }}
                        />
                        <p className='table-project-name-text' onClick={() => setProjectId(project.project_id)}>{project.project_name}</p>
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
                project.child_projects_info && selectedRosters.includes(project.project_id) && project.child_projects_info.map((childProject) => (
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
                                            setSelectedProjects((prev:number[]) => [...prev, childProject.project_id]);
                                        } else {
                                            setSelectedProjects((prev:number[]) => prev.filter(ele => ele !== childProject.project_id));
                                        }
                                    }}
                                />
                                <p className='table-project-name-text' onClick={() => setProjectId(childProject.project_id)}>{childProject.project_name}</p>
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
}

export default RosterRows