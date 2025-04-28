import React,{ useEffect,useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import axios from 'axios'
import Spinner from './Spinner.jsx'
import like from '../assets/like.png'
import Liked from '../assets/liked.png'
import { useParams } from 'react-router'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../store/feature/videoSlice'


const Video = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const currentVideo = useSelector(state => state.video.currentVideo)
  const [videoChat,setVideoChat] = useState([])
  const [relatedVideos,setRelatedVideos] = useState([])
  const [videoLoading,setVideoLoading] = useState(true)
  console.log(currentVideo);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get(`/api/v1/videos/getVideo/${id}`)
        if (response.data.success) {
          dispatch(setCurrentVideo(response.data.data[0]))
          console.log('This is currently fetcher data .......... \n',response.data.data);
        }
      } catch (error) {
        console.error('Error fetching video:', error)
      }
    }

    if (!currentVideo && id) {
      fetchVideoData()
    }
  }, [id, currentVideo, dispatch])

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/v1/comments/getVideoComments/${currentVideo._id}`) 
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

    if (currentVideo?._id) {
      fetchComments()
    }
  }, [currentVideo?._id])


  const subscribToggle = async () => {
    try {
      const response = await axios.post('/api/v1/subscriptions/toggle/', { channelId: currentVideo.owner[0]._id })
      if (response.data.success) {
        console.log('Subscribed successfully')
      }
    } catch (error) {
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
    <div className='text-white py-1'>
      <section className='w-200 mx-2'>
        <video controls className='w-200 aspect-video border-1'>
          <source src={currentVideo.videoFile} type="video/mp4" />
        </video>

        <div className='mt-4'>
          <div>
            <h1 className='text-xl font-bold'>{currentVideo.title}</h1>
            <div className='flex justify-between'>
              <div className='flex gap-5 items-center'>
                <img 
                  src={currentVideo.owner[0].avatar}
                  alt={currentVideo.owner[0].userName}
                  className='w-10 h-10 rounded-full'
                />
                <div className='flex flex-col'>
                  <h3 className='text-lg font-semibold'>{currentVideo.owner[0].userName}</h3>
                  <h3 className='text-sm font-light'>{currentVideo.owner[0].subscribersCount} subscribers</h3>
                </div>
                {currentVideo.owner[0].isSubscribed ?
                <button className='border-1 bg-[#222] text-white  border-white p-1 px-3  rounded-xl hover:cursor-pointer'>
                  Subscribed
                </button> :(
                  <button className='border-1 bg-white text-black  border-white p-1 px-3  rounded-xl hover:cursor-pointer'>
                  Subscribe
                </button>
                )}
              </div>
              <p>
                <button>
                  <img src={like} alt="like" className='w-6 h-6 text-white' />
                </button>
              </p>
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
                      className='w-10 h-10 rounded-full'
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

      </section>
    </div>
  )
}

export default Video
