import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, getDoc } from 'firebase/firestore';
import { db } from '@/Firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Patientslist() {

    const user = JSON.parse(localStorage.getItem('user'));

    const [val,setVal] =useState([])


    
    const value = collection(db,"profile")
    const navigate = useNavigate();


    useEffect(()=>{
        const getData= async()=>{
          const dbVal = await getDocs(value)
          
          setVal(dbVal.docs.map(doc=>
            {
                const patientRef = query(collection(db, "DocterWiseAppointment"), where("patientId", "==", doc.id));
                ({...doc.data(),id:doc.id, fullname:doc.fullName, treatment:doc.currentMedications, admissionDate:patientRef.admitDate, dischargeDate:patientRef.dischargeDate})
            }
            
            ))
        }
        getData()
    });

    // const [patientsList, setPatientsList] = useState([]);

    // const patients = [
    //     {   
    //         "patientId" : 123,
    //         "firstName": "utkarsh",
    //         "lastName": "patil",
    //         "treatment": "surgery",
    //         "admissionDate": "1-1-24",
    //         "dischargeDate": "1-2-24",
    //     },
    //     {
    //         "patientId" : 456,
    //         "firstName": "utkarsh",
    //         "lastName": "patil",
    //         "treatment": "surgery",
    //         "admissionDate": "1-1-24",
    //         "dischargeDate": "1-2-24",
    //     },
    //     {
    //         "patientId" : 789,
    //         "firstName": "utkarsh",
    //         "lastName": "patil",
    //         "treatment": "surgery",
    //         "admissionDate": "1-1-24",
    //         "dischargeDate": "-",
    //     },
    // ];


    // useEffect(() => {
    //     const q = query(collection(db, "profile"));
        
    //     // Retrieve the document snapshot
    //     const querySnapshot = async () => {
    //         const data = await getDocs(q);
    //         data.forEach((doc) => {
    //             const patientRef = query(collection(db, "DocterWiseAppointment"), where("patientId", "==", patientId));
    //             setPatientsList(prev => [...prev, [doc.id, doc.fullName, doc.currentMedications, patientRef.admitDate, patientRef.dischargeDate]])
    //         });
    //     } 

    //     querySnapshot();
    
    // }, []);

    // const getPatientId = (id) =>{
    //     return id;
    // }

    // const getPatientById = async (patientId) => {
    //     try {
    //       // Reference the document with the provided patient ID
    //       const patientRef = doc(db, 'DocterWiseAppointment', patientId);
      
    //       // Retrieve the document snapshot
    //       const docSnap = await getDoc(patientRef);
      
    //       // Check if the document exists
    //       if (docSnap.exists()) {
    //         // Return the document data
    //         return { id: docSnap.id, ...docSnap.data() };
    //       } else {
    //         // Document doesn't exist
    //         console.log('No such document!');
    //         return null;
    //       }
    //     } catch (error) {
    //       console.error('Error getting document:', error);
    //       return null;
    //     }
    //   };

    return (
        <>
            {
                user ?
                    <div className='flex'>

                        <div>
                            <h2 className="text-3xl font-bold mb-4 mt-8 mx-8">Patients List</h2>
                            <div class="overflow-auto shadow-md sm:rounded-lg">
                                <table class=" text-gray-500 px-10 py-4 border-separate border-spacing-y-3">
                                    <thead class="p-3 m-2 text-black">
                                        <tr className="text-2xl">
                                            <th class="p-3 m-2 px-20 bg-gray-50">PATIENT ID</th>
                                            <th class="p-3 m-2 px-20 bg-gray-50">PATIENT NAME</th>
                                            <th class="p-3 m-2 px-16 bg-gray-50">TREATMENT</th>
                                            <th class="p-3 m-2 px-20 bg-gray-50">ADMIT DATE</th>
                                            <th class="p-3 m-2 px-20 bg-gray-50">DISCHARGE DATE</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {val.map((patient, index) => (
                                            <tr class="my-2 text-2xl" onClick={() => {
                                                // setPatientId(patient.id);
                                                getPatientId(patient.id);
                                                navigate('/meetWithPatient', { state: { data: patient.id } });
                                                }}>
                                                <td className="p-3 m-2 px-20 text-center font-medium text-black">
                                                    {patient.id}
                                                </td>
                                                <td className="p-3 m-2 px-20 text-black">
                                                    {patient.fullName}
                                                </td>
                                                <td className="p-3 m-2 px-16 text-black ">
                                                    {patient.treatment}
                                                </td>
                                                <td className="p-3 m-2 px-20 text-black">
                                                    {patient.admitDate}    
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
                    </div> : null
            }
        </>
    )
}

export default Patientslist