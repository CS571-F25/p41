import React from "react";
import lofiImg from "../assets/6884605.jpg";
import "../styles/HeroSection.css";

const HeroSection = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-noise" />
      <div className="hero-glow hero-glow-1" />
      <div className="hero-glow hero-glow-2" />

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">✨ Your focus sanctuary</span>

            <h1 className="hero-title">
              Master Your Time.
              <br />
              <span className="hero-title-accent">Find Your Flow.</span>
            </h1>

            <p className="hero-description">
              Build the perfect study atmosphere with ambient soundscapes,
              gentle visuals, and a Pomodoro-inspired focus mode.
            </p>

            <div className="hero-buttons">
              <a className="btn-primary-hero" href="#/mixer">
                <span>Discover Your Sound</span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
              <a className="btn-secondary-hero" href="#/focus">
                Try Focus Mode
              </a>
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <div className="hero-image-glow" />
              <img src={lofiImg} alt="StudySense Hero" className="hero-image" />
              <div className="hero-image-overlay" />

              <div className="floating-card floating-card-1">
                <div className="floating-card-icon">🎧</div>
                <div className="floating-card-text">
                  <span className="floating-card-title">Focus Mode</span>
                  <span className="floating-card-subtitle">
                    25:00 remaining
                  </span>
                </div>
              </div>
              <div className="floating-card floating-card-2">
                <div className="floating-card-icon">📊</div>
                <div className="floating-card-text">
                  <span className="floating-card-title">Today</span>
                  <span className="floating-card-subtitle">
                    Track your focus
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
