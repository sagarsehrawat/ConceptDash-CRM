import axios from 'axios';
import { React, useEffect, useState } from 'react'
import Form from "react-bootstrap/Form";
import {
    GET_BUDGET_CITIES,
    GET_DEPARTMENTS,
    GET_PROJECT_CATEGORIES,
    HOST,
} from "../Constants/Constants";
import Dropdown from 'react-bootstrap/Dropdown';
import LoadingSpinner from "../Loader/Loader";
import Button from 'react-bootstrap/esm/Button';
import Select from "react-select";

const CityBudget = () => {
    const [city, setCity] = useState({City_ID : 250, City: "Milton"})
    const [cities, setCities] = useState([])
    const [budgets, setBudgets] = useState([])
    const [filterCities, setFilterCities] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [apiCall, setCall] = useState(0);
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    const [showDelete, setShowDelete] = useState(false);
    const handleCloseDelete = () => setShowDelete(false);
    const handleShowDelete = () => setShowDelete(true);

    const [depts, setdepts] = useState([]);
    const [projectDepts, setprojectDepts] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        axios.get(HOST + GET_BUDGET_CITIES, {
            headers: { auth: "Rose " + localStorage.getItem("auth") },
        })
            .then((res) => {
                setCities(res.data.res);
                setFilterCities(res.data.res)
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(HOST + GET_DEPARTMENTS, {
                headers: { auth: "Rose " + localStorage.getItem("auth") },
            })
            .then((res) => {
                setdepts(res.data.res);
            })
            .catch((err) => {
                console.log(err);
            });

        axios
            .get(HOST + GET_PROJECT_CATEGORIES, {
                headers: { auth: "Rose " + localStorage.getItem("auth") },
            })
            .then((res) => {
                setprojectDepts(res.data.res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

    const handleChange = (e) => {
        const val = e.target.value.toString().toLowerCase()
        if (val === "") {
            setFilterCities(cities)
            return;
        }
        let arr = []
        cities.map(e => {
            if (e.City.toString().toLowerCase().startsWith(val))
                arr.push(e);
        })
        setFilterCities(arr)
    }

    const filterData = async () => {
        setIsLoading(true);
        // await axios
        //   .get(HOST + GET_PAGE_BUDGETS, {
        //     headers: {
        //       auth: "Rose " + localStorage.getItem("auth"),
        //       limit: limit,
        //       offset: 0,
        //       search: value,
        //       filter: JSON.stringify(returnData),
        //       sort: sort,
        //     },
        //   })
        //   .then((res) => {
        //     setbudgets(res.data.res);
        //     setpages(res.data.totalPages)
        //     setIsLoading(false);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    };
    const [rowData, setrowData] = useState([]);
    const handleUpdate = (e) => {
        setrowData(e);
        handleShowUpdate();
    };
    let filterDepts = [];
    let filterCategories = [];
    let filterBudgetCat = [
        {
            label: "Design",
            value: "Design",
        },
        {
            label: "Construction",
            value: "Construction",
        },
    ];

    depts.map((e) => {
        filterDepts.push({
            label: e.Department,
            value: e.Department_ID,
        });
    });
    projectDepts.map((e) => {
        filterCategories.push({
            label: e.Project_Category,
            value: e.Project_Cat_ID,
        });
    });
    const inputData = (e) => {
        setValue(e.target.value);
    };
    let [DisplayValue, getValue] = useState([]);
    let doChange = (e) => {
        getValue(Array.isArray(e) ? e.map((x) => x.value) : []);
    };
    let [DisplayValue1, getValue1] = useState([]);
    let doChange1 = (e) => {
        getValue1(Array.isArray(e) ? e.map((x) => x.value) : []);
    };
    let [DisplayValue3, getValue3] = useState([]);
    let doChange3 = (e) => {
        getValue3(Array.isArray(e) ? e.map((x) => x.value) : []);
    };
    let returnData = {
        dept: DisplayValue,
        cat: DisplayValue1,
        budgetCategory: DisplayValue3,
    };
    let deptvalue = [];
    returnData["dept"] &&
        returnData["dept"].map((e) => {
            deptvalue.push({
                label: e,
                value: e,
            });
        });
    let catvalue = [];
    returnData["cat"] &&
        returnData["cat"].map((e) => {
            catvalue.push({
                label: e,
                value: e,
            });
        });
    let cityvalue = [];
    returnData["city"] &&
        returnData["city"].map((e) => {
            cityvalue.push({
                label: e,
                value: e,
            });
        });
    let budgetcatValue = [];
    returnData["budgetCategory"] &&
        returnData["budgetCategory"].map((e) => {
            budgetcatValue.push({
                label: e,
                value: e,
            });
        });
    let sourceValue = [];
    returnData["source"] &&
        returnData["source"].map((e) => {
            sourceValue.push({
                label: e,
                value: e,
            });
        });
    const [budgetid, setbudgetid] = useState(0);
    const handleDelete = (e) => {
        setbudgetid(e);
        handleShowDelete();
    };
    const handleDeleteBudget = (e) => {
        setIsLoading(true);
        e.preventDefault();
        setIsLoading(true)
        // axios
        //   .post(
        //     HOST + DELETE_BUDGET,
        //     {
        //       id: budgetid,
        //     },
        //     { headers: { auth: "Rose " + localStorage.getItem("auth") } }
        //   )
        //   .then((res) => {
        //     console.log(res.data);
        //     if (res.data.success) {
        //       handleCloseDelete();
        //       setCall(apiCall + 1);
        //     }
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //   });
    };
    const addComma = (num) => {
        if (num === null) return ""
        return `$ ${num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
    }

    return (
        <>
            <div className='row justify-content-evenly' style={{ height: "100%" }}>
                <div className='' style={{ maxWidth: "12vw", height: "45vh", overflowY: "scroll", marginTop: "25vh", marginBottom: "25vh", border: "1px solid black", padding: "1rem" }}>
                    <Form.Control
                        placeholder="Search"
                        onChange={handleChange}
                    />
                    <br />
                    {filterCities.map(e => {
                        return (<>
                            <p>{e.City}</p>
                            <Dropdown.Divider />
                        </>)
                    })}
                </div>
                <div className='' style={{ width: "84vw" }}>
                    <h1
                        style={{
                            textAlign: "center",
                            marginTop: "3rem",
                            marginBottom: "1rem",
                            fontFamily: "roboto",
                            fontWeight: "bold",
                        }}
                    >
                        Budgets
                        <Button

                            style={{
                                float: "right",
                                backgroundColor: "rgba(38,141,141,1)",
                            }}
                        >
                            Add Budget +
                        </Button>
                    </h1>
                    <div style={{ float: "right", marginBottom: "1rem" }}>
                        <input
                            style={{ marginRight: ".5rem" }}
                            type="text"
                            value={value}
                            onChange={inputData}
                            placeholder="Search"
                        />
                        <Button
                            style={{ backgroundColor: "rgba(38,141,141,1)" }}
                            size="sm"
                            onClick={filterData}
                        >
                            Search
                        </Button>
                    </div>
                    <br />
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <Select
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
                        <Button
                            style={{ backgroundColor: "rgba(38,141,141,1)" }}
                            onClick={filterData}
                        >
                            Filter
                        </Button>
                    </div>
                    <br />
                    <div className="container-fluid">
            <table className="table">
              <thead>
                <tr className="heading">
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                  <th scope="col">Budget Category</th>
                  <th scope="col">Department</th>
                  <th scope="col">Source</th>
                  <th scope="col">Budget Amount</th>
                  <th scope="col">Budget Year</th>
                  <th scope="col">Project Name</th>
                  <th scope="col">Project Category</th>
                  <th scope="col">City</th>
                </tr>
              </thead>
              {isLoading
                ? <div style={{"display" : "table-caption"}}>
                  <LoadingSpinner />
                </div>
                : <tbody class="table-group-divider">
                  
                  {budgets
                    ? budgets.map((row) => {
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
                                  handleUpdate(row);
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
                                  handleDelete(row.Budget_ID);
                                }}
                                href="https://media.istockphoto.com/id/1298957635/vector/garbage-bin-line-vector-icon-editable-stroke-pixel-perfect-for-mobile-and-web.jpg?b=1&s=170667a&w=0&k=20&c=J4vFTp1_QJKLMiBHkMllw4-byUFxaKG9gJvbcwJusyI="
                              />
                            </svg>
                          </td>
                          <td>{row.Budget_Category}</td>
                          <td>{row.Department}</td>
                          <td>{row.Source}</td>
                          <td>{addComma(row.Budget_Amount)}</td>
                          <td>{row.Budget_Year}</td>
                          <td>{row.Project_Name}</td>
                          <td>{row.Project_Category}</td>
                          <td>{row.City}</td>
                        </tr>
                      );
                    })
                    : "NO DATA FOUND"}
                </tbody>}
            </table>
          </div>
                </div>
            </div>
        </>
    )
}

export default CityBudget