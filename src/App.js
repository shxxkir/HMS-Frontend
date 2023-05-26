// import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import AddPatient from './components/AddPatient';
import AllPatients from './components/AllPatients';
import UpdatePatient from './components/UpdatePatient';

import Register from './components/Register';
import Login from './components/Login';

import AddRoom from './components/AddRoom';
import AllRooms from './components/AllRooms';
import UpdateRoom from './components/UpdateRoom';

import AddStaff from './components/AddStaff';
import AllStaffs from './components/AllStaffs';
import UpdateStaff from './components/UpdateStaff';

import AllAppointments from './components/AllAppointments';
import AddAppointment from './components/AddAppointment';
import UpdateAppointment from './components/UpdateAppointment';

import WardForm from './components/WardForm';
import Ward from './components/Wards';
import UpdateWard from './components/UpdateWard';

import Home from './components/Home';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/patients" element={<AllPatients/>}/>
          <Route path="/add-patient" element={<AddPatient/>}/>
          <Route path="/update-patient" element={<UpdatePatient/>}/>
          <Route path="/add-room" element={<AddRoom/>}/>
          <Route path="/rooms" element={<AllRooms/>}/>
          <Route path="/update-room" element={<UpdateRoom/>}/>
          <Route path="/add-staff" element={<AddStaff/>}/>
          <Route path="/update-staff" element={<UpdateStaff/>}/>
          <Route path="/staffs" element={<AllStaffs/>}/>
          <Route path="/add-appointment" element={<AddAppointment/>}/>
          <Route path="/update-appointment" element={<UpdateAppointment/>}/>
          <Route path="/appointments" element={<AllAppointments/>}/>
          <Route path="/add-ward" element={<WardForm/>}/>
          <Route path="/wards" element={<Ward/>}/>
          <Route path="/update-ward" element={<UpdateWard/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
