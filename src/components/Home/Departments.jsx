import React from 'react'

function Departments() {
  return (
    <>

        <div className='bg-[#F4F4F4] p-3'>
            <div className='text-[50px] text-center mb-10'>
                <h2 className='font-bold text-regal-blue'>Departments</h2>  
            </div> 
            <div className='flex justify-evenly'>
                <div className='w-[400px] rounded-2xl inline-block shadow-lg shadow-gray-600 cursor-pointer'>
                    <div className='mb-10'>
                        <img src="https://source.unsplash.com/500x500/?radiology hopsital" className='rounded-2xl' alt="" />
                    </div>
                    <h3 className='font-bold text-2xl text-center mb-3  p-2'>RadioLogy Department</h3>
                    <p className='text-xl text-center  p-2'>Performs imaging tests such as X-rays, MRIs, and CT scans for diagnosis and treatment planning.</p>
                </div>
                <div className='w-[400px] rounded-2xl inline-block shadow-lg shadow-gray-600 cursor-pointer'>
                    <div className='mb-10'>
                        <img src="https://source.unsplash.com/500x500/?orthopedic hospital" className='rounded-2xl' alt="" />
                    </div>
                    <h3 className='font-bold text-2xl text-center mb-3'>Orthopedic Department</h3>
                    <p className='text-xl text-center'>Specializes in the diagnosis and treatment of musculoskeletal conditions, including bone fractures and joint problems.</p>
                </div>
                <div className='w-[400px] rounded-2xl inline-block shadow-lg shadow-gray-600 cursor-pointer'>
                    <div className='mb-10'>
                        <img src="https://source.unsplash.com/500x500/?neurology hospital" className='rounded-2xl' alt="" />
                    </div>
                    <h3 className='font-bold text-2xl text-center mb-3'>Neurology Department</h3>
                    <p className='text-xl text-center'>Deals with disorders of the nervous system, including the brain, spinal cord, and nerves.</p>
                </div>
        </div>
        </div>
    </>
  )
}

export default Departments