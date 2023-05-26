import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/AddPatient.module.css';
import NavBar from './NavBar';

export default function UpdatePatient() {
    let navigate = useNavigate();
    
    const [name, setName] = useState("");
    const [nic, setNIC] = useState();
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [group, setGroup] = useState("");
    const [contact, setContact] = useState();
    const [id, setID] = useState("");
    
    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value).toISOString().slice(0, 10);
        const today = new Date().toISOString().slice(0, 10);
        if (selectedDate >= today) {
            return alert('Cannot Select a Future Date')
        } 
        setDOB(event.target.value);
    }

    const handleContactChange = (event) => {
        const number = event.target.value
        if (!(/^\d{0,10}$/.test(number))) {
            return alert('Invalid Phone Number')
        }
        setContact(number);   
    }

    const handleNICChange = (event) => {
        const ic = event.target.value
        if(!(/^\d{0,12}$/.test(ic))) {
            return alert('Invalid NIC')
        }
        else {
            setNIC(ic)
        }
    }

    async function Update(e) {
        e.preventDefault();

        const updatedPatient = {
            name,
            nic,
            dob,
            gender,
            group,
            contact
        }

        await axios.put(`http://localhost:5000/patients/${id}`,updatedPatient)
        .then(() => {
            alert("Patient Updated Successfully");
            navigate('/patients');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setName(localStorage.getItem('name'));
        setNIC(localStorage.getItem('nic'));
        setDOB(new Date(localStorage.getItem('dob')).toISOString().slice(0,10));
        setGender(localStorage.getItem('gender'));
        setGroup(localStorage.getItem('group'));
        setContact(localStorage.getItem('contact'));
        setID(localStorage.getItem('id'));
    }, [])

    return (
        <div className={css.bgr}>
            {<NavBar/>}
                <form className={css.form} onSubmit={Update}>
                    <h2 className={css.app_form}>Update Form</h2>
                    <input type='text' placeholder="Enter Name" className={css.inp} value={name} onChange={(e) => {setName(e.target.value)}} required/>
                    <br/>
                    <input type='text' placeholder='NIC' className={css.inp} value={nic} onChange={handleNICChange} required/>
                    <br/>
                    <input type="date" placeholder="Date Of Birth" className={css.inp} value={dob} onChange={handleDateChange} required/>
                    <div className={css.radio}>
                        <input type="radio" name="gender" id="Male" className={css.radio1} value="Male" checked={gender ===  'Male'} onChange={(e) => {setGender(e.target.value)}} required/>
                        <label for="Male" className={css.male}>Male</label>
                        <input type="radio" name="gender" id="Female" className={css.radio1} value="Female" checked={gender ===  'Female'} onChange={(e) => {setGender(e.target.value)}} required/>
                        <label for="Female" className={css.female}>Female</label>
                    </div>
                    <select className={css.inp} value={group} onChange={(e) => {setGroup(e.target.value)}} required>
                        <option selected hidden>Blood Group</option>
                        <option>AB+</option>
                        <option>AB-</option>
                        <option>A+</option>
                        <option>A-</option>
                        <option>B+</option>
                        <option>B-</option>
                        <option>O+</option>
                        <option>O-</option>      
                    </select>
                    <br/>
                    <input 
                        type='phone'
                        placeholder='Contact Number'
                        className={css.inp}
                        value={contact}
                        onChange={handleContactChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required/>
                    <br/>
                    <button type='submit' className={css.btn}>UPDATE PATIENT</button>
                </form>   
        </div>
    )
}