import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogoutNav = () => {
  const navigate = useNavigate()
  return (
    <div className="flex p-2 justify-between items-center w-full border-b border-[#2e2e2e]">
      <h1 className="text-white text-xl font-bold">VideoTube</h1>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => navigate('/login')}
          className="text-white px-3 py-2 text-sm rounded-md h-fit border border-[#2e2e2e] hover:cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="px-3 py-2 text-black rounded-md text-sm font-semibold bg-white hover:cursor-pointer"
        >
          Sign up
        </button>
      </div>
    </div>
  )
}

export default LogoutNav
