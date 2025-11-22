import { CheckCircle2, XCircle } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Question } from "@/types";

type ReviewModalProps = {
  children: React.ReactNode;
  questions: Question[];
  answers: Record<string, string>;
};

export function ReviewModal({
  children,
  questions,
  answers,
}: ReviewModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Przegląd Odpowiedzi</DialogTitle>
          <DialogDescription>
            Szczegółowa analiza Twoich odpowiedzi.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto pr-2 space-y-4 p-1">
          {questions.map((question, index) => {
            const userAnswerKey = answers[question.id];
            const isCorrect = userAnswerKey === question.correct;
            const userAnswerText = userAnswerKey
              ? question.answers[userAnswerKey]
              : "Brak odpowiedzi";
            const correctAnswerText = question.correct
              ? question.answers[question.correct]
              : "Brak danych";

            return (
              <Card
                key={question.id}
                className={cn(
                  "border-l-4",
                  isCorrect ? "border-l-green-500" : "border-l-destructive"
                )}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-medium leading-normal">
                      {index + 1}. {question.question}
                    </CardTitle>
                    {isCorrect ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />
                    ) : (
                      <XCircle className="h-6 w-6 text-destructive shrink-0" />
                    )}
                  </div>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <div className="flex flex-col sm:flex-row sm:gap-2">
                    <span className="font-semibold min-w-24 text-muted-foreground">
                      Twoja odpowiedź:
                    </span>
                    <span
                      className={cn(
                        "font-medium",
                        isCorrect
                          ? "text-green-600 dark:text-green-400"
                          : "text-destructive"
                      )}
                    >
                      {userAnswerText}
                    </span>
                  </div>
                  {!isCorrect && (
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <span className="font-semibold min-w-24 text-muted-foreground">
                        Poprawna:
                      </span>
                      <span className="font-medium text-green-600 dark:text-green-400">
                        {correctAnswerText}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
