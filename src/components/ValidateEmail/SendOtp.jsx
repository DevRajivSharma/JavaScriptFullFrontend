import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { FaSpinner } from 'react-icons/fa'
const SendOtp = () => {

  const email = useSelector(state => state.auth.user.email)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const sendOtp =async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/send-otp`,
        {},
        {withCredentials: true}
      )
    }
    catch (error) {
      console.log(error)
      alert(error.response.data.message)
    }
  }
  return (
    <div>
      <h1>Validate Email</h1>
      <div>
        <p>{email}</p>
        <button onClick={sendOtp}>
            {isLoading ? <FaSpinner className='animate-spin'/> : 'Send OTP'}
        </button>
      </div>
    </div>
  )
}

export default SendOtp
