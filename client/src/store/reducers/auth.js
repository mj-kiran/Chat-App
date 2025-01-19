import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  authUser: null,
  token: null,
  roles: [],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
};




// ============================== SLICE - USER ==============================
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthLogout: (state) => {
      state.authUser = null;
      state.onlineUsers = [];
      if (state.socket?.connected) {
        state.socket.disconnect();
      }
    },
    setIsCheckingAuth: (state, action) => {
      state.isCheckingAuth = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setIsSigningUp: (state, action) => {
      state.isSigningUp = action.payload;
    },
    setIsLoggingIn: (state, action) => {
      state.isLoggingIn = action.payload;
    },
    setIsUpdatingProfile: (state, action) => {
      state.isUpdatingProfile = action.payload;
    },
  },
});

export const {
  setAuthUser,
  setToken,
  setAuthLogout,
  setIsCheckingAuth,
  setOnlineUsers,
  setSocket,
  setIsSigningUp,
  setIsLoggingIn,
  setIsUpdatingProfile,
} = auth.actions;

export default auth.reducer;
