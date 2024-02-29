/* eslint-disable no-unused-vars */
import React from 'react'
import { Box, AppBar, Toolbar, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material'
import { orange } from '../constants/color'
import { Add as AddIcon, Logout, Menu as MenuIcon, Search as SearchIcon } from "@mui/icons-material"

const Header = () => {
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

              <IconButton aria-label="" size="large" color="inherit" onClick={openNewGroup}>
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
