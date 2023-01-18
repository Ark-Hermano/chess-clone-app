import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "../App";
import Main from "../pages/main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
]);
