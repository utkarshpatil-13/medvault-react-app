import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import Signup from './components/auth/register/index.jsx'
import Login from './components/auth/login/index.jsx'
import Home from './components/Home/Home.jsx'
import Dashboard from './components/Dashboard/Dashboard.jsx'
import Patientslist from './components/Dashboard/Pages/Patientslist.jsx'
import MeetWithPatient from './components/Dashboard/Pages/MeetWithPatient.jsx'
import PatientDetails from './components/Dashboard/Pages/PatientDetails.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/" index element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/patientslist" element={<Patientslist />} />
      <Route path="/meetwithpatient" element={<MeetWithPatient />} />
      <Route path="/patientdetails" element={<PatientDetails />} />
      {/* <Route path="/" element={<Protected />} >
      </Route> */}
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
