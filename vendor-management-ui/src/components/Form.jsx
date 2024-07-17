import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import Alert from "./Alert";
import "../index.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateTable } from "../store/slice/tablelistslice";
const Form = (props) => {
  console.log(props, "props");
  const [isActiveForm, setActiveForm] = useState("emp");
  const [isMandatoryFieldFilled, setMandatoryField] = useState(false);
  const [isShowAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isLoader, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [payLoad, setPayLoad] = useState({
    username: "",
    email: "",
    designation: "",
    ctc: "",
    isEmailStatus: "",
    upi: "",
  });
  const toggleForm = (tab) => {
    setPayLoad({
      username: "",
      email: "",
      designation: "",
      ctc: "",
      isEmailStatus: false,
      upi: "",
    });
    setActiveForm(tab);
  };
  const showForm = () => {
    props.onClick();
  };

  useEffect(() => {
    console.log("User effect called");
    if (isShowAlert) {
      const timeOut = setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    }
    validateFields();
  }, [payLoad, isActiveForm, isShowAlert]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setPayLoad((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateFields = () => {
    const empData = ["username", "email", "designation", "ctc"];
    const vendorData = ["username", "email", "upi"];
    if (isActiveForm === "emp") {
      const { isEmailStatus, upi, ...newPayLoad } = payLoad;
      validateData(empData, newPayLoad);
    } else {
      const { ctc, designation, ...newPayLoad } = payLoad;
      validateData(vendorData, newPayLoad);
    }
  };

  const validateData = (data, pl) => {
    let flag = false;
    data.forEach((emp) => {
      if (pl[emp] === "") {
        flag = true;
      }
    });
    setMandatoryField(flag);
  };

  const submitForm = () => {
    setLoading(true);
    if (!isMandatoryFieldFilled) {
      if (isActiveForm === "emp") {
        const { isEmailStatus, upi, ...newPayLoad } = payLoad;
        createUser(newPayLoad, "");
      } else {
        const { ctc, designation, ...newPayLoad } = payLoad;
        console.log(newPayLoad, "Palod");
        createUser(newPayLoad, "vendors");
      }
    }
  };
  const createUser = (payload, nav) => {
    let url =
      isActiveForm === "emp"
        ? "api/v1/employee"
        : "api/v1/vendor";

    axiosInstance
      .post(url, payLoad)
      .then((response) => {
        setLoading(false);
        props.setAlert();
        showForm();
        setAlertMessage("");
        setShowAlert(false);
        dispatch(updateTable());
        navigate(nav);
        console.log("Response::", response);
      })
      .catch((err) => {
        console.log("err", err);
        const message = err.response.data.message;
        setLoading(false);
        setAlertMessage(message);
        setShowAlert(true);
      });
  };
  return (
    <>
      <div className=" bg-white border border-indigo-950 absolute right-0 top-0 p-10 w-1/4 z-20 h-full ">
        <div>
          <div className="px-0 border-0 border-gray-400 mb-5 flex justify-between ">
            <div className="">
              <button
                className={`border-b-2  ${
                  isActiveForm === "emp"
                    ? "border-indigo-950 text-blue-900 font-bold"
                    : "text-black"
                }`}
                onClick={() => toggleForm("emp")}
              >
                Create Employee
              </button>
              <span className="mt-0">/</span>
              <button
                className={`border-b-2   ${
                  isActiveForm === "ven"
                    ? "border-indigo-950 text-indigo-900 font-bold"
                    : "text-black"
                }`}
                onClick={() => toggleForm("ven")}
              >
                Create Vendor
              </button>
            </div>
            <div>
              <button
                className="bg-white p-2 border border-x-gray-300 drop-shadow-lg"
                onClick={showForm}
              >
                X
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {isMandatoryFieldFilled && (
              <p className="text-red-500">
                Field marked with (*) are mandatory
              </p>
            )}
            {isShowAlert && <Alert message={alertMessage} />}
            <div>
              <p className="text-indigo-950">
                User Name<span className="text-red-500">*</span>:
              </p>
              <input
                placeholder="Enter username"
                name="username"
                className="border border-indigo-950 w-full p-2"
                value={payLoad.username}
                onChange={handleInputChange}
              />
              {payLoad.username === "" && (
                <p className="text-red-500">User name is required</p>
              )}
            </div>
            <div>
              <p className="text-indigo-950">
                Email<span className="text-red-500">*</span>:
              </p>
              <input
                placeholder="Enter email"
                name="email"
                className="border border-indigo-950 w-full p-2"
                value={payLoad.email}
                onChange={handleInputChange}
              />
              {payLoad.email === "" && (
                <p className="text-red-500">Email is required</p>
              )}
            </div>
          </div>
          <div className="flex  flex-col gap-2 mt-2">
            <div>
              <p className="text-indigo-950">
                {isActiveForm === "emp" ? (
                  <>
                    Designation
                    <span className="text-red-500">*:</span>
                  </>
                ) : (
                  <>
                    UPI<span className="text-red-500">*:</span>
                  </>
                )}
              </p>
              <input
                placeholder={
                  isActiveForm === "emp" ? "Enter Designation" : "Enter UPI"
                }
                name={isActiveForm === "emp" ? "designation" : "upi"}
                className="border border-indigo-950 w-full p-2"
                value={
                  isActiveForm === "emp" ? payLoad.designation : payLoad.upi
                }
                onChange={handleInputChange}
              />
              {payLoad.designation === "" && payLoad.upi === "" && (
                <p className="text-red-500">
                  {isActiveForm === "emp"
                    ? "Designation is required"
                    : "UPI is required:"}
                </p>
              )}
            </div>
            {isActiveForm === "emp" && (
              <div>
                <p className="text-indigo-950">
                  CTC<span className="text-red-500">*</span>:
                </p>
                <input
                  placeholder="Enter CTC"
                  name="ctc"
                  className="border border-indigo-950 w-full p-2"
                  type="text"
                  value={payLoad.ctc}
                  onChange={handleInputChange}
                />
                {payLoad.ctc === "" && (
                  <p className="text-red-500">CTC is required</p>
                )}
              </div>
            )}
            {isActiveForm === "ven" && (
              <div className="flex items-center gap-2">
                <label>Send Email</label>
                <input
                  type="checkbox"
                  name="isEmailStatus"
                  className="accent-indigo-900 cursor-pointer"
                  value={payLoad.isEmailStatus}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
          <button
            className={`'border-2 border-indigo-950 p-1 bg-custom-radial text-white text-lg w-full mt-5 ${
              isMandatoryFieldFilled ? "opacity-10 cursor-not-allowed" : ""
            }'`}
            disabled={isMandatoryFieldFilled}
            onClick={submitForm}
          >
            {isLoader ? "Processing...": "Save"}
          </button>
        </div>
      </div>
    </>
  );
};

export default Form;
