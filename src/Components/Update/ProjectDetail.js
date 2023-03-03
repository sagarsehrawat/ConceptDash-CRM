import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/Modal";
import ProjectPaymentForm from "../Form/ProjectPaymentForm";
import AddInvoice from "../Form/AddInvoice";
import OrderForm from "../Form/OrderForm";
import AddSubmission from "../Form/AddSubmission";
import AddExpenses from "../Form/AddExpenses";
import AddExtras from "../Form/AddExtras";

const ProjectDetail = (props) => {
    
  const [apiCall, setCall] = useState(0);
  const [green, setgreen] = useState(false);
  const [red, setred] = useState(false);
  const { setnav, project } = props;
  const [tab, settab] = useState(1);

  const [showPayment, setShowPayment] = useState(false);
  const handleClosePayment = () => setShowPayment(false);
  const handleShowPayment = () => setShowPayment(true);
  
  const [showInvoice, setShowInvoice] = useState(false);
  const handleCloseInvoice = () => setShowInvoice(false);
  const handleShowInvoice = () => setShowInvoice(true);

  const [showOrder, setShowOrder] = useState(false);
  const handleCloseOrder = () => setShowOrder(false);
  const handleShowOrder = () => setShowOrder(true);

  const [showSubmission, setShowSubmission] = useState(false);
  const handleCloseSubmission = () => setShowSubmission(false);
  const handleShowSubmission = () => setShowSubmission(true);

  const [showExpense, setShowExpense] = useState(false);
  const handleCloseExpense = () => setShowExpense(false);
  const handleShowExpense = () => setShowExpense(true);

  const [showExtras, setShowExtras] = useState(false);
  const handleCloseExtras = () => setShowExtras(false);
  const handleShowExtras = () => setShowExtras(true);

  const [show, setShow] = useState([false, false, false, false, false, false]);
  const handleClose = () => setShow([false, false, false, false, false, false]);
  const handleShow = () => setShow([true, false, false, false, false, false]);
  const handleTabs = () => {
    if (tab === 1) return detailsComponent();
    if (tab === 2) return ordersComponent();
    if (tab === 3) return invoicesComponent();
    if (tab === 4) return paymentsComponent();
    if (tab === 5) return submissionsComponent();
    if (tab === 6) return expensesComponent();
    if (tab === 7) return extrasComponent();
  };
  const handleName = () => {
    switch (tab) {
      case 1:
        return "";
      case 2:
        return "Orders";
      case 3:
        return "Invoices";
      case 4:
        return "Payments";
      case 5:
        return "Submissions";
      case 6:
        return "Expenses";
      case 7:
        return "Extras";
      default:
        break;
    }
  };
  const handleButtons = () => {
    if (tab === 1) return <></>;
    if (tab === 2)
      return (
        <Button
          onClick={handleShowOrder}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Order +
        </Button>
      );
    if (tab === 3)
      return (
        <Button
          onClick={handleShowInvoice}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Invoice +
        </Button>
      );
    if (tab === 4)
      return (
        <Button
          onClick={handleShowPayment}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Payment +
        </Button>
      );
    if (tab === 5)
      return (
        <Button
          onClick={handleShowSubmission}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Submission +
        </Button>
      );
    if (tab === 6)
      return (
        <Button
          onClick={handleShowExpense}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Expense +
        </Button>
      );
    if (tab === 7)
      return (
        <Button
          onClick={handleShowExtras}
          style={{
            float: "right",
            backgroundColor: "rgba(38,141,141,1)",
          }}
        >
          Add Extra +
        </Button>
      );
  };
  const detailsComponent = () => {
    return <></>;
  };
  const ordersComponent = () => {
    return <></>;
  };
  const invoicesComponent = () => {
    return <></>;
  };
  const paymentsComponent = () => {
    return <></>;
  };
  const submissionsComponent = () => {
    return <></>;
  };
  const expensesComponent = () => {
    return <></>;
  };
  const extrasComponent = () => {
    return <></>;
  };
  return (
    <>
      <div
        className="row justify-content-evenly"
        style={{ height: "100%", overflow: "hidden" }}
      >
        <div
          className="d-flex align-content-center flex-wrap"
          style={{
            maxWidth: "12vw",
            height: "92vh",
            textAlign: "center",
            borderRight: "1px solid black",
            marginTop: "",
          }}
        >
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(1)}>
              Project Details
            </p>
            <hr />
          </div>
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(2)}>
              Orders
            </p>
            <hr />
          </div>
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(3)}>
              Invoices
            </p>
            <hr />
          </div>
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(4)}>
              Payments
            </p>
            <hr />
          </div>
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(5)}>
              Submissions
            </p>
            <hr />
          </div>
          <div className="col-12">
            <p style={{ cursor: "pointer" }} onClick={(e) => settab(6)}>
              Expenses
            </p>
            <hr />
          </div>
          <div className="col-12">
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
            <FontAwesomeIcon
              icon={faArrowAltCircleLeft}
              style={{
                float: "left",
                marginBottom: "1rem",
                width: "1.5rem",
                cursor: "pointer",
              }}
              onClick={(e) => setnav(6)}
            />
            {project.Project_Name} Project {handleName()}
            {handleButtons()}
          </h1>
          {handleTabs()}
        </div>
      </div>
      <Modal
          show={showPayment}
          onHide={handleClosePayment}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Payment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <ProjectPaymentForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showInvoice}
          onHide={handleCloseInvoice}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Invoice</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <AddInvoice
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showOrder}
          onHide={handleCloseOrder}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Order</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <OrderForm
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showSubmission}
          onHide={handleCloseSubmission}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <AddSubmission
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showExpense}
          onHide={handleCloseExpense}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project Expense</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <AddExpenses
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>

        <Modal
          show={showExtras}
          onHide={handleCloseExtras}
          backdrop="static"
          size="xl"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Add Project Extras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {
              <AddExtras
                setRed={setred}
                setGreen={setgreen}
                closeModal={handleClose}
                api={apiCall}
                apiCall={setCall}
              />
            }
          </Modal.Body>
        </Modal>
    </>
  );
};

export default ProjectDetail;
