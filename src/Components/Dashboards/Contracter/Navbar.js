import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { Modal, ModalBody } from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClose } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons'
import './Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const [f1, setf1] = useState(false)
    const [f2, setf2] = useState(false)
    const [f3, setf3] = useState(false)
    const [f4, setf4] = useState(false)


    return (
        <>
            <nav className="navbar header navbar-dark navbar-expand-lg bg-dark">
                <div className="container">
                    <a className="navbar-brand" role="button" onClick={() => setf1(true)}>Form 1</a>
                    <a className="navbar-brand" role="button" onClick={() => setf2(true)}>Form 2</a>
                    <a className="navbar-brand" role="button" onClick={() => setf3(true)}>Form 3</a>
                    <a className="navbar-brand" role="button" onClick={() => setf4(true)}>Form 4</a>
                    <a className="navbar-brand" role="button" onClick={() => navigate('/login')}>Logout</a>
                </div>
            </nav>

            {/**************  Form 1**************** */}
            <Modal isOpen={f1} toggle={() => setf1(false)} className="authentication-modal modal-dialog-centered modal-xl">
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={(e) => {
                    e.preventDefault();
                    setf1(false);
                }} />
                <div className="auth-modal-wrp">
                    <div className="auth-modal-content">
                        <div className="w-100">
                            <h2 style={{ fontSize: "2.5rem" }}>
                                Create Account
                            </h2>

                            <div className="auth-input-wrp">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setname(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="firstName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setCollegeName(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="lastName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"

                                            name="email"
                                            placeholder=""
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setEmail1(e.target.value);
                                            }}
                                        //value={email1}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Phone No.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobileNo"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setNumber(e.target.value);
                                            }}
                                            //value={number}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn auth-main-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setf1(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal>

            {/**************  Form 2**************** */}
            <Modal isOpen={f2} toggle={() => setf2(false)} className="authentication-modal modal-dialog-centered modal-xl">
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={(e) => {
                    e.preventDefault();
                    setf2(false);
                }} />
                <div className="auth-modal-wrp">



                    <div className="auth-modal-content">
                        <div className="w-100">
                            <h2 style={{ fontSize: "2.5rem" }}>
                                Create Account
                            </h2>

                            <div className="auth-input-wrp">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setname(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="firstName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setCollegeName(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="lastName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"

                                            name="email"
                                            placeholder=""
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setEmail1(e.target.value);
                                            }}
                                        //value={email1}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Phone No.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobileNo"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setNumber(e.target.value);
                                            }}
                                            //value={number}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn auth-main-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setf2(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal>

            {/**************  Form 2**************** */}
            <Modal isOpen={f3} toggle={() => setf3(false)} className="authentication-modal modal-dialog-centered modal-xl">
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={(e) => {
                    e.preventDefault();
                    setf3(false);
                }} />
                <div className="auth-modal-wrp">



                    <div className="auth-modal-content">
                        <div className="w-100">
                            <h2 style={{ fontSize: "2.5rem" }}>
                                Create Account
                            </h2>

                            <div className="auth-input-wrp">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setname(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="firstName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setCollegeName(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="lastName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"

                                            name="email"
                                            placeholder=""
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setEmail1(e.target.value);
                                            }}
                                        //value={email1}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Phone No.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobileNo"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setNumber(e.target.value);
                                            }}
                                            //value={number}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn auth-main-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setf3(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal>

            {/**************  Form 4**************** */}
            <Modal isOpen={f4} toggle={() => setf4(false)} className="authentication-modal modal-dialog-centered modal-xl" >
                <FontAwesomeIcon className='close-btn' icon={faClose} onClick={(e) => {
                    e.preventDefault();
                    setf4(false);
                }} />
                <div className="auth-modal-wrp">



                    <div className="auth-modal-content">
                        <div className="w-100">
                            <h2 style={{ fontSize: "2.5rem" }}>
                                Create Account
                            </h2>

                            <div className="auth-input-wrp">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label for="">First Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setname(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="firstName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={(e) => {
                                                //setCollegeName(e.target.value);
                                                console.log(e.target.value);
                                            }}
                                            className="form-control"
                                            name="lastName"
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Email Address</label>
                                        <input
                                            type="email"
                                            className="form-control"

                                            name="email"
                                            placeholder=""
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setEmail1(e.target.value);
                                            }}
                                        //value={email1}
                                        />
                                    </div>
                                    <div className="col-lg-12">
                                        <label for="">Phone No.</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="mobileNo"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setNumber(e.target.value);
                                            }}
                                            //value={number}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <label for="">Confirm Password</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            onChange={(e) => {
                                                e.preventDefault();
                                                //setPassword1(e.target.value);
                                            }}
                                            //value={password1}
                                            placeholder=""
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="btn auth-main-btn"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setf4(false);
                                    }}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>


                </div>
            </Modal>
        </>
    )
}

export default Navbar