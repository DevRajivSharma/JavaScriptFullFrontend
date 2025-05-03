import { useState,useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from './store/feature/authSlice'
import Spinner from './components/Spinner'

function App() {

  const [loader, setloader] = useState(true)
  const dispatch = useDispatch()
  console.log(import.meta.env.VITE_BACKEND_URL)
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getCurrentUser`, {
          withCredentials: true
        })
        console.log(response)
        if (response.status === 200) {
          console.log('User is logged in')
          setloader(false)
          dispatch(login(response.data.data))
        }
        else {
          console.log('User is not logged in')
          setloader(false)
        }
      } catch (error) {
        console.log(error)
        setloader(false)
      }
    }
    fetchCurrentUser()
  }, [])

  return (
    <>
      <div className={'bg-[#0f0f0f]  w-screen h-screen flex flex-col'}>
        {loader && (
      <div className='flex justify-center items-center h-full'>
        <Spinner />
      </div>
    )}
        {!loader && <Navbar />}
        {!loader && <Outlet />}
      </div>
    </>
  )
}

export default App
