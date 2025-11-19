import React from "react";

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark shadow-sm sticky-top">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-semibold" href="/">
          StudySense
        </a>

        {/* Mobile toggle */}
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

        {/* Nav links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-2">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/#/features">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/mixer">
                Mixer
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/focus">
                Focus Mode
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#/about">
                About
              </a>
            </li>

            {/* Auth actions
            <li className="nav-item d-none d-lg-block">
              <a className="nav-link" href="/login">
                Log In
              </a>
            </li>
            <li className="nav-item ms-lg-2">
              <a
                className="btn btn-primary rounded-pill px-3 py-1"
                href="/signup"
              >
                Sign Up
              </a>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
