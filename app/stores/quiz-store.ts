import { create } from "zustand";

type AnswersMap = Record<string, string | undefined>;

type QuizState = {
  currentQuestion: number;
  answers: AnswersMap;
  shuffledOrder: string[];

  setCurrent: (i: number) => void;
  next: (maxIndex: number) => void;
  prev: () => void;
  setAnswer: (id: string, answer: string) => void;
  reset: (questions: { id: string }[]) => void;
  finish: () => void;
};

export const useQuizStore = create<QuizState>((set) => {
  return {
    currentQuestion: 1,
    answers: {},
    shuffledOrder: [] as string[],

    setCurrent: (i: number) => set({ currentQuestion: i }),

    next: (maxIndex: number) =>
      set((s) => ({
        currentQuestion: Math.min(s.currentQuestion + 1, maxIndex),
      })),

    prev: () =>
      set((s) => ({
        currentQuestion: Math.max(1, s.currentQuestion - 1),
      })),

    setAnswer: (id: string, answer: string) =>
      set((s) => {
        return { answers: { ...s.answers, [id]: answer } };
      }),

    reset: (questions: { id: string }[]) =>
      set(() => {
        return {
          currentQuestion: 1,
          answers: {},
          score: 0,
          shuffledOrder: questions.map((q) => q.id),
        };
      }),

    finish: () => set(() => ({})),
  };
});
