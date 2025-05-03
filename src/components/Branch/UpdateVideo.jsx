import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setCurrentVideo } from '../../store/feature/videoSlice'
import Spinner from '../Spinner'

const UpdateVideo = () => {
    const { id } = useParams()
    let currentVideo = useSelector((state) => state.video.currentVideo)
    const dispatch = useDispatch()
    const videoRef = useRef()
    const thumbnailRef = useRef()
    const titleRef = useRef()
    const descriptionRef = useRef()
    const [videoLoading, setVideoLoading] = useState(false)
    const [thumbnailLoading, setThumbnailLoading] = useState(false)
    const [titleLoading, setTitleLoading] = useState(false)
    const [descriptionLoading, setDescriptionLoading] = useState(false)
    const [publishLoading, setPublishLoading] = useState(false)
    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/getVideoForUpdate/${id}`, {
                    withCredentials: true
                  })
                if (response.data.success) {
                    dispatch(setCurrentVideo(response.data.data))
                    console.log('This is currently fetcher data .......... \n', response.data.data);
                }
            } catch (error) {
                console.error('Error fetching video:', error)
            }
        }

        if (!currentVideo && id) {
            fetchVideoData()
        }
    }, [id, currentVideo, dispatch])
    const whiteSpinner = (
        <div role="status">
            <svg aria-hidden="true" class="inline w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    )

    // Update video file
    const updateVideoFile = async (e) => {
        const formData = new FormData();
        formData.append('video', videoRef.current.files[0]);
        try {
            setVideoLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/updateVideo/${id}`, {
                withCredentials: true
              }, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (response.data.success) {
                alert('Video updated successfully');
                window.location.reload();
            }
            else {
                alert('Video update failed');
            }
        } catch (error) {
            alert('Video update failed');
        } finally {
            setVideoLoading(false)
        }
    }

    // Update thumbnail
    const updateThumbnail = async (e) => {
        const formData = new FormData();
        formData.append('thumbnail', thumbnailRef.current.files[0]);
        try {
            setThumbnailLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/updateThumbnail/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }, {
                withCredentials: true
              });
            if (response.data.success) {
                alert('Thumbnail updated successfully');
                window.location.reload();
            }
            else {
                alert('Thumbnail update failed');
            }
        } catch (error) {
            alert('Thumbnail update failed');
        } finally {
            setThumbnailLoading(false)
        }
    }

    // Update title
    const updateTitle = async (e) => {
        try {
            setTitleLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/updateTitle/${id}`, { title: titleRef.current.value }, {
                withCredentials: true
              });
            if (response.data.success) {
                alert('Title updated successfully');
                window.location.reload();
            }
            else {
                alert('Title update failed');
            }
        } catch (error) {
            alert('Title update failed');
        } finally {
            setTitleLoading(false)
        }
    }

    // Update description
    const updateDescription = async (e) => {
        try {
            setDescriptionLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/updateDescription/${id}`, { description: descriptionRef.current.value }, {
                withCredentials: true
              });
            if (response.data.success) {
                alert('Description updated successfully');
                window.location.reload();
            }
            else {
                alert('Description update failed');
            }
        } catch (error) {
            alert('Description update failed');
        } finally {
            setDescriptionLoading(false)
        }
    }

    // Toggle publish status
    const togglePublish = async (e) => {
        try {
            setPublishLoading(true)
            const response = await axios.patch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/videos/togglePublish/${id}`, {
                withCredentials: true
              });
            if (response.data.success) {
                alert('Publish status updated successfully');
                window.location.reload();
            }
            else {
                alert('Publish status update failed');
            }
        } catch (error) {
            alert('Publish status update failed');
        } finally {
            setPublishLoading(false)
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
        <div className='text-white w-fit p-2  mt-2 m-auto'>

            <div className=' flex flex-col gap-1'>
                <label className='text-white mb-1 font-semibold'>
                    Video File :
                </label>
                <div className="flex items-center justify-start w-full">
                    <label
                        className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span></p>
                        </div>
                        <input type="file"
                            name="video"
                            accept="video/*"
                            ref={videoRef}
                            required
                            className="hidden" />
                    </label>
                </div>
                <button
                    onClick={updateVideoFile}
                    disabled={videoLoading}
                    className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700 mt-1 duration-300 hover:cursor-pointer w-fit self-end'>
                    {videoLoading ? whiteSpinner : "Update Video"}
                </button>
            </div>
            <div className='flex flex-col gap-1'>
                <label className='text-white mb-1 font-semibold'>
                    Video Thumbnail :
                </label>
                <div className="flex items-center justify-start ">
                    <label
                        className="flex flex-col items-center justify-center w-full  border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-900 ">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 "><span className="font-semibold">Click to upload</span></p>
                        </div>
                        <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            ref={thumbnailRef}
                            required
                            className="hidden"
                        />
                    </label>
                </div>
                <button
                    onClick={updateThumbnail}
                    disabled={thumbnailLoading}
                    className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700 mt-1 duration-300 hover:cursor-pointer w-fit self-end'>
                    {thumbnailLoading ? whiteSpinner : "Update Thumbnil"}
                </button>
            </div>
            <div className='mb-5 mt-5'>
                <label className="text-white mt-2 font-semibold">
                    Title:
                </label>
                <div className='flex gap-2'>
                    <input
                        type="text"
                        name="title"
                        defaultValue={currentVideo.title}
                        ref={titleRef}
                        className="block mt-1 p-2 outline-none rounded bg-gray-800 text-white "
                    />
                    <button
                        onClick={updateTitle}
                        disabled={titleLoading}
                        className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700 mt-1 duration-300 hover:cursor-pointer'>
                        {titleLoading ? whiteSpinner : "Update Title"}
                    </button>
                </div>
            </div>
            <div className='flex flex-col gap-1'>
                <label className="text-white font-semibold">
                    Description:
                </label>

                <textarea
                    name="description"
                    required
                    defaultValue={currentVideo.description}
                    ref={descriptionRef}
                    className="block outline-none mt-1 p-2 rounded bg-gray-800 text-white w-full lg:w-200 "
                />
                <button
                    onClick={updateDescription}
                    disabled={descriptionLoading}
                    className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700 mt-2 mb-2 duration-300 hover:cursor-pointer w-fit self-end'>
                    {descriptionLoading ? whiteSpinner : "Update Description"}
                </button>

            </div>

            <div className='flex'>
                {currentVideo.isPublished ? (
                    <button
                        onClick={(e) => togglePublish(e)}
                        disabled={publishLoading}
                        className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700  duration-300 hover:cursor-pointer w-fit self-end'>
                        {publishLoading? whiteSpinner : "Unpublish Video"}
                    </button>
                ) : (
                    <button
                        onClick={(e) => togglePublish(e)}
                        disabled={publishLoading}
                        className='bg-violet-600 mx-1 lg:mx-0 md:mx-0 text-white py-2 px-6 rounded hover:bg-violet-700  duration-300 hover:cursor-pointer w-fit self-end'>
                        {publishLoading? whiteSpinner : "Publish Video"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default UpdateVideo
