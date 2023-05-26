import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import css from '../styles/NavBar.module.css';

function NavBar() {
    let navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }

    return (
        <div className={css.body}>
            <Link to='/' className={css.logo}>MedCare</Link>
            <nav className={css.navigation}>
                <Link to='/patients'>Patients</Link>
                <Link to='/staffs'>Staffs</Link>
                <Link to='/appointments'>Appointments</Link>
                <Link to='/rooms'>Rooms</Link>
                <Link to='/wards'>Wards</Link>
                <button className ={css.btnLogin_popup} onClick={handleClick}>Login</button>
            </nav>            
        </div>
    )
}

export default NavBar;