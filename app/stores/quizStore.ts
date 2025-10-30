import { create } from "zustand";

type AnswersMap = Record<number, string | undefined>;

type QuizState = {
  currentQuestion: number;
  answers: AnswersMap;
  score: number;

  setCurrent: (i: number) => void;
  next: (maxIndex: number) => void;
  prev: () => void;
  setAnswer: (
    qIndex: number,
    answer: string,
    questions?: { correct: string }[]
  ) => void;
  reset: () => void;
  computeScore: (questions: { correct: string }[]) => number;
};

export const useQuizStore = create<QuizState>((set, get) => ({
  currentQuestion: 0,
  answers: {},
  score: 0,

  setCurrent: (i: number) => set({ currentQuestion: i }),

  next: (maxIndex: number) =>
    set((s) => ({
      currentQuestion: Math.min(s.currentQuestion + 1, maxIndex),
    })),

  prev: () =>
    set((s) => ({ currentQuestion: Math.max(0, s.currentQuestion - 1) })),

  setAnswer: (qIndex: number, answer: string, questions?) =>
    set((s) => {
      const answers = { ...s.answers, [qIndex]: answer };
      let score = s.score;
      if (questions) {
        score = Object.entries(answers).reduce((acc, [idxStr, ans]) => {
          const idx = Number(idxStr);
          const correct = questions[idx]?.correct;
          return acc + (ans && correct && ans === correct ? 1 : 0);
        }, 0);
      }
      return { answers, score };
    }),

  reset: () => set({ currentQuestion: 0, answers: {}, score: 0 }),

  computeScore: (questions) => {
    const answers = get().answers;
    return Object.entries(answers).reduce((acc, [idxStr, ans]) => {
      const idx = Number(idxStr);
      const correct = questions[idx]?.correct;
      return acc + (ans && correct && ans === correct ? 1 : 0);
    }, 0);
  },
}));
