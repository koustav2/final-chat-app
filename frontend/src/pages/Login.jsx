/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Paper, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material'
import '../css/loder.css'
import { useInputValidation } from '6pp'
import { userNameValidator } from '../utils/validators';
import { toast } from 'react-hot-toast'
import { useAuth } from '../hooks/AuthProvider';


const Login = () => {
  const { setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const username = useInputValidation("", userNameValidator);
  const password = useInputValidation("");

  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
  
    axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/login`, {
      username: username.value,
      password: password.value,
    }, {
      withCredentials: true,
    })
    .then(response => {
      if (response.data.statusCode == 200) {
        toast.success(response.data.message);
        setLoading(false);
        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setLoading(false);
        toast.error(response.response.data.message);
      }
    })
    .catch(error => {
      // console.log(error);
      toast.error("An error occurred. Please try again");
      setLoading(false);
    });
  };

  return (
    <Container component={"main"}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundImage: `url('https://imgs.search.brave.com/SJwJZCIUHyqCwGpCGynF4m9Tm97c15f-BfPzq4ZaKa8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NzUwOTg2/NTQ3MjgtYWQxMTNk/N2RiMjZlP3E9ODAm/dz0xMDAwJmF1dG89/Zm9ybWF0JmZpdD1j/cm9wJml4bGliPXJi/LTQuMC4zJml4aWQ9/TTN3eE1qQTNmREI4/TUh4elpXRnlZMmg4/TVh4OGJtbG5hSFFs/TWpCemEzbDhaVzU4/TUh4OE1IeDhmREE9')`,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'rgba(4, 6, 39, 0.341)',
          borderRadius: '10px',
        }}
      >
        <Typography variant="h5" style={{
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: 25,
          color: '#000000',
          fontStyle: "oblique"

        }}>
          Login
        </Typography>
        <form action=""
          style={{
            marginTop: "20px",
          }}
        >
          <FormControl fullWidth
          >
            <FormLabel component="legend"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
              }}
            >Username</FormLabel>
            <TextField
              id="username"
              label="Username"
              value={username.value}
              type="text"
              variant="outlined"
              onChange={username.changeHandler}
            />
            {
              username.error &&
              <Typography variant="subtitle1" sx={{
                color: "#410c0c",
                textAlign: "left",
                fontWeight: "bold",
              }}>
                {username.error}
              </Typography>
            }
            <FormLabel component="legend"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
              }}
            >Password</FormLabel>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password.value}
              variant="outlined"
              onChange={password.changeHandler}
            />
            {
              password.error &&
              <Typography variant="subtitle1" sx={{
                color: "#410c0c",
                textAlign: "left",
                fontWeight: "bold",
              }}>
                {password.error}
              </Typography>
            }
            <Button
              style={{
                cursor: "pointer",
                marginTop: "3em"
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading || isPending}
              onClick={handleLogin}

            >
              {loading ? <span className="loader"></span> : 'Sign In'}
            </Button>
          </FormControl>
        </form>

        <Typography variant="subtitle1" sx={{
          mt: 5, mb: 2,
          color: "grey",
          textAlign: "center",
        }}>
          Don't have an account?
          <a href="/register"
            style={{
              color: "#000000",
              textDecoration: "underline",
              marginLeft: "5px",
              cursor: "pointer",
              fontSize: 20,
              fontStyle: "oblique"
            }}>Register</a>
        </Typography>

      </Paper>
    </Container>
  )
};

export default Login;


