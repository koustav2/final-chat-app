/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/display-name */
import React from 'react';
import Header from '../Header';
import Title from '../shared/Title';
import Grid from '@mui/material/Grid'
import ChatList from '../ChatList';
import { nanoid } from 'nanoid'
import { v4 as uuidv4 } from "uuid";
import { useAuth } from '../../hooks/AuthProvider';
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom"

const AppLayout = () => (WrapperComponent) => {
    const userDetails = Cookies.get('user_details');
    const user = JSON.parse(userDetails)
    return (props) => {

        const params = useParams()
        const handleDeleteChat = (e, _id, groupChat) => {
            e.preventDefault()
            alert(` deleting ${_id}`)
        }
        return (
            <>
                <Title />
                <Header />

                <Grid container height={"calc(100vh - 4rem)"}>
                    <Grid item sm={4} md={3} sx={{ display: { xs: 'none', sm: 'block' }, }} height={"100%"}>
                        <ChatList
                            chatId={params.chatId}
                            newMessagesAlert={[
                                {
                                    chatId: params.chatId,
                                    count: 4,
                                }
                            ]}
                            chats={[
                                {
                                    chatId: "1",
                                    avatar: user.avatar,
                                    name: "Koustav",
                                    groupChat: false,
                                    members: ["1", 2, 3],
                                    messages: [
                                        {
                                            message: 'Hello',
                                            sender: 'John',
                                            time: '12:00 PM',
                                        },
                                        {
                                            message: 'How are you?',
                                            sender: 'John',
                                            time: '12:00 PM',
                                        },
                                    ],
                                },
                                {
                                    chatId: uuidv4(),
                                    avatar: user.avatar,
                                    name: "Hades",
                                    groupChat: false,
                                    members: ["1", 2, 3],
                                    messages: [
                                        {
                                            message: 'Hello',
                                            sender: 'John',
                                            time: '12:00 PM',
                                        },
                                        {
                                            message: 'How are you?',
                                            sender: 'John',
                                            time: '12:00 PM',
                                        },
                                    ],
                                },
                            ]}
                            onlineAvailableUsers={["1", 2, 3]}
                            handleDeleteChat={handleDeleteChat}

                        />
                    </Grid>
                    <Grid item xs={12} sm={8} md={5} lg={6} height={"100%"}>
                        <WrapperComponent {...props} />
                    </Grid>
                    <Grid item md={4} lg={3} sx={{ display: { xs: 'none', md: 'block' }, padding: "2rem", bgcolor: "rgba(0,0,0,0.85)" }} height={"100%"}>
                        Third
                    </Grid>
                </Grid>
            </>
        )
    }
}

export default AppLayout;
