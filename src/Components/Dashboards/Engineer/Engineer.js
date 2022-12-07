import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Dashboard from './Dashboard'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Engineer() {
    const navigate = useNavigate()
    const [nav, setnav] = useState(1)

    const handleDash = (e) => {
        if (nav === 1)
            return (<Dashboard />)
        if (nav === 2)
            return ('')
        else if (nav === 3)
            return ('')
        else if (nav === 4)
            return ('')
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
                            <a class="s-sidebar__nav-link" href="" onClick={(e) => { e.preventDefault(); setnav(2) }}>
                                <em>Upcoming Projects</em>
                            </a>
                        </li>
                        <li>
                            <a class="s-sidebar__nav-link" href="" onClick={(e) => { e.preventDefault(); setnav(3) }}>
                                <em>Projects Completed</em>
                            </a>
                        </li>
                        <li>
                            <a class="s-sidebar__nav-link" href="" onClick={(e) => { e.preventDefault(); setnav(4) }}>
                                <em>Pending Projects</em>
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

            <main class="s-layout__content1" >
                {
                    handleDash()
                }
            </main>
        </div>
    </>
    )
}

export default Engineer