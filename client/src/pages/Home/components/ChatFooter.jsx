import React, { useState } from 'react'
import { Box, TextField, Button } from "@mui/material";

export const ChatFooter = ({ socket }) => {
    const [message, setMessage] = useState("");
    
     const handleTyping = () =>
       socket.emit("typing", `${localStorage.getItem("userName")} is typing`);

 const handleSendMessage = (e) => {
   e.preventDefault();
   if (message.trim() && localStorage.getItem('userName')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
      });
    }
    setMessage('');
  };

 return (
   //    <div className="chat__footer">
   //      <form className="form" onSubmit={handleSendMessage}>
   //        <input
   //          type="text"
   //          placeholder="Write message"
   //          className="message"
   //          value={message}
   //          onChange={(e) => setMessage(e.target.value)}
   //          onKeyDown={handleTyping}
   //        />
   //        <button className="sendBtn">SEND</button>
   //      </form>
   //    </div>
   <Box
     className="chat__footer"
     sx={{ padding: 2, display: "flex", alignItems: "center" }}
   >
     <form
       className="form"
       onSubmit={handleSendMessage}
       style={{ width: "100%", display: "flex" }}
     >
       <TextField
         variant="outlined"
         placeholder="Write message"
         fullWidth
         value={message}
         onChange={(e) => setMessage(e.target.value)}
         onKeyDown={handleTyping}
         sx={{
           marginRight: 2,
           borderRadius: 2,
           "& .MuiOutlinedInput-root": {
             borderRadius: 2,
           },
         }}
       />
       <Button
         type="submit"
         variant="contained"
         color="primary"
         sx={{ borderRadius: 2 }}
         disabled={!message.trim()}
       >
         SEND
       </Button>
     </form>
   </Box>
 );
}
