import React, { useState, useEffect } from "react";
import Loading from "../Loading/Loading";
import EditStudentForm from "./EditStudentForm";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const CheckFeeStatus = () => {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingStudent, setEditingStudent] = useState(null); // State for editing student

  useEffect(() => {
    fetch(`https://llibrary-backend.onrender.com/api/viewall`, {
      method: "GET",
      header: {
        "Content-type": "application/json",
        Authorization: "Bearer YOUR_TOKEN_HERE",
      },
      credentials: "include",
    })
      .then((response) => {
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
        setIsLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDelete = (id) => {
    const ans = confirm(`Are you sure want to delete id=${id}`);
    if (ans) {
      fetch(`https://llibrary-backend.onrender.com/api/delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete student");
          }
          setStudents(students.filter((student) => student._id !== id));
        })
        .catch((error) => {
          setError(error.message);
        });
    } else {
      ("");
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student); // Set the student to be edited
  };

  const handleSave = (updatedStudent) => {
    fetch(`https://llibrary-backend.onrender.com/api/edit/${updatedStudent._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedStudent),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update student");
        }
        return response.json();
      })
      .then((data) => {
        setStudents(
          students.map((student) => (student._id === data._id ? data : student))
        );
        setEditingStudent(null); // Clear the editing state
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReminder = (student) => {
    const phoneNumber = student.phone; // Assuming you have the phone number in the student object
    const message = `Hi ${student.name}, this message is from Legends Library. Please remember to pay your remaining fees. Your current status is ${student.amountPaid} out of ${student.fees}.`;

    // Create the wa.me link
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    // Create the web WhatsApp URL
    const webWaUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    // Tab identifier
    const tabName = "whatsappReminderTab";

    // Try to get an existing tab with the given name
    let existingTab = window.open("", tabName);

    if (existingTab.location.href === "about:blank" || existingTab.closed) {
      // No tab with the name or tab is closed, open a new tab
      existingTab = window.open(webWaUrl, tabName);
    } else {
      // Tab with the name exists and is open, navigate to it
      existingTab.location.href = webWaUrl;
      existingTab.focus();
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Check Fee Status</h2>
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {editingStudent ? (
        <EditStudentForm
          student={editingStudent}
          onSave={handleSave}
          onCancel={handleCancelEdit}
        />
      ) : filteredStudents.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Actual Fees</th>
              <th>Paid Fees</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const status =
                parseFloat(student.amountPaid) < parseFloat(student.fees)
                  ? "Incomplete"
                  : "Paid";

              return (
                <tr key={student._id}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.fees}</td>
                  <td>{student.amountPaid}</td>
                  <td>{status}</td>
                  <td>
                    <button onClick={() => handleEdit(student)}>Edit</button>
                    <button onClick={() => handleDelete(student._id)}>
                      Delete
                    </button>
                    <button onClick={() => handleReminder(student)}>
                      Reminder
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <div>No students found.</div>
      )}
    </div>
  );
};

export default CheckFeeStatus;
