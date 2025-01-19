import React, { useState } from "react";
import { useImmer } from "use-immer";
import { signUpUser } from "..";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const initUser = {
  fullName: "",
  email: "",
  password: "",
  role: "",
};

export const useSignUp = ({ load = false }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useImmer(initUser);
  const [showPassword, setShowPassword] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const userSignUp = useMutation(signUpUser, {
    onSuccess: (res) => {
      navigate("/login");
      console.log(res);

      toast.success("Account created successfully");
    },
    onError: () => {},
    onMutate: () => {},
  });

  const onHandleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onHandleSignUpUser = () => {
    const success = validateForm();

    if (success === true) {
      userSignUp?.mutate({ ...formData });
    }
  };

  const onChangeSignUpDetails = (e) => {
    const { name, value } = e?.target;
    setFormData((draft) => {
      draft[name] = value;
    });
  };

  const isSignUpLoading = userSignUp?.isLoading;

  return {
    formData,
    showPassword,
    isSignUpLoading,
    onHandleShowPassword,
    onChangeSignUpDetails,
    onHandleSignUpUser,
  };
};
