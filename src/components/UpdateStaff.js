import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/AddStaff.module.css';
import NavBar from './NavBar';

function UpdateStaff() {
    let navigate = useNavigate();
    
    const [sID, setSID] = useState("");
    const [name, setName] = useState("");
    const [nic, setNIC] = useState();
    const [role, setRole] = useState("");
    const [age, setAge] = useState();
    const [contact, setContact] = useState();
    const [id, setID] = useState("");

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

    async function Update(e) {
        e.preventDefault();

        const updatedStaff = {
            sID,
            name,
            nic,
            role,
            age,
            contact
        }

        await axios.put(`http://localhost:5000/staffs/${id}`,updatedStaff)
        .then(() => {
            alert("Staff Updated Successfully");
            navigate('/staffs');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setSID(localStorage.getItem('sID'));
        setName(localStorage.getItem('name'));
        setNIC(localStorage.getItem('nic'));
        setRole(localStorage.getItem('role'));
        setAge(localStorage.getItem('age'));
        setContact(localStorage.getItem('contact'));
        setID(localStorage.getItem('id'));
    }, [])

    return (
        <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={Update}>
                <h2 className={css.addStaff}>Update Staff Details</h2>
                <input className={css.inp} type='text' placeholder="Enter Staff ID" value={sID} onChange={(e) => {setSID(e.target.value)}}/>
                <br/>
                <input className={css.inp} type='text' placeholder='Enter Name' value={name} onChange={(e) => {setName(e.target.value)}}/>
                <br/>
                <input className={css.inp} type='text' placeholder='NIC' value={nic} onChange={handleNICChange}/>
                <br/>
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
                <button className={css.btn} type='submit'>UPDATE STAFF</button>
            </form>
        </div>
    )
}

export default UpdateStaff