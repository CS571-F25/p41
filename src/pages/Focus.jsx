import React, { useState } from "react";
import FocusTimer from "../components/FocusTimer";
import FocusSoundLayer from "../components/FocusSoundLayer";
import SetVibeModal from "../components/SetVibeModal";
import InspiringQuote from "../components/InspiringQuote";
import { useSavedMixes } from "../scripts/savedMixes";
import "../styles/Focus.css";

const presets = [
  {
    id: "rainy-night-study",
    name: "Rainy Night Study",
    vibe: "stormy",
    description: "Soft rain with the beauty of night.",
    icons: "🌧️ 🌌",
    levels: { rain: 70, fireplace: 0, cafe: 0, night: 50 },
  },
  {
    id: "cozy-cabin",
    name: "Cozy Cabin",
    vibe: "cozy",
    description: "Fireplace crackle with gentle night ambience.",
    icons: "🔥 🌌",
    levels: { rain: 0, fireplace: 80, cafe: 0, night: 40 },
  },
  {
    id: "lofi-cafe",
    name: "Lo-Fi Café",
    vibe: "cafe",
    description: "Warm café chatter with soft background hum.",
    icons: "☕ 🎧",
    levels: { rain: 0, fireplace: 0, cafe: 75, night: 20 },
  },
  {
    id: "deep-focus-minimal",
    name: "Deep Focus Minimal",
    vibe: "minimal",
    description: "Barely-there ambience for distraction-free work.",
    icons: "🌌",
    levels: { rain: 0, fireplace: 0, cafe: 0, night: 30 },
  },
];

const Focus = () => {
  const [currentVibe, setCurrentVibe] = useState("None");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [activeLevels, setActiveLevels] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.8);

  const { savedMixes, deleteMix, getLevelsIcons } = useSavedMixes();

  const handleApplyVibe = (chosen) => {
    setCurrentVibe(chosen.name);
    setActiveLevels(chosen.levels);
    setIsPlaying(true);
  };

  return (
    <section className="focus">
      <div className="focus-noise" />
      <div className="focus-glow focus-glow-1" />
      <div className="focus-glow focus-glow-2" />

      <div className="focus-container">
        <div className="focus-header">
          <span className="focus-badge">⏱️ Deep work mode</span>
          <h1 className="focus-title">
            Focus <span className="focus-title-accent">Mode</span>
          </h1>
          <InspiringQuote />
        </div>
        <div className="focus-timer-wrapper">
          <FocusTimer />
        </div>
        <div className="focus-vibe-display">
          <p className="current-vibe-label">
            Current vibe:{" "}
            <span className="current-vibe-name">{currentVibe}</span>
          </p>
          <button className="btn-set-vibe" onClick={() => setIsModalOpen(true)}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
            Set the Vibe
          </button>
        </div>
        {activeLevels && (
          <div className="focus-sound-controls">
            <button
              className={`btn-play-pause ${isPlaying ? "playing" : ""}`}
              onClick={() => setIsPlaying((prev) => !prev)}
            >
              {isPlaying ? (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                  Pause Sounds
                </>
              ) : (
                <>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                  </svg>
                  Play Sounds
                </>
              )}
            </button>

            <div className="volume-control">
              <label className="volume-control-label">Master Volume</label>
              <input
                type="range"
                min="0"
                max="100"
                value={Math.round(masterVolume * 100)}
                className="volume-control-slider"
                onChange={(e) => setMasterVolume(Number(e.target.value) / 100)}
              />
            </div>
          </div>
        )}
      </div>

      <SetVibeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        presets={presets}
        savedMixes={savedMixes}
        onApply={handleApplyVibe}
        onDelete={deleteMix}
        getLevelsIcons={getLevelsIcons}
      />
      <FocusSoundLayer
        levels={activeLevels}
        masterVolume={masterVolume}
        isPlaying={isPlaying}
      />
    </section>
  );
};

export default Focus;
