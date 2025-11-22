import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getLeaderboard, getUserResult } from "../actions";
import ResultsClient from "./results-client";

export default async function ResultsPage() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  const leaderboard = await getLeaderboard();
  const userResult = await getUserResult();

  return <ResultsClient leaderboard={leaderboard} userResult={userResult} />;
}
