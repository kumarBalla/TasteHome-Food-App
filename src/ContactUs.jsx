import React from 'react';
import './contactus.css';

function ContactUs() {
  return (
    <div className="contact-container">
      <div className="contact-card">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-description">
          We'd love to hear from you. Please fill out the form and we'll respond as soon as possible.
        </p>
        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" rows="5" placeholder="Your Message" required></textarea>
          </div>

          <button type="submit" className="submit-button">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;
