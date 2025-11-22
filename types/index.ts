export type Question = {
  id: string;
  question: string;
  answers: Record<string, string>;
  correct?: string;
};

export type UserResult = {
  score: number | null;
  completedAt: Date | null;
  answers: any;
  quizOrder: any;
} | null;

export type LeaderboardUser = {
  id: string;
  name: string | null;
  score: number | null;
  cheated: boolean;
};

export type SavedResult = {
  score: number | null;
  completedAt: Date | null;
  answers: any;
  quizOrder: any;
};

export type QuizAnswers = Record<string, string | undefined>;
export type QuizOrder = string[];
