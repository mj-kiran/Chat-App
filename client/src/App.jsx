import { BrowserRouter, Routes, Route, createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChatPage, Login } from "./pages";
import { SocketProvider, Theme } from "./utils";
import { ThemeProvider } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import AdminMainRouter from "./routes/AdminMainRouter";
import LoginRouter from "./routes/LoginRouter";
import SignUpRouter from "./routes/SignUpRouter";
import { Toaster } from "react-hot-toast";

function App() {

  const authuser = useSelector((state) => state?.chat?.users);

  console.log(authuser);

  const router = useMemo(() => {
    return createBrowserRouter([AdminMainRouter,
      LoginRouter,
      SignUpRouter
      // UserMainRoutes
    ]);
  }, []);
  return (
    <ThemeProvider theme={Theme}>
      <SocketProvider>
        <Toaster />
        <RouterProvider router={router} />
      </SocketProvider>
    </ThemeProvider>
  );
}

export default App;
