"use client";

import { useEffect, PropsWithChildren } from "react";
import { useQuizStore } from "../stores/quizStore";
import { pytania } from "../data/questions";

export default function QuizLayout({ children }: PropsWithChildren<{}>) {
  const shuffled = useQuizStore((s) => s.shuffledOrder);
  const ready = Boolean(shuffled) && shuffled.length === pytania.length;

  useEffect(() => {
    const state = useQuizStore.getState();
    if (!state.shuffledOrder || state.shuffledOrder.length !== pytania.length) {
      state.reset(pytania.length);
    }
  }, []);

  if (!ready) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-md text-gray-600">Losowanie pytań…</div>
      </div>
    );
  }

  return <>{children}</>;
}
