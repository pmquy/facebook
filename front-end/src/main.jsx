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
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router}>
      </RouterProvider>    
    </QueryClientProvider>
  </React.StrictMode>,
)
