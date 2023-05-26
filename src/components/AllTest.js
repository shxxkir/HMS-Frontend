import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { FaEdit } from 'react-icons/fa';
//import { MdDelete } from 'react-icons/md';
//import { FaUserAlt } from 'react-icons/fa';
import css from '../styles/AllTest.module.css'
 
export default function AllTest() {
    const[test, setTest] = useState([]);
    let navigate = useNavigate();
    
    const getData = async () => {
        await axios.get("http://localhost:5000/test")
        .then((res) => {            
            setTest(res.data)
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    const onDelete = async (id) => {
        await axios.delete(`http://localhost:5000/test/${id}`)
        .then(() => {
            alert("Test Deleted Successfully")
            getData();
        })
        .catch((err) => {
            alert(err.message);
        })
    }

    useEffect(() => {
        getData();
    }, [])

    if(!test)
    return alert("No Test")

    const onUpdate = (data) => {
        localStorage.setItem('testId',data.testId);
        localStorage.setItem('testName',data.testName);
        localStorage.setItem('patient',data.patient);
        localStorage.setItem('priority',data.priority);
        localStorage.setItem('status',data.status);

        navigate('/update-test');
    }

  return (
    <table className={css.tab}>
        <thead>
          <tr >
            <th className={css.tabH}>TestID</th>
            <th className={css.tabH}>TestName</th>
            <th className={css.tabH}>Patient Name</th>
            <th className={css.tabH}>Priority</th>
            <th className={css.tabH}>Status</th>
            <th className={css.tabH}>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={css.tabD}>T100</td>
            <td className={css.tabD}>ECG</td>
            <td className={css.tabD}>Saseena</td>
            <td className={css.tabD}>Emergency</td>
            <td className={css.tabD}>in_progress</td>
            <td>
              <button className={css.tdb}>Delete</button>
              <button className={css.tdb}>Update</button>
            </td>
          </tr> 
          <tr>
            <td className={css.tabD}>T100</td>
            <td className={css.tabD}>ECG</td>
            <td className={css.tabD}>leela</td>
            <td className={css.tabD}>Emergency</td>
            <td className={css.tabD}>in_progress</td>
            <td>
              <button className={css.tdb}>Delete</button>
              <button className={css.tdb}>Update</button>
            </td>
          </tr> 
          <tr>
            <td className={css.tabD}>T100</td>
            <td className={css.tabD}>ECG</td>
            <td className={css.tabD}>shaakir</td>
            <td className={css.tabD}>Emergency</td>
            <td className={css.tabD}>in_progress</td>
            <td>
              <button className={css.tdb}>Delete</button>
              <button className={css.tdb}>Update</button>
            </td>
          </tr> 
        </tbody>
      </table>
  )
}
