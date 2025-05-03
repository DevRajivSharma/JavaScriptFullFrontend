import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../assets/youtubeCloneLogo.png'
import { useDispatch } from 'react-redux'
import { setSearchVideos } from '../../store/feature/videoSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
const LoginNav = () => {
    const [profileImg, setProfileImg] = useState('')
    const [userName, setUserName] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (auth.user) {
            setProfileImg(auth.user.avatar)
            setUserName(auth.user.userName)
        }
    })
    const handleSearchFormSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.target)
        const query = formData.get('query')
        console.log(query);
        if (!query) {
            return // Don't search if query is empty
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/searchVideos`, {
                query
            }, {
                withCredentials: true
              })

            if (response.data.success) {
                if (response.data.data.videos) {
                    dispatch(setSearchVideos(response.data.data.videos))
                    navigate('/')
                }
                else {
                    dispatch(setSearchVideos([]))
                    navigate('/')
                }
            } else {
                dispatch(setSearchVideos([]))
                navigate('/')
            }
        }
        catch (error) {
            console.error('Error searching videos:', error.response?.data?.message || error.message)
            dispatch(setSearchVideos([]))
            navigate('/')
        }
    }

    if (profileImg) {
        return (
            <div className='flex px-1 lg:px-5 md:px-5 justify-between  items-center w-screen  border-1 border-amber-50'>
                <img src={logo} alt="Logo" width={50} />
                <form onSubmit={handleSearchFormSubmit} className='flex  justify-between gap-3 p-1 '>
                    <div className="p-[2px]  rounded bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                        <div className="bg-black rounded ">
                            <input type="text" name="query" placeholder='Search'
                                className='text-white px-1 lg:w-200 outline-none'>
                            </input>
                        </div>
                    </div>

                    <button type='submit'
                        className='text-black font-bold px-3 hover:cursor-pointer hover:text-white  hover:scale-105 duration-200  rounded bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'>
                        <FaSearch color='black' className='lg:hidden md:hidden' />
                        <span className='hidden lg:inline md:inline'>Search</span>
                    </button>
                </form>
                <div className='flex gap-1 items-center'>
                    <span className='text-white hidden md:inline lg:inline'>{userName}</span>
                    <img src={profileImg} width={30} height={20} alt="Profile"
                        className='object-cover rounded-full '
                        style={{ width: '40px', height: '40px' }} />
                </div>
            </div>
        )
    }
}

export default LoginNav
