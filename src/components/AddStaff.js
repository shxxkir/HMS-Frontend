import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/AddStaff.module.css';
import NavBar from './NavBar';

function AddStaff() {
    let navigate = useNavigate();

    const [sID, setSID] = useState("");
    const [name, setName] = useState("");
    const [nic, setNIC] = useState();
    const [role, setRole] = useState("");
    const [age, setAge] = useState();
    const [contact, setContact] = useState();

    const handleNICChange = (event) => {
        const ic = event.target.value
        if(!(/^\d{0,12}$/.test(ic))) {
            return alert('Invalid NIC')
        }
        else {
            setNIC(ic)
        }
    }

    const handleContactChange = (event) => {
        const number = event.target.value
        if (!(/^\d{0,10}$/.test(number))) {
            return alert('Invalid Phone Number')
        }
        else{
            setContact(number); 
        }
    }

    const handleAgeChange = (event) => {
        const number = event.target.value
        if(number < 1){
            return alert(`Age Can't Be a Negative Value. Please Enter the Correct Age`)
        }
        else{
            setAge(number); 
        }
    }

    async function addStaff(e) {
        e.preventDefault();

        const newStaff = {
            sID,
            name,
            nic,
            role,
            age,
            contact
        }

        await axios.post("http://localhost:5000/staffs",newStaff)
        .then(() => {
            alert("Staff Added Successfully");
            navigate('/staffs');
        })
        .catch(err => {
            alert(err);
        })
    }

    return (
        <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={addStaff}>
                <h2 className={css.addStaff}>Add Staff Details</h2>
                <input className={css.inp} type='text' placeholder="Enter Staff ID" value={sID} onChange={(e) => {setSID(e.target.value)}}/>
                <br/>
                <input className={css.inp} type='text' placeholder='Enter Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                <br/>
                <input 
                    type='text'
                    placeholder='NIC' 
                    className={css.inp} 
                    value={nic} 
                    maxLength={12}
                    pattern="[0-9]{12}"
                    onChange={handleNICChange} 
                    required/>
                <select className={css.inp} value={role} onChange={(e) => {setRole(e.target.value)}}>
                    <option selected hidden>Select Role</option>
                    <option>Doctor</option>
                    <option>Nurse</option>
                    <option>Receptionist</option>
                    <option>Pharmacist</option>      
                </select>
                <br/>
                <input className={css.inp} type='number' placeholder='Age' value={age} onChange={handleAgeChange}/>
                <br/>
                <input 
                        type='phone'
                        placeholder='Contact Number'
                        className={css.inp}
                        value={contact}
                        onChange={handleContactChange}
                        maxLength={10}
                        pattern="[0-9]{10}"
                        required/>                <br/>
                <button className={css.btn} type='submit'>ADD STAFF</button>
            </form>
        </div>
    )
}

export default AddStaff