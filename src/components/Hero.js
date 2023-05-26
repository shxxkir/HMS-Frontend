import React from 'react'
import { Link } from 'react-router-dom';
import css from '../styles/Hero.module.css'
import { SlCalender } from "react-icons/sl";
import { CiMedicalCross } from "react-icons/ci";
import { SlLocationPin } from "react-icons/sl";
import { BsTelephone } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";

function Hero() {
  return (
    <div className={css.heroContainer}>
        <div className={css.heroRow}>
            <div className={css.heroCol}></div>
            <div className={css.heroCol1}>
                <h1>Welcome To MedCare</h1>
                <h2>The best way to find yourself is to lose yourself in the service of others</h2>
                <p>Our mission is to improve the health and well-being of the communities we serve, and we work tirelessly to achieve that goal every day.</p>
                <div className={css.heroImage}/>
            </div>
            <div className={css.heroCol2}>
                <Link to='/add-appointment'>
                    <button style={{width:'109%', marginLeft:'-15px'}} className={css.heroAppBtn}><SlCalender  className={css.hCalenderIcon} size={'1.5em'}/> Request Appointment<IoIosArrowForward  className={css.hArrowIcon1}/></button>
                </Link>
                <Link to='/staffs'>
                    <button style={{width:'109%', marginLeft:'-15px'}} className={css.heroDocBtn}><CiMedicalCross className={css.hDoctorIcon} size={'1.5em'}/> Find Doctors<IoIosArrowForward  className={css.hArrowIcon2}/></button>
                </Link>
                <button className={css.heroLocBtn}><SlLocationPin className={css.hLocationIcon} size={'1.5em'}/> 
                    Find Location
                <IoIosArrowForward  className={css.hArrowIcon3}/></button>
                <button className={css.heroConBtn}><BsTelephone  className={css.hContactIcon} size={'1.5em'}/> 
                    Emergency Contact
                <IoIosArrowForward  className={css.hArrowIcon4}/></button>
            </div>
        </div>
    </div>
)
}

export default Hero