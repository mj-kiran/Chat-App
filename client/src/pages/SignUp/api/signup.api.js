import { Axios } from "../../../utils";

export const signUpUser = async (payload) => {
  const res = await Axios.post("auth/signup", payload);
  return res?.data;
};
