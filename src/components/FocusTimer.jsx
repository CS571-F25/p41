import React, { useState, useEffect, useRef } from "react";

const FocusTimer = () => {
  const [time, setTime] = useState(25 * 60); // default: 25 min
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef(null);

  // Convert seconds -> MM:SS
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Start Timer
  const startTimer = () => {
    if (isActive) return;

    setIsActive(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Pause Timer
  const pauseTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
  };

  // Reset Timer
  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(25 * 60);
  };

  // Change session length
  const setPreset = (minutes) => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    setTime(minutes * 60);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div
      className="p-5 rounded-4 bg-dark bg-opacity-50 shadow-lg text-center"
      style={{ maxWidth: "420px", width: "100%" }}
    >
      {/* Timer Display */}
      <h1 className="display-3 fw-semibold mb-4">{formatTime(time)}</h1>

      {/* Preset Buttons */}
      <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
        <button
          className="btn btn-outline-light rounded-pill"
          onClick={() => setPreset(25)}
        >
          25 min
        </button>
        <button
          className="btn btn-outline-light rounded-pill"
          onClick={() => setPreset(50)}
        >
          50 min
        </button>
        <button
          className="btn btn-outline-light rounded-pill"
          onClick={() => setPreset(5)}
        >
          Break (5)
        </button>
      </div>

      {/* Timer Controls */}
      <div className="d-flex justify-content-center gap-3">
        {!isActive ? (
          <button
            className="btn btn-primary rounded-pill px-4"
            onClick={startTimer}
          >
            Start
          </button>
        ) : (
          <button
            className="btn btn-warning rounded-pill px-4"
            onClick={pauseTimer}
          >
            Pause
          </button>
        )}

        <button
          className="btn btn-outline-light rounded-pill px-4"
          onClick={resetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default FocusTimer;
