import React from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../../assets/youtubeCloneLogo.png'
const LogoutNav = props => {
    const navigate = useNavigate()
    return (
        <div className='flex px-5 justify-between  items-center w-screen border-1 border-amber-50'>
            <img src={logo} alt="Logo" width={50}/>
        <div className='flex gap-1'>
        <button onClick={()=>{navigate('login')}}
            className='p-1 text-white h-fit'>
            Login
        </button>
        <button onClick={()=>{navigate('register')}}
            className='p-1  text-white rounded  bg-violet-600 h-fit'>
            Signup
        </button>
        </div>
        </div>
    )
}

LogoutNav.propTypes = {

}

export default LogoutNav
