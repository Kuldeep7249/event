import React from 'react'
import styles from '../styles/Navbar.module.css'
import { useState } from 'react';
import Register from './Register';
const Navbar = () => {
    const [register, setRegister] = useState(false);

    const handleOpen = () =>{
        setRegister(true);
    }
    return (
        <>
            <div>
                <div className={styles.container}>

                    <div className={styles.logo}>
                        <span className={styles.logo_text}>MVX</span>
                    </div>
                    <div className={styles.menulink}>
                        <span>Home</span>
                        <span>About Us</span>
                        <span>Event Organisers</span>
                    </div>
                    <div className={styles.notified}>
                        <button onClick={handleOpen}>Get Notified with the events</button>
                    </div>
                </div>

            </div>

            {register && <Register/>}
        </>
    )
}

export default Navbar