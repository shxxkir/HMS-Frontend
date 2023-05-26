import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import css from '../styles/AddTest.module.css';

function AddTest() {
    let navigate = useNavigate();

  const [testID, setTestID] = useState('');
  const [testName, setTestName] = useState('');
  const [patientName, setPatientName] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');

  async function addTest(e) {
    e.preventDefault();

    const newTest = {
        testID,
        testName,
        patientName,
        priority,
        status
    }

    await axios.post("http://localhost:5000/test",newTest)
        .then(() => {
            alert("Test Added Successfully");
            navigate('/test');
        })
        .catch(err => {
            alert(err);
        })
}

  return (
    <div className={css.formWrapper}>
      <form  style={{
        padding:'20px',
        borderRadius:'1%',
        border:'3px solid black',
        height:'auto',
        width:'auto',
        backgroundColor:'rgb(186, 184, 194)'    
       }}
    onSubmit={addTest}>
        <label className={css.lab}>
          Test ID:
          <input type="text" style={{
            display:'block',
            width:'100%',
            padding:'8px',
           // marginBottom:'15px',
            borderRadius:'5px',
            border: '1px solid #1b1a6f',
            fontSize:'20px'
          }} value={testID} onChange={e => setTestID(e.target.value)} />
        </label>
        <br />
        <label className={css.lab}>
        Test Name:
        <input type="text" style={{
            display:'block',
            width:'100%',
            padding:'8px',
           // marginBottom:'15px',
            borderRadius:'5px',
            border: '1px solid #1b1a6f',
            fontSize:'20px'
          }}value={testName} onChange={e => setTestName(e.target.value)} />
      </label>
        <br />
        <label className={css.lab}>
        Patient Name:
        <input type="text" style={{
            display:'block',
            width:'100%',
            padding:'8px',
           // marginBottom:'15px',
            borderRadius:'5px',
            border: '1px solid #1b1a6f',
            fontSize:'20px'
          }}value={patientName} onChange={e => setPatientName(e.target.value)} />
      </label>
        <br />
        <label className={css.lab}>
          Priority:
          <select className={css.opt} value={priority} onChange={e => setPriority(e.target.value)}>
            <option disable selected hidden>Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </label>
        <br />
        <label className={css.lab}>
          Status:
          <select className={css.opt} value={status} onChange={e => setStatus(e.target.value)}>
            <option disable selected hidden>Select Status</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="closed">Closed</option>
          </select>
        </label>
        <br />
        <button className={css.bt} type="submit">Submit</button>
      </form>
      </div>
  )
}

export default AddTest;