import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/AddAppointment.module.css';
import NavBar from './NavBar';

function UpdateAppointment() {
    let navigate = useNavigate();

    const [appNo, setAppNo] = useState("");
    const [patientName, setPatientName] = useState("");
    const [doctorName, setDoctorName] = useState("");
    const [dateTime, setDateTime] = useState("");
    const [venue, setVenue] = useState("");
    const [id, setID] = useState("");

    const[patients, setPatients] = useState([]);
    const[doctors, setDoctors] = useState([]);

    const handleDateChange = (event) => {
        const selectedDate = new Date(event.target.value);
        const today = new Date();
        if (selectedDate <= today) {
            return alert('Please Select a Future Date')
        } 
        setDateTime(event.target.value);
    }

    const getPatientName = async () => {
        await axios.get("http://localhost:5000/patients")
        .then((res) => {            
            setPatients(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const getDoctorName = async () => {
        await axios.get(`http://localhost:5000/staffs?search=doctor`)
        .then((res) => {            
            setDoctors(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    async function Update(e) {
        e.preventDefault();

        const updatedAppointment = {
            appNo,
            patientName,
            doctorName,
            dateTime,
            venue
        }

        await axios.put(`http://localhost:5000/appointments/${id}`,updatedAppointment)
        .then(() => {
            alert("Appointment Details Updated Successfully");
            navigate('/appointments');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setAppNo(localStorage.getItem('appNo'));
        setPatientName(localStorage.getItem('patientName'));
        setDoctorName(localStorage.getItem('doctorName'));
        setDateTime(new Date(localStorage.getItem('dateTime')).toISOString().slice(0,16));
        setVenue(localStorage.getItem('venue'));
        setID(localStorage.getItem('id'));
        getPatientName();
        getDoctorName();
    }, [])

    return (
        <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={Update}>
                <h2 className={css.app}>Update Appointment</h2>
                <input className={css.inp} type='text' placeholder="Enter Appointment No" value={appNo} onChange={(e) => {setAppNo(e.target.value)}}/>
                <br/>
                <select className={css.inp} value={patientName} onChange={(e) => {setPatientName(e.target.value)}}>
                    <option selected hidden>Patient Name</option>
                    {patients.map(patient => (
                        <option>{patient.name}</option>
                    ))}
                </select>
                <br/>
                <select className={css.inp} value={doctorName} onChange={(e) => {setDoctorName(e.target.value)}}>
                    <option selected hidden>Doctor Name</option>
                    {doctors.map(doctor => (
                        <option>{doctor.name}</option>
                    ))}
                </select>
                <br/>
                <input className={css.inp} type="datetime-local" placeholder="Date & Time" value={dateTime} onChange={handleDateChange}/>
                <br/>
                <select className={css.inp} value={venue} onChange={(e) => {setVenue(e.target.value)}}>
                    <option selected hidden>Venue</option>
                    <option>A401</option>
                    <option>F602</option>
                    <option>G505</option>
                    <option>F303</option>
                </select>
                <br/>
                <button className={css.btn} type='submit'>UPDATE APPOINTMENT</button>
            </form>
        </div>
    )
}

export default UpdateAppointment