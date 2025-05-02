import React from 'react'
import { useNavigate } from 'react-router'
import { logout } from '../store/feature/authSlice'
import { useDispatch } from 'react-redux'
import { FaHome, FaUser, FaVideo, FaHistory, FaListUl, FaSignOutAlt } from 'react-icons/fa'

const sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // Utility class: show icon on mobile, text on desktop
  const iconClass = 'block md:hidden text-xl'
  const textClass = 'hidden md:inline'

  return (
    <>
      <button
        className=' m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold flex justify-center lg:border md:border  items-center gap-2'
        onClick={() => navigate('/')}>
        <FaHome className={iconClass} />
        <span className={textClass}>Home</span>
      </button>
      <button 
        className=' m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold flex justify-center lg:border md:border items-center gap-2'
        onClick={() => navigate('/channel')}>
        <FaUser className={iconClass} />
        <span className={textClass}>My Channel</span>
      </button>
      <button 
        className=' m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold flex justify-center lg:border md:border items-center gap-2'
        onClick={() => navigate('/myVideos')}>
        <FaVideo className={iconClass} />
        <span className={textClass}>My Videos</span>
      </button>
      <button 
        className=' m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold flex justify-center lg:border md:border items-center gap-2'
        onClick={() => navigate('/history')}>
        <FaHistory className={iconClass} />
        <span className={textClass}>History</span>
      </button>
      <button 
        className=' m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold flex justify-center lg:border md:border items-center gap-2'
        onClick={() => navigate('/playlist')}>
        <FaListUl className={iconClass} />
        <span className={textClass}>Playlist</span>
      </button>
      <button 
        className=' m-1 text-black font-bold bg-red-400 hover:text-black hover:font-bold flex justify-center lg:border md:border items-center gap-2'
        onClick={()=>{
          dispatch(logout())
          navigate('/login')
        }}>
        <FaSignOutAlt className={iconClass} />
        <span className={textClass}>Logout</span>
      </button>
    </>
  )
}

export default sidebar
