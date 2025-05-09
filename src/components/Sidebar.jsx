import React from 'react'
import { useNavigate } from 'react-router'

import { useDispatch } from 'react-redux'
import { FaTv, FaHistory, FaListUl, FaSignOutAlt } from 'react-icons/fa'
import { setSearchVideos } from '../store/feature/videoSlice'
import axios from 'axios'
const sidebar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [currentOpenTab, setCurrentOpenTab] = React.useState(0)
  // Utility class: show icon on mobile, text on desktop
  const iconClass = 'block md:hidden text-xl'
  const textClass = 'hidden md:inline text-sm'



  return (
    <>
      {/* Home */}
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 ${currentOpenTab === 0 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(0);
          dispatch(setSearchVideos([]))
          navigate('/')
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 25 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-house h-4 w-4">
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
        </svg>
        <span className={textClass}>Home</span>
      </button>

      {/* Subscribtions */}
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 ${currentOpenTab === 6 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(6);
          dispatch(setSearchVideos([]))
          navigate('/')
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: 'none', display: 'inherit', }}
          className='h-4 w-4'
        >
          <path
            clipRule="evenodd"
            d="M4 4.5A1.5 1.5 0 015.5 3h13A1.5 1.5 0 0120 4.5H4Zm16.5 3h-17v11h17v-11ZM3.5 6A1.5 1.5 0 002 7.5v11A1.5 1.5 0 003.5 20h17a1.5 1.5 0 001.5-1.5v-11A1.5 1.5 0 0020.5 6h-17Zm7.257 4.454a.5.5 0 00-.757.43v4.233a.5.5 0 00.757.429L15 13l-4.243-2.546Z"
            fillRule="evenodd"
          />
        </svg>

        <span className={textClass}>Subscribtions</span>
      </button>

      <hr className='border-1 border-[#2e2e2e] hidden lg:block md:block  my-2' />
      <p className='text-gray-200 text-[18px] mx-4 font-semibold hidden lg:block md:block'>You </p>

      {/* My channel */}
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold md:flex lg:flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 hidden  ${currentOpenTab === 1 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(1);
          navigate('/channel')
        }}>
        <FaTv className='h-4 w-4' />
        <span className={textClass}>My Channel</span>
      </button >
      {/* My videos */}
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 ${currentOpenTab === 2 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(2);
          navigate('/myVideos')
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="24"
          width="24"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: 'none', display: 'inherit', }}
          className='h-4 w-4'
        >
          <path
            clipRule="evenodd"
            d="M3.5 5.5h17v13h-17v-13ZM2 5.5C2 4.672 2.672 4 3.5 4h17c.828 0 1.5.672 1.5 1.5v13c0 .828-.672 1.5-1.5 1.5h-17c-.828 0-1.5-.672-1.5-1.5v-13Zm7.748 2.927c-.333-.19-.748.05-.748.435v6.276c0 .384.415.625.748.434L16 12 9.748 8.427Z"
            fillRule="evenodd"
          />
        </svg>
        <span className={textClass}>My Videos</span>
      </button>
      {/* History */}
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 ${currentOpenTab === 3 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(3);
          navigate('/history')
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="26"
          width="26"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: 'none', display: 'inherit', }}
          className='h-4 w-4'
        >
          <path
            clipRule="evenodd"
            d="M14.203 4.83c-1.74-.534-3.614-.418-5.274.327-1.354.608-2.49 1.6-3.273 2.843H8.25c.414 0 .75.336.75.75s-.336.75-.75.75H3V4.25c0-.414.336-.75.75-.75s.75.336.75.75v2.775c.935-1.41 2.254-2.536 3.815-3.236 1.992-.894 4.241-1.033 6.328-.392 2.088.641 3.87 2.02 5.017 3.878 1.146 1.858 1.578 4.07 1.215 6.223-.364 2.153-1.498 4.1-3.19 5.48-1.693 1.379-3.83 2.095-6.012 2.016-2.182-.08-4.26-.949-5.849-2.447-1.588-1.499-2.578-3.523-2.784-5.697-.039-.412.264-.778.676-.817.412-.04.778.263.818.675.171 1.812.996 3.499 2.32 4.748 1.323 1.248 3.055 1.973 4.874 2.04 1.818.065 3.598-.532 5.01-1.681 1.41-1.15 2.355-2.773 2.657-4.567.303-1.794-.056-3.637-1.012-5.186-.955-1.548-2.44-2.697-4.18-3.231ZM12.75 7.5c0-.414-.336-.75-.75-.75s-.75.336-.75.75v4.886l.314.224 3.5 2.5c.337.241.806.163 1.046-.174.241-.337.163-.806-.174-1.046l-3.186-2.276V7.5Z"
            fillRule="evenodd"
          />
        </svg>
        <span className={textClass}>History</span>
      </button>
      <button
        className={`mx-2 my-[2px] text-white hover:bg-[#262626] font-semibold flex
         p-2 rounded-md  items-center hover:cursor-pointer gap-2 ${currentOpenTab === 4 ? 'bg-[#262626]' : ''}`}
        onClick={() => {
          setCurrentOpenTab(4);
          navigate('/playlist')
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          height="26"
          width="26"
          viewBox="0 0 24 24"
          focusable="false"
          aria-hidden="true"
          style={{ pointerEvents: 'none', display: 'inherit', }}
          className='h-4 w-4'
        >
          <path
            clipRule="evenodd"
            d="M4 5c-.552 0-1 .448-1 1s.448 1 1 1h16c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h16c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Zm11 3.862c0-.384.415-.625.748-.434L21 17l-6.252 3.573c-.333.19-.748-.05-.748-.435v-6.276ZM4 13c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Z"
            fillRule="evenodd"
          />
        </svg>
        <span className={textClass}>Playlist</span>
      </button>
     

   

    </>
  )
}

export default sidebar
