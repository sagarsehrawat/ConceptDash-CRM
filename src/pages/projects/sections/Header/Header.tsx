import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice';
import TFButton from '../../../../components/ui/TFButton/TFButton';
import ICONS from '../../../../constants/Icons';
import AddProject from '../../forms/AddProject';

type Props = {
    api: number,
    setApi: Function
}

const Header = ({ api, setApi }: Props) => {
    const privileges: string[] = useSelector(selectPrivileges);
    const [show, setShow] = useState<boolean>(false)
    return (
        <>
            <div className='d-flex flex-row justify-content-between align-items-center' style={{ margin: '32px 24px 0px 32px' }}>
                <p className='heading-2'>Projects</p>
                <TFButton icon={ICONS.PLUS_WHITE} label="Add New Project" disabled={!privileges.includes("Add Project")} handleClick={() => setShow(true)} />
            </div>

            {show &&
                <AddProject
                    show={show}
                    api={api}
                    setApi={setApi}
                    onHide={() => setShow(false)}
                />}
        </>
    )
}

export default Header