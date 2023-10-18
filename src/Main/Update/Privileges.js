import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { GET_ALL_EMPLOYEES, GET_ALL_PRIVILEGES, GET_EMPLOYEENAMES, GET_EMPLOYEE_PRIVILEGES, HOST, UPDATE_PRIVILEGE } from '../Constants/Constants'
import LoadingSpinner from '../Loader/Loader'
import GreenAlert from "../Loader/GreenAlert";
import RedAlert from "../Loader/RedAlert";

const Privileges = () => {
    const [general, setgeneral] = useState([])
    const [budget, setbudgets] = useState([])
    const [rfp, setrfp] = useState([])
    const [proposal, setproposal] = useState([])
    const [contact, setcontacts] = useState([])
    const [employee, setemployees] = useState([])
    const [project, setproject] = useState([])
    const [company, setcompany] = useState([])

    const [employees, setemployee] = useState([])
    const [isLoading, setisLoading] = useState(true)
    const [isLoading2, setisLoading2] = useState(true)
    const [isDisabled, setisDisabled] = useState(true)
    const [green, setgreen] = useState(false);
    const [red, setred] = useState(false);
    const [id, setid] = useState(null)
    let add = [], del = [];
    let arr = []

    useEffect(() => {
        setisLoading(true)
        setisLoading2(true)
        const call = async () => {
            await axios.get(HOST + GET_EMPLOYEENAMES, {
                headers: { auth: "Rose " + localStorage.getItem("auth") },
            }).then((res) => {
                setemployee(res.data.res)
            }).catch((err) => {
                console.log(err);
            });
            await axios.get(HOST + GET_ALL_PRIVILEGES, {
                headers: { auth: "Rose " + localStorage.getItem("auth") },
            }).then((res) => {
                let generals = [], budgets = [], rfps = [], proposals = [], contacts = [], employees = [], projects = [], companies = []
                res.data.res.forEach(e => {
                    let obj = { id: e.Privilege_ID, name: e.Privilege, isChecked: false }

                    switch (e.Privilege_Category) {
                        case 1:
                            budgets.push(obj)
                            break;
                        case 2:
                            rfps.push(obj)
                            break;
                        case 3:
                            proposals.push(obj)
                            break;
                        case 4:
                            contacts.push(obj)
                            break;
                        case 5:
                            employees.push(obj)
                            break;
                        case 6:
                            projects.push(obj)
                            break;
                        case 7:
                            companies.push(obj)
                            break;
                        default:
                            generals.push(obj)
                            break;
                    }
                    setbudgets(budgets)
                    setgeneral(generals)
                    setrfp(rfps)
                    setproposal(proposals)
                    setcontacts(contacts)
                    setemployees(employees)
                    setcompany(companies)
                    setproject(projects)
                    setisLoading(false)
                    setisLoading2(false)
                    setisDisabled(false)
                })
            }).catch((err) => {
                console.log(err);
            });
        }

        call()
    }, [])

    const selectEmployee = async (e) => {
        if (e.target.value === "") return
        setisLoading(true)
        setisLoading2(true)
        setisDisabled(true)
        setid(e.target.value)
        add = []
        del = []
        await axios.get(HOST + GET_EMPLOYEE_PRIVILEGES, {
            headers: { auth: "Rose " + localStorage.getItem("auth"), employeeid: e.target.value },
        }).then((res) => {
            console.log(res.data)
            arr = res.data.res.map(e => {
                return e.Privilege_ID;
            })
            setgeneral(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setbudgets(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setrfp(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setproposal(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setcontacts(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setemployees(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setproject(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setcompany(prev => {
                return prev.map(obj => {
                    if (arr.includes(obj.id)) {
                        return { ...obj, isChecked: true }
                    } else {
                        return { ...obj, isChecked: false }
                    }
                })
            })
            setisDisabled(false)
            setisLoading(false)
            setisLoading2(false)
        }).catch((err) => {
            console.log(err);
        });
    }

    const handleChange = (e) => {
        if (e.target.checked) {
            if (arr.includes(e.target.id)) {
                del = del.filter(ele => ele !== e.target.id)
            } else {
                add.push(e.target.id)
            }
        } else {
            if (add.includes(e.target.id)) {
                add = add.filter(ele => ele !== e.target.id)
            } else {
                del.push(e.target.id)
            }
        }
    }

    const handleSubmit = (e) => {
        setisDisabled(true)
        setisLoading2(true)
        axios.post(HOST + UPDATE_PRIVILEGE,
            {
                add: add,
                delete: del,
                employeeId: id
            },
            {
                headers: { auth: "Rose " + localStorage.getItem("auth"), employeeId: e.target.value },
            }).then((res) => {
                if (res.data.success) setgreen(true)
                add = []
                del = []
                setisDisabled(false)
                setisLoading2(false)
            }).catch((err) => {
                console.log(err);
            });
    }

    return (
        <>
            {green === true ? <GreenAlert setGreen={setgreen} /> : <></>}
            {red === true ? <RedAlert setRed={setred} /> : <></>}
            <div className='container'>
                <h1 style={{ textAlign: "center" }}>Select Employee</h1>
                <Form.Select
                    style={{ marginBottom: "4vh" }}
                    onChange={selectEmployee}
                >
                    <option value="">Select Employee</option>
                    {employees.length !== 0 ? (
                        employees.map((options) => (
                            <option
                                value={options.Employee_ID}
                                key={options.Employee_ID}
                            >
                                {options.Full_Name}
                            </option>
                        ))
                    ) : (
                        <option value="">None</option>
                    )}
                </Form.Select>
                {isLoading ?
                    <LoadingSpinner />
                    : (<div>
                        <Form>
                            <p style={{ marginBottom: "0" }}>General Privileges</p>
                            <Card className='' style={{ padding: "1rem", marginBottom: "2rem" }}>
                                <div className='row justify-content-between align-content-start flex-wrap' style={{ marginLeft: "1.5rem" }}>
                                    {general.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="general"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                </div>
                            </Card>

                            <p style={{ marginBottom: "0" }}>Project Privileges</p>
                            <Card className='' style={{ padding: "1rem", marginBottom: "2rem" }}>
                                <div className='row justify-content-between align-content-start flex-wrap' style={{ marginLeft: "1.5rem" }}>
                                    {budget.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="budget"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                    {rfp.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="rfp"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                    {proposal.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="proposal"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                    {project.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="project"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                </div>
                            </Card>

                            <p style={{ marginBottom: "0" }}>Company&Contact Privileges</p>
                            <Card className='' style={{ padding: "1rem", marginBottom: "2rem" }}>
                                <div className='row justify-content-between align-content-start flex-wrap' style={{ marginLeft: "1.5rem" }}>
                                    {contact.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="contact"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                    {company.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="company"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                </div>
                            </Card>

                            <p style={{ marginBottom: "0" }}>Employee Privileges</p>
                            <Card className='' style={{ padding: "1rem", marginBottom: "2rem" }}>
                                <div className='row justify-content-between align-content-start flex-wrap' style={{ marginLeft: "1.5rem" }}>
                                    {employee.map(e => {
                                        return <Form.Check
                                            inline
                                            label={e.name}
                                            name="employee"
                                            type="checkbox"
                                            id={e.id}
                                            className='col-3'
                                            defaultChecked={e.isChecked}
                                            onChange={handleChange}
                                        />
                                    })}
                                </div>
                            </Card>
                            <Button onClick={handleSubmit} disabled={isDisabled}>{"Submit"}</Button>
                        </Form>
                    </div>)
                }
            </div>
        </>
    )
}

export default Privileges