import React from 'react'
import css from '../styles/EmergencyContact.module.css'

function EmergencyContact() {
  return (
    <div className={css.contactContainer}>
      <div className={css.contactRow}>
        <div className={css.contactH}>
            <h4>Emergency Hotline</h4>
            <h1>+ 94 78 123 4567</h1>
            <p>We provide 24/7 customer support. Please feel free to contact us <br/>for emergency case.</p>
            <div className={css.contactImage} />
        </div>
      </div>
    </div>
  )
}

export default EmergencyContact