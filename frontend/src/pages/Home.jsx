import { useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/AuthProvider';


const Home = () => {
  const { userDetails } = useAuth()
  if(Object.keys(userDetails).length > 0) {
    location.assign('/dashboard')
  }
  return (
    <div>
      <h1>Welcome to MyChat</h1>
      <p>Not Found</p>
    </div>
  );
};

export default Home;
