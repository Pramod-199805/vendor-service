import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const Table = ({ caption, headers, body, fetchData, pageData }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const keys =
    body.length > 0
      ? Object.keys(body[0]).filter((key) => key !== "id")
      : headers;
  const [currentPage, setCurrentPage] = useState(1);
  const [index, setIndex] = useState(null);

  const previousPage = (pageNo) => {
    console.log(pageNo, "Previous");
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      fetchData(pageNo - 1);
    }
  };

  const nextPage = (pageNo) => {
    console.log(pageNo, "next");
    if (currentPage < pageData.pages) {
      setCurrentPage(currentPage + 1);

      fetchData(pageNo + 1);
    }
  };

  const callCurrentPage = (pageNo) => {
    setCurrentPage(pageNo);
    console.log(currentPage, "next curentt........");
    fetchData(pageNo);
  };

  const sendEmail = (email, rindex) => {
    console.log(email, "EMAIL SEND");
    setIndex(rindex);
    let payLoad = [
      {
        mailTo: email.email,
        upi: email.upi,
      },
    ];
    axiosInstance
      .post("api/v1/vendor/send-email", payLoad)
      .then((response) => {
        fetchData(1);
        console.log(response, "response");
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const editUser = (email) => {
    if(location.pathname.includes("vendors")){
      navigate(`/home/vendor/edit/${email}`)
    } else {
      navigate(`/home/employee/edit/${email}`)
    }
    
  }

  const deleteUser = (email) => {
    let url = location.pathname.includes("vendors") ? 'api/v1/vendor' :'api/v1/employee';
     deleteData(url,email)
  }

 const deleteData = (url,email) => {
  axiosInstance.delete((`${url}/${email}`))
  .then((res) => {
    fetchData(1);
  })
  }
  console.log(currentPage, "rendered....");
  return (
    <div className="">
      <table className="drop-shadow-lg bg-white table-fix min-w-full">
        <caption className="caption-top">Table: {caption}</caption>
        <thead className="text-left text-white bg-custom-radial">
          <tr>
            {keys.map((head, index) => {
              return (
                <>
                  <th key={index} className="px-8">
                    {head.charAt(0).toUpperCase() + head.slice(1)}
                  </th>
                  {head === "isEmailStatus" && <th>Send Mail</th>}
                  
                </>
              );
            })}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {body.map((obj, rIndex) => (
            <tr key={obj.email} className="text-left">
              {keys.map((key, cIndex) => (
                <td
                  key={`${rIndex}_${cIndex}_${obj.email}`}
                  className="py-1 px-8"
                >
                  {key === "isEmailStatus" ? (
                    obj[key] === true ? (
                      <span className="success bg-emerald-100 p-0 px-11 text-center rounded-lg border border-green-700">
                        Success
                      </span>
                    ) : (
                      <span className="fail bg-red-100 p-0 px-10 text-center rounded-lg border border-red-700">
                        Not Sent
                      </span>
                    )
                  ) : (
                    obj[key]
                  )}
                </td>
              ))}
              {obj.hasOwnProperty("isEmailStatus") && (
                <td className="py-1">
                  {obj.isEmailStatus ? (
                    <span className="cursor-not-allowed">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-send"
                        viewBox="0 0 16 16"
                      >
                        <path
                          d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"
                          className="cursor-none"
                        />
                      </svg>
                    </span>
                  ) : (
                    <span
                      className="cursor-pointer shadow-lg"
                      onClick={() => sendEmail(obj, rIndex)}
                    >
                      {
                       (rIndex === index ? (
                          "Sending..."
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-send"
                            viewBox="0 0 16 16"
                          >
                            <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z" />
                          </svg>
                        ))}
                    </span>
                  )}
                </td>
              )}
              <td><span className="mr-1 border-b-2 hover:border-blue-950 cursor-pointer" onClick={() => {editUser(obj.email)}}>Edit</span><span className="mx-1 border-b-2 hover:border-blue-950 cursor-pointer" onClick={() => {deleteUser(obj.email)}}>Delete</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <p>{body.length <= 0 && "No records found"}</p>
      </div>

      <div className=" flex justify-between p-8 items-center">
        <p>{`Showing ${pageData.noOfRecords} of ${pageData.totalRecords} records`}</p>
        <ul className="flex gap-2 ">
          <li
            className="cursor-pointer p-2 bg-gray-400"
            onClick={() => {
              previousPage(currentPage);
            }}
          >
            Previous
          </li>
          <li
            className={`cursor-pointer p-2 ${
              currentPage === 1
                ? "bg-indigo-950 text-white"
                : "border border-black"
            }`}
            onClick={() => {
              callCurrentPage(1);
            }}
          >
            1
          </li>
          {pageData.pages >= 3 &&
            (() => {
              let items = [];
              if (pageData.pages >= 3) {
                for (let i = 2; i <= 3; i++) {
                  items.push(
                    <li
                      className={`cursor-pointer p-2 ${
                        currentPage === i
                          ? "bg-indigo-950 text-white"
                          : "border border-black"
                      }`}
                      onClick={() => callCurrentPage(i)}
                    >
                      {i}
                    </li>
                  );
                }
              }
              return items;
            })()}
          {pageData.pages < 3 && currentPage < pageData.pages && (
            <li
              className="cursor-pointer p-2 px-5 bg-gray-400"
              onClick={() => {
                nextPage(currentPage);
              }}
            >
              Next
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Table;
