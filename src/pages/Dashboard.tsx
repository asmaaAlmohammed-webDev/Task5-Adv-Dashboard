import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar/SideBar";

const Dashboard = () => {
  return (
    <div className=" vh-100 d-flex justify-content-between">
      <SideBar />

      <Outlet />
    </div>
  );
};

export default Dashboard;
