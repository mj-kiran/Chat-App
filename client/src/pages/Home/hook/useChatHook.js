import React from 'react'
import { useQuery } from 'react-query';
import { getUserMessages } from '..';
import { useSocket } from '../../../utils';
import { useDispatch } from 'react-redux';
import { setMessages } from '../../../store/reducers/chat';

export const useChatHook = ({ load = false }) => {
    const dispatch=useDispatch()
    const {
      selectedUser: { _id, ...rest },
      setMessages,
    } = useSocket();
    
    

      const { data: UsersMessages, isLoading: isUserMessageLoading } = useQuery(
        ["UserMessages", _id],
        () => getUserMessages(_id),
        {
          enabled: load && !!_id,
            onSuccess: (res) => {
                dispatch(setMessages(res));
                setMessages()
          },
          onError: (error) => {
            toast.error(error?.response?.data?.message);
          },
        }
    );    
    return {
      UsersMessages,
      isUserMessageLoading,
    };
}
