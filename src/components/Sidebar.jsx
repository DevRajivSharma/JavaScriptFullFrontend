import React from 'react'
import { useNavigate } from 'react-router'
import { logout } from '../store/feature/authSlice'
import { useDispatch } from'react-redux'

const sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  return (
    <>
      <button
        className='border m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold'
        onClick={() => navigate('/')}>
        Home</button>
      <button 
      className='border m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold'
         onClick={() => navigate('/channel')}>
        Channel</button>
      {/* <button 
      className='border m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold'>
         onClick={() => navigate('/')}
        Liked Video
      </button> */}
      <button className='border m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold'
       onClick={() => navigate('/history')}>
        History
        </button>
      <button className='border m-1 text-white hover:bg-amber-100 hover:text-black hover:font-bold'
       onClick={() => navigate('/playlist')}>
        Playlist
        </button>
      <button 
            className='border m-1 text-black font-bold bg-red-400 hover:text-black hover:font-bold'
            onClick={()=>{
              dispatch(logout())
              navigate('/login')
            }}>
                Logout
      </button>
    </>
  )
}

export default sidebar
