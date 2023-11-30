import React, { MutableRefObject } from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { Form } from 'react-bootstrap';
import open from '../../../../Images/openinDrive.svg'
import Utils from '../../../../utils/Utils';

type Props = {
    project: Project;
    selectedProjects: number[];
    setselectedProjects: Function;
    tableRef: MutableRefObject<null>;
    openDriveLink: Function;
    handleStatusUpdate: Function;
    setProjectId: Function;
}

const IndependentRow = ({ project, selectedProjects, setselectedProjects, openDriveLink, tableRef, handleStatusUpdate, setProjectId }: Props) => {
    return (
        <tr style={{ width: "100%", backgroundColor: selectedProjects.includes(project.project_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={project.project_id}>
            <td className='table-cell fixed-column' style={{ "backgroundColor": selectedProjects.includes(project.project_id) ? "#F5F3FE" : "white" }}>
                <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                    <Form.Check
                        inline
                        type="checkbox"
                        checked={selectedProjects.includes(project.project_id)}
                        readOnly={true}
                        onClick={() => {
                            if (!selectedProjects.includes(project.project_id)) {
                                setselectedProjects((prev: number[]) => [...prev, project.project_id]);
                            } else {
                                setselectedProjects((prev: number[]) => prev.filter(ele => ele !== project.project_id));
                            }
                        }}
                    />
                    <div className='d-flex flex-column justify-content-start align-items-start'>
                        <p className='table-project-name-text' onClick={() => setProjectId(project.project_id)}>{project.project_name}</p>
                        {project.folder_id && <div className='open-in-drive' onClick={() => openDriveLink(project.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>}
                    </div>
                </div>
            </td>
            <td className='table-cell'>
                <p>{Utils.convertProjectCodeToArray(project.project_code).map((e, idx) => {
                    if(idx === 1) return <b> {e} </b>;
                    return e;
                })}</p>
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

export default IndependentRow