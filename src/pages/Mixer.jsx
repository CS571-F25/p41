import React from "react";
import SoundCard from "../components/SoundCard";
import rainAudio from "../assets/audio/mixkit-calm-thunderstorm-in-the-jungle-2415.wav";
import fireAudio from "../assets/audio/mixkit-campfire-crackles-1330.wav";
import cafeAudio from "../assets/audio/55494__lg__essex-cafe-03-080620.wav";
import nightAudio from "../assets/audio/mixkit-summer-night-in-the-forest-1227.wav";
import "../styles/Mixer.css";

const Mixer = () => {
  return (
    <section
      className="py-5 text-light"
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #3b82f6 0, #1e293b 40%, #5c0f07ff 100%)",
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold">Ambient Mixer</h1>
          <p className="lead text-secondary mt-3">
            Blend different sounds to create your perfect study atmosphere.
          </p>
        </div>

        {/* Sound cards */}
        <div className="row g-4 mb-5">
          <div className="col-md-6 col-lg-3">
            <SoundCard
              icon="🌧️"
              title="Rain"
              description="Soft rainfall for calm, focused sessions."
              audioSrc={rainAudio}
              bgClass="bg-rain"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <SoundCard
              icon="🔥"
              title="Fireplace"
              description="Crackling fire for a cozy, warm vibe."
              audioSrc={fireAudio}
              bgClass="bg-fireplace"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <SoundCard
              icon="☕"
              title="Café"
              description="Background chatter and clinks like your favorite café."
              audioSrc={cafeAudio}
              bgClass="bg-cafe"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <SoundCard
              icon="🌌"
              title="Night"
              description="Subtle night ambience for late study sessions."
              audioSrc={nightAudio}
              bgClass="bg-night"
            />
          </div>
        </div>

        {/* Footer / CTA */}
        <div className="text-center">
          <p className="text-secondary mb-3">
            Happy with your mix? Jump into a focused work session.
          </p>
          <a
            href="/#/focus"
            className="btn btn-primary btn-lg rounded-pill px-4"
          >
            Start Focus Mode
          </a>
        </div>
      </div>
    </section>
  );
};

export default Mixer;
