import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { ImFilePdf } from "react-icons/im"; 
import css from '../styles/AllPatients.module.css';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function AllPatients() {
    const[patients, setPatients] = useState([]);
    let navigate = useNavigate();
    const pdf = useRef();

    const handlePrintPDF = () => {
        const input = document.getElementById('table');

        html2canvas(input, { scrollY: -window.scrollY }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            
            // Add header content
            const headerText = 'Table Header';
            pdf.setFontSize(16);
            pdf.text(headerText, 10, 10);
      
            // Add table content
            pdf.addImage(imgData, 'PNG', 10, 20);
            
            pdf.save('table.pdf');
          });

    }

    const generatePDF = useReactToPrint({
        content: () => pdf.current,
        documentTitle: "Patient Data",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

    const getData = async () => {
        await axios.get("http://localhost:5000/patients")
        .then((res) => {            
            setPatients(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/patients/${id}`)
        .then(() => {
            alert("Patient Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const handleSearch = async (searchTerm) => {
        const response = await axios.get(`http://localhost:5000/patients?search=${searchTerm}`);
        setPatients(response.data);
    };

    useEffect(() => {
        getData();
    }, [])

    if(!patients)
    return alert("No Patients")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('name', data.name);
        localStorage.setItem('nic', data.nic);
        localStorage.setItem('dob', data.dob);
        localStorage.setItem('gender', data.gender);
        localStorage.setItem('group', data.group);
        localStorage.setItem('contact', data.contact);

        navigate('/update-patient');
    }

    return(
        <div className={css.bgr}>
            {<NavBar/>}
            <div className={css.container1}>
                <Link to='/add-patient'>
                    <button className={css.addNew}>Add New Patient<div className={css.patientIcon}><FaUserAlt/></div></button>
                </Link>
                <SearchBar onSearch={handleSearch} />
                <button className={css.pdf} onClick={generatePDF}>PDF<ImFilePdf className={css.pdfIcon}/></button>
                <div ref={pdf} style={{width:'100%'}}>
                    <table className={css.table} id="table">
                        <thead className={css.thead}>
                            <tr className={css.tr} style={{backgroundColor:'#162938',color:'white'}}>
                                <th className={css.th}>Name</th> 
                                <th className={css.th}>NIC</th>
                                <th className={css.th}>Date of Birth</th>
                                <th className={css.th}>Gender</th>
                                <th className={css.th}>Blood Group</th>
                                <th className={css.th}>Contact No</th>
                                <th className={css.th}>Action</th>
                            </tr>
                        </thead>
                        <tbody className={css.tbody}>
                            {patients.map(patient => (
                                <tr className={css.tr} key={patient._id}>
                                    <td className={css.td}>{patient.name}</td>
                                    <td className={css.td}>{patient.nic}</td>
                                    <td className={css.td}>{new Date(patient.dob).toISOString().slice(0,10)}</td>
                                    <td className={css.td}>{patient.gender}</td>
                                    <td className={css.td}>{patient.group}</td>
                                    <td className={css.td}>{patient.contact}</td>
                                    <td className={css.td}>    
                                        <button type='button' className={css.edit} onClick={() => onUpdate(patient)}><FaEdit size={'1.7em'}/></button>
                                        &nbsp;
                                        <button type='button' className={css.delete} onClick={() => onDelete(patient._id)}><MdDelete size={'1.7em'}/></button>
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
