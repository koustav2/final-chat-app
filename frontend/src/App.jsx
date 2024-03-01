/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute, { } from './components/auth/ProtectedRoutes'
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie'
import { AuthProvider, useAuth } from './hooks/AuthProvider';

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/DashBoard'))
const Chat = lazy(() => import('./pages/Chat'))
const Group = lazy(() => import('./pages/Group'))


function App() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated)
  return (
    <Router>
      <Routes>
        <Route path="login"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/dashboard">
              <Login />
            </ProtectedRoute>
          } />
        <Route path="register"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/login">
              <Register />
            </ProtectedRoute>
          } />
        {/* <Route path="/" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} /> */}
        <Route path="dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
        <Route path="chat/:chatId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Chat /></ProtectedRoute>} />
        <Route path="groups" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Group /></ProtectedRoute>} />
        <Route path="*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
      </Routes>
    </Router >
  )
}

export default App
