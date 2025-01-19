import React from "react";
import { Users } from "lucide-react";
import { Box, Divider, Typography, Skeleton } from "@mui/material";

export const SidebarSkeleton = () => {
  const skeletonContacts = Array(8)?.fill(null);

  return (
    <Box
      component="aside"
      sx={{
        height: "100%",
        width: { xs: "5rem", lg: "18rem" },
        borderRight: 1,
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.2s",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          borderBottom: 1,
          borderColor: "divider",
          p: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Users size={24} />
          <Typography
            variant="body1"
            sx={{ fontWeight: "500", display: { xs: "none", lg: "block" } }}
          >
            Contacts
          </Typography>
        </Box>
      </Box>

      {/* Skeleton Contacts */}
      <Box sx={{ overflowY: "auto", py: 2 }}>
        {skeletonContacts.map((_, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              px: 2,
              py: 1,
            }}
          >
            {/* Avatar skeleton */}
            <Box>
              <Skeleton
                variant="circular"
                width={48}
                height={48}
                sx={{ mx: { xs: "auto", lg: 0 } }}
              />
            </Box>

            {/* User info skeleton - only visible on larger screens */}
            <Box
              sx={{
                display: { xs: "none", lg: "block" },
                textAlign: "left",
                flex: 1,
              }}
            >
              <Skeleton variant="text" width={120} height={20} sx={{ mb: 1 }} />
              <Skeleton variant="text" width={80} height={16} />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};


