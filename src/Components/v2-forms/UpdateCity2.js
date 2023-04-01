import axios from 'axios'
import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'
import { HOST, UPDATE_BUDGET_CITY2 } from '../Constants/Constants'
import LoadingSpinner from '../Loader/Loader'

const UpdateCity2 = (props) => {
    const { cities, idx, setgreen, setred, handleCloseUpdate, setcities, city, setcity } = props
   
    const [form, setform] = useState({
        website: city.Website ?? "",
        website22: city.Website_22 ?? "",
        website23: city.Website_23 ?? "",
        year22: city.Year_22 ?? "",
        year23: city.Year_23 ?? "",
        remarks: city.Remarks ?? ""
    })
    const [isLoading, setisLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        const f = { ...form };
        f[name] = value;
        setform(f)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true)

        await axios
        .post(
                HOST + UPDATE_BUDGET_CITY2,
                {
                    id: cities[idx].City_Budget_ID,
                    ...form
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                if (res.data.success) {
                    const c = cities;
                    const prev = city
                    prev.Website = (form.website === '' ? null : form.website)
                    prev.Website_22 = (form.website22 === '' ? null : form.website22)
                    prev.Website_23 = (form.website23 === '' ? null : form.website23)
                    prev.Remarks = form.remarks
                    prev.Year_22 = form.year22
                    prev.Year_23 = form.year23
                    setcity(prev)
                    c[idx] = prev;
                    setcities(c)
                    handleCloseUpdate();
                    setgreen(true);
                } else {
                    setred(true);
                }
                setisLoading(false);
            })
            .catch((err) => {
                setisLoading(false);
                props.set(true);
                console.log(err);
            });
    }
    return (
        <>
            {isLoading ?
                <div style={{ height: "300px" }}>
                    <LoadingSpinner />
                </div>
                :
                <>
                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>City Website</Form.Label>
                            <Form.Control value={form.website} name="website" onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>2022 Budget Website</Form.Label>
                            <Form.Control value={form.website22} name="website22" onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>2023 Budget Website</Form.Label>
                            <Form.Control value={form.website23} name="website23" onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>Update 2022 Budget Status</Form.Label>
                            <Form.Select defaultValue={form.year22} name="year22" onChange={handleChange} >
                                <option value="Done">Done</option>
                                <option value="Not Found">Not Found</option>
                                <option value="Only Project Names">Only Project Names</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Update 2023 Budget Status</Form.Label>
                            <Form.Select defaultValue={form.year23} name="year23" onChange={handleChange} >
                                <option value="Done">Done</option>
                                <option value="Not Found">Not Found</option>
                                <option value="Only Project Names">Only Project Names</option>
                            </Form.Select>
                        </Form.Group>
                    </Row>

                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>Remarks</Form.Label>
                            <Form.Control value={form.remarks} name="remarks" onChange={handleChange} as="textarea" rows={4} />
                        </Form.Group>
                    </Row>

                    <Row className='justify-content-end mx-2 my-4'>
                        <button style={{ background: "#6519E1", boxShadow: "0px 4px 8px rgba(88, 82, 246, 0.25)", borderRadius: "5px", color: "#FBFBFB", width: "75px", height: "36px" }} onClick={handleSubmit}>Save</button>
                    </Row>
                </>
            }
        </>
    )
}

export default UpdateCity2