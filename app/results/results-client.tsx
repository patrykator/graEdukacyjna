"use client";

import { useState, useTransition, useEffect } from "react";
import { useQuizStore } from "../stores/quiz-store";
import { getQuestionsByIds, refreshLeaderboardAction } from "../actions";
import { LeaderboardUser, SavedResult, Question } from "@/types";
import { ScoreCard, ReviewButton } from "@/components/results/score-card";
import { ReviewModal } from "@/components/results/review-modal";
import { LeaderboardTable } from "@/components/results/leaderboard-table";

type ResultsClientProps = {
  leaderboard: LeaderboardUser[];
  userResult: SavedResult | null;
};

export default function ResultsClient({
  leaderboard: initialLeaderboard,
  userResult,
}: ResultsClientProps) {
  const setAnswer = useQuizStore((s) => s.setAnswer);

  const [localScore, setLocalScore] = useState<number>(0);
  const [localAnswers, setLocalAnswers] = useState<Record<string, string>>({});
  const [reviewQuestions, setReviewQuestions] = useState<Question[]>([]);

  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [isPending, startTransition] = useTransition();

  const QUIZ_LENGTH = 15;

  useEffect(() => {
    if (userResult) {
      if (userResult.score !== null) setLocalScore(userResult.score);

      if (userResult.answers) {
        setLocalAnswers(userResult.answers);
      }

      if (userResult.quizOrder) {
        getQuestionsByIds(userResult.quizOrder).then((qs) => {
          const validQs = qs.filter((q): q is Question => q !== null);
          setReviewQuestions(validQs);
        });
      }
    }
  }, [userResult, setAnswer]);

  const handleRefresh = () => {
    startTransition(async () => {
      const newData = await refreshLeaderboardAction();
      setLeaderboard(newData);
    });
  };

  return (
    <div className="flex flex-col items-center min-h-[80vh] py-6 md:py-10 gap-6 md:gap-10">
      <div className="w-full max-w-2xl px-4 md:px-4">
        <ScoreCard score={localScore} total={QUIZ_LENGTH}>
          <ReviewModal questions={reviewQuestions} answers={localAnswers}>
            <ReviewButton />
          </ReviewModal>
        </ScoreCard>

        <LeaderboardTable
          users={leaderboard}
          quizLength={QUIZ_LENGTH}
          onRefresh={handleRefresh}
          isPending={isPending}
        />
      </div>
    </div>
  );
}
