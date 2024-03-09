/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Route, Navigate, Outlet } from 'react-router-dom';

import { Button, Card, CardContent, Typography } from "@mui/material";

export function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography color="textPrimary" gutterBottom>
            Something went wrong:
          </Typography>
          <pre>{error.message}</pre>
          <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </CardContent>
      </Card>
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

