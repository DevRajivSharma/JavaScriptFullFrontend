import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import './index.css'
import { createBrowserRouter,RouterProvider } from'react-router-dom'
import App from './App.jsx'
import Home from './components/Home.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import HomeMain from './components/Main/HomeMain'
import ChannelMain from './components/Main/ChannelMain'
import HistoryMain from './components/Main/HistoryMain'
import PlaylistMain from './components/Main/PlaylistMain'
import MyVideosMain from './components/Main/MyVideosMain.jsx'
import Video from './components/Video.jsx'
import UpdateVideo from './components/Branch/UpdateVideo.jsx'
import SubscribtionMain from './components/Main/SubscribtionMain.jsx'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path: "/",
        element: <Home />,
        children:[
          {
            path: "/",
            element: <HomeMain />,
          },
          {
            path:"/video/:id",
            element: <Video />,
          },
          {
            path:"/channel",
            element: <ChannelMain />
          },
          {
            path:"/history",
            element: <HistoryMain />
          },
          {
            path:"/playlist",
            element: <PlaylistMain />
          },
          {
            path:"/myVideos",
            element: <MyVideosMain />,
          },
          {
            path:"/updateVideo/:id",
            element: <UpdateVideo />
          },
          {
            path:"/subscribtion",
            element: <SubscribtionMain />
          }
        ]
      },
      {
        path:"/login",
        element: <Login />
      },
      {
          path:"/register",
          element: <Register />
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
