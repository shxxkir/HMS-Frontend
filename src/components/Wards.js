import React, {useState, useEffect, useRef} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { FaEdit,FaBed } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ImFilePdf } from "react-icons/im"; 
import css from '../styles/Wards.module.css';
import NavBar from './NavBar';
import SearchBar from './SearchBar';

function Wards() {
  const[wards, setWards] = useState([]);
  let navigate = useNavigate();
  const pdf = useRef();

  const generatePDF = useReactToPrint({
      content: () => pdf.current,
      documentTitle: "Ward Data",
      onAfterPrint: () => alert("Data Saved in PDF")
  });

  const getData = async () => {
      await axios.get("http://localhost:5000/wards")
      .then((res) => {            
        setWards(res.data)
      })
      .catch((err) => {
        alert(err.message);
      })
  }

  const onDelete = async (id) => {
      await axios.delete(`http://localhost:5000/wards/${id}`)
      .then(() => {
          alert("Ward Details Deleted Successfully")
          getData();
      })
      .catch((err) => {
          alert(err.message);
      })
  }

  const handleSearch = async (searchTerm) => {
      const response = await axios.get(`http://localhost:5000/wards?search=${searchTerm}`);
      setWards(response.data);
  };

  useEffect(() => {
      getData();
  }, [])

  if(!wards)
  return alert("No Patients")

  const onUpdate = (data) => {
      localStorage.setItem('id', data._id);
      localStorage.setItem('roomNo', data.roomNo);
      localStorage.setItem('patientName', data.patientName);
      localStorage.setItem('nurseName', data.nurseName);
      localStorage.setItem('disease', data.disease);
      localStorage.setItem('admitDate', data.admitDate);

      navigate('/update-ward');
  }

  return(
    <div className={css.bgr}>
        {<NavBar/>}
        <div className={css.container1}>
            <Link to='/add-ward'>
                <button className={css.addNew}>Add New Ward<div className={css.bedIcon}><FaBed/></div></button>
            </Link>
            <SearchBar onSearch={handleSearch} />
            <button className={css.pdf} onClick={generatePDF}>PDF<ImFilePdf className={css.pdfIcon}/></button>
            <div ref={pdf} style={{width:'100%'}}>
                <table className={css.table}>
                    <thead className={css.thead}>
                        <tr className={css.tr} style={{backgroundColor:'#162938',color:'white'}}>
                            <th className={css.th}>Room No</th> 
                            <th className={css.th}>Patient Name</th>
                            <th className={css.th}>Nurse in Charge</th>
                            <th className={css.th}>Disease</th>
                            <th className={css.th}>Admitted Date</th>
                            <th className={css.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody className={css.tbody}>
                        {wards.map(ward => (
                            <tr className={css.tr} key={ward._id}>
                                <td className={css.td}>{ward.roomNo}</td>
                                <td className={css.td}>{ward.patientName}</td>
                                <td className={css.td}>{ward.nurseName}</td>
                                <td className={css.td}>{ward.disease}</td>
                                <td className={css.td}>{new Date(ward.admitDate).toISOString().slice(0,10)}</td>
                                <td className={css.td}>    
                                    <button type='button' className={css.edit} onClick={() => onUpdate(ward)}><FaEdit size={'1.7em'}/></button>
                                    &nbsp;
                                    <button type='button' className={css.delete} onClick={() => onDelete(ward._id)}><MdDelete size={'1.7em'}/></button>
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

export default Wards