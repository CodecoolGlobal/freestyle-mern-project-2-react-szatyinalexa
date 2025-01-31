import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="layout-container">
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
