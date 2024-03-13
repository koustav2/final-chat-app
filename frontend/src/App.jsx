/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute, { ErrorFallback } from './components/auth/ProtectedRoutes'
import { useAuth } from './hooks/AuthProvider';
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
  return (
    <Router>
      <Routes>
        <Route path="login"
          element={
            <Suspense fallback={<CustomizedProgressBars />}>
              <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/dashboard">
                <Login />
              </ProtectedRoute>
            </Suspense>
          } />
        <Route path="register"
          element={
            <ProtectedRoute isAuthenticated={!isAuthenticated} redirectTo="/login">
              <Register />
            </ProtectedRoute>
          } />


        <Route path="dashboard" element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => { }}
          >
            <Suspense fallback={<CustomizedProgressBars />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="chat/:chatId" element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => { }}
          >
            <Suspense fallback={<CustomizedProgressBars />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}><Chat /></ProtectedRoute>
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="groups" element={
          <ErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => { }}
          >
            <Suspense fallback={<CustomizedProgressBars />}>
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Group />
              </ProtectedRoute>
            </Suspense>
          </ErrorBoundary>
        } />
        <Route path="*" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
      </Routes>
    </Router >
  )
}

export default App
