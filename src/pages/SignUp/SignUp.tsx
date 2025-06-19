import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";
import { useRef, type FormEvent } from "react";
import axios from "axios";

const SignUp = () => {
  const first_name = useRef<HTMLInputElement>(null);
  const last_name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const password_confirmation = useRef<HTMLInputElement>(null);
  const profile_image = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const sendData = (event: FormEvent) => {
    event.preventDefault();

    const fullName = `${first_name.current?.value || ""} ${
      last_name.current?.value || ""
    }`;

    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/register",
        {
          first_name: first_name.current?.value,
          last_name: last_name.current?.value,
          user_name: fullName,
          email: email.current?.value,
          password: password.current?.value,
          password_confirmation: password_confirmation.current?.value,
          profile_image: profile_image.current?.files?.[0],
        },
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err.response?.data);
      });
  };

  return (
    <Container fluid="xs" className="bg-white border-raduis custom-padding ">
      <Form
        className="d-flex flex-column justify-content-center "
        onSubmit={sendData}
      >
        <img src="/assets/imgs/logo.svg" alt="logo" className="mx-auto mb-4" />
        <h2 className="text-center fw-semibold">Sign up</h2>
        <p className="text-center margin grey-color">
          Fill in the following fields to create an account.
        </p>
        <Row>
          <Form.Label className="grey-color fs-6">Name </Form.Label>
          <Col>
            <Form.Control
              placeholder="First name"
              className="custom-input mb-3"
              required
              ref={first_name}
            />
          </Col>
          <Col>
            <Form.Control
              placeholder="Last name"
              className="custom-input"
              required
              ref={last_name}
            />
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formGroupEmail">
          <Form.Label className="grey-color fs-6">Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            className="custom-input mb-3"
            required
            ref={email}
          />
        </Form.Group>
        <Row>
          <Form.Label className="grey-color fs-6">Password </Form.Label>
          <Col>
            <Form.Control
              type="password"
              placeholder="Enter password"
              className="custom-input mb-3"
              required
              ref={password}
            />
          </Col>
          <Col>
            <Form.Control
              type="password"
              placeholder="Re-enter your password"
              className="custom-input mb-3"
              required
              ref={password_confirmation}
            />
          </Col>
        </Row>
        <Form.Group>
          <Form.Label className="grey-color fs-6">Profile Image</Form.Label>
          <div className="d-flex justify-content-center align-items-center upload-box text-center mb-3 cursor-pointer">
            <label htmlFor="fileUpload" className="cursor-pointer">
              <img src="/assets/imgs/Upload-icon.png" alt="upload" width="40" />
            </label>
            <Form.Control
              type="file"
              id="fileUpload"
              className="d-none"
              accept="image/*"
              ref={profile_image}
            />
          </div>
        </Form.Group>
        <button type="submit" className="btn btn-color mb-20">
          SIGN UP
        </button>
      </Form>
      <div className="Sign-in text-center">
        <p className="grey-color">
          Do you have an account?
          <Link to="/" className="orange-color">
            Sign in
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default SignUp;
