import { useState, useEffect, useRef } from "react";

export function useAntiCheat(
  enabled: boolean,
  onCheatDetected: () => void
) {
  const [cheatingDetected, setCheatingDetected] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || cheatingDetected || hasTriggeredRef.current) return;

    const handleCheat = () => {
      if (!cheatingDetected && !hasTriggeredRef.current) {
        hasTriggeredRef.current = true;
        setCheatingDetected(true);
        onCheatDetected();
      }
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleCheat();
      }
    };

    const handleBlur = () => {
      handleCheat();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [enabled, cheatingDetected, onCheatDetected]);

  return { cheatingDetected };
}

