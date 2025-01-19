import React from "react";
import { Box, Typography, Paper, TextField, Grid, InputAdornment, IconButton } from "@mui/material";
import { Eye, EyeOff, Lock, Mail, MessageSquare } from "lucide-react";
import { AuthImagePattern, LoaderButton, useValidation } from "../../../shared";
import { useLogin, validationSchemas } from "..";
import { Link } from "react-router-dom";
export const LoginForm = () => {
  const {
    isLoginLoading,
    selecteduser,
    showPassword,
    onHandleLoginUser,
    onChangeLoginDetails,
    onHandleShowPassword,
  } = useLogin({
    load: true,
  });
  const { formik, getErrorMessage, isErrorField } = useValidation({
    validationSchema: validationSchemas,
    state: selecteduser,
    handleSubmit: onHandleLoginUser,
  });

  return (
    // <Paper
    //   elevation={3}
    //   sx={{
    //     padding: 4,
    //     maxWidth: 400,
    //     margin: "auto",
    //     marginTop: 8,
    //     textAlign: "center",
    //     borderRadius: 2,
    //   }}
    // >
    //   <Typography variant="h4" component="h1" gutterBottom>
    //     INIT Chat
    //   </Typography>

    //   <Box mb={2}>
    //     <TextField
    //       label="Email"
    //       name="email"
    //       variant="outlined"
    //       fullWidth
    //       error={isErrorField("email")}
    //       helperText={getErrorMessage("email")}
    //       value={selecteduser?.email}
    //       onChange={onChangeLoginDetails}
    //     />
    //   </Box>
    //   <Box mb={2}>
    //     <TextField
    //       label="Password"
    //       name="password"
    //       variant="outlined"
    //       fullWidth
    //       type="password"
    //       value={selecteduser?.password}
    //       onChange={onChangeLoginDetails}
    //       error={isErrorField("password")}
    //       helperText={getErrorMessage("password")}
    //     />
    //   </Box>
    //   <LoaderButton
    //     btnName={"SIGN IN"}
    //     className="cu-btn primary"
    //     isLoading={isLoginLoading}
    //     onClick={formik.handleSubmit}
    //   />
    // </Paper>

    <Grid container sx={{ height: "100vh" }}>
      {/* Left Side - Form */}
      <Grid
        item
        xs={12}
        lg={6}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        p={3}
      >
        <Box maxWidth={400} width="100%">
          {/* Logo */}
          <Box textAlign="center" mb={4}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexDirection="column"
              gap={2}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MessageSquare size={24} />
              </Box>
              <Typography variant="h5" fontWeight="bold">
                Welcome Back
              </Typography>
              <Typography color="text.secondary">
                Sign in to your account
              </Typography>
            </Box>
          </Box>

          {/* Form */}
          <Box mb={3}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              type="email"
              name="email"
              value={selecteduser.email}
              onChange={onChangeLoginDetails}
              error={isErrorField("email")}
              helperText={getErrorMessage("email")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Mail size={20} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              name="password"
              type={showPassword ? "text" : "password"}
              value={selecteduser.password}
              onChange={onChangeLoginDetails}
              error={isErrorField("password")}
              helperText={getErrorMessage("password")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock size={20} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={onHandleShowPassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box textAlign="center" mt={3}>
            <LoaderButton
              btnName={"SIGN IN"}
              className="cu-btn primary"
              isLoading={isLoginLoading}
              onClick={formik.handleSubmit}
            />
          </Box>
          <Box textAlign="center" mt={3}>
            <Typography color="text.secondary">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                style={{ color: "inherit", textDecoration: "none" }}
              >
                <Typography color="primary" component="span">
                  Create account
                </Typography>
              </Link>
            </Typography>
          </Box>
        </Box>
      </Grid>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title="Welcome back!"
        subtitle="Sign in to continue your conversations and catch up with your messages."
      />
    </Grid>
  );
};
