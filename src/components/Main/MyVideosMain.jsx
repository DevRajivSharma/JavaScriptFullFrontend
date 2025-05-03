import React,{useEffect,useState,useRef} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Spinner from '../Spinner'
import { format } from 'timeago.js'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'


const MyVideosMain = () => {
  const [videos, setVideos] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [currentOpened, setCurrentOpened] = useState(1)
  const openTabCss = 'text-md  w-75 text-black bg-white font-semibold '
  const closeTabCss = 'text-md  w-75  p-2 text-gray-600 hover:bg-gray-400 '
  const submitBtnRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getMyVideos`, {
          withCredentials: true
        })
        if (response.data.success) {
          setVideos(response.data.data)
          setIsloading(false)
          
          // console.log(response.data.data);
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchVideos()
  },[])

  const shortDetails = (text,till) => {
    if (text.length > till) {
      return text.slice(0, till) + '...'
    }
    else {
      return text
    }
  }

  const editVideo = (video) => {
    dispatch(setCurrentVideo(video))
    navigate(`/updateVideo/${video._id}`)
  }

  const submitFormHandler = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    try {
      submitBtnRef.current.disabled = true
      submitBtnRef.current.innerText = 'Uploading...'
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/uploadVieo`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }, {
        withCredentials: true
      })
      if (response.data.success) {
        alert('Video uploaded successfully!')
        // Optionally, refresh the video list or reset the form here
      }
    } catch (error) {
      alert('Error uploading video: ' + (error.response?.data?.message || error.message))
    }
  }

  if (isloading) {
    return (
      <div className='flex justify-center items-center h-full'>
        <Spinner />
      </div>
    )
  }
  if (videos == []) {
    return <p className='text-white flex justify-center items-center text-2xl h-full'>No video found</p>
  }
  return (
      <div className='text-white    overflow-auto'>
        <section>
          
          <div className='flex  gap-2 p-4'>
            <button 
            className={currentOpened == 1 ? openTabCss : closeTabCss}
            onClick={() => setCurrentOpened(1)}
            >
              All Videos
            </button>
            <button 
            className={currentOpened == 2 ? openTabCss : closeTabCss}
            onClick={() => setCurrentOpened(2)}
            >
              Upload Video
            </button>
          </div>
        </section>
        {currentOpened == 1 && (
        <div className='flex  flex-col mt-2  '>
          {videos.map((video) => (
            <div key={video._id} 
            className='flex p-2 m-2  hover:bg-gray-800  duration-200 rounded-lg  overflow-hidden hover:cursor-pointer w-fit'
            onClick={()=>editVideo(video)}
            >
              <div className='relative'>
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
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
                    <p className='text-gray-400 text-md'>{shortDetails(video.description,100)}</p>
                    
                  </div>
                </div>
                <div>
          
                
                </div>
              </div>
              
            </div>
          ))}
        </div>
        )
        }
        {
          currentOpened == 2 && (
            <form
              className="flex flex-col gap-4 px-8  rounded-lg    "
              onSubmit={submitFormHandler}
            >   
            <label className='text-white font-semibold'>
              Video File :
            </label>
            <div class="flex items-center justify-start w-full">          
                <label 
                className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 ">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span></p>
                    </div>
                    <input  type="file"
                              name="video"
                              accept="video/*"
                              required 
                              className="hidden" />
                </label>
            </div> 

            <label className='text-white font-semibold'>
              Video Thumbnail :
            </label>
            <div class="flex items-center justify-start w-full">          
                <label 
                className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 ">
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg class="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 "><span class="font-semibold">Click to upload</span></p>
                    </div>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      required
                      className="hidden"
                    />
                </label>
            </div> 

            <label className="text-white font-semibold">
              Title:
              <input
                type="text"
                name="title"
                required
                className="block mt-1 p-2 rounded bg-gray-800 text-white w-full"
              />
            </label>
            <label className="text-white font-semibold">
              Description:
              <textarea
                name="description"
                required
                className="block mt-1 p-2 rounded bg-gray-800 text-white w-full"
              />
            </label>
            <label className="text-white font-semibold flex items-center gap-2">
              Publish:
              <input
                type="checkbox"
                name="isPublished"
                value="true"
                className="ml-2"
              />
              <span className="text-gray-400 text-sm">(Check to publish immediately)</span>
            </label>
            <button
              type="submit"
              className="bg-violet-600 text-white py-2 px-6 rounded-md hover:bg-violet-700 transition-all duration-300 hover:cursor-pointer"
              ref={submitBtnRef}
            >
              Upload Video
            </button>
            </form>
          )
        }
      </div>
  )
}

export default MyVideosMain
