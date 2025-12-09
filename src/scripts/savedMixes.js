import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "studysense_saved_mixes";

export const useSavedMixes = () => {
  const [savedMixes, setSavedMixes] = useState([]);

  // Load mixes from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setSavedMixes(JSON.parse(stored));
      } catch {
        setSavedMixes([]);
      }
    }
  }, []);

  // Save a new mix
  const saveMix = useCallback((name, levels) => {
    const newMix = {
      id: `custom-${Date.now()}`,
      name,
      levels,
      createdAt: new Date().toISOString(),
      isCustom: true,
    };

    setSavedMixes((prev) => {
      const updated = [...prev, newMix];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });

    return newMix;
  }, []);

  // Delete a mix
  const deleteMix = useCallback((mixId) => {
    setSavedMixes((prev) => {
      const updated = prev.filter((mix) => mix.id !== mixId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Get a mix by ID
  const getMix = useCallback(
    (mixId) => {
      return savedMixes.find((mix) => mix.id === mixId);
    },
    [savedMixes]
  );

  // Generate random mix levels
  const generateRandomMix = useCallback(() => {
    return {
      rain: Math.floor(Math.random() * 100),
      fireplace: Math.floor(Math.random() * 100),
      cafe: Math.floor(Math.random() * 100),
      night: Math.floor(Math.random() * 100),
    };
  }, []);

  // Generate icons string from levels
  const getLevelsIcons = useCallback((levels) => {
    const icons = [];
    if (levels.rain > 20) icons.push("🌧️");
    if (levels.fireplace > 20) icons.push("🔥");
    if (levels.cafe > 20) icons.push("☕");
    if (levels.night > 20) icons.push("🌌");
    return icons.join(" ") || "🎵";
  }, []);

  return {
    savedMixes,
    saveMix,
    deleteMix,
    getMix,
    generateRandomMix,
    getLevelsIcons,
  };
};

export default useSavedMixes;
