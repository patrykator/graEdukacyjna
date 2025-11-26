"use client";

import { useEffect, useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useQuizStore } from "../stores/quiz-store";
import { saveScore } from "../actions";
import { UserResult, Question } from "@/types";
import { useAntiCheat } from "@/hooks/use-anti-cheat";
import { useQuizKeyboard } from "@/hooks/use-quiz-keyboard";
import { QuizCard } from "@/components/quiz/quiz-card";
import { QuizProgress } from "@/components/quiz/quiz-progress";
import { Loader } from "@/components/ui/loader";

type QuizClientProps = {
  userResult?: UserResult;
  initialQuestions: Question[];
};

export default function QuizClient({
  userResult,
  initialQuestions,
}: QuizClientProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cheatingFlagged, setCheatingFlagged] = useState(false);

  const {
    currentQuestion,
    next,
    prev,
    setAnswer,
    finish,
    shuffledOrder,
    reset,
    answers,
  } = useQuizStore();

  const hasSubmittedRef = useRef(false);

  useEffect(() => {
    if (userResult?.completedAt && !hasSubmittedRef.current) {
      router.push("/results");
    }
  }, [userResult, router]);

  useEffect(() => {
    if (initialQuestions && initialQuestions.length > 0) {
      if (shuffledOrder.length === 0) {
        reset(initialQuestions);
      }
    }
  }, [initialQuestions, shuffledOrder.length, reset]);

  const submitQuiz = useCallback(async () => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;
    setIsSubmitting(true);

    finish();

    const state = useQuizStore.getState();
    const currentAnswers = state.answers;
    const currentOrderIds = state.shuffledOrder;

    try {
      await saveScore(currentAnswers, currentOrderIds, cheatingFlagged);
      router.push("/results");
    } catch (error) {
      hasSubmittedRef.current = false;
      setIsSubmitting(false);
      console.error("Failed to submit quiz", error);
    }
  }, [finish, router, cheatingFlagged]);

  useAntiCheat(!hasSubmittedRef.current, () => setCheatingFlagged(true));

  const questionId = shuffledOrder[currentQuestion - 1];
  const chosen = answers[questionId];
  const current = initialQuestions.find((q) => q.id === questionId);
  const totalSteps = shuffledOrder.length;
  const isLast = currentQuestion === totalSteps;

  const handleNext = useCallback(async () => {
    if (isSubmitting) return;
    if (isLast) {
      await submitQuiz();
    } else {
      next(totalSteps);
    }
  }, [isSubmitting, isLast, submitQuiz, next, totalSteps]);

  useQuizKeyboard(
    !!shuffledOrder.length,
    (key) => {
      const qId = shuffledOrder[currentQuestion - 1];
      setAnswer(qId, key);
    },
    () => {
      const qId = shuffledOrder[currentQuestion - 1];
      if (useQuizStore.getState().answers[qId]) {
        handleNext();
      }
    }
  );

  if (!shuffledOrder || shuffledOrder.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4 md:py-10 h-[calc(100dvh-3.5rem)] md:h-auto md:min-h-[80vh] flex flex-col justify-center gap-6 md:block">
      <QuizProgress current={currentQuestion} total={totalSteps} />

      {current ? (
        <QuizCard
          question={current}
          chosenAnswer={chosen}
          onChoose={(key) => setAnswer(questionId, key)}
          onNext={handleNext}
          onPrev={prev}
          isFirst={currentQuestion === 1}
          isLast={isLast}
          isProcessing={isSubmitting}
        />
      ) : (
        <div className="text-center p-10">Brak pytań</div>
      )}
    </div>
  );
}
