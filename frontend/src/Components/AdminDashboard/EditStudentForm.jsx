import React, { useState, useEffect } from "react";

const EditStudentForm = ({ student, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    address: "",
    fees: "",
    amountPaid: "",
  });

  useEffect(() => {
    if (student) {
      setFormData(student);
    }
  }, [student]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div>
      <h2>Edit Student</h2>
      <form onSubmit={handleSubmit}>
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
          <input
            type="text"
            name="fees"
            value={formData.fees}
            onChange={handleChange}
            readOnly
          />
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
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditStudentForm;
