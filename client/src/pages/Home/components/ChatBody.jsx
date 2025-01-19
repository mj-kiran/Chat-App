import React from 'react'
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Divider } from "@mui/material";

export const ChatBody = ({ messages, lastMessageRef, typingStatus }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      {/* <header className="chat__mainHeader">
        <p>Hangout with Colleagues</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message, index) =>
          message.name === localStorage.getItem("userName") ? (
            <div
              className="message__chats"
              key={`${message.id || message.name}-${index}`}
            >
              <p className="sender__name">You</p>
              <div className="message__sender">
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
              <div className="message__recipient">
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div> */}

      <Box className="chat__mainContent" sx={{ padding: 2 }}>
        {/* Header with Leave Button */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6">Hangout with Colleagues</Typography>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleLeaveChat}
          >
            Leave Chat
          </Button>
        </Box>

        {/* Message Container */}
        <Box
          className="message__container"
          sx={{ maxHeight: 500, overflowY: "auto" }}
        >
          {messages.map((message, index) => (
            <Box
              key={`${message.id || message.name}-${index}`}
              sx={{
                display: "flex",
                flexDirection:
                  message.name === localStorage.getItem("userName")
                    ? "row-reverse"
                    : "row",
                mb: 2,
                alignItems: "flex-start",
              }}
            >
              <Box>
                <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                  {message.name === localStorage.getItem("userName")
                    ? "You"
                    : message.name}
                </Typography>
                <Box
                  sx={{
                    backgroundColor:
                      message.name === localStorage.getItem("userName")
                        ? "#007bff"
                        : "#f1f1f1",
                    color:
                      message.name === localStorage.getItem("userName")
                        ? "#fff"
                        : "#000",
                    padding: 1,
                    borderRadius: 2,
                    maxWidth: "70%",
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                </Box>
              </Box>
            </Box>
          ))}

          {/* Typing Status */}
          {typingStatus && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="textSecondary">
                {typingStatus}
              </Typography>
            </Box>
          )}

          {/* Ref for Scroll */}
          <div ref={lastMessageRef} />
        </Box>
      </Box>
    </>
  );
};
