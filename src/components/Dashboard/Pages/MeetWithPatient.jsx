import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser, HiViewBoards } from 'react-icons/hi';
import { Sidebar } from 'flowbite-react';
import { auth } from '@/Firebase/firebase';
import { db } from '@/Firebase/firebase';
import { collection, addDoc, setDoc, getDocs, query} from 'firebase/firestore'
import { where } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';


function MeetWithPatient() {
    const user = JSON.parse(localStorage.getItem('user'));

    const location = useLocation();
    const patientId = location.state?.data;

    document.addEventListener('DOMContentLoaded', function () {
        new fbDatepicker(document.getElementById('datepicker'));
    });

    const [tests, setTests] = useState([])
    const [medicines, setMedicines] = useState([])
    const [treatments, setTreatments] = useState([])
    const [admitDate, setAdmitDate] = useState('')
    const [docterAssigned, setDocterAssigned] = useState('')
    const [reasonToAdmit, setReasonToAdmit] = useState('')
    const [room, setRoom] = useState('')
    const [dischargeDate, setDischargeDate] = useState('')
    const [patientid, setPatientId] = useState()

    const [val, setVal] = useState([]);

    const handleAdd = () => {
        const newValues = [...val, '']; // Add a new empty string for a new input field
        setVal(newValues);
    };

    const handleChange = (e, index) => {
        const updatedVal = [...val]; // Copy the current state
        updatedVal[index] = e.target.value; // Update the value at the given index
        setVal(updatedVal);

        // Update medicines state
        const updatedMedicines = [...medicines];
        updatedMedicines[index] = e.target.value;
        setMedicines(updatedMedicines);
    };

    const handleDelete = (index) => {
        const updatedVal = [...val]; // Copy the current state
        updatedVal.splice(index, 1); // Remove the element at the given index
        setVal(updatedVal);

        // Remove corresponding medicine from medicines state
        const updatedMedicines = [...medicines];
        updatedMedicines.splice(index, 1);
        setMedicines(updatedMedicines);
    };

    const handleTestsChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setSelectedTests(prevSelectedTests => [...prevSelectedTests, value]);
        } else {
            setSelectedTests(prevSelectedTests => prevSelectedTests.filter(test => test !== value));
        }
    };

    const handleTreatmentsChange = (event) => {
        const { value, checked } = event.target;

        if (checked) {
            setTreatments(prevSelectedTests => [...prevSelectedTests, value]);
        } else {
            setTreatments(prevSelectedTests => prevSelectedTests.filter(test => test !== value));
        }
    };

    const handleAdmitDateChange = (event) => {
        setAdmitDate(event.target.value);
    };

    const handleDocterAssignedChange = (event) => {
        setDocterAssigned(event.target.value);
    }

    const handleReasonToAdmitChange = (event) => {
        setReasonToAdmit(event.target.value);
    }

    const handleSetRoomChange = (event) => {
        setRoom(event.target.value);
    }

    const handleDischargeDateChange = (event) => {
        setDischargeDate(event.target.value);
    }

    const handlePatientIdChange = (event) => {
        setPatientId(event.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents default form submission behavior
        if (tests == [] || medicines == [] || treatments == [] || admitDate == '' || docterAssigned == '' || reasonToAdmit == '' || room == '' || dischargeDate == '') {
            alert("Enter the data...");
        }
        else {
            const user = auth.currentUser.uid;

            const data = { 
                patientId: patientid,
                docterId : user,
                tests: tests,
                medicines: medicines,
                treatments: treatments,
                admitDate: admitDate,
                docterAssigned: docterAssigned,
                reasonToAdmit: reasonToAdmit,
                room: room,
                dischargeDate: dischargeDate,
            };

            try {
                // Here you can send the data to Firestore
                const value = collection(db, "DocterWiseAppointment");

                await setDoc(value, data, user);

                // Reset state after successful submission if needed
                setTests([]);
                setMedicines([]);
                setTreatments([]);
                setAdmitDate('');
                setDocterAssigned('');
                setReasonToAdmit('');
                setRoom('');
                setDischargeDate('');

                // Optionally, you can add a success message or redirect the user
                alert('Data submitted successfully');
                alert(tests);
            } catch (error) {
                // Handle error
                console.error('Error submitting data:', error);
            }
        }

    };

    
    // const value = collection(db,"DocterWiseAppointment")

    const [patientIds, setPatientIds] = useState([]);

    useEffect(() => {
        const fetchPatientIds = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'DocterWiseAppointment'));

            const filteredPatientIds = querySnapshot.docs.flatMap(doc => {
            const requests = doc.data().Requests;
            if (requests) {
                // Filter requests where status is false and extract patient IDs
                const patientIdsWithFalseStatus = requests.filter(request => request.status === false)
                                                        .map(request => request.PatientId);
                return patientIdsWithFalseStatus;
            }
            return [];
            });

            alert(filteredPatientIds);
            setPatientIds(filteredPatientIds);
        } catch (error) {
            console.error("Error fetching patient IDs:", error);
        }
        };

        fetchPatientIds();
    }, []);

    return (
        <>
            {
                user ?
                    <div className='flex h-[80vh]'>
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
                                                <h2 className='text-xl'>Patient Details View</h2>
                                            </Link>
                                        </Sidebar.Item>
                                        <Sidebar.Item href="#" icon={HiInbox} label="3">
                                            <Link to={'/meetwithpatient'}>
                                                <h2 className='text-xl font-bold'>Meet With Patient</h2>
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

                        <div className='mt-20 w-full'>


                            <form class="w-full px-40" onSubmit={handleSubmit}>
                                <label className='block py-2 text-2xl mt-4'>Enter Patient Id</label>
                                
                                <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="mb-10 text-xl text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Patient<svg class="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6" onClick={() => {
                                        var dropdown = document.getElementById("patientIds");
                                        dropdown.classList.toggle("hidden");
                                    }}>
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                </svg>
                                </button>

                                <div id="patientIds" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">

                                    {
                                        patientIds.map((patient) => (
                                            <ul class="py-2 text-xl text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                            <li>    
                                                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{patient}</a>
                                            </li>
                                            </ul>
                                        ))
                                    }                           
                                </div>

                                <h3 className='text-4xl mb-10'>Tests and Treatments</h3>
                                <div class="flex mb-4 flex-col">
                                    <label className='text-2xl mb-1'>Tests</label><br />
                                    <button id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" className="w-[300px] text-xl inline-flex items-center px-4 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => {
                                        var dropdown = document.getElementById("dropdownSearch");
                                        dropdown.classList.toggle("hidden");
                                    }}>Medical Tests<svg class="w-3.5 h-3.5 ml-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg></button>

                                    <div id="dropdownSearch" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                        {/* <div class="p-3">
                                            <label for="input-group-search" class="sr-only">Search</label>
                                            </div> */}
                                        <ul class="h-48 px-3 pb-3 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Blood tests"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Blood tests
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Urine tests"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Urine tests
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Electrocardiogram"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Electrocardiogram
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="X-Rays"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        X-Rays
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="MRI"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        MRI
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="CT-SCAN"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        CT-SCAN
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="X-Rays"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Positron Emission Tomography (PET)
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Biopsy"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Biopsy
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Endoscopy"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Endoscopy
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Genetic Tests"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Genetic Tests
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="X-Rays"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Stool Tests (Blood, Parasites, Bacteria)
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Sputum tests (respiratory viruses)"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTests(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Sputum tests (respiratory viruses)
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col m-1">
            <label className='text-2xl mb-5'>Medicines Information</label>
            <button className="text-white w-[200px] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleAdd}>Add</button>

            {val.map((data, i) => (
                <div className='mt-3 flex' key={i}>
                    <input
                        value={data}
                        onChange={(e) => handleChange(e, i)} // Pass the index to handleChange
                        type="text"
                        id={`email-${i}`}
                        className="shadow-sm w-[500px] bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="enter medicine..."
                    />
                    <button
                        className='text-white ml-5 w-[50px] bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xl px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                        onClick={() => handleDelete(i)} // Pass the index to handleDelete
                    >
                        X
                    </button>
                </div>
            ))}
        </div>

                                <div class="flex mb-4 flex-col mt-5">
                                    <label className='text-2xl mb-1'>Treatments Plans</label><br />
                                    <button id="dropdownTreatmentButton" data-dropdown-toggle="treatmentSearch" className="w-[300px] text-xl inline-flex items-center px-4 py-2 font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={() => {
                                        var dropdown = document.getElementById("treatmentSearch");
                                        dropdown.classList.toggle("hidden");
                                    }}>Treatments<svg class="w-3.5 h-3.5 ml-32" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4" />
                                        </svg></button>

                                    <div id="treatmentSearch" class="z-10 hidden bg-white rounded-lg shadow w-60 dark:bg-gray-700">
                                        {/* <div class="p-3">
                                            <label for="input-group-search" class="sr-only">Search</label>
                                            </div> */}
                                        <ul class="h-48 px-3 pb-3 overflow-y-auto text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Deep Brain Stimulation (DBS)"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Deep Brain Stimulation (DBS)
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Joint Preservation Procedures"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Joint Preservation Procedures
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Intrathecal Baclofen Pump"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Intrathecal Baclofen Pump
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Vagus Nerve Stimulation (VNS)"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Vagus Nerve Stimulation (VNS)
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Gamma Knife Radiosurgery"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Gamma Knife Radiosurgery
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Spinal Decompression Surgery"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Spinal Decompression Surgery
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Spinal Decompression Surgery"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Spinal Decompression Surgery
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Arthroscopic Surgery"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Arthroscopic Surgery
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Total Joint Replacement"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Total Joint Replacement
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Physical Therapy"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Physical Therapy
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Spinal Fusion"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Spinal Fusion
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Craniotomy"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Craniotomy
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Minimally Invasive Spine Surgery"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Minimally Invasive Spine Surgery
                                                    </label>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                    <input
                                                        id="checkbox-item-11"
                                                        type="checkbox"
                                                        value="Joint Resurfacing"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                                        onChange={(e) => {
                                                            // handleTestsChange
                                                            setTreatments(value => [...value, e.target.value])
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor="checkbox-item-11"
                                                        className="w-full ms-2 text-xl text-gray-900 rounded dark:text-gray-300"
                                                    >
                                                        Joint Resurfacing
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                {/* <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Imaging Tests (X-Ray, CT-Scan, MRI, etc.)</label>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
                                    </div>
                                </div>
                                <div class="grid md:grid-cols-2 md:gap-6">
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_phone" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (123-456-7890)</label>
                                    </div>
                                    <div class="relative z-0 w-full mb-5 group">
                                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                                        <label for="floating_company" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company (Ex. Google)</label>
                                    </div>
                                </div> */}



                                {/* ADMIT AND DISCHARGE DETAILS */}

                                <h3 className='text-4xl mb-7 mt-20'>Admit and Discharge</h3>

                                <label className='block py-4 text-2xl'>Enter Admit Date</label>
                                <div class="relative max-w-sm">
                                    <div className='my2-2'>
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input id="datepicker" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dd-mm-yyyy" onChange={handleAdmitDateChange} />
                                    </div>

                                </div>


                                <label className='block py-2 text-2xl mt-4'>Docter Assigned</label>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleDocterAssignedChange} />
                                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Docter's Name</label>
                                </div>


                                <label className='block py-2 text-2xl mt-4'>Reason To Admit</label>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="text" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleReasonToAdmitChange} />
                                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Explain the Complete Diagnosis of the Patient by Docter</label>
                                </div>


                                <label className='block py-2 text-2xl mt-4'>Room Assigned To The Patient</label>
                                <div class="relative z-0 w-full mb-5 group">
                                    <input type="number" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-xl text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " onChange={handleSetRoomChange} />
                                    <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-xl text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Room Number of Patient</label>
                                </div>


                                <label className='block py-4 text-2xl'>Enter Discharge Date</label>
                                <div class="relative max-w-sm">
                                    <div className='my2-2'>
                                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                            </svg>
                                        </div>
                                        <input id="datepicker" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="dd-mm-yyyy" onChange={handleDischargeDateChange} />
                                    </div>

                                </div>


                                <button type="submit" class="text-white my-7 mb-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xl w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>




                    </div>
                    : null

            }
        </>
    )
}

export default MeetWithPatient