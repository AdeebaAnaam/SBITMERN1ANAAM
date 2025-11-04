import './App.css';
import Home from './components/Home';

import FeedBack from './components/FeedBack';
import Students from "./components/Students";
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Faculty from './components/Faculty';
import Management from './components/Management';
import SupportStaff from './components/SupportStaff';
import HostelStaff from './components/HostelStaff';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './components/ProctedRoute';
function App() {
return (
     <center>
      <Router>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/students" element={<ProtectedRoute> <Students/> </ProtectedRoute>} />
        <Route path="/faculty" element={<ProtectedRoute> <Faculty /> </ProtectedRoute>} />
        <Route path="/management" element={<ProtectedRoute> <Management /> </ProtectedRoute>} />
        <Route path="/support-staff" element={<ProtectedRoute> <SupportStaff /> </ProtectedRoute>} />
        <Route path="/hostel-staff" element={ <ProtectedRoute> <HostelStaff /> </ProtectedRoute>} />
        <Route path="/feedback" element={<ProtectedRoute> <FeedBack /> </ProtectedRoute>} />
      </Routes>
    </Router>
    <div>
  &copy; 2025 SBIT. All rights reserved.
</div>
    </center>
      
  );
}

export default App;
