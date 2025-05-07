import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const VerifyOtp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const email = useSelector(state => state.auth.user.email) 
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('') 
  const [countdown,setCountdown] = useState(30)
  const verifyOtp = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/verify-otp`,
        {otp},
        {withCredentials: true}
      )
    }
    catch (error) {
      console.log(error)
      setError(error.response?.data?.message?? 'Something went wrong')
    }
  }
  setTimeout(() => {
    setCountdown((prev)=>prev-1)
  }, 30 * 1000)
  return (
    <div>
      <form action="">
        <p>Otp is sended to {email}</p>
        <input 
        type="text" 
        onChange={(e) => setOtp(e.target.value)}
        placeholder='Enter OTP' />
        <button>
          {isLoading? <FaSpinner className="animate-spin" /> : 'Verify'}
        </button>
        {error && <p className='text-center text-red-500'>{error}</p>}
        <p>Resend otp in {countdown}</p>
      </form>
    </div>
  )
}

export default VerifyOtp
