"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { MESSAGES } from "./constants";
import { QuizAnswers, QuizOrder } from "@/types";
import { rateLimit } from "@/lib/rate-limit";

const saveScoreSchema = z.object({
  answers: z.record(z.string(), z.string().optional()),
  quizOrder: z.array(z.string()),
  cheated: z.boolean(),
});

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

export async function saveScore(
  answers: QuizAnswers,
  quizOrder: QuizOrder,
  cheated: boolean = false
) {
  const validation = saveScoreSchema.safeParse({ answers, quizOrder, cheated });

  if (!validation.success) {
    throw new Error("Invalid input data");
  }

  const session = await auth();
  if (!session?.user?.email) {
    throw new Error(MESSAGES.NOT_AUTHENTICATED);
  }

  try {
    await limiter.check(2, session.user.email);
  } catch {
    return { error: "Zbyt wiele prób zapisu wyniku." };
  }

  const questions = await prisma.question.findMany({
    where: { id: { in: quizOrder } },
  });

  const questionMap = new Map(questions.map((q) => [q.id, q]));

  let score = 0;
  quizOrder.forEach((id) => {
    const userAnswer = answers[id];
    const question = questionMap.get(id);
    if (question && userAnswer === question.correct) {
      score++;
    }
  });

  const result = await prisma.user.updateMany({
    where: {
      email: session.user.email,
      completedAt: null,
    },
    data: {
      score,
      completedAt: new Date(),
      answers: answers as any,
      quizOrder: quizOrder as any,
      cheated: cheated,
    },
  });

  if (result.count === 0) {
    return { error: MESSAGES.ALREADY_COMPLETED };
  }

  revalidatePath("/results");
  return { success: true };
}

export async function getLeaderboard() {
  const users = await prisma.user.findMany({
    where: {
      completedAt: { not: null },
      score: { not: null },
    },
    orderBy: [{ score: "desc" }, { completedAt: "asc" }],
    select: {
      id: true,
      name: true,
      score: true,
      cheated: true,
    },
    take: 50,
  });

  return users;
}

export async function getUserResult() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      score: true,
      completedAt: true,
      answers: true,
      quizOrder: true,
    },
  });

  return user;
}

export async function refreshLeaderboardAction() {
  revalidatePath("/results");
  return await getLeaderboard();
}

export async function getRandomQuestions(limit = 15) {
  const result = await prisma.$queryRaw<{ id: string }[]>`
    SELECT id FROM "Question" ORDER BY RANDOM() LIMIT ${limit}
  `;

  const selectedIds = result.map((r) => r.id);

  const questions = await prisma.question.findMany({
    where: { id: { in: selectedIds } },
  });

  return selectedIds
    .map((id) => {
      const q = questions.find((item) => item.id === id);
      if (!q) return null;
      return {
        id: q.id,
        question: q.question,
        answers: q.answers as unknown as Record<string, string>,
      };
    })
    .filter(Boolean) as Array<{
    id: string;
    question: string;
    answers: Record<string, string>;
  }>;
}

export async function getQuestionsByIds(ids: string[]) {
  const questions = await prisma.question.findMany({
    where: { id: { in: ids } },
  });

  return ids
    .map((id) => {
      const q = questions.find((item) => item.id === id);
      if (!q) return null;
      return {
        id: q.id,
        question: q.question,
        answers: q.answers as unknown as Record<string, string>,
        correct: q.correct,
      };
    })
    .filter(Boolean);
}
