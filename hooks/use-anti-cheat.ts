import { useEffect, useRef } from "react";

export function useAntiCheat(enabled: boolean, onCheatDetected: () => void) {
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!enabled || hasTriggeredRef.current) return;

    const handleCheat = () => {
      if (hasTriggeredRef.current) return;
      hasTriggeredRef.current = true;
      onCheatDetected();
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
  }, [enabled, onCheatDetected]);
}
