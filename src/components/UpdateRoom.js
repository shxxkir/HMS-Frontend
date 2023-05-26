import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import css from '../styles/AddRoom.module.css';

function UpdateRoom() {
    let navigate = useNavigate();

    const [roomNo, setRoomNo] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [floorNo, setFloorNo] = useState();
    const [noOfBeds, setNoOfBeds] = useState();
    const [id, setID] = useState("");

    async function Update(e) {
        e.preventDefault();

        const updatedRoom = {
            roomNo,
            roomType,
            roomStatus,
            floorNo,
            noOfBeds
        }

        await axios.put(`http://localhost:5000/rooms/${id}`,updatedRoom)
        .then(() => {
            alert("Room Details Updated Successfully");
            navigate('/rooms');
            localStorage.clear();
        })
        .catch(err => {
            alert(err);
        })
    }

    useEffect(() => {
        setRoomNo(localStorage.getItem('roomNo'));
        setRoomType(localStorage.getItem('roomType'));
        setRoomStatus(localStorage.getItem('roomStatus'));
        setFloorNo(localStorage.getItem('floorNo'));
        setNoOfBeds(localStorage.getItem('noOfBeds'));
        setID(localStorage.getItem('id'));
    }, [])


  return (
    <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={Update}>
                <h2 className={css.addRoom}>Update Room Details</h2>
                <input className={css.inp} type='text' placeholder="Enter Room No"  value={roomNo} onChange={(e) => {setRoomNo(e.target.value)}}/>
                <br/>
                <div className={css.radio}>
                    <input type="radio" className={css.radio1} name="type" id="Basic" value="Basic" onChange={(e) => {setRoomType(e.target.value)}}/>
                    <label for="Basic" className={css.male}>Basic</label>
                    <input type="radio" className={css.radio1} name="type" id="Superior" value="Superior" onChange={(e) => {setRoomType(e.target.value)}}/>
                    <label for="Superior" className={css.female}>Superior</label>
                </div>
                <div className={css.radio}>
                    <input type="radio" className={css.radio1} name="status" id='Vacant' value="Vacant" onChange={(e) => {setRoomStatus(e.target.value)}}/>
                    <label for="Vacant" className={css.male} style={{top:'40%'}}>Vacant</label>
                    <input type="radio" className={css.radio1}name="status" id='Booked' value="Booked" onChange={(e) => {setRoomStatus(e.target.value)}}/>
                    <label for="Booked" className={css.female} style={{top:'40%'}}>Booked</label>
                </div>
                <select className={css.inp} value={floorNo} onChange={(e) => {setFloorNo(e.target.value)}}>
                    <option selected hidden>Floor No</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
                <br/>
                <button className={css.btn} type='submit'>UPDATE ROOM</button>
            </form>
        </div>
  )
}

export default UpdateRoom