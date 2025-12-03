-- Drop unused column from User table
ALTER TABLE "User" DROP COLUMN IF EXISTS "cheated";
