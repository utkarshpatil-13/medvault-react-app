import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '@/Firebase/firebase';
import { useNavigate } from 'react-router-dom';

function Header() {

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
    <div className='flex justify-around mt-4 shadow-lg shadow-slate-200 pb-4'>

        <div className='text-3xl font-bold p-3 text-regal-blue'>
          MedVault
        </div>

        <nav className="">
            <ul className='text-black list-none flex justify-end p-2'>
                <li className='pr-10 pt-2 cursor-pointer text-2xl'>Home</li>
                <li className='pr-10 pt-2 cursor-pointer text-2xl'>Docters</li>
                <li className='pr-10 pt-2 cursor-pointer text-2xl'>Hospital Subsidaries</li>
                <li className='pr-10 pt-2 cursor-pointer text-2xl'>Departments</li>
                {user ? <li className='pr-10 pt-2 cursor-pointer text-2xl' onClick={handleLogout}>Logout</li> : <li></li>}
                <span className="material-symbols-outlined text-3xl relative top-2 font-bold cursor-pointer">
                    search
                </span>
            </ul>
        </nav>
    </div>
  )
}

export default Header