import { React, useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loader/Loader";
import Button from "react-bootstrap/esm/Button";
import Select from "react-select";
import Modal from "react-bootstrap/Modal";

const ProjectDetail = (props) => {
    const { setnav, project } = props
    const [tab, settab] = useState(1)

    const [show, setShow] = useState([false, false, false, false, false, false]);
    const handleClose = () => setShow([false, false, false, false, false, false]);
    const handleShow = () => setShow([true, false, false, false, false, false]);
    const handleTabs = () => {
        if (tab === 1) return detailsComponent()
        if (tab === 2) return ordersComponent()
        if (tab === 3) return invoicesComponent()
        if (tab === 4) return paymentsComponent()
        if (tab === 5) return submissionsComponent()
        if (tab === 6) return expensesComponent()
        if (tab === 7) return extrasComponent()
    }
    const handleName = () => {
        switch (tab) {
            case 1:
                return ""
            case 2:
                return "Orders"
            case 3:
                return "Invoices"
            case 4:
                return "Payments"
            case 5:
                return "Submissions"
            case 6:
                return "Expenses"
            case 7:
                return "Extras"
            default:
                break;
        }
    }
    const handleButtons = () => {
        if (tab === 1) return <></>
        if (tab === 2) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Order +
        </Button>)
        if (tab === 3) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Invoice +
        </Button>)
        if (tab === 4) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Payment +
        </Button>)
        if (tab === 5) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Submission +
        </Button>)
        if (tab === 6) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Expense +
        </Button>)
        if (tab === 7) return (<Button
            onClick={handleShow}
            style={{
                float: "right",
                backgroundColor: "rgba(38,141,141,1)",
            }}
        >
            Add Extra +
        </Button>)
    }
    const detailsComponent = () => {
        return (
            <>

            </>
        )
    }
    const ordersComponent = () => {
        return (
            <>
            </>
        )
    }
    const invoicesComponent = () => {
        return (
            <>
            </>
        )
    }
    const paymentsComponent = () => {
        return (
            <>
            </>
        )
    }
    const submissionsComponent = () => {
        return (
            <>
            </>
        )
    }
    const expensesComponent = () => {
        return (
            <>
            </>
        )
    }
    const extrasComponent = () => {
        return (
            <>
            </>
        )
    }
    return (
        <>
            <div className="row justify-content-evenly" style={{ height: "100%", overflow: "hidden" }}>
                <div
                    className="d-flex align-content-center flex-wrap"
                    style={{
                        maxWidth: "12vw",
                        height: "92vh",
                        textAlign: "center",
                        borderRight: "1px solid black",
                        marginTop: ""
                    }}
                >
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(1)}>
                            Project Details
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(2)}>
                            Orders
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(3)}>
                            Invoices
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(4)}>
                            Payments
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(5)}>
                            Submissions
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(6)}>
                            Expenses
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(7)}>
                            Extras
                        </p>
                    </div>
                </div>
                <div
                    className=""
                    style={{ width: "84vw", height: "92vh", overflowY: "scroll" }}
                >
                    <h1
                        style={{
                            textAlign: "center",
                            marginTop: "3rem",
                            marginBottom: "1rem",
                            fontFamily: "roboto",
                            fontWeight: "bold",
                        }}
                    >
                        <FontAwesomeIcon icon={faArrowAltCircleLeft} style={{ float: "left", marginBottom: "1rem", width: "1.5rem", cursor: "pointer" }} onClick={(e) => setnav(6)} />
                        {project.Project_Name} Project {handleName()}
                        {handleButtons()}
                    </h1>
                    {handleTabs()}
                </div>
            </div>
        </>
    )
}

export default ProjectDetail