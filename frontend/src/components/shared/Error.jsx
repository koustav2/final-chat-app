/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Typography from "@mui/material";
import Container from '@mui/material';

const Error = (props) => {
    const { message } = props;

    return (
        <Container maxWidth="md">
            <Typography variant="h2" align="center" color="textSecondary" gutterBottom>
                You are getting this error
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
                {message}
            </Typography>
        </Container>
    )
}

export default Error;
