/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import AuthLayout from './pages/AuthLayout'
import { lazy } from 'react'
import ProtectedRoute, { } from './components/auth/ProtectedRoutes'

const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register'))
const Dashboard = lazy(() => import('./pages/DashBoard'))
const Chat = lazy(() => import('./pages/Chat'))
const Group = lazy(() => import('./pages/Group'))

function App({ user }) {
  let isAuthenticated
  if (!user) {
    isAuthenticated = true
  }
  else {
    isAuthenticated = false
  }


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
