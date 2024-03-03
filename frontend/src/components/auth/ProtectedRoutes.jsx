/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Route, Navigate, Outlet } from 'react-router-dom';



export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div role="alert" 
    style={{
      padding: '100px',
      margin: 'auto',
      textAlign: 'center',
    }}
    >
      <p>Something went wrong:</p>
      <pre
      style={{
        margin: 0,
        padding: 0,
        overflow: 'auto',
      }}
      >{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

const ProtectedRoute = ({ isAuthenticated, children, redirectTo = '/login' }) => {

  if (!isAuthenticated) return <Navigate
    to={{
      pathname: redirectTo,
      state: { from: window.location.pathname }
    }}
    replace={true}
  />;

  return children ? children : <Outlet />
};

// Wrap your component within ErrorBoundary
{/* <ErrorBoundary
  FallbackComponent={ErrorFallback}
  onReset={() => { }} // reset the state of your component
>
  <ProtectedRoute />
</ErrorBoundary> */}

export default ProtectedRoute;

