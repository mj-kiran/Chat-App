import { Axios } from "../../../utils";

export const logginUser = async (payload) => {
  const res = await Axios.post("auth/login", payload);
  return res?.data;
};
