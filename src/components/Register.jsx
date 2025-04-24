import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/feature/authSlice'
import logo from '../assets/youtubeCloneLogo.png'
import axios from 'axios'

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formDataToSend = new FormData()
      formDataToSend.append("username", formData.username)
      formDataToSend.append("fullName", formData.fullname)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("password", formData.password)
      formDataToSend.append("avatar", formData.avatar)
      formDataToSend.append("coverImage", formData.coverImage)

      const response = await axios.post('/api/v1/users/register', formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      if (response.data.success) {
        dispatch(login(response.data.data))
        navigate('/')
      }
    } catch (error) {
      console.error('Registration failed:', error)
      alert(error.response?.data?.message || 'Registration failed. Please try again.')
    }
  }

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

  return (
    <div className='flex items-center justify-center h-full'>
      <form onSubmit={handleSubmit}
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
          className='border-1 outline-none text-white p-3 mb-2 rounded'
          required
        />
        <label htmlFor="avatar" className='text-white mb-2'>Avatar:</label>
        <input 
          type="file" 
          id='avatar' 
          name='avatar'
          onChange={handleFileChange}
          className='border-1 text-white p-3 mb-4 rounded'
          required
        />
        <label htmlFor="coverImage" className='text-white mb-2'>Cover Image:</label>
        <input 
          type="file" 
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
          type='submit'>
          Register
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
      </form>
    </div>
  )
}

export default Register
