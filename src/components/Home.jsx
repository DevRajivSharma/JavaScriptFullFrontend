import React from 'react'
import Sidebar from './Sidebar.jsx'
import { useSelector } from'react-redux'
import LandingPage from './LandingPage.jsx'
import { Outlet } from 'react-router'

const home = () => {
  const auth = useSelector(state => state.auth)
  if(auth.isAuthenticated){
    return (
      <div className='flex  flex-col-reverse sm:flex-row h-[calc(100vh-52px)]'>
        <div className='  border-white bg-black  flex flex-row sm:flex-col w-full sm:w-1/6 sm:min-w-[200px] h-16 items-center md:items-stretch lg:items-stretch  justify-evenly md:justify-normal lg:justify-normal sm:h-full  fixed bottom-0 sm:static  z-10'>
          <Sidebar/> 
        </div>
        <div className='flex-1 overflow-y-auto scrollbar-hide pb-16 sm:pb-0'>
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
