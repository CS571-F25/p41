import React, { useRef, useState, useEffect } from "react";

const SoundCard = ({
  icon,
  title,
  description,
  audioSrc,
  bgClass,
  volume: controlledVolume,
  onVolumeChange,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [internalVolume, setInternalVolume] = useState(60);

  // Use controlled or internal volume
  const volume =
    controlledVolume !== undefined ? controlledVolume : internalVolume;

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

  // Update audio volume when volume prop changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const handleToggle = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }

    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVol = Number(e.target.value);

    if (onVolumeChange) {
      onVolumeChange(newVol);
    } else {
      setInternalVolume(newVol);
    }

    if (audioRef.current) {
      audioRef.current.volume = newVol / 100;
    }
  };

  return (
    <div className={`sound-card ${bgClass}`}>
      <div className="sound-card-content">
        <div className="sound-card-header">
          <span className="sound-card-icon">{icon}</span>
          <h2 className="sound-card-title">{title}</h2>
        </div>

        <p className="sound-card-description">{description}</p>

        <div className="sound-card-controls">
          <div className="volume-row">
            <label
              className="volume-label"
              htmlFor={`volume-${title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              Volume
            </label>
            <span className="volume-value">{volume}%</span>
          </div>
          <input
            type="range"
            id={`volume-${title.toLowerCase().replace(/\s+/g, "-")}`}
            className="volume-slider"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            aria-label={`${title} volume`}
          />

          <button
            className={`play-button ${
              isPlaying ? "play-button-playing" : "play-button-idle"
            }`}
            onClick={handleToggle}
          >
            {isPlaying ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
                </svg>
                Play
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SoundCard;
