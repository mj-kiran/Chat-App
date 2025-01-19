import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { TrendingUp, Visibility, VisibilityOff } from "@mui/icons-material";
import { Mail, Lock, User } from "lucide-react";
import { AuthImagePattern, LoaderButton, useValidation } from "../../../shared";
import { useSignUp,validationSchemas } from "..";

export const SignupForm = () => {
    const {
    isSignUpLoading,
  formData,
  showPassword,
  onHandleShowPassword,
  onChangeSignUpDetails,
  onHandleSignUpUser,
} = useSignUp({ load: true });
      const { formik, getErrorMessage, isErrorField } = useValidation({
        validationSchema: validationSchemas,
        state: formData,
        handleSubmit: onHandleSignUpUser,
      });
  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { lg: "1fr 1fr" },
      }}
    >
      {/* Left Side */}
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={6}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Box maxWidth={400} width="100%">
          {/* Logo Section */}
          <Box textAlign="center" mb={4}>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap={2}
              sx={{ cursor: "pointer" }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: "primary.light",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 2,
                  transition: "background-color 0.3s",
                  "&:hover": { backgroundColor: "primary.main" },
                }}
              >
                <Mail fontSize="large" color="primary" />
              </Box>
              <Typography variant="h4" fontWeight="bold" mt={2}>
                Create Account
              </Typography>
              <Typography color="textSecondary">
                Get started with your free account
              </Typography>
            </Box>
          </Box>

          {/* Form Section */}

          <Box mb={3}>
            <TextField
              fullWidth
              name="fullName"
              label="Full Name"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={onChangeSignUpDetails}
              error={isErrorField("fullName")}
              helperText={getErrorMessage("fullName")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <User color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={onChangeSignUpDetails}
              error={isErrorField("email")}
              helperText={getErrorMessage("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              placeholder="••••••••"
              value={formData.password}
              onChange={onChangeSignUpDetails}
              error={isErrorField("password")}
              helperText={getErrorMessage("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={onHandleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={3}>
            <InputLabel id="role-label">Role</InputLabel>
            <Select
              fullWidth
              name="role"
              labelId="role-label"
              id="role"
              value={formData.role}
              onChange={onChangeSignUpDetails}
              label="Role"
              error={isErrorField("role")}
              helperText={getErrorMessage("role")}
            >
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">User</MenuItem>
            </Select>
          </Box>

          <Box textAlign="center" mt={2}>
            <LoaderButton
              onClick={formik.handleSubmit}
              btnName={"SIGN UP"}
              isLoading={isSignUpLoading}
            />
          </Box>
          <Box textAlign="center" mt={2}>
            <Typography color="textSecondary">
              Already have an account?{" "}
              <Link
                to="/login"
                style={{ color: "#1976d2", textDecoration: "none" }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </Container>
  );
}
