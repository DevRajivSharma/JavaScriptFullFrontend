import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import logo from '../../assets/youtubeCloneLogo.png'
import { logout } from '../../store/feature/authSlice'
import { useDispatch } from 'react-redux'
import { setSearchVideos } from '../../store/feature/videoSlice'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FaSpinner, FaUser } from 'react-icons/fa'
const LoginNav = () => {
    const [profileImg, setProfileImg] = useState('')
    const [userName, setUserName] = useState('')
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [spinnerClass, setSpinnerClass] = useState('hidden')
    const [searchCLass, setSearchCLass] = useState('')
    const [showModal, setShowModal] = React.useState(false)
    const modalRef = React.useRef(null)
    const profileImgRef = React.useRef(null)
    const handleProfileClick = () => {
        setShowModal(showModal => !showModal)
    }

    const handleLogout = async () => {
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/logout`, {}, {
            withCredentials: true
          })
          if (response.status === 200) {
            dispatch(logout())
            navigate('/login')
          }
        }
        catch (error) {
          console.error('Logout failed:', error)
          alert(error.response?.data?.message || 'Logout failed. Please try again.')
        }
      }

    useEffect(() => {
        if (!showModal) return
        console.log('showModal is true')
        function handleClickOutside(event) {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target) &&
                profileImgRef.current &&
                !profileImgRef.current.contains(event.target)
            ) {
                setShowModal(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showModal])
    useEffect(() => {
        if (auth.user) {
            setProfileImg(auth.user.avatar)
            setUserName(auth.user.userName)
        }
    })
    const handleSearchFormSubmit = async (e) => {
        e.preventDefault()
        setSpinnerClass('')
        setSearchCLass('hidden')
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
                    setSpinnerClass('hidden')
                    setSearchCLass('')
                    dispatch(setSearchVideos(response.data.data.videos))
                    navigate('/')
                }
                else {
                    setSpinnerClass('Hidden')
                    setSearchCLass('')
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
            <div className='flex p-2 px-2 justify-between  items-center w-screen border-b-1  border-[#2e2e2e]' >
                {/* <img src={logo} alt="Logo" width={50} /> */}
                <h1
                    onClick={() => {
                        navigate('/')
                    }}
                    className='text-white hover:cursor-pointer text-xl hidden lg:block md:block font-bold'
                >VideoTube
                </h1>
                <form onSubmit={handleSearchFormSubmit} className='flex items-center justify-between gap-3 p-1 '>
                    <input type="text" name="query" placeholder='Search videos...'
                        className='text-white border-1 rounded border-[#555555] 
                        p-2 lg:w-100 outline-none font-semibold ' required>
                    </input>

                    <button type='submit'
                        className='hover:cursor-pointer hover:bg-[#4e4e4e6b] p-3 rounded'>
                        <FaSpinner className={`animate-spin text-white ${spinnerClass} `} />
                        <FaSearch color='white' className={`${searchCLass}`} />
                    </button>
                </form>
                <div className='flex gap-1 items-center'>
                    <img 
                    ref={profileImgRef}
                    onClick={handleProfileClick}
                    src={profileImg} alt="Profile"
                    className='object-cover rounded-full w-[35px] h-[35px]' />
                </div>
                {showModal && (
                    <div ref={modalRef} 
                    className='absolute text-[16px] text-white right-4 top-15 md:top-2  lg:top-2 w-fit lg:right-17 md:right-17 z-10  sm:w-[300px]  lg:w-[300px]  rounded-lg bg-[#272727]'>
                        <section className='flex gap-4 algn-center p-3 pb-5 border-b-1 border-[#585858]'>
                            <img src={profileImg} alt="Profile"
                                className='object-cover rounded-full w-[40px] h-[40px]' />
                            <div>
                                <p>{auth.user.fullName}</p>
                                <p>@{userName}</p>
                                <p 
                                onClick={() => {
                                    handleProfileClick()
                                    navigate('/channel')
                                }}
                                className='text-[#3EA6FF] hover:cursor-pointer'>Visit your channel</p>
                            </div>
                        </section>
                        <section className='pt-2'>
                            <p className='flex gap-4 p-2 hover:bg-[#3e3e3e] hover:cursor-pointer'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="24"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    aria-hidden="true"
                                    style={{ pointerEvents: 'none', display: 'inherit' }}
                                    fill="white"
                                    className=''
                                >
                                    <path
                                        d="M4 20h14v1H3V6h1v14zM6 3v15h15V3H6zm2.02 14c.36-2.13 1.93-4.1 5.48-4.1s5.12 1.97 5.48 4.1H8.02zM11 8.5a2.5 2.5 0 015 0 2.5 2.5 0 01-5 0zm3.21 3.43A3.507 3.507 0 0017 8.5C17 6.57 15.43 5 13.5 5S10 6.57 10 8.5c0 1.69 1.2 3.1 2.79 3.43-3.48.26-5.4 2.42-5.78 5.07H7V4h13v13h-.01c-.38-2.65-2.31-4.81-5.78-5.07z"
                                    />
                                </svg>
                                Account
                            </p>
                            <p className='flex gap-4 p-2 hover:bg-[#3e3e3e] hover:cursor-pointer'
                            onClick={handleLogout}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    enableBackground="new 0 0 24 24"
                                    height="24"
                                    width="24"
                                    viewBox="0 0 24 24"
                                    focusable="false"
                                    aria-hidden="true"
                                    style={{ pointerEvents: 'none', display: 'inherit', }}
                                    fill="white"
                                >
                                    <path
                                        d="M20 3v18H8v-1h11V4H8V3h12zm-8.9 12.1.7.7 4.4-4.4L11.8 7l-.7.7 3.1 3.1H3v1h11.3l-3.2 3.3z"
                                    />
                                </svg>
                                Sign out
                            </p>
                        </section>
                    </div>
                )}
            </div>

        )
    }
}

export default LoginNav
