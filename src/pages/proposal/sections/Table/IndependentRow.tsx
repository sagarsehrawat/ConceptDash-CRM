import React, { MutableRefObject } from 'react'
import TFChip from '../../../../components/form/TFChip/TFChip';
import TFDateChip from '../../../../components/form/TFDateChip/TFDateChip';
import { Form } from 'react-bootstrap';
import open from '../../../../Images/openinDrive.svg'
import star from '../../../../assets/icons/Star.svg'
import star_transparent from '../../../../assets/icons/Star_Transparent.svg'

type Props = {
    proposal: Proposal;
    selectedProposals: number[];
    setselectedProposals: Function;
    tableRef: MutableRefObject<null>;
    openDriveLink: Function;
    handleResultUpdate: Function;
    setProposalId: Function;
    handleBookmarkUpdate: Function,
    handlePriorityUpdate: Function
}

const employeeId: number = parseInt(localStorage.getItem("employeeId") ?? '0');

const handleTTM=()=>{
    console.log(1);
}


const IndependentRow = ({ proposal, selectedProposals, setselectedProposals, openDriveLink, tableRef, handleResultUpdate, setProposalId ,handleBookmarkUpdate, handlePriorityUpdate}: Props) => {
    return (
        <tr style={{ width: "100%", backgroundColor: selectedProposals.includes(proposal.proposal_id) ? "#F5F3FE" : "white", verticalAlign: "top" }} key={proposal.proposal_id}>
            <td className='table-cell fixed-column' style={{ "backgroundColor": selectedProposals.includes(proposal.proposal_id) ? "#F5F3FE" : "white" }}>
                <div className='d-flex flex-row justify-content-start gap-8 align-items-center'>
                    <Form.Check
                        inline
                        type="checkbox"
                        checked={selectedProposals.includes(proposal.proposal_id)}
                        readOnly={true}
                        onClick={() => {
                            if (!selectedProposals.includes(proposal.proposal_id)) {
                                setselectedProposals((prev: number[]) => [...prev, proposal.proposal_id]);
                            } else {
                                setselectedProposals((prev: number[]) => prev.filter(ele => ele !== proposal.proposal_id));
                            }
                        }}
                    />
                    <img
                        src={proposal.bookmark?.includes(employeeId) ? star : star_transparent}
                        alt="bookmark"
                        style={{
                            color: proposal.bookmark?.includes(employeeId ?? '') ? 'gold' : 'black',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleBookmarkUpdate(proposal.proposal_id, proposal.bookmark?.includes(employeeId),proposal.bookmark)}
                    />

                    <div className='d-flex flex-column justify-content-start align-items-start'>
                        <p className='table-project-name-text' onClick={() => setProposalId(proposal.proposal_id)}>{proposal.project_name}</p>
                        {proposal.folder_id && <div className='open-in-drive' onClick={() => openDriveLink(proposal.folder_id ?? "")}>Open in Drive&nbsp;&nbsp;<img src={open} /></div>}
                    </div>
                </div>
            </td>
            <td className='table-cell'>{proposal.city}</td>
            <td className='table-cell'>
                <TFChip
                    value= {proposal.result}
                    tableRef={tableRef}
                    name={proposal.proposal_id}
                    onChange={(id, option) => handleResultUpdate(id, option)}
                    options={["Pending", "Won", "Lost","Submitted"]}
                />
            </td>
            <td className='table-cell'>
                {proposal.question_deadline.isValid() && <TFDateChip
                    value={proposal.question_deadline}
                    name ={proposal.proposal_id}
                    tableRef={tableRef}
                // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                />}
            </td>
            <td className='table-cell'>
                {proposal.closing_deadline.isValid() && <TFDateChip
                    value={proposal.closing_deadline}
                    name ={proposal.proposal_id}
                    tableRef={tableRef}
                // onChange={(name: number, value: string) => handleDateUpdate(name, 'submission_date', value)}
                />}
            </td>
            <td className='table-cell'>
                <TFChip
                    value= {proposal.priority}
                    tableRef={tableRef}
                    name={proposal.proposal_id}
                    onChange={(id, option) => handlePriorityUpdate(id, option)}
                    options={["High", "Medium", "Low"]}
                />
            </td>
            <td className='table-cell'>
            {proposal.total_bid_price!==null ? `$${proposal.total_bid_price}` : ``}
            </td>

            {/* <td className='table-cell'>{proposal.proposal_generator_link}</td> */}
            <td className='table-cell'><div style={{color:"#3692EF", fontSize:'13px', cursor:'pointer'}} onClick={()=>handleTTM()}>TTM&nbsp;<img src={open} alt='open-in-drive'/></div></td>
            <td className='table-cell'>{proposal.source}</td>
            <td className='table-cell'>{proposal.partner_names?.join(', ')}</td>

        </tr>
    )
}

export default IndependentRow
