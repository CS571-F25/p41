import React, { useState } from "react";
import SoundCard from "../components/SoundCard";
import { useSavedMixes } from "../scripts/savedMixes";
import rainAudio from "../assets/audio/mixkit-calm-thunderstorm-in-the-jungle-2415.wav";
import fireAudio from "../assets/audio/mixkit-campfire-crackles-1330.wav";
import cafeAudio from "../assets/audio/55494__lg__essex-cafe-03-080620.wav";
import nightAudio from "../assets/audio/mixkit-summer-night-in-the-forest-1227.wav";
import "../styles/Mixer.css";

const Mixer = () => {
  const [levels, setLevels] = useState({
    rain: 60,
    fireplace: 60,
    cafe: 60,
    night: 60,
  });
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [mixName, setMixName] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  const { saveMix } = useSavedMixes();

  const handleVolumeChange = (soundKey, value) => {
    setLevels((prev) => ({
      ...prev,
      [soundKey]: value,
    }));
  };

  const handleSaveMix = () => {
    if (!mixName.trim()) return;
    saveMix(mixName.trim(), levels);
    setMixName("");
    setShowSaveModal(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <section id="mixer" className="mixer">
      <div className="mixer-noise" />
      <div className="mixer-glow mixer-glow-1" />
      <div className="mixer-glow mixer-glow-2" />

      <div className="mixer-container">
        <div className="mixer-header">
          <span className="mixer-badge">🎵 Create your atmosphere</span>
          <h1 className="mixer-title">
            Ambient <span className="mixer-title-accent">Mixer</span>
          </h1>
          <p className="mixer-description">
            Blend different sounds to create your perfect study atmosphere.
          </p>
        </div>
        <div className="mixer-grid">
          <SoundCard
            icon="🌧️"
            title="Rain"
            description="Soft rainfall for calm, focused sessions."
            audioSrc={rainAudio}
            bgClass="bg-rain"
            volume={levels.rain}
            onVolumeChange={(val) => handleVolumeChange("rain", val)}
          />
          <SoundCard
            icon="🔥"
            title="Fireplace"
            description="Crackling fire for a cozy, warm vibe."
            audioSrc={fireAudio}
            bgClass="bg-fireplace"
            volume={levels.fireplace}
            onVolumeChange={(val) => handleVolumeChange("fireplace", val)}
          />
          <SoundCard
            icon="☕"
            title="Café"
            description="Background chatter and clinks like your favorite café."
            audioSrc={cafeAudio}
            bgClass="bg-cafe"
            volume={levels.cafe}
            onVolumeChange={(val) => handleVolumeChange("cafe", val)}
          />
          <SoundCard
            icon="🌌"
            title="Night"
            description="Subtle night ambience for late study sessions."
            audioSrc={nightAudio}
            bgClass="bg-night"
            volume={levels.night}
            onVolumeChange={(val) => handleVolumeChange("night", val)}
          />
        </div>

        <div className="mixer-cta">
          <p className="mixer-cta-text">
            Happy with your mix? Save it or jump into focus mode.
          </p>
          <div className="mixer-cta-buttons">
            <button
              className="btn-save-mix"
              onClick={() => setShowSaveModal(true)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                <polyline points="17 21 17 13 7 13 7 21" />
                <polyline points="7 3 7 8 15 8" />
              </svg>
              Save Mix
            </button>
            <a href="#/focus" className="btn-primary-mixer">
              <span>Start Focus Mode</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
        {saveSuccess && (
          <div className="save-toast">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Mix saved! Find it in Focus Mode.
          </div>
        )}
      </div>
      {showSaveModal && (
        <div className="modal-overlay" onClick={() => setShowSaveModal(false)}>
          <div className="save-modal" onClick={(e) => e.stopPropagation()}>
            <div className="save-modal-header">
              <h2 className="save-modal-title">Save Your Mix</h2>
              <button
                className="modal-close"
                onClick={() => setShowSaveModal(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="save-modal-body">
              <div className="mix-preview">
                <div className="mix-preview-item">
                  <span>🌧️ Rain</span>
                  <span>{levels.rain}%</span>
                </div>
                <div className="mix-preview-item">
                  <span>🔥 Fireplace</span>
                  <span>{levels.fireplace}%</span>
                </div>
                <div className="mix-preview-item">
                  <span>☕ Café</span>
                  <span>{levels.cafe}%</span>
                </div>
                <div className="mix-preview-item">
                  <span>🌌 Night</span>
                  <span>{levels.night}%</span>
                </div>
              </div>

              <div className="save-input-group">
                <label className="save-input-label" htmlFor="mix-name">
                  Mix Name
                </label>
                <input
                  id="mix-name"
                  type="text"
                  className="save-input"
                  placeholder="e.g., Late Night Coding"
                  value={mixName}
                  onChange={(e) => setMixName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSaveMix()}
                  autoFocus
                  aria-label="Save-mix"
                />
              </div>
            </div>

            <div className="save-modal-footer">
              <button
                className="btn-cancel"
                onClick={() => setShowSaveModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-apply"
                onClick={handleSaveMix}
                disabled={!mixName.trim()}
              >
                Save Mix
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Mixer;
