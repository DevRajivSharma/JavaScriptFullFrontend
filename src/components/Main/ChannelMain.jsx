import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Spinner from '../Spinner.jsx'
import axios from 'axios'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import { useNavigate } from 'react-router-dom'
import { format } from 'timeago.js'

const ChannelMain = () => {
  const user = useSelector(state => state.auth.user)
  const [fetchUser,setFetchUser] = useState(null)
  const [videos, setVideos] = useState([]) 
  const [playlist,setPlaylist] = useState([])
  const [isloading, setIsloading] = useState(true)
  const [currentOpened, setCurrentOpened] = useState(1)
  const [currentFilter, setCurrentFilter] = useState('Latest')
  const openFilterCss = 'bg-white text-sm  px-3 py-1 rounded-[8px] text-black font-semibold'
  const closeFilterCss = 'bg-[#272727] text-sm hover:bg-[#3a3838] px-3 py-1 font-semibold rounded-[8px] text-md'
  const openTabCss = 'text-lg  p-2 text-white font-bold border-b-2 border-white'
  const closeTabCss = 'text-lg  p-2 text-gray-400'
  const navigate = useNavigate()
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`/api/v1/channels/getChannelProfile/${user._id}`)
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
  },[])

  const openVideo = async (video) => {
    try {
      console.log(video);
      await axios.patch(`/api/v1/videos/addViews/${video._id}`)
      navigate(`/video/${video._id}`)
    }
    catch (error) {
      alert("These video is not Published")
    }
  }

  if (!user) return <p className='flex text-white justify-center items-center h-full text-lg'>User not found</p>

  if (isloading) return (
    <div className='flex h-full justify-center items-center'>
      <Spinner />
    </div>
  )

  return (
    <div className='text-white p-1'>
      <section>
         <img 
         src={user.coverImage} 
         alt="CoverImage" 
         className='w-full h-50 object-cover rounded'
         />
         <div className='flex gap-3  py-2'>
           <img 
           src={user.avatar}
           alt="profileImage" 
           className='w-40 h-40 rounded-full object-cover'
           />
           <div>
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
      <hr className=' mb-2  border-1  border-[#3F3F3F]'/>
      <section>
        {currentOpened == 1 && (
          <div>
            <div className='flex justify-end gap-4 m-4'>
              <button className={currentFilter == "Latest" ? openFilterCss : closeFilterCss}>
                Latest
              </button>
              <button className={currentFilter == "Popular" ? openFilterCss : closeFilterCss}>
                Popular
              </button>
              <button className={currentFilter == "Oldest" ? openFilterCss : closeFilterCss}>
                Oldest
              </button>
            </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>
            {videos.map((video,index) => (
              <div key={index} className='relative'>
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
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4'>
            {playlist.map((playlist,index) => (
              <div key={index} className=''>
                <img
                src={playlist.thumbnail}
                alt="thumbnail"
                className='w-full h-40 object-cover rounded'
                onClick={() => openVideo(playlist)}
                />
                
                <div className=' bottom-0 left-0 right-0 bg-black/70 p-2'>
                  <h3 className='text-white font-medium text-lg'>{playlist.name}</h3>
                  <div className='flex gap-2 text-gray-400 text-sm'>
                    <span>{playlist.totalContainVideos} videos</span>
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
