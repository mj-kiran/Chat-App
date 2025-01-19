import React, { useEffect, useRef } from 'react'
import {
  Box,
  Avatar,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { ChatHeader, MessageInput } from '.';
import { formatMessageTime, useSocket } from '../../../utils';
import { useChatHook } from '../hook';
import { MessageSkeleton } from '../../../components';
import { useSelector } from 'react-redux';

export const ChatContainer = () => {
 const messageEndRef = useRef(null);
    const {
      messages,
      selectedUser,
    } = useSocket();
    const { UsersMessages, isUserMessageLoading } = useChatHook({ load: true });
  const currentUser = useSelector((state) => state?.auth?.authUser);
    


     useEffect(() => {

       if (messageEndRef?.current && UsersMessages) {
         messageEndRef?.current.scrollIntoView({ behavior: "smooth" });
       }
     }, [UsersMessages]);

     if (isUserMessageLoading) {
       return (
         <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
           <ChatHeader />
           <MessageSkeleton />
           <MessageInput />
         </Box>
       );
     }
  return (
    <Box display="flex" flexDirection="column" flex={1} overflow="auto">
      <ChatHeader />
      {messages?.length != 0 ? (
        <Box
          flex={1}
          overflow="auto"
          padding={2}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          {messages?.map((message) => (
            <Box
              key={message?._id}
              display="flex"
              flexDirection="column"
              alignItems={
                message?.senderId === currentUser?._id
                  ? "flex-end"
                  : "flex-start"
              }
              ref={messageEndRef}
            >
              <Box display="flex" alignItems="center" gap={1}>
                <Avatar
                  src={
                    message?.senderId === currentUser?._id
                      ? currentUser?.profilePic || "/avatar.png"
                      : selectedUser?.profilePic || "/avatar.png"
                  }
                  alt="profile pic"
                />
                <Typography variant="caption" color="textSecondary">
                  {formatMessageTime(message?.createdAt)}
                </Typography>
              </Box>
              <Paper
                elevation={2}
                sx={{
                  padding: 1,
                  maxWidth: "75%",
                  backgroundColor:
                    message?.senderId === currentUser?._id
                      ? "primary.main"
                      : "grey.200",
                  color:
                    message?.senderId === currentUser?._id
                      ? "primary.contrastText"
                      : "text.primary",
                  borderRadius: 2,
                }}
              >
                {message?.image && (
                  <Box mb={1}>
                    <img
                      src={message?.image}
                      alt="Attachment"
                      style={{ maxWidth: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                )}
                {message?.text && <Typography>{message?.text}</Typography>}
              </Paper>
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          flex={1}
          overflow="auto"
          padding="150px"
          display="flex"
          justifyContent="center"
        >
          <Typography variant="body2" color="textSecondary" align="center">
            No messages yet
          </Typography>
        </Box>
      )}
      <MessageInput />
    </Box>
  );
}
