/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, redirect } from "react-router-dom";
import axios from 'axios';
import { Container, Paper, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material'
import '../css/loder.css'
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = React.useTransition();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = axios.post(`${import.meta.env.VITE_SERVER_URL}/register`, { username, email, password });
      if (response.status === 200) {
        setLoading(false);
        redirect('/login');
      }
    }
    catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <Container component={"main"}
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('https://imgs.search.brave.com/SJwJZCIUHyqCwGpCGynF4m9Tm97c15f-BfPzq4ZaKa8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9wbHVz/LnVuc3BsYXNoLmNv/bS9wcmVtaXVtX3Bo/b3RvLTE2NzUwOTg2/NTQ3MjgtYWQxMTNk/N2RiMjZlP3E9ODAm/dz0xMDAwJmF1dG89/Zm9ybWF0JmZpdD1j/cm9wJml4bGliPXJi/LTQuMC4zJml4aWQ9/TTN3eE1qQTNmREI4/TUh4elpXRnlZMmg4/TVh4OGJtbG5hSFFs/TWpCemEzbDhaVzU4/TUh4OE1IeDhmREE9')`,
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
          Register
        </Typography>
        <form action=""
          style={{
            marginTop: "20px",
          }}
        >
          <FormControl fullWidth>
            <FormLabel component="legend"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
              }}
            >Username</FormLabel>
            <TextField
              required
              id="username"
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
            <FormLabel component="legend"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
              }}
            >Email</FormLabel>
            <TextField
              required
              id="email"
              label="email"
              type="email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel component="legend"
              style={{
                fontWeight: 'bold',
                fontSize: 15,
                color: '#000000',
              }}
            >Password</FormLabel>
            <TextField
              required
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              onChange={(e) => setPassword(e.target.value)}
            />
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
              onClick={handleSubmit}
              disabled={loading}

            >
              {loading ? <span className="loader"></span> : 'Sign Up'}
            </Button>
          </FormControl>
        </form>

        <Typography variant="subtitle1" sx={{
          mt: 5, mb: 2,
          color: "grey",
          textAlign: "center",
        }}>
          Already have an account?
          <a
            style={{
              color: "#000000",
              textDecoration: "underline",
              marginLeft: "5px",
              cursor: "pointer",
              fontSize: 20,
              fontStyle: "oblique"
            }}
            href="/login">Login</a>
        </Typography>

      </Paper>
    </Container>
  );
};

export default Register;
