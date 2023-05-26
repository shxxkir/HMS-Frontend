import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete, MdMeetingRoom } from 'react-icons/md';
import { ImFilePdf } from "react-icons/im"; 
import NavBar from './NavBar';
import css from '../styles/AllAppointments.module.css';
import SearchBar from './SearchBar';

function AllAppointments() {
    const[appointments, setAppointments] = useState([]);
    let navigate = useNavigate();
    const pdf = useRef();

    const generatePDF = useReactToPrint({
        content: () => pdf.current,
        documentTitle: "Appointment Data",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

    const getData = async () => {
        await axios.get("http://localhost:5000/appointments")
        .then((res) => {            
            setAppointments(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/appointments/${id}`)
        .then(() => {
            alert("Appointment Details Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const handleSearch = async (searchTerm) => {
        const response = await axios.get(`http://localhost:5000/appointments?search=${searchTerm}`);
        setAppointments(response.data);
    };

    useEffect(() => {
        getData();
    }, [])

    if(!appointments)
    return alert("No Appointments")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('appNo', data.appNo);
        localStorage.setItem('patientName', data.patientName);
        localStorage.setItem('doctorName', data.doctorName);
        localStorage.setItem('dateTime', data.dateTime);
        localStorage.setItem('venue', data.venue);

        navigate('/update-appointment');
    }

    return (
        <div className={css.bgr}>
        {<NavBar/>}
        <div className={css.container1}>
            <Link to='/add-appointment'>
                <button className={css.addNew}>Add New Appointment<div className={css.appIcon}><MdMeetingRoom/></div></button>
            </Link>
            <SearchBar onSearch={handleSearch}/>
            <button className={css.pdf} onClick={generatePDF}>PDF<ImFilePdf className={css.pdfIcon}/></button>
            <div ref={pdf} style={{width:'100%'}}>
            <table className={css.table}>
                <thead className={css.thead}>
                    <tr className={css.tr} style={{backgroundColor:'#162938',color:'white'}}>
                        <th className={css.th}>Appointment No</th> 
                        <th className={css.th}>Patient Name</th> 
                        <th className={css.th}>Doctor Name</th>
                        <th className={css.th}>Date</th>
                        <th className={css.th}>Time</th>
                        <th className={css.th}>Venue</th>
                        <th className={css.th}>Action</th>
                    </tr>
                </thead>
                <tbody className={css.tbody}>
                    {appointments.map(appointment => (
                        <tr className={css.tr} key={appointment._id}>
                            <td className={css.td}>{appointment.appNo}</td>
                            <td className={css.td}>{appointment.patientName}</td>
                            <td className={css.td}>{appointment.doctorName}</td>
                            <td className={css.td}>{new Date(appointment.dateTime).toISOString().slice(0,10)}</td>
                            <td className={css.td}>{new Date(appointment.dateTime).toISOString().slice(11,16)}</td>
                            <td className={css.td}>{appointment.venue}</td>
                            <td className={css.td}>    
                                <button type='button' className={css.edit} onClick={() => onUpdate(appointment)}><FaEdit size={'1.7em'}/></button>
                                &nbsp;
                                <button type='button' className={css.delete} onClick={() => onDelete(appointment._id)}><MdDelete size={'1.7em'}/></button>
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

export default AllAppointments