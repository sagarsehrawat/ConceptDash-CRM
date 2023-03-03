import { React, useEffect, useState, useContext } from "react";
import axios from "axios";
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
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Rings } from 'react-loader-spinner'
import { GET_GOOGLE_DRIVE_URL, GET_PROJECT_EXPENSES, GET_PROJECT_EXTRAS, GET_PROJECT_INVOICES, GET_PROJECT_ORDERS, GET_PROJECT_PAYMENTS, GET_PROJECT_SUBMISSIONS, HOST } from "../Constants/Constants";

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

    useEffect(() => {
        setisLoading([false, true, true, true, true, true, true])
        const call = async () => {
            await axios
                .get(HOST + GET_PROJECT_ORDERS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setorders(res.data.res)
                    setisLoading(prevState => [prevState[0], false, ...prevState.slice(2)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_PROJECT_INVOICES, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setinvoices(res.data.res)
                    setisLoading(prevState => [...prevState.splice(0, 2), false, ...prevState.slice(3)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_PROJECT_PAYMENTS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setpayments(res.data.res)
                    setisLoading(prevState => [...prevState.splice(0, 3), false, ...prevState.slice(4)])
                })
                .catch((err) => {
                    console.log(err);
                });

            await axios
                .get(HOST + GET_PROJECT_SUBMISSIONS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setsubmissions(res.data.res)
                    setisLoading(prevState => [...prevState.splice(0, 4), false, ...prevState.slice(5)])
                })
                .catch((err) => {
                    console.log(err);
                });

                await axios
                .get(HOST + GET_PROJECT_EXPENSES, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setexpenses(res.data.res)
                    setisLoading(prevState => [...prevState.splice(0, 5), false, ...prevState.slice(6)])
                })
                .catch((err) => {
                    console.log(err);
                });

                await axios
                .get(HOST + GET_PROJECT_EXTRAS, {
                    headers: {
                        auth: "Rose " + localStorage.getItem("auth"),
                        projectId: project.Project_ID
                    },
                })
                .then((res) => {
                    console.log(res.data)
                    setextras(res.data.res)
                    setisLoading(prevState => [...prevState.splice(0, 6), false])
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        call()
    }, [])


  const handleTabs = () => {
    if (tab === 0) return detailsComponent();
    if (tab === 1) return ordersComponent();
    if (tab === 2) return invoicesComponent();
    if (tab === 3) return paymentsComponent();
    if (tab === 4) return submissionsComponent();
    if (tab === 5) return expensesComponent();
    if (tab === 6) return extrasComponent();
  };
  const handleName = () => {
    switch (tab) {
      case 0:
        return "";
      case 1:
        return "Orders";
      case 2:
        return "Invoices";
      case 3:
        return "Payments";
      case 4:
        return "Submissions";
      case 5:
        return "Expenses";
      case 6:
        return "Extras";
      default:
        break;
    }
  };
  const handleButtons = () => {
    if (tab === 0) return <></>;
    if (tab === 1)
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
    if (tab === 2)
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
    if (tab === 3)
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
    if (tab === 4)
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
    if (tab === 5)
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
    if (tab === 6)
      return (
        <Button
          onClick={handleShowExtras}
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
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Order Date</th>
                                <th scope="col">Items</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Taxes</th>
                                <th scope="col">Payment Type</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Open in Drive</th>
                            </tr>
                        </thead>
                        {isLoading[1] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {orders
                                    ? orders.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,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"
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Employee_Name}</td>
                                                <td>{row.Customer_Name}</td>
                                                <td>{row.Order_Date
                                                    ? row.Order_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{row.Order_Items}</td>
                                                <td>{addComma(row.Amount)}</td>
                                                <td>{addComma(row.Taxes)}</td>
                                                <td>{row.Payment_Type}</td>
                                                <td>{row.Paid_Date
                                                    ? row.Paid_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{row.Notes}</td>
                                                <td>{isLoading2[1] ? < Rings
                                                    height="30"
                                                    width="30"
                                                    color="#000000"
                                                    radius="8"
                                                    visible={isLoading2[1]}
                                                /> : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFolder} onClick={(e) => openDriveLink(e, row.Project_Files)} />}</td>
                                            </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const invoicesComponent = () => {
        return (
            <>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Design Stage</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Invoice Date</th>
                                <th scope="col">Due Date</th>
                                <th scope="col">Tax</th>
                                <th scope="col">Courier</th>
                                <th scope="col">Amount Due</th>
                                <th scope="col">Invoiced So Far</th>
                                <th scope="col">Balance Remaining</th>
                                <th scope="col">Extra Claims</th>
                                <th scope="col">Extra Approved</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                        {isLoading[2] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {invoices
                                    ? invoices.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAeFBMVEX///8wMDAAAAAqKiru7u6np6cYGBhERERjY2MTExMGBgbNzc0tLS0jIyOJiYlAQEDi4uIcHBwmJib4+PicnJxWVlaZmZmioqIPDw9cXFy3t7d9fX2Ojo5YWFhJSUmxsbHX19fy8vJsbGzT09M2NjZ1dXXBwcFOTk6wVzgvAAAFd0lEQVR4nO2c62KiMBBGgQgWGraAreK1tbX6/m+4EgISxVJCErLud37VsgXPBmYmYcBxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAwBCzyWTsr6CX5OR5i7G/hE4Skrmutxn7a+gjSYl7xvsz9hfRBRd03fBBFWtB1w0eUjEhteBjKia0FKSlYv5wilyQBC8kZZKPFlGTmAmmb3vH8XP6eBGVB5l0OSs+rUI6yomaPEvyi11zwadZ+XkVUPPh5nnphlLkpHPfSdYcwQLzirONR6grBX3p2jkPMvHb7PK7VWg49a9zOb3fGCbureBZ0WN/bSqi+p60YKchH8FUFHScd5OKE1qcoTSNZPCyH/fNg0z2ebNlxc6bg5Gk8c4uimyuIZbyPOiSp9ttq5RtMnEtPp0nbW70i6jfm0uxnbYoLkrF3NdwZJHp+SSlOw07bhbb6fJ2c2lIphoOLVIYtp1GQ6lq0Zi2KyZBaajjP1dEk2GVB5cfebvivBxDb6X80NfoMawqmXOaSLw2xUXI5lLeq+oj36LFUCi26w+Nf/BaVhme/jijx/Cq2OYxp1GaLgwK6jCs5oO1UVXaVIfxI4OCGgzrYrvxK9I8Uf1yBHMD12CBcsPWYjtJL+GGC4ZzhQf9CdWGd4rtS0Tlp2hkSlC14c01WG/wyqE9xOU1aO4GhlrDSvDpWrDeRE0GGYZSw+s1GXEjrQtVk4JKDatKZtsm6DgfL3yxJDJ6j02hYfuSRYNNeQ2GhtIER51hp6Afmk0THGWG7AZoy5pMTVWqmR1BdYZt9bXAq9FSrYEiwx+jaIHJ2YSIGkPx3kQLZottASWGvLL+IciUgvkYrRgqDLujqOFiW0CBIRe8H0Wr6dIoggoMOyqZc5qITBfbAoMNO4PMeFG0ZKhhZ5owuibTxkDDu/PBCn/cU9QZatiyJiNSRVHTpVqDQYZ2pwnOEMPOYtsfqdgWGGDYWWyPnCY48oYWF9sC0oadgiMW2wKyhp2VTLUuOnrfs6RhW5+MgA1RtETO8LdpYqRiW0DKsLrTcn9NJrIgTXBkDO1dk2lDxpDYXmwLSBjuWRtFbOOaTBsShsfCkL50rcnYcA0WSBi+F40i6fudrfakCY6E4bqot9M7jTBcMLJlBKUMWTdj9t26zY5iW0DC0Lt/nVlSbAv0N/zgLbcty7t2pQlOf0O/7Eg7B5NrxWrCa9Ep6sgY8vucZwJRxbooWtLfcHvpGxVGkT8OY5tgf8NZMVKUptfhxreo2BbobTgpAk3qV08UVEKv9qUJTm9D1vqeP1dPMfDUbmOa4PQ2ZIEm/qhTA1vsXdhVbAv0NvwkRev7/vzTgs0xaLr9XgZ2FdsCfQ33h8sfLMq8QcpFqVGX7n+gryELNPHGmT3P129sDKvUYecI9jc8FlmPnKgXpZnwxJt9aYLT1/BPLAwchxIrgwyjr+EnuZbL0iicru9NiMenp+F+RxsDlwU52X7PvyZ7jd9wKD0N+eNKlMRhcHj7fv9I7i3XWENPw6/IJXEQu7v18esfedlMT8ONl+/mqy/rB65BT8PnRPpI++XpdNqZn1vpejrvlslLRkhq/mUKJg3Ph4phqB4YqgOGuoChOmCoCxiqA4a6gKE6YKgLGKoDhrqAoTpgqAsYqgOGuoChOmCoCxiqA4a6+A8MycMbmhvD6TiGu6JN7WDiSEnRpzKC4Wfx8ISBd906zjq+bZw2wZH1UMafvmYWW9ZM5Zlv4NizV4zRLNAMf/G1kSv+imPkmsOTb+UYwGbAS9n7QQ28NbiVlRdf9xrqgISZjteG/4r9Zhp5ugm3izE7qWYT/fxLnWIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABj/AV3BV6LQOGbpAAAAABJRU5ErkJggg=="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Design_Stage}</td>
                                                <td>{row.Customer_Name}</td>
                                                <td>{row.Invoice_Date
                                                    ? row.Invoice_Date.substring(0, 10)
                                                    : ""}</td>
                                                    <td>{row.Due_Date
                                                        ? row.Due_Date.substring(0, 10)
                                                        : ""}</td>
                                                <td>{addComma(row.Tax)}</td>
                                                <td>{addComma(row.Courier)}</td>
                                                <td>{addComma(row.Amount_Due)}</td>
                                                <td>{row.Invoiced_So_Far}</td>
                                                <td>{addComma(row.Balance_Remaining)}</td>
                                                <td>{row.Extra_Claims}</td>
                                                <td>{row.Extra_Approved}</td>
                                                <td>{row.Status}</td>
                                                </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const paymentsComponent = () => {
        return (
            <>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Approved By</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Payment Date</th>
                                <th scope="col">Method</th>
                                <th scope="col">Total Amount</th>
                                <th scope="col">Balance</th>
                                <th scope="col">Open in Drive</th>
                            </tr>
                        </thead>
                        {isLoading[3] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {payments
                                    ? payments.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,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"
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Manager_Name}</td>
                                                <td>{addComma(row.Payment_Amount)}</td>
                                                <td>{row.Payment_Date
                                                    ? row.Payment_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{row.Payment_Method}</td>
                                                <td>{addComma(row.Total_Amount)}</td>
                                                <td>{addComma(row.Balance)}</td>
                                                <td>{isLoading2[3] ? < Rings
                                                    height="30"
                                                    width="30"
                                                    color="#000000"
                                                    radius="8"
                                                    visible={isLoading2[3]}
                                                /> : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFolder} onClick={(e) => openDriveLink(e, row.Upload_File)} />}</td>
                                            </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const submissionsComponent = () => {
        return (
            <>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Design Stage</th>
                                <th scope="col">Submission Date</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Attachment</th>
                            </tr>
                        </thead>
                        {isLoading[4] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {submissions
                                    ? submissions.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,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"
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Employee_Name}</td>
                                                <td>{row.Design_Stage}</td>
                                                <td>{row.Submission_Date
                                                    ? row.Submission_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{row.Customer}</td>
                                                <td>{row.Notes}</td>
                                                <td>{isLoading2[4] ? < Rings
                                                    height="30"
                                                    width="30"
                                                    color="#000000"
                                                    radius="8"
                                                    visible={isLoading2[4]}
                                                /> : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFolder} onClick={(e) => openDriveLink(e, row.Attachment)} />}</td>
                                            </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const expensesComponent = () => {
        return (
            <>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Employee</th>
                                <th scope="col">Date</th>
                                <th scope="col">Category</th>
                                <th scope="col">Description</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Attachment</th>
                            </tr>
                        </thead>
                        {isLoading[5] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {expenses
                                    ? expenses.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,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"
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Employee_Name}</td>
                                                <td>{row.Expense_Date
                                                    ? row.Expense_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{row.Description}</td>
                                                <td>{addComma(row.Expense_Amount)}</td>
                                                <td>{row.Notes}</td>
                                                <td>{isLoading2[5] ? < Rings
                                                    height="30"
                                                    width="30"
                                                    color="#000000"
                                                    radius="8"
                                                    visible={isLoading2[5]}
                                                /> : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFolder} onClick={(e) => openDriveLink(e, row.Attachment)} />}</td>
                                            </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const extrasComponent = () => {
        return (
            <>
                <br />
                <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Select
                        placeholder="Department(s)"
                        defaultValue={deptvalue}
                        onChange={doChange}
                        isMulti
                        options={filterDepts}
                    >
                        Select Departments
                    </Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Category(s)"
                        defaultValue={catvalue}
                        onChange={doChange1}
                        isMulti
                        options={filterCategories}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Budget Category(s)"
                        defaultValue={budgetcatValue}
                        onChange={doChange3}
                        isMulti
                        options={filterBudgetCat}
                    ></Select>
                    &nbsp;&nbsp;
                    <Select
                        placeholder="Year"
                        defaultValue={{ value: year, label: year }}
                        onChange={(e) => {
                            setYear(e.value);
                        }}
                        options={years}
                    ></Select> */}
                    {/* &nbsp;&nbsp;
            <Form.Check label='Design' inline type="checkbox"/>
            <Form.Check label='Construction' inline type="checkbox"/> */}
                    &nbsp;&nbsp;
                    {/* <Button
                        style={{ backgroundColor: "rgba(38,141,141,1)" }}
                        onClick={filterData}
                    >
                        Filter
                    </Button> */}
                </div>
                <br />
                <div className="container-fluid">
                    <table className="table">
                        <thead>
                            <tr className="heading">
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Design Stage</th>
                                <th scope="col">Date</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Follow Up</th>
                                <th scope="col">Claims Reason</th>
                                <th scope="col">Extra Approved</th>
                                <th scope="col">Notes</th>
                                <th scope="col">Attachment</th>
                            </tr>
                        </thead>
                        {isLoading[6] ? (
                            <div style={{ display: "table-caption" }}>
                                <LoadingSpinner />
                            </div>
                        ) : (
                            <tbody class="table-group-divider">
                                {extras
                                    ? extras.map((row) => {
                                        return (
                                            <tr>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="30 0 220 220"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleUpdate(row);
                                                            }}
                                                            href="data:image/png;base64,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"
                                                        />
                                                    </svg>
                                                </td>
                                                <td>
                                                    <svg
                                                        width="40"
                                                        height="40"
                                                        viewBox="80 80 250 250"
                                                    >
                                                        <image
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => {
                                                                // handleDelete(row.Budget_ID);
                                                            }}
                                                            href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                                                        />
                                                    </svg>
                                                </td>
                                                <td>{row.Design_Stage}</td>
                                                <td>{row.Extra_Date
                                                    ? row.Extra_Date.substring(0, 10)
                                                    : ""}</td>
                                                <td>{addComma(row.Extra_Amount)}</td>
                                                <td>{row.Follow_Up}</td>
                                                <td>{row.Claims_Reason}</td>
                                                <td>{row.Extra_Approved}</td>
                                                <td>{row.Notes}</td>
                                                <td>{isLoading2[6] ? < Rings
                                                    height="30"
                                                    width="30"
                                                    color="#000000"
                                                    radius="8"
                                                    visible={isLoading2[6]}
                                                /> : <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faFolder} onClick={(e) => openDriveLink(e, row.Attachment)} />}</td>
                                            </tr>
                                        );
                                    })
                                    : "NO DATA FOUND"}
                            </tbody>
                        )}
                    </table>
                </div>
            </>
        )
    }
    const addComma = (num) => {
        if (num === null) return "";
        return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    };
    const openDriveLink = (e, projectFolderId) => {
        e.preventDefault();
        setisLoading2(prevState => [...prevState.slice(0, tab), true, ...prevState.slice(tab + 1)]);
        axios
            .get(
                HOST + GET_GOOGLE_DRIVE_URL,
                { headers: { auth: "Rose " + localStorage.getItem("auth"), id: projectFolderId, } }
            )
            .then((res) => {
                const url = res.data.res
                if (url && url !== "") window.open(url, '_blank');
                setisLoading2(prevState => [...prevState.slice(0, tab), false, ...prevState.slice(tab + 1)]);
            })
            .catch((err) => {
                console.log(err);
            });
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
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(0)}>
                            Project Details
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(1)}>
                            Orders
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(2)}>
                            Invoices
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(3)}>
                            Payments
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(4)}>
                            Submissions
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(5)}>
                            Expenses
                        </p>
                        <hr />
                    </div>
                    <div className='col-12'>
                        <p style={{ cursor: "pointer" }} onClick={(e) => settab(6)}>
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
