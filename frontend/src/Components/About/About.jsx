import React, { useEffect } from "react";
import Slider from "react-slick";
import "./About.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  useEffect(() => {
    const elementsToShow = document.querySelectorAll(
      ".section, .h1, .h2, .sec-p, .owner-img, .feature-card, .carousel-container"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
            observer.unobserve(entry.target); // Stop observing once the animation is triggered
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    elementsToShow.forEach((element) => {
      observer.observe(element);
    });

    // Cleanup observer on component unmount
    return () => {
      elementsToShow.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="aboutContainer">
      {/* About the Library */}
      <div className="section">
        <h1 className="h1">About the Library</h1>
        <p>
          Welcome to our library, a place where knowledge meets tranquility.
          Established with the mission to promote education and community
          engagement, our library offers a vast collection of books, resources,
          and services for everyone.
        </p>
      </div>

      {/* Years of Operation */}
      <div className="section">
        <h2 className="h2">Years in Service</h2>
        <p>
          Our library has been proudly serving the community for over 50 years,
          providing a haven for readers, researchers, and learners of all ages.
        </p>
      </div>

      {/* Library Features */}
      <div className="section">
        <h2 className="h2">Features of the Library</h2>
        <div className="features">
          <div className="feature-card">
            <i className="fas fa-book feature-icon"></i>
            <div className="feature-title">Extensive Book Collection</div>
            <p className="sec-p">
              Thousands of books across various genres, including fiction,
              non-fiction, academic, and more.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-clock feature-icon"></i>
            <div className="feature-title">Extended Hours</div>
            <p className="sec-p">
              Open late on weekdays and weekends for your convenience.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-users feature-icon"></i>
            <div className="feature-title">Community Events</div>
            <p className="sec-p">
              Regular events and workshops to bring the community together.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-couch feature-icon"></i>
            <div className="feature-title">Comfortable Seating</div>
            <p className="sec-p">
              Cozy reading nooks and study areas designed for relaxation.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-wifi feature-icon"></i>
            <div className="feature-title">Free Wi-Fi</div>
            <p className="sec-p">
              High-speed internet access available throughout the library.
            </p>
          </div>
          <div className="feature-card">
            <i className="fas fa-laptop feature-icon"></i>
            <div className="feature-title">Digital Resources</div>
            <p className="sec-p">
              Access to e-books, databases, and online journals.
            </p>
          </div>
        </div>
      </div>

      {/* About the Owner */}
      <div className="section owner-section">
        <h2 className="h2">About the Owner</h2>
        <img src="owner.jpg" alt="Library Owner" className="owner-img" />
        <p>
          Our library was founded by Jane Doe, a passionate educator and
          lifelong learner. Her vision was to create a space where everyone can
          access knowledge and discover the joy of reading.
        </p>
      </div>

      {/* Carousel */}
      <div className="section carousel-container">
        <Slider {...settings}>
          <div>
            <h1 className="h1">What We Offer</h1>
            <p>
              Discover a wide range of books, resources, and services designed
              to enhance your learning experience.
            </p>
          </div>
          <div>
            <h1 className="h1">Community Hub</h1>
            <p>
              Our library is more than just a place to read—it's a community hub
              where people come together to learn, connect, and grow.
            </p>
          </div>
          <div>
            <h1 className="h1">Support & Services</h1>
            <p>
              We offer various services, including book recommendations,
              research assistance, and digital resources.
            </p>
          </div>
          <div>
            <h1 className="h1">Join Us</h1>
            <p>
              Become a member today and enjoy access to our extensive
              collection, events, and more.
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default About;
