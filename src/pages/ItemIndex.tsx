import { Outlet } from "react-router-dom";
import BtnBack from "../components/BtnBack/BtnBack";

const ItemIndex = () => {
  return (
    <div className="w-100 vh-100 padding3  ">
      <BtnBack />
      <Outlet />
    </div>
  );
};

export default ItemIndex;
