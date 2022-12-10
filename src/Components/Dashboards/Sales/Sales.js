import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'

const Sales = () => {
    const navigate = useNavigate()
    const [nav, setnav] = useState(1)
    const toggleNav = (e) => {
        e.preventDefault()
        if (document.getElementById("sidenav").style.width === "15em") {
            document.getElementById("sidenav").style.width = "0em";
        } else {
            document.getElementById("sidenav").style.width = "15em";
        }
    }

    const handleDash = (e) => {
        if (nav === 1)
            return (<Dashboard />)
    }

    return (
        <>
            <div class="s-layout">
                {/* <div class="s-layout__sidebar">
                    <a class="s-sidebar__trigger" href="#0" onClick={toggleNav}>
                        <FontAwesomeIcon icon={faBars} style={{ color: "white", fontSize: "32px", marginLeft: "20px", marginTop: "15px" }} />
                    </a>

                    <nav class="s-sidebar__nav" id="sidenav">
                        <ul>
                            <li>
                                <a class="s-sidebar__nav-link" href="" onClick={(e) => { e.preventDefault(); setnav(1) }} >
                                    <em>Dashboard</em>
                                </a>
                            </li>
                            <li>
                                <a class="s-sidebar__nav-link" href="" onClick={() => navigate('/')}>
                                    <em>Logout</em>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div> */}

                <main class="s-layout__content" >
                    {
                        handleDash()
                    }
                </main>
            </div>
        </>
    )
}

export default Sales