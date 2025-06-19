import { useNavigate } from "react-router-dom";

const BtnBack = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <button
      onClick={goBack}
      className="icon border border-black rounded-circle p-10 w-40 h-40 d-flex align-items-center justify-content-center me-auto bg-white"
    >
      <img src="/assets/imgs/row.svg" />
    </button>
  );
};

export default BtnBack;
