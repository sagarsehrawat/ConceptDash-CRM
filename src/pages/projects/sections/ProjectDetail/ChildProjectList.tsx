import React from 'react'
import TFInput from '../../../../components/form/TFInput/TFInput';

type Props = {
    children: Project[];
}

const ChildProjectList = ({ children }: Props) => {
    return (
        <div className='d-flex flex-column justify-content-start align-items-start'>
            {
                children.map((child, idx) => (
                    <div className='d-flex flex-row gap-8 w-100'>
                        <p className='project-label'>Sub-Project {idx}</p>
                        <TFInput
                            value={child.project_name}
                            readOnly={true}
                            />
                    </div>
                ))
            }
        </div>
    )
}

export default ChildProjectList