import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../../../../Main/Constants/Constants';
import { useSelector } from 'react-redux';
import { selectPrivileges } from '../../../../redux/slices/privilegeSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Delete from "../../../../Images/Delete.svg";
import TFDeleteModal from '../../../../components/modals/TFDeleteModal/TFDeleteModal';

type Props = {
    selectedProjects: number[];
    setSelectedProjects: Function;
    handleDelete: Function;
}

const DeleteModal = ({ selectedProjects, setSelectedProjects, handleDelete }: Props) => {
    const privileges = useSelector(selectPrivileges);
    const [showDeleteModal, setshowDeleteModal] = useState<boolean>(false)
    return (
        <>
            <div
                style={{
                    boxSizing: "border-box",
                    position: "absolute",
                    width: "522px",
                    height: "76px",
                    left: "45.347vw",
                    top: "586px",
                    background: "#FFFFFF",
                    border: "1px solid #6519E1",
                    boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.08)",
                    borderRadius: "6px",
                    zIndex: "1000",
                    display: selectedProjects.length === 0 ? "none" : "",
                    visibility: selectedProjects.length === 0 ? "hidden" : "visible",
                }}
            >
                <p style={{
                    width: "14px",
                    height: "36px",
                    marginLeft: "32px",
                    marginTop: "26px",
                    fontFamily: "'Roboto'",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "24px",
                    lineHeight: "36px",
                    color: PRIMARY_COLOR,
                    display: "inline-block",
                }}>{selectedProjects.length}</p>
                <p style={{
                    width: "128px",
                    height: "24px",
                    left: "58px",
                    top: "32px",
                    fontFamily: "'Roboto'",
                    fontStyle: "normal",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "24px",
                    color: "#0A0A0A",
                    display: "inline-block",
                    marginLeft: "12px",
                }}>Items Selected</p>
                <div
                    style={{
                        width: "46px",
                        height: "0px",
                        border: "1px solid #EBE9F1",
                        transform: "rotate(90deg)",
                        display: "inline-block",
                        marginBottom: "12px", marginLeft: "-23px"
                    }}
                ></div>
                {privileges.includes("Delete Project") && (
                    <div
                        style={{
                            marginBottom: "15px",
                            display: "inline-block",
                            textAlign: "center",
                            verticalAlign: "middle",
                            marginLeft: "50px",
                            cursor: "pointer",
                        }}
                        onClick={() => setshowDeleteModal(true)}
                    >
                        {/* <FontAwesomeIcon icon={faTrash} style={{ height: "20px" }} /> */}
                        <img src={Delete} />
                        <p style={{
                            fontFamily: "'Roboto'",
                            fontStyle: "normal",
                            fontWeight: 400,
                            fontSize: "14px",
                            lineHeight: "20px",
                            color: "#0A0A0A",
                        }}>Delete</p>
                    </div>
                )}
                <div
                    style={{
                        width: "46px",
                        height: "0px",
                        border: "1px solid #EBE9F1",
                        transform: "rotate(90deg)",
                        display: "inline-block",
                        marginBottom: "12px", marginLeft: "10px"
                    }}
                ></div>
                <div
                    style={{
                        display: "inline-block",
                        textAlign: "center",
                        verticalAlign: "middle",
                        marginBottom: "11px",
                        marginLeft: "40px",
                    }}
                >
                    <FontAwesomeIcon
                        icon={faXmark}
                        style={{ height: "20px", cursor: "pointer" }}
                        color={PRIMARY_COLOR}
                        onClick={() => setSelectedProjects([])}
                    />
                </div>
            </div >
            <TFDeleteModal 
            show={showDeleteModal}
            onHide={() => setshowDeleteModal(false)}
            onDelete={() => {
                handleDelete();
                setSelectedProjects([])
            }}
            label='Project'
            />
        </>
    )
}

export default DeleteModal