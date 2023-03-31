import axios from 'axios';
import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap';
import { HOST, UPDATE_BUDGET_CITY1 } from '../Constants/Constants';
import LoadingSpinner from '../Loader/Loader';

const UpdateCity1 = (props) => {
    const { cities, idx, setgreen, setred, handleCloseUpdate, setcities } = props

    const [form, setform] = useState({
        geographicArea: cities[idx].Geographic_Area ?? "",
        municipalityType: cities[idx].Municipality_Type ?? "",
        population: cities[idx].Population_2021 ?? "",
        capitalBudget: cities[idx].Capital_Budget_23,
        year22: cities[idx].Year_22 ?? "",
        year23: cities[idx].Year_23 ?? "",
        remarks: cities[idx].Remarks ?? ""
    })
    const [isLoading, setisLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target
        const f = {...form};
        f[name] = value;
        setform(f)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading(true)

        await axios.
            post(
                HOST + UPDATE_BUDGET_CITY1,
                {
                    id: cities[idx].City_Budget_ID,
                    cityId: cities[idx].City_ID,
                    ...form
                },
                { headers: { auth: "Rose " + localStorage.getItem("auth") } }
            )
            .then((res) => {
                if (res.data.success) {
                    const c = cities;
                    const prev = c[idx]
                    prev.Geographic_Area = form.geographicArea;
                    prev.Municipality_Type = form.municipalityType
                    prev.Population_2021 = form.population
                    prev.Capital_Budget_23 = form.capitalBudget
                    prev.Remarks = form.remarks
                    prev.Year_22 = form.year22
                    prev.Year_23 = form.year23
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
                            <Form.Label>Region</Form.Label>
                            <Form.Control value={form.geographicArea} name="geographicArea" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Municipality Type</Form.Label>
                            <Form.Control value={form.municipalityType} name="municipalityType" onChange={handleChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mx-0 my-4">
                        <Form.Group as={Col}>
                            <Form.Label>Population</Form.Label>
                            <Form.Control value={form.population} name="population" onChange={handleChange} />
                        </Form.Group>
                        <Form.Group as={Col}>
                            <Form.Label>Capital Budget</Form.Label>
                            <Form.Control value={form.capitalBudget} name="capitalBudget" onChange={handleChange} />
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
                </>}
        </>
    )
}

export default UpdateCity1