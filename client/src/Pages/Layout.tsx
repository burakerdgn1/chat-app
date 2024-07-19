import { Outlet } from "react-router-dom";
import "../App.css";
import { Header } from "../components/Header/Header";

export default function Layout() {
  return (
    <div id="layout">
      <Header />
      <Outlet />
    </div>
  );
}
