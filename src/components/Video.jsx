import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import axios from 'axios'
import Spinner from './Spinner.jsx'
import like from '../assets/like.png'
import liked from '../assets/liked.png'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../store/feature/videoSlice'
import { FaSpinner } from 'react-icons/fa'

const Video = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const currentVideo = useSelector(state => state.video.currentVideo)
  const [videoChat,setVideoChat] = useState([])
  const [relatedVideos,setRelatedVideos] = useState([])
  const [videoLoading,setVideoLoading] = useState(true)
  const [subscribedata,setSubscribedata] = useState()
  const [subscribeLoading,setSubscribeLoading] = useState(false)
  const [isLiked, setIsLiked] = useState(null)
  const [totalLikes, setTotalLikes] = useState()
  useEffect(() => {
    // Fetch video data if not already loaded
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getVideo/${id}`, {
          withCredentials: true
        })
        if (response.data.success) {
          dispatch(setCurrentVideo(response.data.data[0]))
          console.log('This is currently fetcher data .......... \n',response.data.data);
        }
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }

    // Fetch related videos
    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getRelatedVideos/${id}`, {
          withCredentials: true
        })
        if (response.data.success) {
          setRelatedVideos(response.data.data)
          console.log(relatedVideos)
        }
      }
      catch (error) {
        console.log(error)
      }
    }

    // Fetch comments
    const fetchComments = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/comments/getVideoComments/${currentVideo._id}`, {
          withCredentials: true
        }) 
        if (response.data.success) {
          const chatExist = (response.data.data).length
          if (chatExist) {
            setVideoChat(response.data.data)
            console.log(videoChat)
          }
          else {
            setVideoChat(0)
          }
        }
      } catch (error) {
        console.log(error)
      } finally {
        setVideoLoading(false)
      }
    }

    // Logic for when to fetch what
    if (!currentVideo && id) {
      fetchVideoData()
    }
    if (currentVideo) {
      fetchRelatedVideos()
      setSubscribedata(currentVideo.owner[0].isSubscribed)
      setIsLiked(currentVideo.isLiked)
      setTotalLikes(currentVideo.totalLikes)
    }
    if (currentVideo?._id) {
      fetchComments()
    }
  }, [id, currentVideo, dispatch])

  const subscribeToggle = async () => {
    try {
      
      setSubscribeLoading(true)
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/subscriptions/toggle/${currentVideo.owner[0]._id }`, {}, {
        withCredentials: true
      })
      if (response.data.success) {
        setSubscribedata(!subscribedata)
        setSubscribeLoading(false)
        console.log('Subscribed successfully')
      }
    } catch (error) {
      setSubscribeLoading(false)
      console.log('Error is ',error)
    }
  }

  const toggleVideoLike = async () => {
    setIsLiked(!isLiked)
    setTotalLikes(isLiked? totalLikes - 1 : totalLikes + 1)
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/likes/togleVideoLike/${id}`, {}, {
        withCredentials: true
      })
      if (response.data.success) {
        console.log('Video liked successfully : ', response.data)
      } 
    }
    catch (error) {
      console.log(error)
    }
  }


  if (!currentVideo || currentVideo.length === 0) {
    return (
      <div className='flex justify-center items-center h-screen'>
      <Spinner />
    </div>
    )
  }

  return (
    <div className='flex flex-col md:flex-row lg:flex-row  text-white py-1'>
      <section className='lg:w-200 md:w-200 mx-2'>
        <video controls className='lg:w-200 md:w-200 aspect-video border-1 border-[#3a3838] rounded p-2'>
          <source src={currentVideo.videoFile} type="video/mp4" />
        </video>

        <div className='mt-4'>
          <div>
            <h1 className='text-xl font-bold'>{currentVideo.title}</h1>
            <div className='flex justify-between'>
              <div className='flex gap-3 items-center'>
                <img 
                  src={currentVideo.owner[0].avatar}
                  alt={currentVideo.owner[0].userName}
                  className='w-10 h-10 rounded-full object-cover'
                />
                <div className='flex flex-col'>
                  <h3 className='text-lg font-semibold'>{currentVideo.owner[0].userName}</h3>
                  <h3 className='text-sm font-light'>{currentVideo.owner[0].subscribersCount} subscribers</h3>
                </div>
                {subscribedata ?
                <button
                onClick={subscribeToggle}
                className='  text-[#dcd4d4]  bg-[#535353] border-white p-1 px-3 font-semibold  
                rounded-full hover:cursor-pointer w-[104px] h-[32px] outline-none'>
                  {subscribeLoading? <FaSpinner className='animate-spin m-auto '/> : 'Subscribed'}
                </button> :(
                  <button 
                  onClick={subscribeToggle}
                  className='border-1 bg-white text-black  border-white p-1 px-3 hover:bg-[#f4f1f1] font-semibold  rounded-full hover:cursor-pointer w-[95px] h-[33px] outline-none'>
                    {subscribeLoading? <FaSpinner className='animate-spin m-auto '/> : 'Subscribe'}
                  
                </button>
                )}
              </div>
              <div className='flex gap-2 mr-5 items-center'>
                <button
                onClick={toggleVideoLike}
                className=' hover:cursor-pointer'
                >
                  {isLiked?<img src={liked} alt="like" className='w-6 h-6 text-white ' />:<img src={like} alt="like" className='w-6 h-6 text-white ' />}
                </button>
                {totalLikes}
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2 rounded mt-4 bg-[#222] p-2  text-gray-400 text-xs'>
                <div className='flex gap-5'>
                    <span>{currentVideo.views} views</span>
                    <span>{format(currentVideo.createdAt)}</span>
                </div>
                
                <p>
                  <h3 className='text-white mb-1'>Descirption</h3>
                  {currentVideo.description}
                </p>
          </div>
          
        </div>

        <div className='mt-6'>
            <h3 className='text-lg font-semibold mb-4'>Comments</h3>
            {videoLoading ? (
              <Spinner />
            ) : (
              <div className='space-y-4'>
                {videoChat.length === undefined ? <p>No comments yet</p> : (
                videoChat.map((comment, index) => (
                  <div key={index} className='flex gap-3 items-start border-b border-gray-700 pb-4'>
                    <img 
                      src={comment.user[0].avatar} 
                      alt={comment.user[0].userName}
                      className='w-10 h-10 rounded-full object-cover'
                    />
                    <div className='flex-1'>
                      <div className='flex items-center gap-2'>
                        <p className='font-medium'>{comment.user[0].userName}</p>
                      </div>
                      <p className='text-gray-300 mt-1'>{comment.content}</p>
                      <div className='flex items-center gap-4 mt-2 text-sm text-gray-400'>
                        <button className='flex items-center gap-1'>
                          <span>👍</span>
                          <span>{comment.totalLikes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )
                }
              </div>
            )}
        </div>
      </section>
      <section>
            {relatedVideos.length === 0 ? "NO RELATED VIDEO" : (
              <div className='flex flex-col gap-4'>
                <h3 className='text-lg font-semibold mb-4'>Related Videos</h3>
                {relatedVideos.map((video, index) => (
                  <div key={index} className='flex gap-3 items-start'>
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className='w-40 h-24 object-cover rounded'
                    />
                    <div className='flex-1'>
                      <h3 className='text-md font-medium'>{video.title}</h3>
                      <div className='flex items-center gap-2 text-sm text-gray-400'>
                        <span>{video.views} views</span>
                        <span>•</span>
                        <span>{format(video.createdAt)}</span>
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

export default Video
