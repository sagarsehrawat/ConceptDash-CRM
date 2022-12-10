import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import './Logistics.css'
import { useNavigate } from 'react-router-dom'
import Tables from '../../Tables/Tables'
import Shippers from '../../Shipper-Tables/Tables'
import Dashboard from './Dashboard'

const Logistics = () => {
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
        if (nav === 2)
            return (<Shippers/>)
        else if (nav === 3)
            return (<Tables category={"Shippers"}/>)
        // else if (nav === 4)
        //     return (<Form />)
    }

    return (
        <>
            <div class="s-layout">
                
                <main class="s-layout__content" >
                    {
                        handleDash()
                    }
                </main>
            </div>
        </>
    )
}

export default Logistics