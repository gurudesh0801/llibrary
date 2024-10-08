import React, { useState } from "react";
import "./NewEntryForm.css";
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

const NewEntryForm = () => {
  const fee = document.getElementsByName("fees").value;
  const paid = document.getElementsByName("amountPaid").value;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    address: "",
    fees: "",
    amountPaid: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update fees based on selected education purpose
    let fees = formData.fees;
    if (name === "education") {
      fees = value === "MPSC" || value === "UPSC" ? 20000 : 15000;
    }

    setFormData({
      ...formData,
      [name]: value,
      fees: fees,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fee < paid) alert("Fees are paid by student is grater then the actual");
    else "";

    fetch(`https://llibrary-backend.onrender.com/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("New student entry has been submitted!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          education: "",
          address: "",
          fees: "",
          amountPaid: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <h2 className="newHeading ">New Student Entry Form</h2>
      <form
        onSubmit={handleSubmit}
        method="post"
        action={`https://llibrary-backend.onrender.com/students`}
        className="contentForm"
      >
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone (WhatsApp only):</label>
          <input
            type="tel"
            name="phone"
            pattern="^\d{10}$"
            title="Please enter a valid 10-digit WhatsApp number"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Education Purpose:</label>
          <select
            name="education"
            value={formData.education}
            onChange={handleChange}
            required
          >
            <option value="">Select Education Purpose</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Diploma">Diploma</option>
            <option value="Certification">Certification</option>
            <option value="MPSC">MPSC</option>
            <option value="UPSC">UPSC</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label>Fees:</label>
          <input type="text" name="fees" value={formData.fees} readOnly />
        </div>
        <div>
          <label>Amount Paid:</label>
          <input
            type="number"
            name="amountPaid"
            value={formData.amountPaid}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewEntryForm;
