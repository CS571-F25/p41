import React from "react";
import lofiImg from "../assets/6884605.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      style={{
        minHeight: "calc(100vh - 56px)",
        background:
          "radial-gradient(circle at top left, #9b25c2ff 0, #1e293b 40%, #091c71ff 100%)",
        color: "white",
      }}
      className="d-flex flex-md-row flex-column"
    >
      <div className="container py-5">
        <div className="row align-items-center">
          {/* Left: text + buttons */}
          <div className="col-lg-6 mb-4 mb-lg-0">
            <h1 className="display-4 fw-semibold mb-3">
              Master Your Time
              <br />
              Find Your Flow
            </h1>
            <p className="lead mb-4 text-light">
              Build the perfect study atmosphere with ambient soundscapes,
              gentle visuals, and a Pomodoro-inspired focus mode.
            </p>

            <div className="d-flex flex-wrap gap-3 mb-4">
              <a
                className="btn btn-primary btn-lg rounded-pill px-4"
                href="/#/mixer"
              >
                Discover Your Sound
              </a>
              <a
                className="btn btn-outline-light rounded-pill px-4"
                href="/#/focus"
              >
                Try Focus Mode
              </a>
            </div>

            {/* PlaceHolder - WIll update this */}
            <div className="d-flex gap-3 flex-wrap">
              <div
                className="bg-dark bg-opacity-25 rounded-4 p-3 text-center"
                style={{ width: "120px" }}
              >
                🌧️
                <div>Rain</div>
              </div>

              <div
                className="bg-dark bg-opacity-25 rounded-4 p-3 text-center"
                style={{ width: "120px" }}
              >
                🔥
                <div>Fireplace</div>
              </div>

              <div
                className="bg-dark bg-opacity-25 rounded-4 p-3 text-center"
                style={{ width: "120px" }}
              >
                ☕<div>Café</div>
              </div>

              <div
                className="bg-dark bg-opacity-25 rounded-4 p-3 text-center"
                style={{ width: "120px" }}
              >
                🌌
                <div>Night</div>
              </div>
            </div>
          </div>

          {/* Graphic Placeholder to use for now */}
          <div className="col-lg-6 d-flex justify-content-center">
            <img
              src={lofiImg}
              alt="StudySense Hero"
              className="img-fluid rounded-4"
              style={{
                maxWidth: "500px",
                objectFit: "cover",
                boxShadow: "0 25px 60px rgba(15, 23, 42, 0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
