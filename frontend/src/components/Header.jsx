/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { orange } from '../constants/color'
import { Add as AddIcon, Logout, Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material"
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/AuthProvider'
const Header = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);
  const handleMobile = (e) => {
    console.log("mobile")
  }
  const openSearchDialogue = (e) => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  };
  const logout = async  (e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/logout`, {}, { withCredentials: true })
    // console.log(response)
    if (response.data.statusCode == 200) {
      toast.success(response.data.message)
      navigate("/login")
      setIsAuthenticated(false)
    }
    else {
      toast.error(response.message)
    }

  }
  const openNewGroup = (e) => { }
  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography variant="h6"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              MyChat
            </Typography>
            <Box
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              <IconButton aria-label="" color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconButton aria-label="" size="large" color="inherit" onClick={openSearchDialogue}>
                <SearchIcon />
              </IconButton>

              <IconButton aria-label="" size="large" color="inherit" onClick={openNewGroup}>
                <AddIcon />
              </IconButton>

              <IconButton
                onClick={logout}
                aria-label="" size="large" color="inherit" >
                <Logout />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  )
}

export default Header
