import { Outlet } from "react-router-dom";
import "../App.css";
import Header from "../components/Header/Header";

const Layout = () => {
  return (
    <div id="layout">
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
