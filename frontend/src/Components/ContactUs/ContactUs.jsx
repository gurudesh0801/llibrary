import React, { useState } from "react";
import "./ContactUs.css";
import contactboy1 from "/Images/contactboy1.png";
import contactboy2 from "/Images/contactboy2.png";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: "",
    });
    // Close the modal
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="contactContainer">
        <div className="leftContaint">
          <div className="textDetails1">
            <h1>
              Contact <span>Us</span>
            </h1>
            <p>Main Library</p>
            <p>Address: 123 Library Avenue</p>
            <p>Suite 456</p>
            <p>Booktown, Li 78098</p>
          </div>
          <div className="textDetails2">
            <p>Phone: 1234567890</p>
            <p>Email: info@legendslibrary.in</p>
          </div>
          <div className="textDetails2">
            <p>Monday to Friday : 9:00 AM - 7:00 PM</p>
            <p>Saturday: 10:00 AM - 4:00 PM</p>
            <p>Sunday: Closed</p>
          </div>
        </div>
        <div className="imageContaint">
          <img src={contactboy1} alt="Contact Boy" />
        </div>
        {/* Decorative balls */}
        <div className="ball ball1"></div>
        <div className="ball ball2"></div>
        <div className="ball ball3"></div>
      </div>
      <div className="contactFormDetails">
        <div className="textcontent2">
          <h1 onClick={openModal} style={{ cursor: "pointer" }}>
            Get in Touch
          </h1>
        </div>
      </div>

      {isModalOpen && (
        <div className="modalOverlay">
          <div className="modalContent">
            <span
              className="closeModal"
              style={{ fontSize: "3rem", cursor: "pointer" }}
              onClick={closeModal}
            >
              &times;
            </span>
            <form className="contactForm" onSubmit={handleSubmit}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
              />
              <label htmlFor="message">Message</label>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleChange}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ContactUs;
