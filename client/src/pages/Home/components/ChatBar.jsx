import React, { useContext, useEffect, useState } from 'react'
import { SocketContext, useSocket } from '../../../utils';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  FormControlLabel,
  Checkbox,
  ListItemButton,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import {  useSidebarHook } from '..';
import { SidebarSkeleton } from '../../../components';
import { Users } from "lucide-react";
import { useSelector } from 'react-redux';

export const ChatBar = () => {
  const { socket, onlineUsers, selectedUser, setSelectedUser } = useSocket();
    const users = useSelector((state) => state?.chat?.users);


  const { UsersList, isUsersLoading, showOnlineOnly, onHandleShowOnlineOnly } =
    useSidebarHook({ load: true });
  
  const filteredUsers = showOnlineOnly
  ? users?.filter((user) => onlineUsers?.includes(user._id))
  : users;
  
  const handleUserSelection = (user) => {
     setSelectedUser(user);
  };
  
  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <Box
      component="aside"
      sx={{
        height: "100%",
        width: { xs: "80px", lg: "280px" },
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 2,
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Users size={24} />
          <Typography
            variant="subtitle1"
            sx={{ display: { xs: "none", lg: "block" } }}
          >
            Contacts
          </Typography>
        </Box>
        {/* Online Filter */}
        <Box
          mt={2}
          display="flex"
          alignItems="center"
          gap={1}
          sx={{ display: { xs: "none", lg: "flex" } }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                checked={showOnlineOnly}
                onChange={onHandleShowOnlineOnly}
              />
            }
            label={<Typography variant="body2">Show online only</Typography>}
          />
          <Typography variant="caption" color="text.secondary">
            {onlineUsers?.length !== 0
              ? `${onlineUsers.length - 1} online`
              : "0 online"}
          </Typography>
        </Box>
      </Box>

      {/* Users List */}
      <Box sx={{ overflowY: "auto", py: 2, height: 440 }}>
        <List>
          {filteredUsers?.map((user) => (
            <ListItemButton
              key={user._id}
              onClick={() => handleUserSelection(user)}
              selected={selectedUser?._id === user._id}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.main",
                  "&:hover": { bgcolor: "primary.light" },
                },
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <ListItemAvatar>
                <Avatar
                  src={user.profilePic || "/avatar.png"}
                  alt={user.name}
                  sx={{ width: 48, height: 48 }}
                />
                {onlineUsers?.includes(user._id) && (
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      bgcolor: "green",
                      borderRadius: "50%",
                      border: "2px solid",
                      borderColor: "background.paper",
                    }}
                  />
                )}
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="body1" noWrap>
                    {user.fullName}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary" noWrap>
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </Typography>
                }
                sx={{ display: { xs: "none", lg: "block" } }}
              />
            </ListItemButton>
          ))}

          {filteredUsers.length === 0 && (
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ py: 4 }}
            >
              No online users
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};
