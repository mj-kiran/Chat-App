import React, { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useImmer } from "use-immer";
import Cookies from "js-cookie";
import { logginUser } from "..";
import { useNavigate } from "react-router-dom";
import { SocketContext } from "../../../utils";
import { useDispatch } from "react-redux";
import { setAuthUser, setToken } from "../../../store/reducers/auth";
import toast from "react-hot-toast";

const initUser = {
  email: "",
  password: "",
};
export const useLogin = ({ load = false }) => {
  const queryClient = useQueryClient();
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selecteduser, setSelectedUser] = useImmer(initUser);
  const [showPassword, setShowPassword] = useState(false);

  const userLogin = useMutation(logginUser, {
    onSuccess: (res) => {
      queryClient?.invalidateQueries(["Users"]);
      dispatch(setAuthUser(res));
      dispatch(setToken(res?.token));
      navigate("/");
      toast.success("Logged in successfully");
    },

    onError: () => {},
    onMutate: () => {},
  });

  const onHandleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onHandleLoginUser = () => {
    userLogin?.mutate({ ...selecteduser });
  };

  const onChangeLoginDetails = (e) => {
    const { name, value } = e?.target;
    setSelectedUser((draft) => {
      draft[name] = value;
    });
  };

  const isLoginLoading = userLogin?.isLoading;

  return {
    isLoginLoading,
    selecteduser,
    showPassword,
    onHandleLoginUser,
    onChangeLoginDetails,
    onHandleShowPassword,
  };
};
