import React from "react";
import { Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const LoaderButton = ({
  sx,
  onClick,
  isLoading,
  btnName,
  disabled,
  className,
  isExtend,
  startIcon,
}) => {    
  return (
    <Button
      type="submit"
      className={className}
      sx={{
        ...sx,
        color: "#FFFFFF",
        ...(isLoading && !isExtend && { width: 90 }),
        backgroundColor: "#005BBE",
        "&:hover": {
          backgroundColor: "#005BBE",
        },
      }}
    //   disabled={isLoading || disabled}
      startIcon={!isLoading && startIcon}
      onClick={onClick}
    >
      {isLoading ? (
        <CircularProgress size={24} sx={{ color: "white" }} />
      ) : (
        btnName
      )}
    </Button>
  );
};
