import React, { useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import Spinner from '../Spinner.jsx'


const HomeMain = () => {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [fetchingMore, setFetchingMore] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const searchVideos = useSelector(state => state.video.searchVideos)
  const observer = useRef()

  useEffect(() => {
    setVideos([])
    setPage(1)
    setHasMore(true)
  }, [searchVideos])

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true)
      try {
        let response
        if (searchVideos.length) {
          setVideos(searchVideos)
          setHasMore(false)
        } else {
          response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getAllVideos?page=${page}`,
            { withCredentials: true }
          )
          if (response.data.success) {
            if (page === 1) {
              setVideos(response.data.data)
            } else {
              setVideos(prev => [...prev, ...response.data.data])
            }
            setHasMore(response.data.data.length > 0)
          }
        }
      } catch (error) {
        console.error('Error fetching videos:', error)
      } finally {
        setLoading(false)
        setFetchingMore(false)
      }
    }
    fetchVideos()
    // eslint-disable-next-line
  }, [page, searchVideos])

  const lastVideoRef = useCallback(
    node => {
      if (loading || fetchingMore || !hasMore) return
      if (observer.current) observer.current.disconnect()
      observer.current = new window.IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setFetchingMore(true)
          setPage(prevPage => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, fetchingMore, hasMore]
  )

  const openVideo = useCallback(
    async (video) => {
      dispatch(setCurrentVideo(video))
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/addViews/${video._id}`,
        {},
        { withCredentials: true }
      )
      navigate(`/video/${video._id}`)
    },
    [dispatch, navigate]
  )

  const shortDetails = useCallback((text, till) => {
    if (text.length > till) {
      return text.slice(0, till) + '...'
    }
    else {
      return text
    }
  }, [])

  if (loading && page === 1) {
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
    <div className='lg:p-4 md:p-4'>
      <div className=''>
        <h2 className='text-white  lg:text-2xl md:text-2xl font-bold p-2'>Discover videos</h2>
      </div>
      <div className='grid  grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-2 overflow-y-auto '>
        {videos.map((video, idx) => {
          if (videos.length === idx + 1 && hasMore && !searchVideos.length) {
            return (
              <div
                ref={lastVideoRef}
                key={video._id}
                className='rounded-lg hover:cursor-pointer overflow-hidden  duration-200 '
                onClick={() => openVideo(video)}
              >
                <div className='relative'>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className='w-full aspect-video rounded-lg object-cover '
                  />
                  <span className='absolute bottom-2 right-2 bg-[#4e4a46] bg-opacity-0 px-2 font-semibold rounded text-xs text-white'>
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
                      <h3 className='text-white  font-medium '>{shortDetails(video.title, 50)}</h3>
                      <p className='text-gray-400 text-md'>{shortDetails(video.owner[0].userName, 50)}</p>
                      <div className='flex gap-2 text-gray-400 '>
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{format(video.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          } else {
            return (
              <div
                key={video._id}
                className='rounded-lg hover:cursor-pointer overflow-hidden  duration-200 '
                onClick={() => openVideo(video)}
              >
                <div className='relative'>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className='w-full aspect-video rounded-lg object-cover '
                  />
                  <span className='absolute bottom-2 right-2 bg-[#4e4a46] bg-opacity-0 px-2 font-semibold rounded text-xs text-white'>
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
                      <h3 className='text-white  font-medium '>{shortDetails(video.title, 50)}</h3>
                      <p className='text-gray-400 text-md'>{shortDetails(video.owner[0].userName, 50)}</p>
                      <div className='flex gap-2 text-gray-400 '>
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{format(video.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
      {fetchingMore && (
        <div className='flex justify-center items-center py-4'>
          <Spinner />
        </div>
      )}
    </div>
  )
}

export default HomeMain
