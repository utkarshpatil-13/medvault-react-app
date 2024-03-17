import React from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import Patientslist from './Pages/Patientslist';
import { Sidebar } from 'flowbite-react';

function Dashboard() {
    const user = JSON.parse(localStorage.getItem('user'));
    return (
        <>
            {user ?
                <>
                <div className='flex'>
                <div className='relative top-20'>
                    <Sidebar aria-label="Default sidebar example">
                        <Sidebar.Items>
                            <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={HiChartPie}>
                                                <h2 className='text-xl font-bold'>Patients List</h2>
                                            <Link to={'/dashboard'}>
                                            </Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiViewBoards} labelColor="dark">
                                            <Link to={'/patientdetails'}>
                                                <h2 className='text-xl'>Patient Details View</h2>
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
                    <Patientslist />
                </div>
                </>

                : navigate("/login")}
        </>

    )
}

export default Dashboard