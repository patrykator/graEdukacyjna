import { useEffect } from "react";

export function useQuizKeyboard(
  enabled: boolean,
  onAnswer: (key: string) => void,
  onNext: () => void
) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      
      if (["A", "B", "C", "D"].includes(key)) {
        onAnswer(key);
      } else if (e.key === "Enter") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [enabled, onAnswer, onNext]);
}

