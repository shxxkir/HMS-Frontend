import React, {useState} from 'react'
import axios from 'axios';
import css from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
// import img from '../images/Home.jpg';
import NavBar from './NavBar';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function login(e) {
        e.preventDefault();

        const user = {
            email,
            password
        }

        await axios.post("http://localhost:5000/user/login",user)
        .then(() => {
            alert("User Logged Successfully");
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div className={css.bgr}>
            {<NavBar/>}
            <div className={css.wrapper}>
                {/* <span className={css.icon_close}><ion-icon name="close"></ion-icon></span> */}
                <div className={css.form_box}>
                    <h2>Login</h2>
                    <form onSubmit={login}>
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
                                <label><input type="checkbox"/>Remember me</label>
                                <Link>Forgot Password?</Link>
                            </div>
                            <button type="submit" className={css.btn}>Login</button>
                            <div className={css.login_register}>
                                <p>Don't have an account?<Link to='/register' className={css.login_link}> Register</Link></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login