import React from "react";
import "../styles/About.css";

const AboutMe = () => {
  return (
    <section className="about-bg py-5 text-light">
      <div className="container py-4">
        <div className="text-center mb-5">
          <h1 className="fw-bold">About StudySense</h1>
          <p className="lead text-secondary mt-2">
            StudySense brings together ambient soundscapes, a flexible focus
            timer, and simple controls to help users create the perfect workflow
            environment.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          {/* Vision / Purpose */}
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark bg-opacity-25 rounded-4">
              <h4 className="fw-semibold mb-3">Why We Built This</h4>
              <p className="text-light text-opacity-75 mb-0">
                Our team wanted a single tool that makes it easy to maintain
                focus. StudySense combines ambience, sound mixing, and a
                structured focus timer so you can stay in the zone without
                switching apps or breaking concentration.
              </p>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="col-md-6">
            <div className="h-100 p-4 bg-dark bg-opacity-25 rounded-4">
              <h4 className="fw-semibold mb-3">What&apos;s Inside</h4>
              <ul className="text-light text-opacity-75 mb-0">
                <li>Customizable ambient sound mixer with multiple layers</li>
                <li>Pomodoro-inspired Focus Mode with timer controls</li>
                <li>Curated preset vibes like Rainy Night and Cozy Cabin</li>
                <li>Responsive UI built on Bootstrap utilities</li>
                <li>Clean navigation and routing using React Router</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center mt-5 text-secondary">
          <p className="small mb-0">
            Built for CS 571 using React, React Router, and Bootstrap.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
