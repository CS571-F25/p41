import React from "react";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top custom-navbar">
      <div className="container-fluid">
        <a
          className="navbar-brand fw-semibold d-flex align-items-center gap-2"
          href="#/"
        >
          <span className="brand-icon">◈</span>
          <span className="brand-text">StudySense</span>
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <a className="nav-link" href="#/features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/mixer">
                Mixer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/focus">
                Focus Mode
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/about">
                About
              </a>
            </li>
            <li className="nav-item ms-lg-2">
              <a className="navbar-cta" href="#/focus">
                Start Focusing
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
