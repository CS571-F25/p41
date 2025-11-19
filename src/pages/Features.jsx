import React from "react";

const Features = () => {
  return (
    <section
      className="container-fluid py-5 text-light"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #3b82f6 0, #1e293b 40%, #0c615dff 100%)",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Why StudySense?</h1>
        <p className="lead text-secondary mt-3">
          Ambient soundscapes, focused timers, and a cozy digital atmosphere
          designed to help you get into deep work faster.
        </p>
      </div>

      {/* Feature Cards */}
      <div className="row g-4">
        {/* Feature 1 */}
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark bg-opacity-50 h-100 shadow-sm">
            <div className="fs-1 mb-3">🎧</div>
            <h4 className="fw-semibold">Custom Ambient Mixes</h4>
            <p className="text-secondary mt-2">
              Combine rain, fireplace, café noise, and more to build your
              perfect background soundscape.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark bg-opacity-50 h-100 shadow-sm">
            <div className="fs-1 mb-3">⏱️</div>
            <h4 className="fw-semibold">Pomodoro Focus Mode</h4>
            <p className="text-secondary mt-2">
              Stay on track with focused work sessions and gentle break
              reminders that match your sound and lighting.
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="col-md-4">
          <div className="p-4 rounded-4 bg-dark bg-opacity-50 h-100 shadow-sm">
            <div className="fs-1 mb-3">⭐</div>
            <h4 className="fw-semibold">Saved Presets</h4>
            <p className="text-secondary mt-2">
              Save your favorite room setups so you can return to “Rainy Night
              Study” or “Cabin Glow” in one click.
            </p>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mt-5 pt-4 border-top border-secondary">
        <h3 className="fw-bold text-center mb-4">How It Works</h3>
        <div className="row g-4">
          <div className="col-md-4">
            <div className="p-3 rounded-3 bg-dark bg-opacity-25 h-100">
              <h5 className="fw-semibold">1. Choose Your Sounds</h5>
              <p className="text-secondary">
                Find the right mix of sounds for your mood
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3 bg-dark bg-opacity-25 h-100">
              <h5 className="fw-semibold">2. Set Your Timer</h5>
              <p className="text-secondary">
                Turn on Focus Mode with your preferred session length.
              </p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="p-3 rounded-3 bg-dark bg-opacity-25 h-100">
              <h5 className="fw-semibold">3. Save the Vibe</h5>
              <p className="text-secondary">
                Store your setup as a preset for next time.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-5">
        <a
          href="/#/mixer"
          className="btn btn-primary btn-lg rounded-pill px-4 me-3"
        >
          Go to Mixer
        </a>
        <a
          href="/#/focus"
          className="btn btn-outline-light btn-lg rounded-pill px-4"
        >
          Start Focus Mode
        </a>
      </div>
    </section>
  );
};

export default Features;
