import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { useNavigate } from 'react-router'
import { useSelector,useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import Spinner from '../Spinner.jsx'


const HomeMain = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchVideos = useSelector(state => state.video.searchVideos)
  console.log(searchVideos.length > 0);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getAllVideos`, {
          withCredentials: true
        })
        if (response.data.success) {
          setVideos(response.data.data)
          console.log(response.data.data);
          
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
      }
    }
    if (searchVideos.length) {
      setVideos(searchVideos)
      setLoading(false)
    }
    else {
      fetchVideos()
    }
  }, [searchVideos])

  const openVideo = async (video) => {
    dispatch(setCurrentVideo(video))
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/addViews/${video._id}`, {
      withCredentials: true
    })
    navigate(`/video/${video._id}`)
  }

  const shortDetails = (text,till) => {
    if (text.length > till) {
      return text.slice(0, till) + '...'
    }
    else {
      return text
    }
  }



  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spinner />
      </div>
    )
  }

  if (videos.length === 0) {
    return <p className='text-white flex justify-center items-center text-2xl h-full'>No video found</p>
  }

  return (
    <div>
        
        {
        <div className='grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 overflow-y-auto '>
          {videos.map((video) => (
            <div key={video._id} className='border  border-gray-500  rounded-lg hover:cursor-pointer overflow-hidden hover:scale-102  duration-200 '
            onClick={()=>openVideo(video)}>
              <div className='relative'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className='w-full aspect-video object-cover '
                />
                <span className='absolute bottom-2 right-2 bg-[#2222] bg-opacity-70 px-2 font-bold rounded text-xs text-white'>
                  {Math.floor(video.duration)}s
                </span>
              </div>
              <div className='p-3'>
                <div className='flex gap-2 '>
                  <img 
                    src={video.owner[0].avatar} 
                    alt={video.owner[0].userName}
                    className='w-10 h-10 rounded-full object-cover'
                  />
                  <div >
                    <h3 className='text-white  font-medium '>{shortDetails(video.title,50)}</h3>
                    <p className='text-gray-400 text-md'>{shortDetails(video.owner[0].userName,50)}</p>
                    <div className='flex gap-2 text-gray-400 '>
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{format(video.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        }
    </div>
  )
}

export default HomeMain
