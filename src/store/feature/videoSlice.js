import { createSlice } from '@reduxjs/toolkit'

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    currentVideo: null,
    allVideos: []
  },
  reducers: {
    getCurrentVideo: (state) => {
      return state.currentVideo
    },
    setCurrentVideo: (state, action) => {
      state.currentVideo = action.payload
    },
    setAllVideos: (state, action) => {
      state.allVideos = action.payload
    }
  }
})

export const { getCurrentVideo, setCurrentVideo, setAllVideos } = videoSlice.actions
export default videoSlice.reducer