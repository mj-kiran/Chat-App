import React from "react";
import { MessageSquare } from "lucide-react";
import { Box, Typography, Paper } from "@mui/material";
import { styled } from "@mui/system";

 const BounceContainer = styled(Box)(({ theme }) => ({
  width: theme.spacing(8),
  height: theme.spacing(8),
  borderRadius: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  animation: "bounce 2s infinite",
  "@keyframes bounce": {
    "0%, 100%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-10px)" },
  },
}));

export const NoChatSelected = () => {
  return (
    <Box
      sx={{
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
        bgcolor: "background.default",
      }}
    >
      <Paper
        sx={{
          maxWidth: 400,
          textAlign: "center",
          p: 3,
          boxShadow: "none",
          bgcolor: "transparent",
        }}
      >
        {/* Icon Display */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <BounceContainer>
            <MessageSquare
              style={{ width: 32, height: 32, color: "#1976d2" }}
            />
          </BounceContainer>
        </Box>

        {/* Welcome Text */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Welcome to Chatty!
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Select a conversation from the sidebar to start chatting
        </Typography>
      </Paper>
    </Box>
  );
};

