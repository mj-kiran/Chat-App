import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useLogout } from "../hook";

export const Navbar = () => {
    const { handleLogout } = useLogout({ load: true });
      const authUser = useSelector((state) => state?.auth?.authUser);


  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "background.paper",
        borderBottom: 1,
        borderColor: "divider",
        backdropFilter: "blur(8px)",
      }}
      elevation={0}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Logo Section */}
        <Box display="flex" alignItems="center" gap={1.5}>
          <IconButton
            component={Link}
            to="/"
            edge="start"
            color="primary"
            size="large"
            sx={{
              backgroundColor: "primary.light",
              borderRadius: 2,
              p: 1.5,
            }}
          >
            <MessageSquare size={20} />
          </IconButton>
          <Typography
            variant="h6"
            color="text.primary"
            component={Link}
            to="/"
            sx={{ textDecoration: "none", fontWeight: "bold" }}
          >
            Chatty
          </Typography>
        </Box>

        {/* Action Section */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* <Button
            component={Link}
            to="/settings"
            variant="outlined"
            startIcon={<Settings size={18} />}
            sx={{ textTransform: "none" }}
          >
            Settings
          </Button> */}

          {authUser && (
            <>
              {/* <Button
                component={Link}
                to="/profile"
                variant="outlined"
                startIcon={<User size={18} />}
                sx={{ textTransform: "none" }}
              >
                Profile
              </Button> */}

              <Button
                onClick={handleLogout}
                variant="text"
                startIcon={<LogOut size={18} />}
                sx={{ textTransform: "none" }}
              >
                Logout
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};


