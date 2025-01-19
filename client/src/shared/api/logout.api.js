import { Axios } from "../../utils";

export const logoutUser = async (payload) => {
  const res = await Axios.post("auth/logout", payload);
  return res?.data;
};