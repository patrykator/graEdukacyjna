import { create } from "zustand";

type AnswersMap = Record<number, string | undefined>;

type QuizState = {
  currentQuestion: number;
  answers: AnswersMap;
  score: number;
  lastScore: number;
  shuffledOrder: number[];

  setCurrent: (i: number) => void;
  next: (maxIndex: number) => void;
  prev: () => void;
  setAnswer: (
    qIndex: number,
    answer: string,
    questions?: { correct: string }[]
  ) => void;
  reset: (numQuestions?: number) => void;
  finish: (questions: { correct: string }[]) => void;
  computeScore: (questions: { correct: string }[]) => number;
};

export const useQuizStore = create<QuizState>((set, get) => {
  const shuffleArray = (n: number) => {
    const arr: number[] = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const scoreFromAnswers = (
    answers: AnswersMap,
    questions?: { correct: string }[]
  ) => {
    if (!questions) return 0;
    return Object.entries(answers).reduce((acc, [idxStr, ans]) => {
      const idx = Number(idxStr);
      const correct = questions[idx - 1]?.correct;
      return acc + (ans === correct ? 1 : 0);
    }, 0);
  };

  return {
    currentQuestion: 1,
    answers: {},
    score: 0,
    lastScore: 0,
    shuffledOrder: [],

    setCurrent: (i: number) => set({ currentQuestion: i }),

    next: (maxIndex: number) =>
      set((s) => ({
        currentQuestion: Math.min(s.currentQuestion + 1, maxIndex),
      })),

    prev: () =>
      set((s) => ({
        currentQuestion: Math.max(1, s.currentQuestion - 1),
      })),

    setAnswer: (qIndex: number, answer: string, questions?) =>
      set((s) => {
        const answers = { ...s.answers, [qIndex]: answer };
        const score = questions
          ? scoreFromAnswers(answers, questions)
          : s.score;
        return { answers, score };
      }),

    reset: (numQuestions?: number) =>
      set(() => {
        const n = numQuestions ?? 0;
        return {
          currentQuestion: 1,
          answers: {},
          score: 0,
          shuffledOrder: shuffleArray(n),
        };
      }),

    finish: (questions) =>
      set((s) => {
        const total = scoreFromAnswers(s.answers, questions);
        return { lastScore: total };
      }),

    computeScore: (questions) => {
      return scoreFromAnswers(get().answers, questions);
    },
  };
});
