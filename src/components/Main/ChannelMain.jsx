import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Spinner from '../Spinner.jsx'
import axios from 'axios'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'

const ChannelMain = () => {
  const user = useSelector(state => state.auth.user)
  const [fetchUser, setFetchUser] = useState(null)
  const [videos, setVideos] = useState([])
  const [playlist, setPlaylist] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [currentOpened, setCurrentOpened] = useState(1)
  const [currentFilter, setCurrentFilter] = useState()
  const openFilterCss = 'hover:cursor-pointer bg-black text-sm  px-3 py-1 rounded-md text-white font-semibold'
  const closeFilterCss = 'hover:cursor-pointer text-[#878686] text-sm  px-3 py-1 font-semibold rounded-[8px] text-md'
  const openTabCss = 'text-md  w-75 text-black bg-white font-semibold '
  const closeTabCss = 'text-md  w-75  p-2 text-gray-600 hover:bg-gray-400 '
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/channels/getChannelProfile/${user._id}`, {
          withCredentials: true
        })
        if (response.data.success) {
          setFetchUser(response.data.data)
          setVideos(response.data.data.videos)
          setPlaylist(response.data.data.playlists)
          console.log(response.data.data);
          setIsloading(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchVideos()
  }, [])

  const openVideo = async (video) => {
    try {
      console.log(video);
      await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/addViews/${video._id}`, {}, {
        withCredentials: true
      })
      navigate(`/video/${video._id}`)
    }
    catch (error) {
      alert("These video is not Published")
    }
  }

  const handleFilter = (filter) => {
    console.log(filter);
    setCurrentFilter(filter)
    filterVideos(filter)
  }


  const filterVideos = (filter) => {
    let sortedVideos = [...videos]
    if (filter === "Latest") {
      sortedVideos.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
    if (filter === "Popular") {
      sortedVideos.sort((a, b) => b.views - a.views)
    }
    if (filter === "Oldest") {
      sortedVideos.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    setVideos(sortedVideos)
  }



if (!user) return <p className='flex text-white justify-center items-center h-full text-lg'>User not found</p>

  if (isloading) return (
    <div className='flex h-full justify-center items-center'>
      <Spinner />
    </div>
  )

  return (
    <div className='text-white p-2'>
      <section>
        <img
          src={user.coverImage}
          alt="CoverImage"
          className='w-full h-50 object-cover rounded'
        />
        <div className='flex gap-3  flex-col lg:flex-row  py-2'>
          <img
            src={user.avatar}
            alt="profileImage"
            className='w-40 h-40 m-auto lg:m-0 rounded-full object-cover relative bottom-7'
          />
          <div className='flex flex-col  items-center lg:items-start'>
            <h1 className='text-3xl font-bold'>{user.fullName}</h1>
            <div className='flex gap-1'>
              <p className=' text-md '>@{user.userName} </p>
              <span className='text-gray-400 text-sm'>•</span>
              <p className='text-gray-400 text-sm'>{fetchUser.totalSubscribers} subscribers</p>
              <span className='text-gray-400 text-sm'>•</span>
              <p className='text-gray-400 text-sm'>{(fetchUser.videos).length} Videos</p>
            </div>
            <p className='text-gray-400 text-sm'><b>Created</b>  {format(user.createdAt)}</p>
            <p className='text-gray-400 text-sm'><b>Updated</b>  {format(user.updatedAt)}</p>
          </div>

        </div>

      </section>
      <section>
        <div className='flex gap-2'>
          <button
            className={currentOpened == 1 ? openTabCss : closeTabCss}
            onClick={() => setCurrentOpened(1)}
          >
            Videos
          </button>
          <button
            className={currentOpened == 2 ? openTabCss : closeTabCss}
            onClick={() => setCurrentOpened(2)}
          >
            Playlists
          </button>
          <button
            className={currentOpened == 3 ? openTabCss : closeTabCss}
            onClick={() => setCurrentOpened(3)}
          >
            About
          </button>
        </div>
      </section>
      <hr className=' mb-2  border-1  border-[#3F3F3F]' />
      <section>
        {currentOpened == 1 && (
          <div>
            <div className='flex justify-end gap-3 mx-1 my-3 '>
              <div className='bg-[#272727] px-2 p-1 rounded'>
              <button className={currentFilter == "Latest" ? openFilterCss : closeFilterCss}
                onClick={() => (handleFilter("Latest"))}
              >
                Latest
              </button>
              <button className={currentFilter == "Popular" ? openFilterCss : closeFilterCss}
                onClick={() => (handleFilter("Popular"))}
              >
                Popular
              </button>
              <button className={currentFilter == "Oldest" ? openFilterCss : closeFilterCss}
                onClick={() => (handleFilter("Oldest"))}
              >
                Oldest
              </button>
              </div>
            </div>
            <div className='grid grid-cols-1 mb-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
              {videos.map((video, index) => (
                <div key={index} className='relative  hover:cursor-pointer p-1'>
                  <img
                    src={video.thumbnail}
                    alt="thumbnail"
                    className='w-full h-40 object-cover rounded'
                    onClick={() => openVideo(video)}
                  />
                  <span className='absolute bottom-15 right-2 bg-[#2222] bg-opacity-70 px-2 font-bold rounded text-xs text-white'>
                    {Math.floor(video.duration)}s
                  </span>
                  <div className='flex justify-between items-center'>
                    <div className=' bottom-0 left-0 right-0 '>
                      <h3 className='text-white font-medium text-lg'>{video.title}</h3>
                      <div className='flex gap-2 text-gray-400 text-sm'>
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{format(video.createdAt)}</span>
                      </div>
                    </div>
                    <div>
                      <p className='text-white  w-fit'>{video.isPublished ? "Published" : "Not-Published"}</p>
                    </div>
                  </div>
                </div>

              ))}
            </div>
          </div>
        )}
        {currentOpened == 2 && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-4'>
            {playlist.map((playlist, index) => (
              <div key={index} className='border-1 rounded hover:cursor-pointer border-gray-400'>
                <img
                  src={playlist.thumbnail}
                  alt="thumbnail"
                  className='w-full h-40 object-cover rounded'
                  onClick={() => openVideo(playlist)}
                />

                <div className=' bottom-0 left-0 right-0 bg-black/70 p-2'>
                  <h3 className='text-white font-medium text-lg'>{playlist.name}</h3>
                  <div className='flex gap-2 text-gray-400 text-sm'>
                    <span className='flex '>        <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      height="20"
                      width="20"
                      viewBox="0 0 24 24"
                      focusable="false"
                      aria-hidden="true"
                      style={{ pointerEvents: 'none', display: 'inherit', }}
                    >
                      <path
                        clipRule="evenodd"
                        d="M4 5c-.552 0-1 .448-1 1s.448 1 1 1h16c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h16c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Zm11 3.862c0-.384.415-.625.748-.434L21 17l-6.252 3.573c-.333.19-.748-.05-.748-.435v-6.276ZM4 13c-.552 0-1 .448-1 1s.448 1 1 1h6c.552 0 1-.448 1-1s-.448-1-1-1H4Zm-1 5c0-.552.448-1 1-1h6c.552 0 1 .448 1 1s-.448 1-1 1H4c-.552 0-1-.448-1-1Z"
                        fillRule="evenodd"
                      />
                    </svg >{playlist.totalContainVideos} videos</span>
                    <span>•</span>
                    <span>{format(playlist.createdAt)}</span>
                  </div>
                </div>
              </div>

            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default ChannelMain
