/*
  Warnings:

  - The `answers` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `quizOrder` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `answers` on the `Question` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- AlterTable
ALTER TABLE "Question" ALTER COLUMN "answers" TYPE JSONB USING "answers"::jsonb;

-- AlterTable
ALTER TABLE "User" 
ALTER COLUMN "answers" TYPE JSONB USING "answers"::jsonb,
ALTER COLUMN "quizOrder" TYPE JSONB USING "quizOrder"::jsonb;

-- CreateIndex
CREATE INDEX "User_score_completedAt_idx" ON "User"("score" DESC, "completedAt" ASC);
