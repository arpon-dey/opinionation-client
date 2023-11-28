import { StyledEngineProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './Providers/AuthProvider.jsx'
import router from './Routes/PublicRoute.jsx'
import './index.css'
const queryClient = new QueryClient()




ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <QueryClientProvider client={queryClient}>
     <StyledEngineProvider injectFirst>
    <React.StrictMode>
    <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
  </React.StrictMode>
  </StyledEngineProvider>
  </QueryClientProvider>
  </AuthProvider>,
)
