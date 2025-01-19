import Protection from "../components/Protection";
import { MainLayout } from "../Layout";
import { ChatPage } from "../pages";

const AdminMainRouter = {
  path: "/",
  element: (
    <Protection>
      <MainLayout />
    </Protection>
  ),
  children: [{ path: "/", element: <ChatPage /> }],
};

export default AdminMainRouter;
