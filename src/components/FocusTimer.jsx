import React, { useState, useEffect, useRef, useCallback } from "react";
import "../styles/FocusTimer.css";

const WORK_PRESETS = [25, 30, 35, 40];
const REST_PRESETS = [5, 10, 15, 20];

const FocusTimer = () => {
  // Timer state
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [isWorkPhase, setIsWorkPhase] = useState(true);

  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [timerMode, setTimerMode] = useState("intervals"); // "infinite", "intervals"
  const [workTime, setWorkTime] = useState(25);
  const [restTime, setRestTime] = useState(5);
  const [customWork, setCustomWork] = useState(50);
  const [customRest, setCustomRest] = useState(10);
  const [notificationSound, setNotificationSound] = useState("chime");
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const intervalRef = useRef(null);
  const audioContextRef = useRef(null);

  // Get or create AudioContext
  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  // Text-to-Speech
  const speak = (text) => {
    if ("speechSynthesis" in window) {
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1;
      utter.volume = 1;
      window.speechSynthesis.speak(utter);
    }
  };

  // Play chime sound
  const playChime = () => {
    const ctx = getAudioContext();
    [0, 0.15, 0.3].forEach((delay, i) => {
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      oscillator.frequency.value = 600 + i * 200;
      oscillator.type = "sine";
      gainNode.gain.setValueAtTime(0.3, ctx.currentTime + delay);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        ctx.currentTime + delay + 0.3
      );
      oscillator.start(ctx.currentTime + delay);
      oscillator.stop(ctx.currentTime + delay + 0.3);
    });
  };

  // Play notification based on settings
  const playNotification = useCallback(
    (finishedPhase) => {
      if (notificationSound === "voice") {
        const msg =
          finishedPhase === "work"
            ? "Work period is over. Time for a break."
            : "Break period is over. Time to get back to work.";
        speak(msg);
      } else {
        playChime();
      }
    },
    [notificationSound]
  );

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startTimer = useCallback(() => {
    if (intervalRef.current || timerMode === "infinite") return;

    setIsActive(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsWorkPhase((currentIsWork) => {
            if (currentIsWork) {
              // Work just finished, switch to Rest
              playNotification("work");
              setSessionsCompleted((s) => s + 1);
              setTime(restTime * 60);
              // Auto-start rest period
              setTimeout(() => startTimer(), 500);
              return false;
            } else {
              // Rest just finished, switch to Work
              playNotification("rest");
              setTime(workTime * 60);
              // Auto-start work period
              setTimeout(() => startTimer(), 500);
              return true;
            }
          });

          return prev;
        }
        return prev - 1;
      });
    }, 1000);
  }, [timerMode, workTime, restTime, playNotification]);

  const pauseTimer = () => {
    clearTimer();
    setIsActive(false);
  };

  const resetTimer = useCallback(() => {
    clearTimer();
    setIsActive(false);
    setIsWorkPhase(true);
    setTime(workTime * 60);
  }, [workTime]);

  const handleApplySettings = () => {
    const newWorkTime = WORK_PRESETS.includes(workTime) ? workTime : customWork;
    const newRestTime = REST_PRESETS.includes(restTime) ? restTime : customRest;

    setWorkTime(newWorkTime);
    setRestTime(newRestTime);
    setTime(newWorkTime * 60);
    setIsWorkPhase(true);
    setIsActive(false);
    clearTimer();
    setShowSettings(false);
  };

  const handlePreviewSound = (soundType) => {
    setNotificationSound(soundType);

    if (soundType === "voice") {
      speak("Work period is over. Time for a break.");
    } else {
      playChime();
    }
  };

  const handleQuickPreset = (minutes) => {
    setWorkTime(minutes);
    setTime(minutes * 60);
    setIsWorkPhase(true);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => clearTimer();
  }, []);

  // Update time when workTime changes and timer isn't running
  useEffect(() => {
    if (!isActive && timerMode === "intervals") {
      setTime(workTime * 60);
      setIsWorkPhase(true);
    }
  }, [workTime, isActive, timerMode]);

  return (
    <>
      <div className="focus-timer">
        {timerMode !== "infinite" && (
          <div className={`phase-indicator ${isWorkPhase ? "work" : "rest"}`}>
            {isWorkPhase ? "Work" : "Rest"}
          </div>
        )}
        <p className="timer-display" aria-live="polite" aria-atomic="true">
          {timerMode === "infinite" ? "∞" : formatTime(time)}
        </p>
        {sessionsCompleted > 0 && (
          <div className="sessions-counter">
            {sessionsCompleted} session{sessionsCompleted !== 1 ? "s" : ""}{" "}
            completed
          </div>
        )}

        <div className="preset-buttons">
          <button
            className={`btn-preset ${workTime === 25 ? "active" : ""}`}
            onClick={() => handleQuickPreset(25)}
          >
            25 min
          </button>
          <button
            className={`btn-preset ${workTime === 50 ? "active" : ""}`}
            onClick={() => handleQuickPreset(50)}
          >
            50 min
          </button>
          <button
            className="btn-preset btn-settings"
            onClick={() => setShowSettings(true)}
          >
            ⚙️ Settings
          </button>
        </div>
        <div className="control-buttons">
          {timerMode !== "infinite" ? (
            <>
              {!isActive ? (
                <button className="btn-control btn-start" onClick={startTimer}>
                  Start
                </button>
              ) : (
                <button className="btn-control btn-pause" onClick={pauseTimer}>
                  Pause
                </button>
              )}
              <button className="btn-control btn-reset" onClick={resetTimer}>
                Reset
              </button>
            </>
          ) : (
            <p className="infinite-message">Ambient mode • No timer</p>
          )}
        </div>
      </div>

      {showSettings && (
        <div className="modal-overlay" onClick={() => setShowSettings(false)}>
          <div className="settings-modal" onClick={(e) => e.stopPropagation()}>
            <div className="settings-header">
              <h2 className="settings-title">Timer Settings</h2>
              <button
                className="modal-close"
                onClick={() => setShowSettings(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="settings-body">
              {/* Timer Mode Selector */}
              <div className="mode-selector">
                <button
                  className={`mode-btn ${
                    timerMode === "infinite" ? "active" : ""
                  }`}
                  onClick={() => {
                    pauseTimer();
                    setTimerMode("infinite");
                  }}
                >
                  <span className="mode-icon">∞</span>
                  <span className="mode-label">Infinite</span>
                </button>
                <button
                  className={`mode-btn ${
                    timerMode === "intervals" ? "active" : ""
                  }`}
                  onClick={() => {
                    resetTimer();
                    setTimerMode("intervals");
                  }}
                >
                  <span className="mode-icon">⏱</span>
                  <span className="mode-label">Intervals</span>
                </button>
              </div>

              {/* Interval Settings */}
              {timerMode === "intervals" && (
                <div className="interval-settings">
                  <h3 className="settings-subtitle">Set Interval</h3>
                  <p className="settings-description">
                    Select your desired work and rest lengths.
                  </p>

                  <div className="time-columns">
                    {/* Work Time */}
                    <div className="time-column">
                      <h4 className="column-title">Work Time</h4>
                      <div className="time-options">
                        {WORK_PRESETS.map((mins) => (
                          <button
                            key={mins}
                            className={`time-option ${
                              workTime === mins ? "active" : ""
                            }`}
                            onClick={() => setWorkTime(mins)}
                          >
                            {mins} min
                          </button>
                        ))}
                        <div className="custom-time">
                          <input
                            type="number"
                            min="1"
                            max="120"
                            value={customWork}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCustomWork(val);
                              setWorkTime(val);
                            }}
                            className="custom-input"
                            aria-label="Custom work time in minutes"
                          />
                          <span className="custom-suffix">min</span>
                        </div>
                      </div>
                    </div>

                    {/* Rest Time */}
                    <div className="time-column">
                      <h4 className="column-title">Rest Time</h4>
                      <div className="time-options">
                        {REST_PRESETS.map((mins) => (
                          <button
                            key={mins}
                            className={`time-option ${
                              restTime === mins ? "active" : ""
                            }`}
                            onClick={() => setRestTime(mins)}
                          >
                            {mins} min
                          </button>
                        ))}
                        <div className="custom-time">
                          <input
                            type="number"
                            min="1"
                            max="60"
                            value={customRest}
                            onChange={(e) => {
                              const val = Number(e.target.value);
                              setCustomRest(val);
                              setRestTime(val);
                            }}
                            className="custom-input"
                            aria-label="Custom rest time in minutes"
                          />
                          <span className="custom-suffix">min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="sound-settings">
                <h3 className="settings-subtitle">Notification Sound</h3>
                <div className="sound-options">
                  <button
                    className={`sound-option ${
                      notificationSound === "chime" ? "active" : ""
                    }`}
                    onClick={() => handlePreviewSound("chime")}
                  >
                    <span className="sound-icon">🔔</span>
                    <span className="sound-label">Chime</span>
                    {notificationSound === "chime" && (
                      <span className="sound-check">✓</span>
                    )}
                  </button>
                  <button
                    className={`sound-option ${
                      notificationSound === "voice" ? "active" : ""
                    }`}
                    onClick={() => handlePreviewSound("voice")}
                  >
                    <span className="sound-icon">🔊</span>
                    <span className="sound-label">Voice</span>
                    {notificationSound === "voice" && (
                      <span className="sound-check">✓</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="settings-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button className="btn-apply" onClick={handleApplySettings}>
                Apply Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FocusTimer;
