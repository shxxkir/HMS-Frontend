import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/WardForm.module.css';
import NavBar from './NavBar';

function UpdateWard() {
    let navigate = useNavigate();

    const [roomNo, setRoomNo] = useState("");
    const [patientName, setPatientName] = useState("");
    const [nurseName, setNurseName] = useState("");
    const [disease, setDisease] = useState("");
    const [admitDate, setAdmitDate] = useState("");
    const [id, setID] = useState("");
    
    const[patients, setPatients] = useState([]);
    const[nurses, setNurses] = useState([]);
    const[rooms, setRooms] = useState([]);

    const handleDateChange = (event) => {
      const selectedDate = new Date(event.target.value);
      const today = new Date();
      if (selectedDate >= today) {
          return alert('Cannot Select a Future Date')
      } 
      setAdmitDate(event.target.value);
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

    const getNurseName = async () => {
        await axios.get(`http://localhost:5000/staffs?search=nurse`)
        .then((res) => {            
            setNurses(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const getRoom = async () => {
        await axios.get(`http://localhost:5000/rooms?search=vacant`)
        .then((res) => {            
            setRooms(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    async function Update(e) {
        e.preventDefault();

        const updatedDetails = {
            roomNo,
            patientName,
            nurseName,
            disease,
            admitDate
        }

        await axios.put(`http://localhost:5000/wards/${id}`,updatedDetails)
        .then(() => {
            alert("Ward Details Updated Successfully");
            navigate('/wards');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setRoomNo(localStorage.getItem('roomNo'));
        setPatientName(localStorage.getItem('patientName'));
        setNurseName(localStorage.getItem('nurseName'));
        setDisease(localStorage.getItem('disease'));
        setAdmitDate(new Date(localStorage.getItem('admitDate')).toISOString().slice(0,10));
        setID(localStorage.getItem('id'));
        getPatientName();
        getNurseName();
        getRoom();
    }, [])

    return (
        <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={Update}>
              <h2 className={css.heading}>Update Ward Details</h2>
              <select value={roomNo} className={css.inp} onChange={(e) => {setRoomNo(e.target.value)}} required>
                <option selected hidden>Room No</option>
                {rooms.map(room => (
                  <option>{room.roomNo}</option>
                ))}
              </select>
              <br/>
              <select value={patientName} className={css.inp} onChange={(e) => {setPatientName(e.target.value)}} required>
                <option selected hidden>Patient Name</option>
                {patients.map(patient => (
                  <option>{patient.name}</option>
                ))}
              </select>
              <br/>
              <select value={nurseName} className={css.inp} onChange={(e) => {setNurseName(e.target.value)}} required>
                <option selected hidden>Nurse Name</option>
                {nurses.map(nurse => (
                  <option>{nurse.name}</option>
                ))}
              </select>
              <br/>
              <select className={css.inp} value={disease} onChange={(e) => {setDisease(e.target.value)}} required>
                <option selected hidden>Disease</option>
                <option>Cancer</option>                    
                <option>Pneumonia</option>                    
                <option>Diabetes</option>                    
                <option>Stroke</option>                    
                <option>Dermatosis</option>                 
                <option>Accident</option>                 
              </select>
              <br/>
              <input type="date" placeholder="Admitted Date" className={css.inp} value={admitDate} onChange={handleDateChange} required/>
              <br/>
              <button type='submit' className={css.btn}>UPDATE WARD DETAILS</button>
            </form>   
        </div>
    )
}

export default UpdateWard