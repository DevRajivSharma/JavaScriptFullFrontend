import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/youtubeCloneLogo.png'
const LogoutNav = props => {
    const navigate = useNavigate()
    return (
        <div className='flex p-2 justify-between  items-center w-screen border-b-1  border-[#2e2e2e]'>
            {/* <img src={logo} alt="Logo" width={50}/> */}
            <h1 className='text-white text-xl  font-bold'>VideoTube</h1>
            <div className='flex gap-2 items-center'>
                <button onClick={() => { navigate('login') }}
                    className=' text-white px-3 py-2 text-sm rounded-md h-fit border-[#2e2e2e] border-1 hover:cursor-pointer '>
                    Login
                </button>
                <button onClick={() => { navigate('register') }}
                    className='px-3 py-2  text-black rounded-md text-sm font-semibold  bg-white hover:cursor-pointer'>
                    Sign up
                </button>
            </div>
        </div>
    )
}

LogoutNav.propTypes = {

}

export default LogoutNav
