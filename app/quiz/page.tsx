import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserResult, getRandomQuestions } from "../actions";
import QuizClient from "./quiz-client";
import { QUIZ_LENGTH } from "../constants";

export default async function QuizPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const userResult = await getUserResult();
  const questions = await getRandomQuestions(QUIZ_LENGTH);

  return <QuizClient userResult={userResult} initialQuestions={questions} />;
}
