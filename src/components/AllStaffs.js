import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import { useReactToPrint } from 'react-to-print';
import { MdDelete } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { ImFilePdf } from "react-icons/im"; 
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import css from '../styles/AllStaffs.module.css';

function AllStaffs() {
    const[staffs, setStaffs] = useState([]);
    let navigate = useNavigate();
    const pdf = useRef();

    const generatePDF = useReactToPrint({
        content: () => pdf.current,
        documentTitle: "Staff Data",
        onAfterPrint: () => alert("Data Saved in PDF")
    });

    const getData = async () => {
        await axios.get("http://localhost:5000/staffs")
        .then((res) => {            
            setStaffs(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/staffs/${id}`)
        .then(() => {
            alert("Staff Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const handleSearch = async (searchTerm) => {
        const response = await axios.get(`http://localhost:5000/staffs?search=${searchTerm}`);
        setStaffs(response.data);
    };

    useEffect(() => {
        getData();
    }, [])

    if(!staffs)
    return alert("No Staffs")

    const onUpdate = (data) => {
        localStorage.setItem('id', data._id);
        localStorage.setItem('sID', data.sID);
        localStorage.setItem('name', data.name);
        localStorage.setItem('nic', data.nic);
        localStorage.setItem('role', data.role);
        localStorage.setItem('age', data.age);
        localStorage.setItem('contact', data.contact);

        navigate('/update-staff');
    }

    return (
    <div className={css.bgr}>
        {<NavBar/>}
        <div className={css.container1}>
            <Link to='/add-staff'>
                <button className={css.addNew}>Add New Staff<div className={css.staffIcon}><FaUserAlt/></div></button>
            </Link>
            <SearchBar onSearch={handleSearch}/>
            <button className={css.pdf} onClick={generatePDF}>PDF<ImFilePdf className={css.pdfIcon}/></button>
            <div ref={pdf} style={{width:'100%'}}>
            <table className={css.table}>
                <thead className={css.thead}>
                    <tr className={css.tr} style={{backgroundColor:'#162938',color:'white'}}>
                        <th className={css.th}>Staff ID</th> 
                        <th className={css.th}>Name</th> 
                        <th className={css.th}>NIC</th>
                        <th className={css.th}>Role</th>
                        <th className={css.th}>Age</th>
                        <th className={css.th}>Contact No</th>
                        <th className={css.th}>Action</th>
                    </tr>
                </thead>
                <tbody className={css.tbody}>
                    {staffs.map(staff => (
                        <tr className={css.tr} key={staff._id}>
                            <td className={css.td}>{staff.sID}</td>
                            <td className={css.td}>{staff.name}</td>
                            <td className={css.td}>{staff.nic}</td>
                            <td className={css.td}>{staff.role}</td>
                            <td className={css.td}>{staff.age}</td>
                            <td className={css.td}>{staff.contact}</td>
                            <td className={css.td}>    
                                <button className={css.edit} type='button' onClick={() => onUpdate(staff)}><FaEdit size={'1.7em'}/></button>
                                &nbsp;
                                <button className={css.delete} type='button' onClick={() => onDelete(staff._id)}><MdDelete size={'1.7em'}/></button>
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

export default AllStaffs