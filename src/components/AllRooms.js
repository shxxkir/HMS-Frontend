import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { IoBed } from 'react-icons/io5';
import { ImFilePdf } from "react-icons/im";
import NavBar from './NavBar';
import css from '../styles/AllRooms.module.css'
import SearchBar from './SearchBar';

export default function AllRooms() {
    const[rooms, setRooms] = useState([]);
    let navigate = useNavigate();
    const pdf = useRef();

    const generatePDF = useReactToPrint({
        content: () => pdf.current,
        documentTitle: "Patient Data",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

    const getData = async () => {
        await axios.get("http://localhost:5000/rooms")
        .then((res) => {            
            setRooms(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/rooms/${id}`)
        .then(() => {
            alert("Room Details Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const handleSearch = async (searchTerm) => {
        const response = await axios.get(`http://localhost:5000/rooms?search=${searchTerm}`);
        setRooms(response.data);
    };

    useEffect(() => {
        getData();
    }, [])

    if(!rooms)
    return alert("No Rooms")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('roomNo', data.roomNo);
        localStorage.setItem('roomType', data.roomType);
        localStorage.setItem('roomStatus', data.roomStatus);
        localStorage.setItem('floorNo', data.floorNo);

        navigate('/update-room');
    }

    return(
        <div className={css.bgr}>
            {<NavBar/>}
            <div className={css.container1}>
                <Link to='/add-room'>
                    <button className={css.addNew}>Add New Room<div className={css.roomIcon}><IoBed/></div></button>
                </Link>
                <SearchBar onSearch={handleSearch} />
                <button className={css.pdf} onClick={generatePDF}>PDF<ImFilePdf className={css.pdfIcon}/></button>
                <div ref={pdf} style={{width:'100%'}}>
                <table className={css.table}>
                    <thead className={css.thead}>
                        <tr className={css.tr} style={{backgroundColor:'#162938',color:'white'}}>
                            <th className={css.th}>Room No</th>
                            <th className={css.th}>Room Type</th>
                            <th className={css.th}>Room Status</th>
                            <th className={css.th}>Floor No</th>
                            <th className={css.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody className={css.tbody}>
                        {rooms.map(room => (
                            <tr className={css.tr} key={room._id}>
                                <td className={css.td}>{room.roomNo}</td>
                                <td className={css.td}>{room.roomType}</td>
                                <td className={css.td}>{room.roomStatus}</td>
                                <td className={css.td}>{room.floorNo}</td>
                                <td className={css.td}>
                                    <button type='button' className={css.edit} onClick={() => onUpdate(room)}><FaEdit size={'1.7em'}/></button>
                                    &nbsp;
                                    <button type='button' className={css.delete} onClick={() => onDelete(room._id)}><MdDelete size={'1.7em'}/></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}