import React from 'react'
import Sidebar from './Sidebar.jsx'
import { useSelector } from'react-redux'
import LandingPage from './LandingPage.jsx'
import { Outlet } from 'react-router'

const home = () => {
  const auth = useSelector(state => state.auth)
  if(auth.isAuthenticated){
    return (
      <div className='flex  flex-col-reverse sm:flex-row '>
        <div className=' bg-black  h-fit flex flex-row sm:flex-col w-full sm:w-1/7 sm:min-w-[200px]  items-center md:items-stretch lg:items-stretch  justify-evenly md:justify-normal lg:justify-normal lg:sticky lg:top-[0px] fixed bottom-0 sm:static p-2  z-10  '>
          <Sidebar/> 
        </div>
        <div className='w-full  overflow-y-auto scrollbar-hide pb-16 sm:pb-0 '>
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
