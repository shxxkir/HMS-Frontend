import React, {useState} from 'react';
import axios from 'axios';
import css from '../styles/Register.module.css';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function register(e) {
        e.preventDefault();

        const newUser = {
            name,
            email,
            password
        }

        await axios.post("http://localhost:5000/user/register",newUser)
        .then(() => {
            alert("User Registered Successfully");
        })
        .catch(err => {
            alert(err);
        })
    }

    return(
        <div className={css.bgr}>
            {<NavBar/>}
            <div className={css.wrapper}>
                {/* <span className={css.icon_close}><ion-icon name="close"></ion-icon></span> */}
                <div className={css.form_box}>
                    <h2>Registration </h2>
                    <form onSubmit={register}>
                        <div className={css.input_box}>
                            <span className ={css.icon}><ion-icon name="person"></ion-icon>
                            </span>
                            <input type={css.text} required onChange={(e) => {setName(e.target.value)}}/>
                            <label>Name</label>
                        </div>
                        <div className={css.input_box}>
                            <span className ={css.icon}><ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required onChange={(e) => {setEmail(e.target.value)}}/>
                            <label>Email</label>
                        </div>
                        <div className={css.input_box}> 
                            <span className ={css.icon}><ion-icon name="lock-closed"></ion-icon></span>
                            <input type="Password" required onChange={(e) => {setPassword(e.target.value)}}/>
                            <label>Password</label>
                        </div>
                        <div>
                            <div className={css.remember_forgot}>
                                <label><input type="checkbox"/> I agree to the terms & conditions</label>
                            </div>
                            <button type="submit" className={css.btn}>Register</button>
                            <div className={css.login_register}>
                                <p>Already have an account?<Link to='/login' className={css.login_link}> Login</Link></p>
                            </div> 
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}