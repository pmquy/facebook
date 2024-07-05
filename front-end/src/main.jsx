import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import Layout from './layouts/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Friends from './pages/Friends'
import Messenger from './pages/Messenger'
import CaroGame from './pages/CaroGame'
import CaroGames from './pages/CaroGames'
import File from './pages/File'
import Group from './pages/Group'
import { GroupsLayout } from './features/group'
import Note from './pages/NotePage'
import GroupFeed from './pages/GroupFeed'
import Post from './pages/Post'
import GroupDiscover from './pages/GroupDiscover'


const router = createBrowserRouter([
  
  {
    path: '',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
      {
        path: 'users/:id',
        element: <Account />
      },
      {
        path: 'posts/:id',
        element: <Post/>
      },
      {
        path: 'files/:id',
        element: <File />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'friends',
        element: <Friends />
      },
      {
        path: 'messages',
        element: <Messenger />
      },
      {
        path: 'carogames',
        element: <CaroGames />
      },
      {
        path: 'carogames/:id',
        element: <CaroGame />
      },
      {
        path: 'groups',
        element: <GroupsLayout />,
        children: [,
          {
            path: 'feed',
            element: <GroupFeed/>
          },
          {
            path: 'discover',
            element: <GroupDiscover/>
          },
          {
            path: ':id/:sub',
            element: <Group/>
          },
          {
            path: '',
            element: <Navigate to={'feed'}/>
          }
          ,
          {
            path: '*',
            element: <Navigate to={'feed'}/>
          }
        ]
      },
      {
        path: 'somestuffs/note',
        element: <Note/>
      }
    ]
  }
])

const queryClient = new QueryClient({
  defaultOptions : {
    queries : {
      refetchOnWindowFocus : false
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
