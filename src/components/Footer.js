import React from "react";
import '../styles/Footer.css'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { CiLocationOn } from "react-icons/ci";
import { BsTelephoneForward } from "react-icons/bs";
import { BsHeartPulse } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

const Footer=()=>{
    return(
        <div className="footer">
            <div className="section__padding">
                <div className="sb__footer-links">
                    <div className="sb__footer-links-div">
                        <h2 style={{marginLeft:`15px`, marginTop:`10px`,marginBottom:`6px`,fontSize:`30px`}}><BsHeartPulse className="heartIcon" size={'1.5em'}/> MedCare</h2>
                            <p style={{marginLeft:`15px`,textAlign:`justify`,fontSize:`20px`, lineHeight:`1.2`,marginTop:`18px`, marginBottom:`30px`}}>MedCare Hospital is a private hospital committed to delivering exceptional healthcare across a range of specialities for more than 50 years.</p>
                            <div>
                            <CiLocationOn className="locIcon" size={'1.2em'}/> 
                            <p style={{textIndent:`48px`, marginTop:`2px`}}> 89, Colombo 5, Sri Lanka</p>
                            </div>
                            <div>
                            <BsTelephoneForward className="numIcon" size={'1.2em'}/>
                            <p style={{textIndent:`48px`}}> + 94 78 123 4567</p>
                            </div>
                            <div>
                            <HiOutlineMail className="mailIcon" size={'1.2em'}/>
                            <p style={{textIndent:`48px`}}>medcare@gmail.com</p>
                            </div>
                    </div>
                    <div className="sb__footer-links-div">
                    <h2 style={{marginLeft:`90px`}}>E-Services</h2>
                    <hr className="headerLine2"/>
                        <div className="service">
                            <p>Lab Reports</p>
                            <p>Consultation / Booking</p>
                            <p>Consultation Room Status</p>
                            <p>Payment Portal</p>
                        </div>
                    </div>                   
                    <div className="sb__footer-links-div">
                    <h2 style={{marginLeft:`85px`}}>Useful Links</h2>
                    <hr className="headerLine3"/>
                    <div className="usefulLinks">
                            <p>Your Account</p>
                            <p>Medical Services</p>
                            <p>International Patients</p>
                            <p>Insurance</p>
                            <p>Help</p>
                    </div>
                    </div>
                    <div className="sb__footer-links-div">
                    <h2 style={{marginLeft:`30px`}}>FAQ</h2>
                    <hr className="headerLine4"/>
                        <div className="faq">
                            <p>Can I request a copy of my MRI Online?</p>
                            <p>What if I don’t have insurance?</p>
                            <p>Accepting Insurance Cards?</p>
                        </div>
                    </div>        
                </div>
                <hr className="headerLine"/>
                <div className="sb__footer-below">
                    <div className="sb__footer-copyright">
                        <p style={{marginTop:`10px`}}>
                            @{new Date().getFullYear} MedCare. All Rights Reserved.
                        </p>
                    </div>
                    <div className="sb__footer-links-div">
                        <div className="socialmedia">
                            <p style={{margin:`10px`,marginTop:`0`}}><FacebookIcon style={{ fontSize: 40 }}/></p>
                            <p style={{margin:`10px`,marginTop:`0`}}><WhatsAppIcon style={{ fontSize: 40 }}/></p>
                            <p style={{margin:`10px`,marginTop:`0`}}><LinkedInIcon style={{ fontSize: 40 }}/></p>
                            <p style={{margin:`10px`,marginTop:`0`}}><InstagramIcon style={{ fontSize: 40 }}/></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;