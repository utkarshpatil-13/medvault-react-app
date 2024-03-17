import React from 'react'
import HomePageImage from '../../assets/home_page.png'
import Departments from './Departments'
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebase';
import { Link, NavLink, useNavigate } from 'react-router-dom';

function Home() {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        await signOut(auth);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }

  return (
    <>
    
        <div className='flex m-14'>
            <div className='flex flex-col items-center justify-center'>
                <h3 className='text-7xl font-bold mb-5 text-regal-blue font-sans text-center'>Hospital of The Future Is Today!</h3>
                <p className='text-3xl text-center mt-5'>For a hospital docter's login website for patient data management, tracking and more.</p>
                <div className='mt-12'>


                {
                    user
                        ?
                        <>
                            <Link to={'login'}>
                                <button className='font-sans rounded-xl text-xl w-40 border-regal-blue border-2 p-3 m-2 active:bg-regal-blue hover:transition-all active:text-white' onClick = {handleLogout}>Logout</button>
                            </Link>
                            <Link to={'/dashboard'}>
                                <button className='font-sans rounded-xl text-white text-xl w-40 bg-regal-blue p-3 m-2 active:text-black active:bg-white active:border-regal-blue active:border-2'>Dashboard</button>
                            </Link>
                        </>
                        :
                        <>
                            <Link to={'login'}>
                                <button className='font-sans rounded-xl text-xl w-40 border-regal-blue border-2 p-3 m-2 active:bg-regal-blue hover:transition-all active:text-white'>Login</button>
                                {navigate("/dashboard")}
                            </Link>
                            <Link to={'signup'}>
                                <button className='font-sans rounded-xl text-white text-xl w-40 bg-regal-blue p-3 m-2 active:text-black active:bg-white active:border-regal-blue active:border-2'>Sign Up</button>
                                {navigate("/login")}
                            </Link>
                        </>
                }


                </div>
            </div>
            <div>
                <img src={HomePageImage} className='w-[80vw] h-[70]' alt="" />
            </div>
        </div>

        <Departments />

    </>
  )
}

export default Home