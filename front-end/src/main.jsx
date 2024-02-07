import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'
import Layout from './layouts/Layout'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Friends from './pages/Friends'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Layout/>,
    children : [
      {
        path : '/',
        element : <Home/>
      },
      {
        path : '/login',
        element : <Login/>
      },
      {
        path : '/register',
        element : <Register/>
      },
      {
        path : '/user/:id',
        element : <Account/>
      },
      {
        path : '/friends',
        element : <Friends/>
      }
    ]
  }
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>    
    </QueryClientProvider>
  </React.StrictMode>,
)
