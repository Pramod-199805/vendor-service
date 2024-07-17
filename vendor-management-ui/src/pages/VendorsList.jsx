import React, { useEffect, useState } from "react";
import Table from "../components/Table";
import axiosInstance from "../utils/axiosInstance";
import { useSelector } from "react-redux";

const VendorsList = () => {
  const [vendorList, setVendorList] = useState([]);
  const [pageInfo,setPageInfo] =useState({
    noOfRecords:0,
    totalRecords:0,
    pages:0
  });
  const data = useSelector((store) => store.tableData.tableUpdate);
  useEffect(() => {
    console.log("Vendor list use effect called");
    fetchVendorList(1);
  }, [data]);

  const fetchVendorList = (pageNumber) => {
    axiosInstance
      .get(`api/v1/vendor?pageNo=${pageNumber}&pageSize=10`)
      .then((response) => {
        console.log("res::", response);
        setVendorList(response.data.data.data);
        setPageInfo(prev => ({...prev, ...response.data.data}))
      })
      .catch((err) => {
        console.log(err, "ERER");
      });
  };

  const getData = (pageNumber) => {
    console.log("Called");
    fetchVendorList(pageNumber);
  };
  const props = {
    caption: "Vendors list",
    body: vendorList,
    headers: ["Email", "Username", "UPI", "Email Status"],
    pageData: pageInfo
  };
  return (
    <div className="ml-10 mr-10 mt-6 p-4">
      <Table {...props} fetchData={getData} />
    </div>
  );
};

export default VendorsList;
