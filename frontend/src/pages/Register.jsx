/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { createRef, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Paper, Typography, FormControl, FormLabel, TextField, Button } from '@mui/material'
import '../css/loder.css'
import AvatarUpload from '../components/AvatarUpload';
import { toast } from "react-hot-toast"
import { useInputValidation } from '6pp'
import { userNameValidator, emailValidator } from "../utils/validators";


const Register = () => {
  const navigate = useNavigate();
  const username = useInputValidation("", userNameValidator);
  const password = useInputValidation("");
  const email = useInputValidation("", emailValidator);

  const [loading, setLoading] = useState(false);
  const [image, _setImage] = useState('');
  const inputFileRef = createRef(null);

  const cleanup = () => {
    URL.revokeObjectURL(image);
    inputFileRef.current.value = null;
  };
  const setImage = (newImage) => {
    if (image) {
      cleanup();
    }
    _setImage(newImage);
  };
  const handleOnChange = async (event) => {
    const file = event.target?.files?.[0];

    if (file) {
      let formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_PRESET}`);
      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData
        );
        // console.log(response.data);
        _setImage(response.data.secure_url);
      } catch (error) {
        toast.error(error);
      }
    }
  };
  const handleClick = (event) => {
    if (image) {
      event.preventDefault();
      setImage(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/register`, {
        username: username.value,
        email: email.value,
        password: password.value,
        imageUrl: image
      }, {
        withCredentials: true,
      });
      // console.log(response);
      if (response.status === 200) {
        setLoading(false);
        navigate('/login');
      } else {
        toast.error(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
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
        objectFit: 'contained',
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
          Register
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
              required
              id="username"
              label="Username"
              type="text"
              value={username.value}
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
            >Email</FormLabel>
            <TextField
              required
              id="email"
              label="email"
              type="email"
              variant="outlined"
              value={email.value}
              onChange={email.changeHandler}
            />
            {
              email.error &&
              <Typography variant="subtitle1" sx={{
                color: "#410c0c",
                textAlign: "left",
                fontWeight: "bold",
              }}>
                {email.error}
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
              required
              id="password"
              label="Password"
              type="password"
              variant="outlined"
              value={password.value}
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
            <AvatarUpload
              image={image}
              setImage={_setImage}
              inputFileRef={inputFileRef}
              handleClick={handleClick}
              handleOnChange={handleOnChange}

              cleanup={cleanup}
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
              disabled={loading}
              onClick={handleSubmit}

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
