import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'
import './index.css'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import {QueryClient, QueryClientProvider} from 'react-query'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Home/>
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
