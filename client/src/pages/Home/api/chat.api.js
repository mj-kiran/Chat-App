import { Axios } from "../../../utils";

export const getUsers = async () => {
  const res = await Axios.get("messages/users");
  return res?.data;
};

export const getUserMessages = async (userId) => {
  const res = await Axios.get(`/messages/${userId}`);
  return res?.data;
};

export const sendUserMessages = async (payload) => {
  const { userId, ...rest } = payload
  
  
  const res = await Axios.post(`/messages/send/${userId}`, rest);
  return res?.data;
};