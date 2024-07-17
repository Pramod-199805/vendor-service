import React, { useEffect } from "react";

const Success = ({ showAlert, setAlert }) => {
  console.log(showAlert,setAlert, "Success props");
  useEffect(() => {
    if (showAlert) {
      const timeout = setTimeout(() => {
        setAlert();
      }, 3000);
    }
  });
  return (
    <>
      <div className="mt-12 flex justify-center">
        <p className="px-2 border text-white font-normal bg-green-700 border-green-600 rounded-sm">
          User Created Successfully
        </p>
      </div>
    </>
  );
};

export default Success;
