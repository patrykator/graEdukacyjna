import { RotateCw, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LeaderboardUser } from "@/types";

type LeaderboardTableProps = {
  users: LeaderboardUser[];
  quizLength: number;
  onRefresh: () => void;
  isPending: boolean;
};

export function LeaderboardTable({
  users,
  quizLength,
  onRefresh,
  isPending,
}: LeaderboardTableProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 md:mb-6 px-4 md:px-0">
        <h2 className="text-2xl md:text-3xl font-bold text-center flex-1 pl-8 md:pl-10">
          Ranking Klasy
        </h2>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onRefresh}
            disabled={isPending}
            title="Odśwież ranking"
          >
            <RotateCw className={cn("h-5 w-5", isPending && "animate-spin")} />
            <span className="sr-only">Odśwież</span>
          </Button>
        </div>
      </div>
      <div className="rounded-md border bg-card">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Miejsce
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Uczeń
                </th>
                <th className="h-12 px-4 text-right align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Wynik
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                >
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 font-bold">
                    {index + 1}
                    {index === 0 && " 🥇"}
                    {index === 1 && " 🥈"}
                    {index === 2 && " 🥉"}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 flex items-center gap-2">
                    {user.name || "Anonim"}
                    {user.cheated && (
                      <div title="Wykryto naruszenie zasad">
                        <AlertTriangle className="h-4 w-4 text-destructive" />
                      </div>
                    )}
                  </td>
                  <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0 text-right font-mono">
                    {user.score} / {quizLength}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
