import { createSlice } from '@reduxjs/toolkit'

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    currentVideo: null,
    allVideos: [],
    searchVideos: [],
  },
  reducers: {
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload
    },
    setAllVideos: (state, action) => {
      state.allVideos = action.payload
    },
    setSearchVideos: (state, action) => {
      state.searchVideos = action.payload
    },
  }
})

export const {
   setCurrentVideo, 
   setAllVideos ,
   setSearchVideos,
  } = videoSlice.actions
export default videoSlice.reducer