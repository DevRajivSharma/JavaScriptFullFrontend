import React from 'react'
import Sidebar from './Sidebar.jsx'
import { useSelector } from'react-redux'
import LandingPage from './LandingPage.jsx'
import { Outlet } from 'react-router'

const home = () => {
  const auth = useSelector(state => state.auth)
  if(auth.isAuthenticated){
    return (
      <div className='flex h-[calc(100vh-52px)]'>
        <div className='border-1 border-amber-50 flex flex-col w-1/6 min-w-[200px] h-full'>
          <Sidebar/> 
        </div>
        <div className='flex-1 overflow-y-auto scrollbar-hide'>
          <Outlet/>
        </div>
      </div>
    )
  }
  return (
    <div className='flex h-full'>
      <LandingPage/>
    </div>
  )
}

export default home
