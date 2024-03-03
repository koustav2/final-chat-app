/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute, { ErrorFallback } from './components/auth/ProtectedRoutes'
import { useCookies } from 'react-cookie';
import Cookies from 'js-cookie'
import { AuthProvider, useAuth } from './hooks/AuthProvider';
import { ErrorBoundary } from 'react-error-boundary'
import CustomizedProgressBars from './components/shared/Loder';
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
        <Route path="dashboard" element={
          <Suspense fallback={<CustomizedProgressBars />}>
            <ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>
          </Suspense>
        } />
        <Route path="chat/:chatId" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Chat /></ProtectedRoute>} />
        <Route path="groups" element={
          // <ErrorBoundary
          //   FallbackComponent={ErrorFallback}
          //   onReset={() => { }} // reset the state of your component
          // >
          <Suspense fallback={<CustomizedProgressBars />}>
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Group />
            </ProtectedRoute>
          </Suspense>
          // </ErrorBoundary>
        } />
        <Route path="*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
      </Routes>
    </Router >
  )
}

export default App
