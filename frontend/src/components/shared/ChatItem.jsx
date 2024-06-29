/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { memo } from 'react'
import { Link } from '../../css/StyledComponents'
import { Stack, Typography, Box } from '@mui/material'
import AvatarCard from './Avavtar'

const ChatItem = ({
    avatar=[
        "https://res.cloudinary.com/ds544u6mo/image/upload/v1709302890/te31uxupcui8l9jgpchb.jpg"
    ],
    name = 'Koustav Maity',
    chatId,
    _id,
    lastMessage,
    newMessageAlert,
    groupChat = false,
    sameSender,
    index ,
    isOnline = true,
    handleDeleteChat

}) => {
    return (
        <Link to={`/chat/${_id}`} onContextMenu={(e) => handleDeleteChat(e, _id, groupChat)}>
            <div
                style={{
                    display: 'flex',
                    gap: "1rem",
                    padding: ".5rem",
                    alignItems: 'center',
                    backgroundColor: sameSender ? 'black' : 'unset',
                    color: sameSender ? 'white' : 'unset',
                    position: "relative",
                    borderRadius: "6px",
                }}
            >
                {/* Avatar Card */}
                <AvatarCard avatar={avatar}/>
                <Stack>
                    <Typography>{name}</Typography>
                    {
                        newMessageAlert && (
                            <Typography>{newMessageAlert.count} New Message</Typography>
                        )
                    }
                </Stack>
                {
                    isOnline && (
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                backgroundColor: "green",
                                position: "absolute",
                                top: "50%",
                                right: "1rem",
                                transform: "translateY(-50%)",
                            }}
                        />
                    )
                }

            </div>
        </Link>
    )
}

export default memo(ChatItem);