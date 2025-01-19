import React from "react";
import { Box, Typography, Grid } from "@mui/material";

export const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <Box
      sx={{
        display: { lg: "flex", xs: "none" },
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <Box
        sx={{
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {[...Array(9)].map((_, i) => (
            <Grid
              item
              key={i}
              xs={4}
              sx={{
                aspectRatio: "1",
                bgcolor: "primary.light",
                opacity: 0.1,
                borderRadius: 2,
                animation: i % 2 === 0 ? "pulse 1.5s infinite" : "none",
              }}
            />
          ))}
        </Grid>
        <Typography
          variant="h5"
          component="h2"
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

