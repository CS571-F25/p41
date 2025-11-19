import React, { useEffect, useRef } from "react";

import rainAudio from "../assets/audio/mixkit-calm-thunderstorm-in-the-jungle-2415.wav";
import fireplaceAudio from "../assets/audio/mixkit-campfire-crackles-1330.wav";
import cafeAudio from "../assets/audio/55494__lg__essex-cafe-03-080620.wav";
import nightAudio from "../assets/audio/mixkit-summer-night-in-the-forest-1227.wav";

const SOUND_CONFIG = {
  rain: { src: rainAudio },
  fireplace: { src: fireplaceAudio },
  cafe: { src: cafeAudio },
  night: { src: nightAudio },
};

//Generic Base Presets
const PRESET_MIXES = {
  "rainy-night-study": {
    rain: 0.8,
    cafe: 0.4,
  },
  "cozy-cabin": {
    fireplace: 0.7,
    night: 0.3,
  },
  "lofi-cafe": {
    cafe: 0.9,
    rain: 0.2,
  },
  "deep-focus-minimal": {
    night: 0.3,
  },
};

const FocusSoundLayer = ({
  activePresetId,
  masterVolume = 0.8,
  isPlaying = false,
}) => {
  const audioRefs = useRef({});

  // Create audio elements once
  useEffect(() => {
    Object.entries(SOUND_CONFIG).forEach(([key, config]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(config.src);
        audio.loop = true;
        audio.volume = 0;
        audioRefs.current[key] = audio;
      }
    });

    return () => {
      // Cleanup on unmount
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
      });
    };
  }, []);

  // Update audio on preset / volume / play state change
  useEffect(() => {
    const mix = activePresetId ? PRESET_MIXES[activePresetId] : null;

    Object.entries(audioRefs.current).forEach(([soundKey, audio]) => {
      if (!mix || !mix[soundKey]) {
        // Sound not in this preset mix or no active preset
        audio.pause();
        return;
      }

      const baseVol = mix[soundKey]; // 0–1
      const finalVol = isPlaying ? baseVol * masterVolume : 0;

      audio.volume = finalVol;

      if (isPlaying && finalVol > 0) {
        audio.play().catch(() => {
          // ignore play errors
        });
      } else {
        audio.pause();
      }
    });
  }, [activePresetId, masterVolume, isPlaying]);

  return null;
};

export default FocusSoundLayer;
