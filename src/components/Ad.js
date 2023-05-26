import React from 'react'
import { Link } from 'react-router-dom';
import css from '../styles/Ad.module.css'
import { FaGreaterThan } from "react-icons/fa";
import NavBar from './NavBar'

function Ad() {
  return (
      <div className={css.adWrap}>
        {<NavBar />}
        <div className={css.adRow}>
            <span className={css.adWording1}>TOTAL HEALTH CARE SOLUTION</span>
            <h1>Your Most Trusted <br/>Health Partner</h1>
            <p>We are proud to be a part of your healthcare journey and <br/>
            are committed to helping you achieve your health and wellness goals.</p>
            <Link to='/add-appointment'>
              <button className={css.appBtn}>MAKE APPOINTMENT<FaGreaterThan  className={css.arrowIcon}/></button>
            </Link>
        </div>
      </div>
  )
}

export default Ad