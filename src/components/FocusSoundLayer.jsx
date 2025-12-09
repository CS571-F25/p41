import { useEffect, useRef } from "react";
import rainAudio from "../assets/audio/mixkit-calm-thunderstorm-in-the-jungle-2415.wav";
import fireAudio from "../assets/audio/mixkit-campfire-crackles-1330.wav";
import cafeAudio from "../assets/audio/55494__lg__essex-cafe-03-080620.wav";
import nightAudio from "../assets/audio/mixkit-summer-night-in-the-forest-1227.wav";

const audioSources = {
  rain: rainAudio,
  fireplace: fireAudio,
  cafe: cafeAudio,
  night: nightAudio,
};

const FocusSoundLayer = ({ levels, masterVolume = 0.8, isPlaying = false }) => {
  const audioRefs = useRef({});

  // Initialize audio elements
  useEffect(() => {
    Object.entries(audioSources).forEach(([key, src]) => {
      if (!audioRefs.current[key]) {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0;
        audioRefs.current[key] = audio;
      }
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, []);

  // Handle play/pause
  useEffect(() => {
    Object.values(audioRefs.current).forEach((audio) => {
      if (isPlaying && levels) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    });
  }, [isPlaying, levels]);

  // Update volumes when levels or masterVolume changes
  useEffect(() => {
    if (!levels) return;

    Object.entries(audioRefs.current).forEach(([key, audio]) => {
      const level = levels[key] || 0;
      audio.volume = (level / 100) * masterVolume;
    });
  }, [levels, masterVolume]);

  return null;
};

export default FocusSoundLayer;
