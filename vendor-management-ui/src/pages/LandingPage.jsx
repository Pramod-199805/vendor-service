import React, { useRef } from "react";
import "../index.css";
import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  const payLoad = useRef({ email: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    payLoad.current = {
      ...payLoad.current,
      [name]: value,
    };
    console.log(payLoad.current);
  };

  const navigateToHome = () => {
    navigate("/home");
  };
  console.log("Rendered");
  return (
    <div className="flex bg-clr align-center ">
      <div className="bg-img">
        <h1 className="text-white-color"> Welcome To Vendor </h1>
        <h1 className="text-white-color">Management </h1>
      </div>
      <div className="flex align-center justify-center landing-page">
        <input
          type="text"
          placeholder="Email is required"
          className="reg-input err"
          name="email"
          value={payLoad.email}
          onChange={handleChange}
        />
        <button
          className="reg-btn"
          onClick={navigateToHome}
        >
          Login
        </button>
        <div></div>
      </div>
    </div>
  );
};

export default LandingPage;
