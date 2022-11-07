import React, { useState } from 'react'
import Dashboard from './Dashboard'
import './Navbar.css'

const Navbar = () => {
    const [nav, setnav] = useState(1)
    const handleDash = (e) => {
        if (nav === 1)
            return (<Dashboard />)
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

export default Navbar