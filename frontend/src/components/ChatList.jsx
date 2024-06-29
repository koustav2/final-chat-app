/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Stack } from "@mui/material";
import ChatItem from './shared/ChatItem';

const ChatList = ({
    w = "100%",
    chats = [],
    chatId,
    onlineAvailableUsers = [],
    newMessagesAlert ,
    handleDeleteChat,
}) => {
    return (
        <Stack width={w} direction={"column"}>
            {
                chats?.map((chat, i) => {
                    const newMessageAlert = newMessagesAlert.find(
                        (item) => item.chatId === chat.chatId
                    );
                    const isOnline = chat.members?.some((member) => onlineAvailableUsers.includes(chat.chatId))
                    return <ChatItem
                        index={i}
                        key={chat.chatId}
                        _id={chat.chatId}
                        
                        groupChat={chat.groupChat}
                        name={chat.name}
                        newMessageAlert={newMessageAlert}
                        isOnline={isOnline}
                        sameSender={chatId === chat.chatId}
                        handleDeleteChat={handleDeleteChat}
                    />;
                })
            }
        </Stack>
    )
}

export default ChatList