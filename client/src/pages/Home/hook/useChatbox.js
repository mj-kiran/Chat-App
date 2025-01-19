import React, { useRef, useState } from 'react'
import toast from "react-hot-toast";
import { sendUserMessages } from '..';
import { setMessages } from '../../../store/reducers/chat';
import { useMutation } from 'react-query';
import { useImmer } from 'use-immer';
import { useSocket } from '../../../utils';
import { useDispatch } from 'react-redux';

const initChat = {
  text: "",
  imagePreview:null,
};
export const useChatbox = ({ load = false }) => {
    const dispatch=useDispatch()
        const [imagePreview, setImagePreview] = useState(null);
    const [text, setText] = useState("");
    const fileInputRef = useRef(null);
    const [chat, setChat] = useImmer(initChat);
    const {
          selectedUser: { _id, ...rest },
        } = useSocket();


      const sendMessage = useMutation(sendUserMessages, {
          onSuccess: (res) => {              
          dispatch(setMessages(res));
          toast.success("Message sent successfully");
        },

        onError: () => {},
        onMutate: () => {},
      });
    
    
    const onHandleChatChange = (e,fieldName) => {
        const { name, value } = e?.target;
        setChat((draft) => {
          draft[name] = value;
        });
    }

    const onHandleTextChange = (e, fieldName) => {
      const { name, value } = e?.target;
      setText(value);
    };

      const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file.type.startsWith("image/")) {
          toast.error("Please select an image file");
          return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };
    
     const removeImage = () => {
       setImagePreview(null);
       if (fileInputRef.current) fileInputRef.current.value = "";
     };

    const handleSendMessage = async (e) => {
         e.preventDefault(); 
        if (!text.trim() && !imagePreview) {
          toast.error("Message cannot be empty");
          return;
        } 
        
        try {
            sendMessage.mutate({
              text: text.trim(),
              image: imagePreview,
              userId: _id,
            });
            
            // Clear form
            setText("");
            console.log("clicked");
         setImagePreview(null);
         if (fileInputRef.current) fileInputRef.current.value = "";
       } catch (error) {
         console.error("Failed to send message:", error);
       }
     };
    return {
      fileInputRef,
      text,
      imagePreview,
      setImagePreview,
      handleImageChange,
      handleSendMessage,
      removeImage,
      onHandleTextChange,
    };
}
