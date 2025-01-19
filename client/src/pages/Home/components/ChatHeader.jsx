import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSocket } from "../../../utils";

export const ChatHeader = () => {
  const { selectedUser, setSelectedUser, onlineUsers } = useSocket();


  return (
    <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* User details */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Avatar
            src={selectedUser.profilePic || "/avatar.png"}
            alt={selectedUser.fullName}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 500 }}>
              {selectedUser.fullName}
            </Typography>
            <Typography
              variant="body2"
              color={
                onlineUsers.includes(selectedUser._id)
                  ? "success.main"
                  : "text.secondary"
              }
            >
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>

        {/* Close button */}
        <Button
          onClick={() => setSelectedUser(null)}
          sx={{
            minWidth: 0,
            padding: 1,
            borderRadius: "50%",
            color: "text.primary",
            "&:hover": {
              backgroundColor: "action.hover",
            },
          }}
        >
          <CloseIcon />
        </Button>
      </Box>
    </Box>
  );
};


