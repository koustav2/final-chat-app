import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div>
      {/* Add your header component here */}
      <div>Hello</div>
        <Outlet />
      
      {/* Add your footer component here */}
    </div>
  );
};

export default AuthLayout;
