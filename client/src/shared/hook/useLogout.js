import React from 'react'
import { logoutUser } from '..';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useDispatch } from 'react-redux';
import { setAuthUser, setToken } from '../../store/reducers/auth';
import { useNavigate } from 'react-router-dom';
import { setUsers } from '../../store/reducers/chat';

export const useLogout = ({load=false}) => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    
      const LogoutUser = useMutation(logoutUser, {
        onSuccess: (res) => {
          dispatch(setAuthUser(null));
          dispatch(setToken(null));
        //   dispatch(setUsers([]));
          navigate("/");
           toast.success("Logged out successfully");
        },

        onError: () => {},
        onMutate: () => {},
      });
    
    const handleLogout = () => {
      LogoutUser.mutate(); 
    };
    return {
        handleLogout
     }
  
}
