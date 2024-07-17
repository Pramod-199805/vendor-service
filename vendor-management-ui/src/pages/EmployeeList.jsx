import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const EmployeeList = () => {
  const [employeesList, setEmployeeList] = useState([]);
  const [pageInfo,setPageInfo] =useState({
    noOfRecords:0,
    totalRecords:0,
    pages:0
  });
  
  const data = useSelector((store) => store.tableData.tableUpdate);
  // const pageNumber = 1;
  useEffect(() => {
    console.log("Use effect is called");
    fetchData(1);
  }, [data]);

  const fetchData = (pageNumber) => {
    console.log(pageNumber, "PAGE NUMBER.......");
    axiosInstance
      .get(`api/v1/employee?pageNo=${pageNumber}&pageSize=10`)
      .then((response) => {
        console.log("res::", response.data.data);
        setEmployeeList(response.data.data.data);
        setPageInfo(prev => ({...prev, ...response.data.data}))
      })
      .catch((err) => {
        console.log(err, "ERER");
      });
  };

  const getData = (pageNumber) => {
    console.log("Called");
    fetchData(pageNumber);
  };

  const props = {
    caption: "Employees list",
    body: employeesList,
    headers: ["Email", "Username", "Designation", "CTC"],
    pageData: pageInfo
  };
  console.log("EmployeeLIst Renderd");
  return (
    <div className="ml-10 mr-10 mt-6 p-4">
      <Table {...props} fetchData={getData} />
    </div>
  );
};

export default EmployeeList;
