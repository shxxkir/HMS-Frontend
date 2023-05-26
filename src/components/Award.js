import React from 'react'
import css from '../styles/Award.module.css'

function Award() {
  return (
    <div className={css.awardContainer}>
      <div className={css.awardRow}>
        <h1 className={css.wording}>We Are Certified Award Winning Hospital.</h1>
        <div className={css.allImg}>
          <div className={css.awardbgImg}></div>
          <div>
            <div className={css.awardImg1} />
            <div className={css.awardImg2}/>
            <div className={css.awardImg3}/>
          </div>  
        </div>
      </div>
    </div>
)
}

export default Award