import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'

const HomeMain = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('/api/v1/videos/getAllVideos')
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

    fetchVideos()
  }, [])

  const openVideo = (video) => {
    dispatch(setCurrentVideo(video))
    navigate(`/video/${video._id}`)
  }

  if (loading) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-10 h-10 border-4 border-violet-500 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 overflow-y-auto '>
      {videos.map((video) => (
        <div key={video._id} className='border-1  border-white rounded-lg  overflow-hidden hover:scale-102  duration-200 '
        onClick={()=>openVideo(video)}>
          <div className='relative'>
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className='w-full aspect-video object-cover'
            />
            <span className='absolute bottom-2 right-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white'>
              {Math.floor(video.duration)}s
            </span>
          </div>
          <div className='p-3'>
            <div className='flex gap-2'>
              <img 
                src={video.owner[0].avatar} 
                alt={video.owner[0].userName}
                className='w-8 h-8 rounded-full'
              />
              <div>
                <h3 className='text-white font-medium truncate'>{video.title}</h3>
                <p className='text-gray-400 text-sm'>{video.owner[0].userName}</p>
                <div className='flex gap-2 text-gray-400 text-xs'>
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
  )
}

export default HomeMain
