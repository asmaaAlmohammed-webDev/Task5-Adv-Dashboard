import { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Image, Spinner } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { type Item } from "./../types/Item";

const ShowItem = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);

  useEffect(() => {
    axios
      .get(`https://web-production-3ca4c.up.railway.app/api/items/${id}`, {
        headers: {
          Accept: "application/json",
          Authorization: ` Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setItem(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!item)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="grow" variant="warning" />
      </div>
    );

  return (
    <Container className="mt-5">
      <h1 className="fw-semibold fs-1 mb-4">{item.name}</h1>

      <Image
        src={item.image_url}
        alt={item.name}
        className="mb-4 w-h-373 d-block  mx-auto"
        fluid
      />

      <Row className="justify-content-between mt-4">
        <Col className="col-12 col-md-6">
          <h4 className="fw-semibold fs-60 w-max-content">
            Price:
            <span className="text-secondary fw-medium fs-1">{item.price}$</span>
          </h4>
        </Col>
        <Col className="col-12 col-md-6">
          <h4 className="fw-semibold fs-60 w-max-content">
            Added At:
            <span className="text-secondary fw-medium fs-1">
              {new Intl.DateTimeFormat("en-GB").format(
                new Date(item.created_at)
              )}
            </span>
          </h4>
        </Col>
      </Row>

      <Row className="mt-4 text-center mt-5">
        <Col className=" ">
          <h4 className="fw-semibold fs-60 w-max-content  mx-auto">
            Updated At:
            <span className="text-secondary fw-medium fs-1">
              {new Intl.DateTimeFormat("en-GB").format(
                new Date(item.updated_at)
              )}
            </span>
          </h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ShowItem;
