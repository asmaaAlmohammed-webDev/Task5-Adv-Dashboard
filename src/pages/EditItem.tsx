import axios from "axios";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { type Item } from "./../types/Item";
import TitleComponent from "../components/TitleComponent/TitleComponent";

const EditItem = () => {
  const name = useRef<HTMLInputElement>(null);
  const price = useRef<HTMLInputElement>(null);
  const image = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { id } = useParams();
  const [oldData, setOldData] = useState<Item>();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setOldData(res.data);
      });
  }, []);
  const handleImageChange = () => {
    const file = image.current?.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  const sendData = (event: FormEvent) => {
    event.preventDefault();

    axios
      .post(
        `https://web-production-3ca4c.up.railway.app/api/items/${id}`,
        {
          name: name?.current?.value,
          price: price?.current?.value,
          image: image?.current?.files?.[0],
          _method: "PUT",
        },
        {
          headers: {
            Authorization: ` Bearer ${localStorage.getItem("token")}`,
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard/items/allitems");
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className=" w-100 ">
      <TitleComponent title="Edit ITEM" />
      <Form onSubmit={sendData}>
        <Row>
          <Col>
            <Form.Label className="grey-color fs-2 fw-500">Name </Form.Label>
            <Form.Control
              placeholder="Enter the product name"
              className="custom-input mb-64"
              required
              defaultValue={oldData?.name}
              ref={name}
            />
            <Form.Label className="grey-color fs-2 fw-500">Price </Form.Label>
            <Form.Control
              placeholder="Enter the product price"
              className="custom-input mb-3"
              required
              defaultValue={oldData?.price}
              ref={price}
            />
          </Col>
          <Col>
            <Form.Group>
              <Form.Label className="grey-color fs-2 fw-500">Image</Form.Label>
              <div className="upload-item d-flex justify-content-center align-items-center text-center cursor-pointer">
                <label
                  htmlFor="fileUpload"
                  className="cursor-pointer w-100 h-100"
                >
                  <img
                    src={previewImage || oldData?.image_url}
                    alt="preview"
                    className="w-auto h-100 object-fit-cover"
                    style={{ borderRadius: "8px" }}
                  />
                </label>
                <Form.Control
                  type="file"
                  id="fileUpload"
                  className="d-none"
                  accept="image/*"
                  ref={image}
                  onChange={handleImageChange}
                />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <button
            type="submit"
            className="btn btn-color w-199 mx-auto text-white mt-120 fs-2"
          >
            SAVE
          </button>
        </Row>
      </Form>
    </div>
  );
};

export default EditItem;
