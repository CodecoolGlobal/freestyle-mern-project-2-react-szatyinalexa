import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Scoreboard from "./components/Scoreboard.jsx";
import Welcome from "./components/Welcome.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
/* import App from './App.jsx' */
import Game from "./Game.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";

const router = createBrowserRouter([
  { path: "/game", element: <Game></Game> },
  {
    path: "/scoreboard",
    element: <Scoreboard></Scoreboard>,
  },
  {
    path: "/",
    element: <Welcome></Welcome>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/user-profile",
    element: <UserProfile></UserProfile>,
  },
  {
    path: "/update-password",
    element: <UpdatePassword></UpdatePassword>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router}></RouterProvider>
    {/* <App></App> */}
  </>
);
