import { forwardRef } from "react";
import { Trophy, Eye } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type ScoreCardProps = {
  score: number;
  total: number;
  children?: React.ReactNode;
};

export function ScoreCard({ score, total, children }: ScoreCardProps) {
  const percentage = Math.round((score / total) * 100);

  let message = "Dobra robota!";
  if (percentage === 100) message = "Perfekcyjnie!";
  else if (percentage >= 80) message = "Świetny wynik!";
  else if (percentage < 50) message = "Wszystko przed Tobą!";

  return (
    <Card className="text-center shadow-lg border-t-4 border-t-primary mb-6 md:mb-8">
      <CardHeader>
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/20">
          <Trophy className="h-10 w-10 text-yellow-600 dark:text-yellow-500" />
        </div>
        <CardTitle className="text-3xl">Wynik Quizu</CardTitle>
        <CardDescription className="text-lg mt-2">{message}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-6xl font-bold text-primary">
          {score}{" "}
          <span className="text-2xl text-muted-foreground">/ {total}</span>
        </div>
        <div className="text-sm text-muted-foreground">
          Poprawne odpowiedzi: {percentage}%
        </div>
      </CardContent>
      <CardFooter className="flex justify-center gap-4 pb-8 flex-wrap">
        {children}
      </CardFooter>
    </Card>
  );
}

export const ReviewButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return (
      <Button
        variant="outline"
        size="lg"
        className="gap-2"
        ref={ref}
        {...props}
      >
        <Eye className="h-4 w-4" />
        Sprawdź odpowiedzi
      </Button>
    );
  }
);
ReviewButton.displayName = "ReviewButton";
