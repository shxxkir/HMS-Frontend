import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import css from '../styles/AddRoom.module.css';

export default function AddRoom(){
    let navigate = useNavigate();

    const [roomNo, setRoomNo] = useState("");
    const [roomType, setRoomType] = useState("");
    const [roomStatus, setRoomStatus] = useState("");
    const [floorNo, setFloorNo] = useState();

    async function addRoom(e) {
        e.preventDefault();
        
        const newRoom = {
            roomNo,
            roomType,
            roomStatus,
            floorNo
        }

        await axios.post("http://localhost:5000/rooms",newRoom)
        .then(() => {
            alert("Room Details Added Successfully");
            navigate('/rooms');
        })
        .catch(err => {
            alert(err);
        })
    }

    return(
        <div className={css.bgr}>
            {<NavBar/>}
            <form className={css.form} onSubmit={addRoom}>
                <h2 className={css.addRoom}>Add Room Details</h2>
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
                <button className={css.btn} type='submit'>ADD ROOM</button>
            </form>
        </div>
    )
}