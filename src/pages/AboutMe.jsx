import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-noise" />
      <div className="about-glow about-glow-1" />
      <div className="about-glow about-glow-2" />

      <div className="about-container">
        <div className="about-header">
          <span className="about-badge">💡 Our story</span>
          <h1 className="about-title">
            About <span className="about-title-accent">StudySense</span>
          </h1>
          <p className="about-description">
            StudySense brings together ambient soundscapes, a flexible focus
            timer, and simple controls to help users create the perfect workflow
            environment.
          </p>
        </div>
        <div className="about-grid">
          <div className="about-card">
            <div className="about-card-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <h2 className="about-card-title">Why We Built This</h2>
            <p className="about-card-text">
              Our team wanted a single tool that makes it easy to maintain
              focus. StudySense combines ambience, sound mixing, and a
              structured focus timer so you can stay in the zone without
              switching apps or breaking concentration.
            </p>
          </div>

          <div className="about-card">
            <div className="about-card-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
              </svg>
            </div>
            <h2 className="about-card-title">What's Inside</h2>
            <ul className="about-card-list">
              <li>Customizable ambient sound mixer with multiple layers</li>
              <li>Pomodoro-inspired Focus Mode with timer controls</li>
              <li>Curated preset vibes like Rainy Night and Cozy Cabin</li>
              <li>Responsive UI with modern design</li>
              <li>Clean navigation and routing using React Router</li>
            </ul>
          </div>
        </div>
        <div className="about-tech">
          <h3 className="about-tech-title">Built With</h3>
          <div className="tech-stack">
            <div className="tech-item">
              <span className="tech-icon">⚛️</span>
              <span className="tech-name">React</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🛣️</span>
              <span className="tech-name">React Router</span>
            </div>
            <div className="tech-item">
              <span className="tech-icon">🎨</span>
              <span className="tech-name">Bootstrap</span>
            </div>
          </div>
        </div>
        <div className="about-footer">
          <p className="about-footer-text">Built for CS 571</p>
        </div>
      </div>
    </section>
  );
};

export default About;
