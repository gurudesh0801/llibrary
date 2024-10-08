import React from "react";
import libraryPhoto from "/Images/libraryPhoto.jpg";
import "./Features.css";

const featuresData = [
  {
    heading: "Spacious Reading Areas",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque incidunt sint magni, rem quasi quibusdam nemo nesciunt exercitationem eaque laborum?",
    subFeatures: [
      "Comfortable seating",
      "Natural lighting",
      "Dedicated quiet zones",
    ],
  },
  {
    heading: "Extensive Collection",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque incidunt sint magni, rem quasi quibusdam nemo nesciunt exercitationem eaque laborum?",
    subFeatures: [
      "Fiction and non-fiction",
      "Academic journals",
      "Digital resources",
    ],
  },
  {
    heading: "Community Events",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque incidunt sint magni, rem quasi quibusdam nemo nesciunt exercitationem eaque laborum?",
    subFeatures: ["Author readings", "Workshops", "Community meetups"],
  },
  {
    heading: "Modern Facilities",
    description:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Atque incidunt sint magni, rem quasi quibusdam nemo nesciunt exercitationem eaque laborum?",
    subFeatures: ["Free Wi-Fi", "Private study rooms", "Computer access"],
  },
];

const Features = () => {
  return (
    <div className="features-container">
      <h1 className="heading">Features</h1>
      {featuresData.map((feature, index) => (
        <div
          key={index}
          className={`feature feature-${index % 2 === 0 ? "even" : "odd"}`}
        >
          <img
            src={libraryPhoto}
            alt={`Feature ${index + 1}`}
            className="feature-img"
          />
          <div className="feature-text">
            <h2>{feature.heading}</h2>
            <p>{feature.description}</p>
            <ul>
              {feature.subFeatures.map((subFeature, idx) => (
                <li key={idx}>{subFeature}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Features;
