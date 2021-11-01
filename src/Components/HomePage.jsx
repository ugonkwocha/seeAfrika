import React from 'react'
import { Link } from 'react-router-dom';
import grungeBg from '../data/images/bg-home.jpg'

function HomePage() {
    return (
        <div className="w-full h-screen">
            <div style={{ backgroundImage: `url(${grungeBg})` }} className="w-full h-full items-center justify-center flex flex-col mb-6 ">
                <h1 className="text-6xl font-bold text-white">
                    SEE AFRIKA
                </h1>

                <p className='text-white sm:w-1/3 w-5/6 text-center mt-8'>A JavaScript audio visualization
                    of great speeches made by great Africans</p>

                <Link to='/visual-stories' >
                    <button className='bg-[#F2811D] p-4 text-white mt-16'>
                        Click to enter visual experience
                    </button>
                </Link>
            </div>

        </div>
    )
}

export default HomePage
