import { Outlet } from "react-router-dom";

const Auth = () => {
  return (
    <div className="vh-100 bg-color d-flex flex-column justify-content-center align-items-center p-5">
      <Outlet />
    </div>
  );
};

export default Auth;
