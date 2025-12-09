import React, { useState } from "react";

const vibes = [
  { id: "all", label: "All" },
  { id: "saved", label: "My Mixes" },
  { id: "cozy", label: "Cozy" },
  { id: "stormy", label: "Stormy" },
  { id: "cafe", label: "Café" },
  { id: "minimal", label: "Minimal" },
];

const SetVibeModal = ({
  isOpen,
  onClose,
  presets,
  savedMixes,
  onApply,
  onDelete,
  getLevelsIcons,
}) => {
  const [selectedVibe, setSelectedVibe] = useState("all");
  const [selectedPresetId, setSelectedPresetId] = useState(null);
  const [randomLevels, setRandomLevels] = useState(null);

  if (!isOpen) return null;

  // Combine presets with saved mixes
  const allPresets = [
    ...presets,
    ...savedMixes.map((mix) => ({
      ...mix,
      vibe: "saved",
      description: `Custom mix • ${
        Object.entries(mix.levels)
          .filter(([, v]) => v > 20)
          .map(([k]) => k)
          .join(", ") || "subtle blend"
      }`,
      icons: getLevelsIcons(mix.levels),
    })),
  ];

  const filteredPresets =
    selectedVibe === "all"
      ? allPresets.filter((p) => p.vibe !== "saved")
      : selectedVibe === "saved"
      ? allPresets.filter((p) => p.isCustom)
      : allPresets.filter((p) => p.vibe === selectedVibe);

  const handleRandomMix = () => {
    const levels = {
      rain: Math.floor(Math.random() * 100),
      fireplace: Math.floor(Math.random() * 100),
      cafe: Math.floor(Math.random() * 100),
      night: Math.floor(Math.random() * 100),
    };
    setRandomLevels(levels);
    setSelectedPresetId("random");
  };

  const handleApply = () => {
    if (selectedPresetId === "random" && randomLevels) {
      onApply({ name: "Random Mix", levels: randomLevels });
    } else {
      const chosen = allPresets.find((p) => p.id === selectedPresetId);
      if (chosen) {
        onApply(chosen);
      }
    }
    handleClose();
  };

  const handleDelete = (e, mixId) => {
    e.stopPropagation();
    onDelete(mixId);
    if (selectedPresetId === mixId) {
      setSelectedPresetId(null);
    }
  };

  const handleClose = () => {
    setSelectedPresetId(null);
    setRandomLevels(null);
    setSelectedVibe("all");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Set the Vibe</h2>
          <button
            className="modal-close"
            onClick={handleClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="modal-body">
          {/* Vibe Filters */}
          <div className="vibe-filters">
            {vibes.map((v) => (
              <button
                key={v.id}
                className={`vibe-filter-btn ${
                  selectedVibe === v.id ? "active" : ""
                } ${
                  v.id === "saved" && savedMixes.length > 0 ? "has-items" : ""
                }`}
                onClick={() => {
                  setSelectedVibe(v.id);
                  setSelectedPresetId(null);
                }}
              >
                {v.label}
                {v.id === "saved" && savedMixes.length > 0 && (
                  <span className="filter-count">{savedMixes.length}</span>
                )}
              </button>
            ))}
          </div>

          {/* Random Mix Preview */}
          {selectedPresetId === "random" && randomLevels && (
            <div className="random-mix-preview">
              <h4 className="random-mix-title">🎲 Random Mix</h4>
              <div className="random-mix-levels">
                <span>🌧️ {randomLevels.rain}%</span>
                <span>🔥 {randomLevels.fireplace}%</span>
                <span>☕ {randomLevels.cafe}%</span>
                <span>🌌 {randomLevels.night}%</span>
              </div>
            </div>
          )}

          {/* Preset Cards */}
          <div className="preset-grid">
            {filteredPresets.map((preset) => (
              <button
                key={preset.id}
                className={`preset-card ${
                  selectedPresetId === preset.id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedPresetId(preset.id);
                  setRandomLevels(null);
                }}
              >
                <div className="preset-card-header">
                  <h3 className="preset-name">{preset.name}</h3>
                  <span className="preset-icons">{preset.icons}</span>
                </div>
                <p className="preset-description">{preset.description}</p>
                {preset.isCustom && (
                  <button
                    className="preset-delete"
                    onClick={(e) => handleDelete(e, preset.id)}
                    title="Delete mix"
                    aria-label="Delete mix"
                  >
                    ✕
                  </button>
                )}
              </button>
            ))}

            {filteredPresets.length === 0 && selectedVibe === "saved" && (
              <div className="no-presets">
                <p>No saved mixes yet.</p>
                <p className="no-presets-hint">Create one in the Mixer!</p>
              </div>
            )}

            {filteredPresets.length === 0 && selectedVibe !== "saved" && (
              <p className="no-presets">
                No presets available for this vibe yet.
              </p>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-randomize" onClick={handleRandomMix}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
            Randomize
          </button>

          <div className="modal-actions">
            <button className="btn-cancel" onClick={handleClose}>
              Cancel
            </button>
            <button
              className="btn-apply"
              onClick={handleApply}
              disabled={!selectedPresetId}
            >
              Apply Vibe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetVibeModal;
