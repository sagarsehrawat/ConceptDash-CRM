import React, { useState } from 'react'
import website from '../../../../Images/Website.svg';
import dollar from '../../../../Images/Dollar.svg';
import "./HeaderCards.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import UpdateCity from '../../forms/UpdateCity';

type Props = {
    city: City;
}

const HeaderCards = ({ city }: Props) => {
    const [showUpdate, setShowUpdate] = useState<boolean>(false);

    const clipWebsite = (str: string | null) => {
        if (str === null) return null;
        const newWebsite = str;
        return newWebsite.slice(0, 40) + "..."
    }

    return (
        <>
            <div className='d-flex flex-row' style={{ marginLeft: "32px", marginBottom: "20px", marginRight: "32px" }}>
                <div className='header-card header-card-long w-100 d-flex justify-content-between
                ' style={{ "padding": "24px 24px 24px 24px" }}>
                    <div className='d-flex flex-column justify-content-between w-100'>
                        <div className='d-flex flex-row justify-content-between w-100'>
                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={website} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>City Website</p>
                                    <a className='header-card-link' href={city.website} target="_blank" rel="noreferrer">{clipWebsite(city.website) ?? "-"}</a>
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={website} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>2023 Budget Website</p>
                                    <a className='header-card-link' href={city.website_23} target="_blank" rel="noreferrer">{clipWebsite(city.website_23) ?? "-"}</a>
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={website} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>2024 Budget Website</p>
                                    <a className='header-card-link' href={city.website_24} target="_blank" rel="noreferrer">{clipWebsite(city.website_24) ?? "-"}</a>
                                </div>
                            </div>
                        </div>

                        <div className='d-flex flex-row justify-content-between w-100'>
                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={dollar} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>2023 Budget Status</p>
                                    <p className='header-card-subheading-2'>{city.year_22}</p>
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={dollar} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>2024 Budget Status</p>
                                    <a className='header-card-link' href={city.website_24} target="_blank" rel="noreferrer">{city.year_24}</a>
                                </div>
                            </div>

                            <div className='d-flex flex-row justify-content-center align-items-center header-child-container'>
                                <div style={{ width: "32px", height: "32px", background: "#F3F3F4", borderRadius: "50%" }} className='d-flex justify-content-center align-items-center'>
                                    <img src={dollar} alt="Website Icon" />
                                </div>
                                <div className='d-flex flex-column' style={{ marginLeft: "8px" }}>
                                    <p className='header-card-heading'>Remarks</p>
                                    <a className='header-card-link' href={city.website_23} target="_blank" rel="noreferrer">{city.remarks ?? "-"}</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <FontAwesomeIcon icon={faPencil} color="#70757A" style={{ cursor: "pointer", display: "inline" }} onClick={() => setShowUpdate(true)} />
                </div>
            </div>

            <div className='header-line'></div>

            <p className='heading-2' style={{ marginLeft: "32px" }}>Projects in {city.city}</p>

            {
                showUpdate && <UpdateCity show={showUpdate} onHide={() => setShowUpdate(false)} city={city}/>
            }
        </>
    )
}

export default HeaderCards