import React from "react";
import "../styles/Features.css";

const Features = () => {
  return (
    <section id="features" className="features">
      <div className="features-noise" />
      <div className="features-glow features-glow-1" />
      <div className="features-glow features-glow-2" />

      <div className="features-container">
        <div className="features-header">
          <span className="features-badge">✦ Built for focus</span>
          <h1 className="features-title">
            Why <span className="features-title-accent">StudySense</span>?
          </h1>
          <p className="features-description">
            Ambient soundscapes, focused timers, and a cozy digital atmosphere
            designed to help you get into deep work faster.
          </p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🎧</span>
            </div>
            <h2 className="feature-title">Custom Ambient Mixes</h2>
            <p className="feature-description">
              Combine rain, fireplace, café noise, and more to build your
              perfect background soundscape.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⏱️</span>
            </div>
            <h2 className="feature-title">Pomodoro Focus Mode</h2>
            <p className="feature-description">
              Stay on track with focused work sessions and gentle break
              reminders that match your flow.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">⭐</span>
            </div>
            <h2 className="feature-title">Saved Presets</h2>
            <p className="feature-description">
              Save your favorite room setups so you can return to "Rainy Night
              Study" or "Cabin Glow" in one click.
            </p>
          </div>
        </div>
        <div className="steps-section">
          <h2 className="steps-title">How It Works</h2>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3 className="step-heading">Choose Your Sounds</h3>
                <p className="step-description">
                  Find the right mix of sounds for your mood
                </p>
              </div>
            </div>

            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M0 12h36M28 4l8 8-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="step-card">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3 className="step-heading">Set Your Timer</h3>
                <p className="step-description">
                  Turn on Focus Mode with your preferred session length
                </p>
              </div>
            </div>

            <div className="step-connector">
              <svg width="40" height="24" viewBox="0 0 40 24" fill="none">
                <path
                  d="M0 12h36M28 4l8 8-8 8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="step-card">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3 className="step-heading">Save the Vibe</h3>
                <p className="step-description">
                  Store your setup as a preset for next time
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="features-cta">
          <a href="#/mixer" className="btn-primary-features">
            <span>Go to Mixer</span>
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
          <a href="#/focus" className="btn-secondary-features">
            Start Focus Mode
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
