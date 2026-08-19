import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import Profile from "./pages/Profile/Profile";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
  { path: "/profile", element: <Profile /> },
  { path: "*", element: <NotFound /> },
]);

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <ToastContainer position="top-center" />
        <RouterProvider router={router} />
      </AuthContextProvider>
    </>
  );
}
