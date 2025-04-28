import { useState,useEffect } from 'react'
import {Outlet} from 'react-router-dom'
import Navbar from './components/NavBar/Navbar'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login } from './store/feature/authSlice'


function App() {

  const [loaded, setLoaded] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get('/api/v1/users/getCurrentUser')
    .then(response => {
      console.log(response)
      if (response.status === 200) {
        console.log('User is logged in')
        setLoaded(false)
        dispatch(login(response.data.data))
      }
      else {
        console.log('User is not logged in')
        setLoaded(false)
      }
    },(error)=>{
      console.log(error)
      setLoaded(false)
    })

  })
  return (
    <>
      <div className={'bg-[#0f0f0f]  w-screen h-screen flex flex-col'}>
        {loaded && <div className='w-screen h-screen flex justify-center items-center'>
          <div className='w-10 h-10 border-4 border-violet-500 rounded-full animate-spin'></div>  
        </div>}
        {!loaded && <Navbar />}
        {!loaded && <Outlet />}
      </div>
    </>
  )
}

export default App
