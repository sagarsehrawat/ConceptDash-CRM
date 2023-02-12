import axios from 'axios'
import { React, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { GET_ALL_EMPLOYEES, GET_ALL_PRIVILEGES, GET_EMPLOYEENAMES, HOST } from '../Constants/Constants'
import LoadingSpinner from '../Loader/Loader'

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

    useEffect(() => {
        setisLoading(true)
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
                console.log(res)
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
                })
            })
                .catch((err) => {
                    console.log(err);
                });
        }

        call()
    }, [])

    const handleChange = () => {

    }

    return (
        <>
            <div>
                <h1 style={{ textAlign: "center" }}>Select Employee</h1>
                <Form.Select
                    style={{ marginBottom: "4vh" }}
                    onChange={handleChange}
                >
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
                    
                </div>)
                }
            </div>
        </>
    )
}

export default Privileges