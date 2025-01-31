import { BrowserRouter, Route, Routes } from "react-router-dom";
import Scoreboard from "./components/Scoreboard.jsx";
import Welcome from "./components/Welcome.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Game from "./Game.jsx";
import UserProfile from "./components/UserProfile.jsx";
import UpdatePassword from "./components/UpdatePassword.jsx";
import Layout from "./components/Layout.jsx";
import { UserProvider } from "./components/UserContext.jsx";

function App() {
  return (
    <UserProvider>
      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<Game />} />
            <Route path="/scoreboard" element={<Scoreboard />} />
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/update-password" element={<UpdatePassword />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
