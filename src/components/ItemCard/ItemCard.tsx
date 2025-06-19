import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import "./ItemCard.css";

interface CardProps {
  id: number;
  name: string;
  price: string;
  image_url: string;
  created_at: string;
  updated_at: string;
  onDelete: (id: number) => void;
}

const ItemCard = ({ id, name, image_url, onDelete }: CardProps) => {
  const navigate = useNavigate();
  const [showActions, setShowActions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [imageSrc, setImageSrc] = useState(image_url);

  const handleImageError = () => {
    setImageSrc("/assets/imgs/default-img.png");
  };

  const DeleteItem = () => {
    axios
      .delete(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        onDelete(id);
        setShowModal(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div
        className="product-card position-relative border-raduis-16 custom-shdow overflow-hidden"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
        onClick={() => navigate(`/dashboard/items/itemindex/showitem/${id}`)}
      >
        <img
          src={imageSrc}
          onError={handleImageError}
          className="item-img w-100 h-100 border-raduis-16"
          alt={name}
        />
        {showActions && (
          <div className="overlay position-absolute top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center">
            <h5 className="text-dark fw-500 mb-32">{name}</h5>
            <div className="d-flex gap-3">
              <button
                className="btn btn-warning rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/dashboard/items/itemindex/edititem/${id}`);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger rounded"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowModal(true);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </div>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        backdrop="static"
      >
        <Modal.Body className="text-center py-4">
          <h5 className="mb-4 fw-semibold fs-6">
            ARE YOU SURE YOU WANT TO DELETE THE PRODUCT?
          </h5>
          <div className="d-flex justify-content-center gap-4">
            <Button className="bg-color3 border-0 w-199" onClick={DeleteItem}>
              Yes
            </Button>
            <Button
              className="bg-color3 border-0 w-199"
              onClick={() => setShowModal(false)}
            >
              No
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemCard;
