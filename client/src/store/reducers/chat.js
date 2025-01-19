import { createSlice } from "@reduxjs/toolkit";

const chat = createSlice({
  name: "chat",
  initialState: {
    users: [],
    messages: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setUsersLoading: (state, action) => {
      state.isUsersLoading = action.payload;
    },
    setMessagesLoading: (state, action) => {
      state.isMessagesLoading = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    subscribeToMessages: (state, action) => {
      const socket = action.payload; 
      const selectedUserId = state.selectedUser?._id;

      if (!selectedUserId) return;

      socket.on("newMessage", (newMessage) => {
        if (newMessage.senderId === selectedUserId) {
          state.messages.push(newMessage);
        }
      });
    },
    unsubscribeFromMessages: (state, action) => {
      const socket = action.payload; 
      socket.off("newMessage");
    },
  },
});

export const {
  setUsers,
  setMessages,
  setSelectedUser,
  setUsersLoading,
  setMessagesLoading,
  addMessage,
  subscribeToMessages,
  unsubscribeFromMessages,
} = chat.actions;

export default chat.reducer;