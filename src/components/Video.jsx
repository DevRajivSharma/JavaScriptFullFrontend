import React from 'react'
import { useSelector } from 'react-redux'

const Video = () => {
  const currentVideo = useSelector(state => state.video.currentVideo)

  if (!currentVideo) {
    return (
      <div className='w-full h-full flex justify-center items-center'>
        <div className='w-10 h-10 border-4 border-violet-500 rounded-full animate-spin'></div>
      </div>
    )
  }

  return (
    <div className='text-white'>
      <video controls className='w-full aspect-video'>
        <source src={currentVideo.videoFile} type="video/mp4" />
      </video>
      <div className='p-4'>
        <h1 className='text-xl font-bold'>{currentVideo.title}</h1>
        <p className='text-gray-400'>{currentVideo.views} views</p>
      </div>
    </div>
  )
}

export default Video
