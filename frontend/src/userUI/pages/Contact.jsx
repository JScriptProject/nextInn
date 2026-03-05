import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

function Contact() {
  return (
    <div className="static-page-wrapper">
      {/* Hero Section */}
      <div className="static-hero-section">
        <h1 className="static-hero-title">Contact Us</h1>
        <p className="static-hero-subtitle">
          We're here to help. Reach out to us for reservations, inquiries, or
          special requests.
        </p>
      </div>

      <div className="static-content-container">
        <div className="contact-grid-wrapper">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="contact-info-card">
              <MapPin className="w-6 h-6 text-[var(--accent-cta-sunset-orange)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[var(--text-primary-dark-Charcoal)]">
                  Location
                </h3>
                <p className="text-sm text-[var(--text-secondary-gray)] mt-1">
                  Mahim East, Mumbai 12
                  <br />
                  Maharashtra, India
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <Phone className="w-6 h-6 text-[var(--primary-deep-teal)] flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[var(--text-primary-dark-Charcoal)]">
                  Phone
                </h3>
                <p className="text-sm text-[var(--text-secondary-gray)] mt-1">
                  +91 80194 43314
                  <br />
                  +91 12345 67890
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <Mail className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[var(--text-primary-dark-Charcoal)]">
                  Email
                </h3>
                <p className="text-sm text-[var(--text-secondary-gray)] mt-1">
                  info@nextinn.com
                  <br />
                  reservations@nextinn.com
                </p>
              </div>
            </div>

            <div className="contact-info-card">
              <Clock className="w-6 h-6 text-amber-500 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-[var(--text-primary-dark-Charcoal)]">
                  Reception Hours
                </h3>
                <p className="text-sm text-[var(--text-secondary-gray)] mt-1">
                  24/7 Available
                  <br />
                  Check-in: 2:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form-container">
            <h2 className="text-2xl font-bold text-[var(--text-primary-dark-Charcoal)] mb-6">
              Send us a Message
            </h2>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="contact-form-label">Full Name</label>
                  <input
                    type="text"
                    className="contact-form-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="contact-form-label">Email Address</label>
                  <input
                    type="email"
                    className="contact-form-input"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="contact-form-label">Subject</label>
                <input
                  type="text"
                  className="contact-form-input"
                  placeholder="How can we help?"
                />
              </div>

              <div>
                <label className="contact-form-label">Message</label>
                <textarea
                  rows="5"
                  className="contact-form-input resize-none"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button type="submit" className="contact-submit-btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
