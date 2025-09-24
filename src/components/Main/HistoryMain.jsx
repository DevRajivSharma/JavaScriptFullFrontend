import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Spinner from '../Spinner'
import { format } from 'timeago.js'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import { useNavigate } from 'react-router-dom'
import cross from '../../assets/cross.png'

const HistoryMain = () => {
  const [history, setHistory] = useState([])
  const [isloading, setLoading] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/getUserWatchHistory`, {
          withCredentials: true
        })
        if (response.data.success) {
          setHistory(response.data.data)
          console.log(response.data.data);
          setLoading(false)
        }
      }
      catch (error) {
        console.log(error)
        setLoading(false)
      }
    }

    fetchHistory()
  }, [])

  const openVideo = async (video) => {
    dispatch(setCurrentVideo(video))
    await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/addViews/${video._id}`,{}, {
      withCredentials: true
    })
    navigate(`/video/${video._id}`)
  }

  const removeWatchHistory = async (videoId) => {
    console.log("clicked");
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/rmVideoWH/${videoId}`, {
      withCredentials: true
    })
    window.location.reload()
  }
  const clearAll = async (videoId) => {
    console.log("clicked");
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v1/users/clearAllWH`, {
      withCredentials: true
    })
    window.location.reload()
  }

  const shortDetails = (text,till) => {
    if (text.length > till) {
      return text.slice(0, till) + '...'
    }
    else {
      return text
    }
  }

  if (isloading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner />
      </div>
    )
  }
  if (history.length === 0) {
    return <p className='text-white flex justify-center items-center text-2xl h-full'>No video found</p>
  }
  return (
    <div className='text-white m-4 '>
      <div className='flex justify-between items-center max-w-200'>
      <h1 className='text-4xl  font-bold '>Watch History</h1>
      <p 
        className='bg-gray-200 rounded font-semibold 
        hover:cursor-pointer text-black px-1 hover:bg-gray-300  text-md'
        onClick={()=>clearAll()}
        >
        Clear all
      </p>
      </div>
      {
        <div className='flex flex-col mt-2 max-w-200 hover:cursor-pointer '>
          {history.map((video) => (
            <div key={video._id} className='flex p-4  rounded-lg  overflow-hidden'
            >
              <div className='relative'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  onClick={()=>openVideo(video)}
                  className='w-100 aspect-video object-cover rounded'
                />
                <span className='absolute bottom-2 right-2 bg-[#2222] bg-opacity-70 px-2 font-bold rounded text-xs text-white'>
                  {Math.floor(video.duration)}s
                </span>
              </div>
              <div className='pl-3 flex gap-5'>
                <div className='flex gap-2 w-60'>
                  <div>
                    <h3 className='text-white font-medium text-2xl'>{shortDetails(video.title,50)}</h3>
                    <div className='flex gap-2 text-gray-400 text-sm'>
                      <span>{video.views} views</span>
                      <span>•</span>
                      <span>{format(video.createdAt)}</span>
                    </div>
                    <p className='text-gray-400 text-md'>{shortDetails(video.owner[0].userName,50)}</p>
                    <p className='text-gray-400 text-md'>{shortDetails(video.description,100)}</p>
                    
                  </div>
                </div>
                <div>
                
                <img width="30" height="30"
                 src={cross} 
                 alt="multiply"
                 onClick={()=>removeWatchHistory(video._id)}
                 className='hover:cursor-pointer hover:bg-[#3d3d3dc7] m-1 rounded-full '/>
                </div>
              </div>
              
            </div>
          ))}
        </div>
        }
    </div>
  )
}

export default HistoryMain
