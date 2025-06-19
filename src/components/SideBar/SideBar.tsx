import { useEffect, useState } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState("");
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    setUserName(localStorage.getItem("user_name") || "Admin");
    setProfileImage(
      localStorage.getItem("profile_image") || "/assets/imgs/profile.png"
    );
  }, []);

  const logOut = () => {
    axios
      .post(
        "https://web-production-3ca4c.up.railway.app/api/logout",
        {},
        {
          headers: {
            Accept: "application/json",
            Authorization: ` Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("profile_image");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const isProductRoute = location.pathname.startsWith("/dashboard/items");

  return (
    <aside className="bg-color2 vh-100 padding d-flex flex-column align-items-center gap">
      <div className="d-flex flex-column align-items-center h-50">
        <img
          src="/assets/imgs/logo.svg"
          alt="logo"
          className="position-relative with-before mb-5"
        />

        <div className="profile-img rounded-circle overflow-hidden">
          <img
            src={profileImage}
            alt="profile-img"
            className="rounded-circle w-100 h-100 object-fit-cover"
          />
        </div>

        <h2 className="user-name fw-bold fs-6 w-182 mt-3 text-center">
          {userName}
        </h2>
      </div>

      <div className="d-flex flex-column h-50 justify-content-between">
        <ul className="links list-unstyled">
          <li className="fw-medium fs-6 mb-30">
            <NavLink
              to="/dashboard/items/allitems"
              className={`link text-decoration-none padding2 text-black d-flex gap-2 ${
                isProductRoute ? "active" : ""
              }`}
            >
              <img src="/assets/imgs/Vector.svg" alt="vector-img" />
              Products
            </NavLink>
          </li>

          <li className="fw-medium fs-6 mb-30">
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `    link text-decoration-none padding2 text-black d-flex gap-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src="/assets/imgs/bookmark.svg" alt="bookmark-img" />
              Favorites
            </NavLink>
          </li>

          <li className="fw-medium fs-6">
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                `   link text-decoration-none padding2 text-black d-flex gap-2 ${
                  isActive ? "active" : ""
                }`
              }
            >
              <img src="/assets/imgs/bookmark.svg" alt="bookmark-img" />
              Order List
            </NavLink>
          </li>
        </ul>

        <button
          onClick={logOut}
          className="border-0 bg-transparent shadow-none"
        >
          <NavLink
            to="/logout"
            className="logout-link text-decoration-none text-black mt-3 d-flex gap-4 justify-content-center"
          >
            Logout
            <img src="/assets/imgs/sign-out-alt.svg" alt="sign-out-img" />
          </NavLink>
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
