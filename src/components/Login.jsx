import React from 'react'
import { useNavigate } from 'react-router'
import logo from '../assets/youtubeCloneLogo.png'
import { useDispatch } from 'react-redux'
import { login } from '../store/feature/authSlice'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const response = await axios.post('/api/v1/users/login', {
        username_email: formData.get('username_email'),
        password: formData.get('password')
      })
      
      if (response.data.success) {
        dispatch(login(response.data.data.user))
        navigate('/')
      }
    } catch (error) {
      console.error('Login failed:', error)
      alert(error.response?.data?.message || 'Login failed. Please try again.')
    }
  }

  return (
    <div className='flex items-center justify-center h-full '>
      <form onSubmit={handleSubmit}
        className='flex flex-col border-1 border-white rounded-lg p-8  w-100 '
      >
        <h3 className='flex items-center gap-2 mb-6'>
          <img src={logo} alt="YoutubeClone" className='w-8 h-8' />
          <span className='text-2xl  text-white'>YoutubeClone</span>
        </h3>
        <input 
          type="text" 
          placeholder='Email' 
          name='username_email'
          className='border-1  outline-none text-white p-3 mb-4 rounded  '
          required
          
        />
        <input 
          type="password" 
          placeholder='Password' 
          name='password'
          className='border-1 text-white p-3 mb-4 rounded '
          required
        />
        <button className='bg-violet-600 text-white py-2 px-6 rounded-md hover:bg-violet-700 transition-all duration-300 self-end'>
          Login
        </button>
        <p className='flex justify-end gap-2 mt-6 text-gray-400'>
          New user? 
          <button 
            className='text-violet-400 hover:text-violet-300 transition-colors hover:cursor-pointer duration-300'
            onClick={() => navigate('/register')}
          >
            register
          </button>
        </p>
      </form>
    </div>
  )
}

export default Login
