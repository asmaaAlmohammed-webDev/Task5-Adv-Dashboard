import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./pages/Auth";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard";
import Items from "./pages/Items";
import AddItem from "./pages/AddItem/AddItem";
import ItemIndex from "./pages/ItemIndex";
import AllItems from "./pages/AllItems";
import ShowItem from "./pages/ShowItem";
import EditItem from "./pages/EditItem";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
    children: [
      {
        path: "",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "items",
        element: <Items />,
        children: [
          {
            path: "allitems",
            element: <AllItems />,
          },
          {
            path: "itemindex",
            element: <ItemIndex />,
            children: [
              {
                path: "add",
                element: <AddItem />,
              },
              {
                path: "showitem/:id",
                element: <ShowItem />,
              },
              {
                path: "edititem/:id",
                element: <EditItem />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={routes} />
  </StrictMode>
);
