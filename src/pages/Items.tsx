import "./../components/ItemCard/ItemCard.css";
import { Outlet } from "react-router-dom";

const Items = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Items;
