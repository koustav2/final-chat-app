/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import { redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Paper, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material'
import '../css/loder.css'
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post('/api/login', { username, password });
      
      if (response.status === 200) {
        setLoading(false);
        redirect('/dashboard');
      }

    } catch (error) {
      console.error(error);
      setLoading(false);
      
    }
  };

  return (
    <Container component={"main"} maxWidth="sx"
      style={{ padding: "200px" }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography variant="h5">Login</Typography>
        <form action=""
          style={{
            marginTop: "20px"
          }}
        >
          <FormControl fullWidth>
            <FormLabel component="legend">Username</FormLabel>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />

            <FormLabel component="legend">Password</FormLabel>
            <TextField
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              style={{
                cursor: "pointer"
              }}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
              disabled={loading}

            >
              {loading ? <span className="loader"></span> : 'Login'}
            </Button>
          </FormControl>
        </form>
      </Paper>
    </Container>
  )
};

export default Login;


