import React, { useRef, useState, useEffect } from "react";
import "../styles/Mixer.css";

const SoundCard = ({ icon, title, description, audioSrc, bgClass }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(60);

  // Initialize audio element once
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(audioSrc);
      audio.loop = true;
      audio.volume = volume / 100;

      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [audioSrc]);

  // Toggle play / pause
  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  // Adjust volume
  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);

    if (audioRef.current) {
      audioRef.current.volume = newVol / 100;
    }
  };

  return (
    <div className={`sound-card ${bgClass} shadow-sm`}>
      <div className="sound-card-content p-3 d-flex flex-column h-100">
        {/* Header */}
        <div className="d-flex align-items-center mb-2">
          <span className="fs-3 me-2">{icon}</span>
          <h4 className="fw-semibold mb-0 text-light">{title}</h4>
        </div>

        <p className="text-light text-opacity-75 small mb-3">{description}</p>

        {/* Controls */}
        <div className="mt-auto">
          <label className="form-label small text-uppercase text-light text-opacity-75">
            Volume
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
          />

          <button
            className={`btn btn-sm rounded-pill mt-2 ${
              isPlaying ? "btn-light text-dark" : "btn-outline-light"
            }`}
            onClick={handleToggle}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"} {title}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundCard;
