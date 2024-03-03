/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { orange } from '../constants/color'
import { Add as AddIcon, Group, Logout, Menu as MenuIcon, Notifications, Search as SearchIcon } from "@mui/icons-material"
import axios from 'axios';
import { startTransition } from 'react';
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../hooks/AuthProvider'
import NewGroup from './NewGroup';
const Header = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [isNewGroup, setIsNewGroup] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleMobile = () => {
    setMobile(!mobile);
  };
  const handleNewGroup = () => {
    setIsNewGroup(!isNewGroup);
  };
  const handleSearch = (e) => {
    setSearch(prev => !prev)
  };

  const navigateToGroup = (e) => {
    e.preventDefault();
    navigate('/groups');
    window.location.reload();
  }

  const openSearchDialogue = (e) => {
    setOpen(true);
  }

  const logout = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/logout`, {}, { withCredentials: true })
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
              onClick={() => navigate("/dashboard")}
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
              <IconButton aria-label="" size="large" color="inherit" onClick={handleSearch}>
                <SearchIcon />
              </IconButton>

              <IconButton aria-label="" size="large" color="inherit" onClick={openSearchDialogue}>
                <AddIcon
                />
              </IconButton>

              <IconButton aria-label="" size="large" color="inherit" onClick={navigateToGroup}>
                <Group
                />
              </IconButton>

              <IconButton aria-label="" size="large" color="inherit" >
                <Notifications />
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
      {
        open === true && <NewGroup open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} />
      }
    </>
  )
}

export default Header
