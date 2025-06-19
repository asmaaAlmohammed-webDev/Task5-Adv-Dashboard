import axios from "axios";
import { useRef, useState, type FormEvent } from "react";
import { Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
interface Errors {
  email?: string;
  password?: string;
}
const SignIn = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const navigate = useNavigate();
  const sendData = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/login",
        {
          email: email.current?.value,
          password: password.current?.value,
        },
        {
          headers: { Accept: "application/json" },
        }
      )
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user_name", res.data.user.user_name);
        localStorage.setItem("profile_image", res.data.user.profile_image_url);
        navigate("/dashboard/items/allitems");
      })
      .catch((err) => {
        console.error("❌ Registration failed:", err.response?.data);
        setErrors(err.response.data.errors);
      });
  };
  return (
    <Container fluid="xs" className="bg-white border-raduis custom-padding">
      <Form
        className="d-flex flex-column justify-content-center "
        onSubmit={sendData}
      >
        <img src="/assets/imgs/logo.svg" alt="logo" className="mx-auto mb-43" />
        <h2 className="text-center fw-semibold">Sign In</h2>
        <p className="margin grey-color">
          Enter your credentials to access your account
        </p>
        <Form.Group className="mb-3 " controlId="formGroupEmail">
          <Form.Label className="grey-color fs-6">Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            className="custom-input mb-30"
            required
            ref={email}
          />
          {errors?.email && (
            <p className="fs-6 grey-color">{errors.email[0]}</p>
          )}
        </Form.Group>
        {errors?.email && <p className="fs-6 grey-color">{errors.email[0]}</p>}
        <Form.Group className="mb-3" controlId="formGroupPassword">
          <Form.Label className="grey-color fs-6">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your Password"
            className="custom-input mb-30"
            required
            ref={password}
          />
        </Form.Group>
        {errors?.password && <p>{errors.password[0]}</p>}
        <button type="submit" className="btn btn-color mb-20">
          SIGN IN
        </button>
      </Form>
      <div className="signup text-center">
        <p className="grey-color">
          Don’t have an account?
          <Link to="/signup" className="orange-color">
            Create one
          </Link>
        </p>
      </div>
    </Container>
  );
};

export default SignIn;
