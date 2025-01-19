export const getToken = () => {
  const token = JSON.parse(localStorage.getItem("tokenData"));
  return token;
};

export const formatMessageTime=(date)=> {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
