import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/feature/authSlice'
import logo from '../assets/youtubeCloneLogo.png'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null
  })
  const [step, setStep] = useState('register') // 'register' or 'verify'
  const [otp, setOtp] = useState("")
  const [otpLoading, setOtpLoading] = useState(false)
  const [otpError, setOtpError] = useState(null)
  const [otpSuccess, setOtpSuccess] = useState(null)

  const handleFileChange = (e) => {
    const { name, files } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }))
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // When Register is clicked, send OTP and switch to OTP step
  const handleSendOtp = async (e) => {
    e.preventDefault()
    setOtpLoading(true)
    setOtpError(null)
    setOtpSuccess(null)
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/users/sendOtp`,
        { email: formData.email }
      )
      setStep('verify')
      setOtpSuccess("OTP sent to your email.")
    } catch (error) {
      setOtpError(error.response?.data?.message || "Failed to send OTP.")
    }
    setOtpLoading(false)
  }

  // When Verify is clicked, submit registration with OTP
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("fullName", formData.fullname)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("avatar", formData.avatar)
      formDataToSend.append("coverImage", formData.coverImage)
      formDataToSend.append("otp", otp)

      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/register`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }, {
        withCredentials: true
      })

      if (response.data.success) {
        setLoading(false)
        navigate('/login')
      }
    } catch (error) {
      setLoading(false)
      setError(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

  return (
    <div className='flex items-center justify-center h-full'>
      {step === 'register' && (
        <form onSubmit={handleSendOtp}
          className='flex flex-col border-1 border-white rounded-lg p-2 w-100'>
          <h3 className='flex items-center gap-2 mb-6'>
            <img src={logo} alt="YoutubeClone" className='w-8 h-8' />
            <span className='text-2xl text-white'>YoutubeClone</span>
          </h3>
          <input
            type="text"
            placeholder='UserName'
            name='username'
            value={formData.username}
            onChange={handleInputChange}
            className='border-1 outline-none text-white p-3 mb-4 rounded'
            required
          />
          <input
            type="text"
            placeholder='Full Name'
            name='fullname'
            value={formData.fullname}
            onChange={handleInputChange}
            className='border-1 outline-none text-white p-3 mb-4 rounded'
            required
          />
          <input
            type="email"
            placeholder='Email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            className='border-1 outline-none text-white p-3 mb-4 rounded'
            required
          />
          <input
            type="file"
            accept='image/*'
            id='avatar'
            name='avatar'
            onChange={handleFileChange}
            className='border-1 text-white p-3 mb-4 rounded'
            required
          />
          <label htmlFor="coverImage" className='text-white mb-2'>Cover Image:</label>
          <input
            type="file"
            accept='image/*'
            id='coverImage'
            name='coverImage'
            onChange={handleFileChange}
            className='border-1 text-white p-3 mb-4 rounded'
            required
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
            className='border-1 text-white p-3 mb-4 rounded'
            required
          />
          <button className='bg-violet-600 text-white py-2 px-6 rounded-md hover:bg-violet-700 transition-all duration-300 self-end'
            type='submit'
            disabled={otpLoading || loading}
          >
            {otpLoading ? <FaSpinner className="animate-spin" /> : 'Register'}
          </button>
          <p className='flex justify-end gap-2 mt-6 text-gray-400'>
            Already user?
            <button
              className='text-violet-400 hover:text-violet-300 transition-colors hover:cursor-pointer duration-300'
              onClick={() => navigate('/login')}
              type="button"
            >
              login
            </button>
          </p>
          {otpError && <p className="text-red-500">{otpError}</p>}
          {otpSuccess && <p className="text-green-500">{otpSuccess}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
      {step === 'verify' && (
        <form onSubmit={handleVerifyAndRegister}
          className='flex flex-col border-1 border-white rounded-lg p-2 w-100'>
          <h3 className='flex items-center gap-2 mb-6'>
            <img src={logo} alt="YoutubeClone" className='w-8 h-8' />
            <span className='text-2xl text-white'>YoutubeClone</span>
          </h3>
          <p className='text-white mb-2'>OTP sent to {formData.email}</p>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            className="border-1 outline-none text-white p-3 mb-4 rounded"
            required
          />
          <button
            type="submit"
            className="bg-violet-600 text-white py-2 px-6 rounded-md hover:bg-violet-700 transition-all duration-300 self-end"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : 'Verify & Register'}
          </button>
          {otpError && <p className="text-red-500">{otpError}</p>}
          {otpSuccess && <p className="text-green-500">{otpSuccess}</p>}
          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}
    </div>
  )
}

export default Register
