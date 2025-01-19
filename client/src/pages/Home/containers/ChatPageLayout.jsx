import React from 'react'
import { Box, Paper, Grid } from "@mui/material";
import { ChatBar, ChatContainer, NoChatSelected } from '..';
import { useSocket } from '../../../utils';

export const ChatPageLayout = () => {
    const { selectedUser } = useSocket();
  
  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "background.default",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pt: 5,
        px: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: "1200px",
          height: "calc(100vh - 8rem)",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <Grid container sx={{ height: "100%" }}>
          {/* Sidebar */}
          <Grid
            item
            xs={3}
            sx={{
              borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              bgcolor: "background.paper",
            }}
          >
            <ChatBar />
          </Grid>

          {/* Chat Area */}
          <Grid
            item
            xs={9}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.default",
              height: "100%", // Ensure the sidebar takes full height
              overflowY: "auto",
            }}
          >
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
