import React, { useContext, useEffect, useRef, useState } from 'react'
import { ChatBody, ChatFooter, ChatPageLayout } from '.';
import { SocketContext } from '../../utils';
import { Box, Typography, Paper } from "@mui/material";

export const ChatPage = () => { 
  return (
    <ChatPageLayout/>
  );
};
