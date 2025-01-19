import React from "react";
import { Box, Skeleton, Avatar } from "@mui/material";

export const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <Box
      sx={{
        flex: 1,
        overflowY: "auto",
        p: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      {skeletonMessages.map((_, idx) => (
        <Box
          key={idx}
          sx={{
            display: "flex",
            flexDirection: idx % 2 === 0 ? "row" : "row-reverse",
            alignItems: "flex-start",
            gap: 2,
          }}
        >
          {/* Avatar Skeleton */}
          <Avatar sx={{ width: 40, height: 40 }}>
            <Skeleton variant="circular" width={40} height={40} />
          </Avatar>

          <Box sx={{ flex: 1 }}>
            {/* Header Skeleton */}
            <Skeleton width={64} height={20} sx={{ mb: 1 }} />

            {/* Message Bubble Skeleton */}
            <Skeleton
              variant="rectangular"
              width={200}
              height={64}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>
      ))}
    </Box>
  );
};


