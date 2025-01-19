import React, { useState } from 'react'
import { useQuery } from 'react-query';
import { getUsers } from '..';
import { useDispatch } from 'react-redux';
import { setUsers } from '../../../store/reducers/chat';
import toast from "react-hot-toast";

export const useSidebarHook = ({ load = false }) => {
    const dispatch=useDispatch()
    const [showOnlineOnly, setShowOnlineOnly] = useState(false);

     const { data: UsersList, isLoading: isUsersLoading } = useQuery(
       ["Users"],
       getUsers,
       {
         enabled: load,
           onSuccess: (res) => {               
             dispatch(setUsers(res));
           },
           onError: (error) => {
               toast.error(error?.response?.data?.message);
           }
       }
     );
    
     const onHandleShowOnlineOnly = () => {
       setShowOnlineOnly(!showOnlineOnly);
     };
    
    // const isUsersLoading = useFetchUsers?.isLoading;
    return {
      UsersList,
      isUsersLoading,
      showOnlineOnly,
      onHandleShowOnlineOnly,
    };
}
