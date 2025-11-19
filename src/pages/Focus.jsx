import React, { useState } from "react";
import FocusTimer from "../components/FocusTimer";
import FocusSoundLayer from "../components/FocusSoundLayer";
import "../styles/Focus.css";

const presets = [
  {
    id: "rainy-night-study",
    name: "Rainy Night Study",
    vibe: "stormy",
    description: "Soft rain with the beauty of night.",
    icons: "🌧️ 🌌",
  },
  {
    id: "cozy-cabin",
    name: "Cozy Cabin",
    vibe: "cozy",
    description: "Fireplace crackle with gentle night ambience.",
    icons: "🔥 🌌",
  },
  {
    id: "lofi-cafe",
    name: "Lo-Fi Café",
    vibe: "cafe",
    description: "Warm café chatter with soft background hum.",
    icons: "☕ 🎧",
  },
  {
    id: "deep-focus-minimal",
    name: "Deep Focus Minimal",
    vibe: "minimal",
    description: "Barely-there ambience for distraction-free work.",
    icons: "🌌",
  },
];

const vibes = [
  { id: "all", label: "All" },
  { id: "cozy", label: "Cozy" },
  { id: "stormy", label: "Stormy" },
  { id: "cafe", label: "Café" },
  { id: "minimal", label: "Minimal" },
];

const Focus = () => {
  const [currentVibe, setCurrentVibe] = useState("None");
  const [selectedVibe, setSelectedVibe] = useState("all");
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  const [activePresetId, setActivePresetId] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [masterVolume, setMasterVolume] = useState(0.8); // 0–1

  const filteredPresets =
    selectedVibe === "all"
      ? presets
      : presets.filter((p) => p.vibe === selectedVibe);

  const handleRandomPreset = () => {
    if (filteredPresets.length === 0) return;
    const random =
      filteredPresets[Math.floor(Math.random() * filteredPresets.length)];
    setSelectedPresetId(random.id);
  };

  const handleApplyVibe = () => {
    const chosen = presets.find((p) => p.id === selectedPresetId);
    if (chosen) {
      setCurrentVibe(chosen.name);
      // tells audio which mix to use
      setActivePresetId(chosen.id);
      // start playing when user hits Apply
      setIsPlaying(true);
    } else {
      setCurrentVibe("Custom vibe");
      setActivePresetId(null);
      setIsPlaying(false);
    }
  };

  return (
    <section
      className="focus-bg py-5 text-light"
      style={{ minHeight: "100vh" }}
    >
      <div className="container d-flex flex-column justify-content-center align-items-center">
        <div className="text-center mb-5">
          <h1 className="fw-bold">Focus Mode</h1>
          <p className="lead text-secondary mt-2">
            Set your session, start your timer, and enter deep focus.
          </p>
        </div>

        {/* Timer card */}
        <FocusTimer />

        {/* Current vibe + Set the Vibe button */}
        <div className="text-center mt-4">
          <p className="text-secondary mb-2">
            Current vibe:{" "}
            <span className="fw-semibold text-light">{currentVibe}</span>
          </p>
          <button
            type="button"
            className="btn btn-outline-light rounded-pill px-4"
            data-bs-toggle="modal"
            data-bs-target="#vibeModal"
          >
            Set the Vibe
          </button>
        </div>

        {/* GLOBAL sound controls – only show once a preset is active */}
        {activePresetId && (
          <div className="mt-4 p-3 bg-dark bg-opacity-25 rounded-4 w-75">
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
              {/* Play / Pause button */}
              <button
                className="btn btn-outline-light rounded-pill px-4"
                onClick={() => setIsPlaying((prev) => !prev)}
              >
                {isPlaying ? "⏸ Pause Sounds" : "▶ Play Sounds"}
              </button>

              {/* Master volume slider */}
              <div
                style={{ minWidth: "220px", width: "100%", maxWidth: "320px" }}
              >
                <label className="form-label small text-uppercase text-secondary mb-1">
                  Master Volume
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={Math.round(masterVolume * 100)}
                  className="form-range"
                  onChange={(e) =>
                    setMasterVolume(Number(e.target.value) / 100)
                  }
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vibe selection modal */}
      <div
        className="modal fade"
        id="vibeModal"
        tabIndex="-1"
        aria-labelledby="vibeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content bg-dark text-light rounded-4">
            <div className="modal-header border-0">
              <h5 className="modal-title fw-semibold" id="vibeModalLabel">
                Set the Vibe
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              {/* Vibe Categories : can update this (need to include user mixes) */}
              <div className="mb-4 d-flex flex-wrap gap-2">
                {vibes.map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    className={
                      "btn btn-sm rounded-pill " +
                      (selectedVibe === v.id
                        ? "btn-primary"
                        : "btn-outline-light")
                    }
                    onClick={() => {
                      setSelectedVibe(v.id);
                      setSelectedPresetId(null);
                    }}
                  >
                    {v.label}
                  </button>
                ))}
              </div>

              {/* Preset cards */}
              <div className="row g-3">
                {filteredPresets.map((preset) => (
                  <div className="col-md-6" key={preset.id}>
                    <button
                      type="button"
                      className={
                        "w-100 text-start p-3 rounded-4 border-0 " +
                        (selectedPresetId === preset.id
                          ? "bg-primary text-light"
                          : "bg-secondary bg-opacity-25 text-light")
                      }
                      onClick={() => setSelectedPresetId(preset.id)}
                    >
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <h6 className="fw-semibold mb-0">{preset.name}</h6>
                        <span>{preset.icons}</span>
                      </div>
                      <p className="small mb-0 text-light text-opacity-75">
                        {preset.description}
                      </p>
                    </button>
                  </div>
                ))}

                {filteredPresets.length === 0 && (
                  <p className="text-secondary small">
                    No presets available for this vibe yet.
                  </p>
                )}
              </div>
            </div>

            <div className="modal-footer border-0 d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-light rounded-pill"
                onClick={handleRandomPreset}
              >
                🎲 Randomize
              </button>

              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-outline-light rounded-pill"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary rounded-pill"
                  data-bs-dismiss="modal"
                  onClick={handleApplyVibe}
                >
                  Apply Vibe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Audio layer: uses activePresetId + masterVolume + isPlaying */}
      <FocusSoundLayer
        activePresetId={activePresetId}
        masterVolume={masterVolume}
        isPlaying={isPlaying}
      />
    </section>
  );
};

export default Focus;
