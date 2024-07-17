import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingPage from "./LandingPage";
import Home from "./Home";
import BodyLayOut from "./BodyLayOut";
import EmployeeList from "./EmployeeList";
import VendorsList from "./VendorsList";
import UpdateForm from "./UpdateForm";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/home",
      element: <BodyLayOut />,
      children: [
        {
          path: "",
          element: <Home />,
          children: [
            {
              path: "",
              element: <EmployeeList />,
            },
            {
              path: "vendors",
              element: <VendorsList />,
            },
          ],
        },
        {
          path:"employee/edit/:email",
          element:<UpdateForm/>
        },
        {
          path:"vendor/edit/:email",
          element:<UpdateForm/>
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Body;
