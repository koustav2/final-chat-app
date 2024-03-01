/* eslint-disable no-unused-vars */
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { CssBaseline } from '@mui/material'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast'
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from './hooks/AuthProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <CookiesProvider> */}
    <AuthProvider>
      <HelmetProvider>
        <CssBaseline />
        <App />
      </HelmetProvider>
      {/* </CookiesProvider> */}
    </AuthProvider>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
  </>,
)
