import React from "react";
import { ShieldCheck, Star, Users, Coffee } from "lucide-react";

function About() {
  return (
    <div className="static-page-wrapper">
      {/* Hero Section */}
      <div className="static-hero-section">
        <h1 className="static-hero-title">About NextInn</h1>
        <p className="static-hero-subtitle">
          Experience unparalleled luxury, comfort, and world-class hospitality
          in the heart of the city.
        </p>
      </div>

      {/* Content Section */}
      <div className="static-content-container">
        <div className="about-grid-wrapper">
          {/* Text Content */}
          <div>
            <h2 className="text-3xl font-bold text-[var(--text-primary-dark-Charcoal)] mb-6">
              A Legacy of Excellence
            </h2>
            <p className="text-[var(--text-secondary-gray)] mb-4 leading-relaxed">
              Founded with a vision to redefine luxury hospitality, NextInn
              blends modern elegance with timeless comfort. Whether you are
              traveling for business or leisure, our meticulously designed rooms
              and exceptional service ensure a memorable stay.
            </p>
            <p className="text-[var(--text-secondary-gray)] mb-6 leading-relaxed">
              Our dedicated team works around the clock to anticipate your needs
              and exceed your expectations, making NextInn not just a place to
              stay, but a destination to experience.
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="about-feature-grid">
            <div className="about-feature-card">
              <Star className="w-10 h-10 mx-auto text-[var(--accent-cta-sunset-orange)]" />
              <h3 className="about-feature-title">5-Star Quality</h3>
            </div>
            <div className="about-feature-card">
              <ShieldCheck className="w-10 h-10 mx-auto text-[var(--primary-deep-teal)]" />
              <h3 className="about-feature-title">Secure & Safe</h3>
            </div>
            <div className="about-feature-card">
              <Users className="w-10 h-10 mx-auto text-blue-500" />
              <h3 className="about-feature-title">Family Friendly</h3>
            </div>
            <div className="about-feature-card">
              <Coffee className="w-10 h-10 mx-auto text-amber-600" />
              <h3 className="about-feature-title">Premium Dining</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
