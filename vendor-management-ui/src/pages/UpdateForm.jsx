import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { updateTable } from "../store/slice/tablelistslice";

const UpdateForm = () => {
  const [payLoad, setPayLoad] = useState({
    username: "",
    email: "",
    designation: "",
    ctc: "",
    isEmailStatus: "",
    upi: "",
  });
  const location = useLocation();
  const { email } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let url = location.pathname.includes("vendor") ? "api/v1/vendor" : "api/v1/employee";
  useEffect(() => {
    fetchData();
  }, []);
  console.log(email, "Email");
  console.log(location.pathname, "PATHNAME");
  const fetchData = () => {
    if (email) {
      axiosInstance
        .get(`${url}/${email}`)
        .then((response) => {
          setPayLoad((prev) => ({ ...prev, ...response.data.data }));
        })
        .catch((err) => {});
    }
  };

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPayLoad((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const submitForm = () => {
    console.log(payLoad, "PL");
    if (location.pathname.includes("vendor")) {
      updateForm()
      navigate(`/home/vendors`);
      dispatch(updateTable());
    } else {
      updateForm()
      navigate(`/home`);
      dispatch(updateTable());
    }
  };
  const updateForm = () => {
    axiosInstance
      .put(`${url}`, payLoad)
      .then((res) => {
        console.log(res, "Response");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const { pathname } = location;
  return (
    <div className="border border-indigo-950 mt-h-100 w-1/2 p-10 mx-16">
      <div className="w-full">
        <h3 className="font-bold text-xl">
          Edit {pathname.includes("vendor") ? "Vendor" : "Employee"}
        </h3>
        <div className="flex gap-8 mt-4">
          <div className="w-full">
            <p className="text-indigo-950">User Name:</p>
            <input
              placeholder="Enter username"
              name="username"
              className="border border-indigo-950 w-full p-2"
              value={payLoad.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <p className="text-indigo-950">Email:</p>
            <input
              placeholder="Enter email"
              name="email"
              className="border border-indigo-950 w-full p-2 bg-gray-100"
              defaultValue={payLoad.email}
              readOnly={true}
            />
          </div>
        </div>

        <div className="flex gap-8 mt-7">
          <div className="w-full">
            <p className="text-indigo-950">
              {pathname.includes("vendor") ? "UPI:" : "Designation:"}
            </p>
            <input
              placeholder={
                pathname.includes("vendor") ? "Enter UPI" : "Enter Designation"
              }
              name={pathname.includes("vendor") ? "upi" : "designation"}
              className="border border-indigo-950 w-full p-2"
              value={
                pathname.includes("vendor") ? payLoad.upi : payLoad.designation
              }
              onChange={handleInputChange}
            />
          </div>
          <div className="w-full">
            <p className="text-indigo-950 ">
              {pathname.includes("vendor") ? "Send Email:" : "CTC:"}
            </p>
            <input
              placeholder={pathname.includes("vendor") ? "Enter CTC" : ""}
              type={pathname.includes("vendor") ? "checkbox" : "text"}
              name={pathname.includes("vendor") ? "isEmailStatus" : "ctc"}
              className="border border-indigo-950 w-full p-2"
              {...(pathname.includes("vendor")
                ? { checked: payLoad.isEmailStatus }
                : { value: payLoad.ctc })}
              readOnly={pathname.includes("vendor")}
              {...(!pathname.includes("vendor") && {
                onChange: handleInputChange,
              })}
            />
          </div>
        </div>
        <button
          className="border-2 mt-3 border-indigo-950 p-1 bg-custom-radial text-white text-lg w-full"
          onClick={submitForm}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateForm;
