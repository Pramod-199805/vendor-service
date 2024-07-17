import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../index.css";
import Form from "../components/Form";
import Success from "../components/Success";

const Home = () => {
  console.log("Home Renderd");
  const [isShowForm, setShowForm] = useState(false);
  const [isAlert, setAlertMessage] = useState(false);

  const showForm = () => {
    setShowForm(!isShowForm);
  };
  const showAlert = () => {
    setAlertMessage(!isAlert);
  }
  return (
    <>
    {isAlert && <Success showAlert={isAlert} setAlert = {showAlert}/>}
      <div className="mt-20 ml-10 mr-10 p-4 border-2 border-border-gray flex justify-between">
        <div>
          <NavLink
            to=""
            end
            className={({ isActive }) =>
              isActive
                ? "border-b-4 p-2 border-indigo-950"
                : "border-b-4 p-2 border-custom-radial"
            }
          >
            Employees
          </NavLink>
          <span className="pl-1">/</span>
          <NavLink
            to="vendors"
            end
            className={({ isActive }) =>
              isActive
                ? "border-b-4 p-2 border-indigo-950"
                : "border-b-4 p-2 border-custom-radial"
            }
          >
            Vendors
          </NavLink>
        </div>
        <div>
          <button
            className="text-white bg-custom-radial p-2 rounded-md"
            onClick={showForm}
          >
            Add Employee/Customer
          </button>
        </div>
      </div>
      {isShowForm && <Form  onClick = {showForm} setAlert = {showAlert}/>}
      <Outlet />
    </>
  );
};

export default Home;
