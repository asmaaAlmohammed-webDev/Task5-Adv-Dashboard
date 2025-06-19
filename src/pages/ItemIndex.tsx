import { Outlet } from "react-router-dom";

const ItemIndex = () => {
  return (
    <div className="w-100 vh-100 padding3  ">
      <div className="icon border border-black rounded-circle p-10 w-40 h-40 d-flex align-items-center justify-content-center me-auto">
        <img src="/assets/imgs/row.svg" />
      </div>
      <Outlet />
    </div>
  );
};

export default ItemIndex;
