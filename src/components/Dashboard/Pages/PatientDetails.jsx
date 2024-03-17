import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import Patientslist from './Patientslist';

function PatientDetails() {
    const user = JSON.parse(localStorage.getItem('user'));

    const patients = [
        {
            "firstName": "utkarsh",
            "lastName": "patil",
            "treatment": "surgery",
            "admissionDate": "1-1-24",
            "dischargeDate": "1-2-24",
        },
        {
            "firstName": "utkarsh",
            "lastName": "patil",
            "treatment": "surgery",
            "admissionDate": "1-1-24",
            "dischargeDate": "1-2-24",
        },
        {
            "firstName": "utkarsh",
            "lastName": "patil",
            "treatment": "surgery",
            "admissionDate": "1-1-24",
            "dischargeDate": "-",
        },
    ];

    return (
        <>
            {
                user ?
                    <div className='flex'>
                        <div className='relative top-20'>
                            <Sidebar aria-label="Default sidebar example">
                                <Sidebar.Items>
                                    <Sidebar.ItemGroup>
                                    <Sidebar.Item href="#" icon={HiChartPie}>
                                            <Link to={'/dashboard'}>
                                                <h2 className='text-xl'>Patients List</h2>
                                            </Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiViewBoards} labelColor="dark">
                                            <Link to={'/patientdetails'}>
                                                <h2 className='text-xl font-bold'>Patient Details View</h2>
                                            </Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiInbox} label="3">
                                            <Link to={'/meetwithpatient'}>
                                                <h2 className='text-xl'>Meet With Patient</h2>
                                            </Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiUser}>
                                            <h2 className='text-xl'>Add/Edit Patient Info</h2>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiUser}>
                                            <h2 className='text-xl'>Profile</h2>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiUser}>
                                            <h2 className='text-xl'>Settings</h2>
                                        </Sidebar.Item>
                                    </Sidebar.ItemGroup>
                                </Sidebar.Items>
                            </Sidebar>
                        </div>                     

                        <div className=''>
                            <div className='Tests and Treatments'>
                            <div class="overflow-auto shadow-md sm:rounded-lg">
                                <table class=" text-gray-500 px-10 py-4 border-separate border-spacing-y-3">
                                    <thead class="p-3 m-2 text-black">
                                        <tr className="text-2xl">
                                            <th class="p-3 m-2 px-20 bg-gray-50">Medical Tests</th>
                                            <th class="p-3 m-2 px-20 bg-gray-50">Medicines</th>
                                            <th class="p-3 m-2 px-16 bg-gray-50">Treatment Plans</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.map((patient, index) => (
                                            <tr class="my-2 text-2xl ">
                                                <td className="p-3 m-2 px-20 text-center font-medium text-black">
                                                    {index + 1}
                                                </td>
                                                <td className="p-3 m-2 px-20 text-black">
                                                    {patient.firstName +
                                                        " " +
                                                        patient.lastName}
                                                </td>
                                                <td className="p-3 m-2 px-16 text-black ">
                                                    {patient.treatment}
                                                </td>
                                                <td className="p-3 m-2 px-20 text-black">
                                                    {patient.admissionDate}
                                                </td>
                                                <td className="p-3 m-2 px-20 text-black">
                                                    {patient.dischargeDate}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                            <div className='Admit and Discharge'>

                            </div>
                        </div>

                    </div>
                    : null

            }
        </>
    )
}

export default PatientDetails