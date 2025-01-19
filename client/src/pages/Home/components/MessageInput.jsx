import { useRef, useState } from "react";
import { IconButton, InputBase, Button, Box } from "@mui/material";
import {
  Send,
  Image as ImageIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useSocket } from "../../../utils";
import { useChatbox } from "..";

export const MessageInput = () => {
  
  const {
    text,
    fileInputRef,
    imagePreview,
    handleSendMessage,
    handleImageChange,
    removeImage,
    onHandleTextChange,
  } = useChatbox({ load: true });

  return (
    <Box sx={{ p: 2, width: "100%" }}>
      {imagePreview && (
        <Box sx={{ mb: 2, display: "flex", alignItems: "center", gap: 1 }}>
          <Box sx={{ position: "relative" }}>
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                width: "80px",
                height: "80px",
                objectFit: "cover",
                borderRadius: "8px",
                border: "1px solid #757575",
              }}
            />
            <IconButton
              onClick={removeImage}
              sx={{
                position: "absolute",
                top: -8,
                right: -8,
                backgroundColor: "background.default",
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}

      <form
        onSubmit={handleSendMessage}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        <Box sx={{ display: "flex", flex: 1, gap: 1 }}>
          <InputBase
            placeholder="Type a message..."
            value={text}
            onChange={onHandleTextChange}
            sx={{
              flex: 1,
              borderRadius: 2,
              border: "1px solid #ccc",
              padding: "6px 12px",
              fontSize: "14px",
            }}
          />
          <input
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleImageChange}
          />
          <IconButton
            onClick={() => fileInputRef.current?.click()}
            sx={{
              color: imagePreview ? "success.main" : "text.secondary",
              display: { sm: "inline-flex", xs: "none" },
            }}
          >
            <ImageIcon />
          </IconButton>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            borderRadius: "50%",
            padding: 1,
            minWidth: 0,
            disabled: !text.trim() && !imagePreview,
          }}
          disabled={!text.trim() && !imagePreview}
        >
          <Send fontSize="medium" />
        </Button>
      </form>
    </Box>
  );
};


