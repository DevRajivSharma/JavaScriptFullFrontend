import React,{useState} from 'react'
import { useNavigate } from 'react-router'
import logo from '../assets/youtubeCloneLogo.png'
import { useDispatch } from 'react-redux'
import { login } from '../store/feature/authSlice'
import { FaSpinner } from 'react-icons/fa'
import axios from 'axios'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error,setError] = useState(null)
  const [loading, setLoading] = React.useState(false)

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault()
    const formData = new FormData(e.target)
    
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/login`, {
        username_email: formData.get('username_email'),
        password: formData.get('password')
      }, {
        withCredentials: true
      })
      
      if (response.data.success) {
        setLoading(false)
        console.log('Login successful:', response.data)
        dispatch(login(response.data.data.user))
        navigate('/')
      }
    } 
    catch (error) {
      console.log('Login failed:', error)
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  return (
    <div className='flex items-center justify-center h-full '>
      <form onSubmit={handleSubmit}
        className='flex flex-col border-1 border-[#2e2e2e] rounded-lg p-8  w-100 '
      >
        <h3 className='flex items-center gap-2 mb-6'>
          {/* <img src={logo} alt="YoutubeClone" className='w-8 h-8' /> */}
          <span className='text-2xl  text-white font-semibold'>VideoTube</span>
        </h3>
        <input 
          type="text" 
          placeholder='Email' 
          name='username_email'
          className='border-1 border-[#555555]  text-white p-3 mb-4 rounded  '
          required
          
        />
        <input 
          type="password" 
          placeholder='Password' 
          name='password'
          className='border-1 border-[#555555] text-white p-3 mb-4 rounded '
          required
        />
        <button className='bg-gray-200  hover:bg-gray-300 font-semibold text-black py-2 px-5 rounded-md   duration-100 self-end'>
          {loading ? <FaSpinner className="animate-spin" /> : 'Login'}
        </button>
        {error && <p className='text-red-500 text-center p-2'>{error}</p>}
        <p className='flex justify-end gap-2 mt-6 text-gray-400'>
          New user? 
          <button 
            className='text-white  hover:text-violet-300 transition-colors hover:cursor-pointer duration-300'
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
