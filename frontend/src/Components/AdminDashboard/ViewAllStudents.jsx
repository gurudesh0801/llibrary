import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import * as XLSX from "xlsx"; // Import the XLSX library
import "./ViewAllStudents.css";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const ViewStudents = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Fetch student data from the backend API
    fetch(`${BASE_URL}/api/viewall`, {
      method: "GET",
      header: {
        "Content-type": "application/json",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicGFzc3dvcmQiOiJhZG1pbjEyMyIsImlhdCI6MTcyNDI2MjYxNCwiZXhwIjoxNzI0MjYyNjE0fQ.RsNctms0oSrKKw0fO0EX148Cfg0iysFY4rMqEcCDpVc",
      },
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownload = () => {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    // Convert the students data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(filteredStudents);
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Students");
    // Generate an Excel file and prompt a download
    XLSX.writeFile(workbook, "students_data.xlsx");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>All Students</h2>
      <input
        id="searchName"
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <button onClick={handleDownload}>Download Data</button>{" "}
      {/* Add the download button */}
      {filteredStudents.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Education</th>
              <th>Address</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id}>
                <td>{index + 1}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.phone}</td>
                <td>{student.education}</td>
                <td>{student.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No students found.</div>
      )}
    </div>
  );
};

export default ViewStudents;
