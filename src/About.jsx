import React from "react";
import "./aboutus.css"; 

function About() {
  return (
    <>
      {/* ✅ Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay">
          <h1 className="hero-title">Taste of Home</h1>
          <p className="hero-subtitle">Where every meal tells a story</p>
        </div>
      </section>

      {/* ✅ About Story Section */}
      <section className="about-section container">
        <div className="row align-items-center">
          {/* 🖼️ Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="/Images/titleimage.jpeg"
              alt="Family dining"
              className="img-fluid rounded shadow about-image"
            />
          </div>

          {/* 📖 Text */}
          <div className="col-md-6">
            <h2 className="section-title">About Us</h2>
            <p className="lead">
              At <strong>Taste of Home</strong>, we believe food connects us — to tradition, to comfort, and to one another.
            </p>
            <p>
              From humble beginnings in a family kitchen to a destination loved by many, our story is rooted in recipes passed down through generations. Every dish is made with care, quality ingredients, and a pinch of love.
            </p>
            <p>
              Whether it's our crispy snacks or soul-soothing meals, we promise flavors that feel like home.
            </p>
            <p className="quote">“Because home isn't a place — it's a taste.”</p>
            <p className="signature">— The Taste of Home Team</p>
          </div>
        </div>
      </section>

      {/* ✅ CTA / Quote Section */}
      <section className="quote-section text-white text-center">
        <div className="container">
          <h3>Bringing Comfort to Every Table</h3>
          <p className="fst-italic">“We serve memories, not just meals.”</p>
        </div>
      </section>
    </>
  );
}

export default About;
