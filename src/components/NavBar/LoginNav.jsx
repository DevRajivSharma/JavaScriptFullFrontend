import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../assets/youtubeCloneLogo.png'
import { useDispatch } from 'react-redux'
import { setSearchVideos } from '../../store/feature/videoSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
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

        if (!query) {
            return // Don't search if query is empty
        }

        try {
            const response = await axios.post('/api/v1/videos/searchVideos', {
                query
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
            <div className='flex px-10 justify-between  items-center w-screen  border-1 border-amber-50'>
                <img src={logo} alt="Logo" width={50} />
                <form  onSubmit={handleSearchFormSubmit} className='flex justify-between gap-3 p-1 '>
                    <input type="text" name="query" placeholder='Search'
                        className='border-1  outline-none text-white p-1 w-full rounded  '>
                    </input>
                    <button type='submit' className='text-white px-3 hover:cursor-pointer hover:bg-white hover:text-black border rounded '>
                        Search
                    </button>
                </form>
                <div className='flex gap-1 items-center'>
                    <span className='text-white'>{userName}</span>
                    <img src={profileImg} width={30} height={20} alt="Profile"
                        className='object-cover rounded-full '
                        style={{ width: '40px', height: '40px' }} />
                </div>
            </div>
        )
    }
}

export default LoginNav
