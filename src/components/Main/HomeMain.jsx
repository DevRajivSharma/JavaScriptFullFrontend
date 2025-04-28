import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import Spinner from '../Spinner.jsx'


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

  const openVideo = async (video) => {
    dispatch(setCurrentVideo(video))
    await axios.patch(`/api/v1/videos/addViews/${video._id}`)
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
        if (response.data.data.videos){
          setVideos(response.data.data.videos)
        }
        else {
          setVideos([])
        }
      } else {
        setVideos([]) // Clear videos if no results
      }
    }
    catch (error) {
      console.error('Error searching videos:', error.response?.data?.message || error.message)
      setVideos([]) // Reset videos on error
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
      <form onSubmit={handleSearchFormSubmit} className='flex justify-between gap-3 p-2 '>
        <input type="text" name="query" placeholder='Search'
        className='border-1  outline-none text-white p-1 w-full rounded  '>
        </input>
        <button type='submit' className='text-white px-3 hover:cursor-pointer hover:bg-white hover:text-black border rounded '>
          Search
        </button>
      </form>
        
        {
        <div className='grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-2 overflow-y-auto '>
          {videos.map((video) => (
            <div key={video._id} className=' overflow-hidden hover:scale-102  duration-200 '
            onClick={()=>openVideo(video)}>
              <div className='relative'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className='w-full aspect-video object-cover rounded-lg'
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
                    className='w-8 h-8 rounded-full'
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
