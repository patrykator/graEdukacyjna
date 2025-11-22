import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Question } from "@/types";

type QuizCardProps = {
  question: Question;
  chosenAnswer?: string;
  onChoose: (key: string) => void;
  onNext: () => void;
  onPrev: () => void;
  isFirst: boolean;
  isLast: boolean;
};

export function QuizCard({
  question,
  chosenAnswer,
  onChoose,
  onNext,
  onPrev,
  isFirst,
  isLast,
}: QuizCardProps) {
  return (
    <Card className="shadow-xl border-primary/5 overflow-hidden flex-1 flex flex-col justify-between mb-2 md:mb-4 min-h-0">
      <div className="flex-1 flex flex-col overflow-hidden md:overflow-visible min-h-0">
        <CardHeader className="p-4 md:p-6 shrink-0">
          <CardTitle className="text-lg md:text-2xl leading-relaxed text-center">
            {question.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 md:space-y-3 flex-1 p-4 md:p-6 pt-0 md:pt-0 overflow-y-auto md:overflow-visible min-h-0">
          {Object.entries(question.answers).map(([key, text]) => {
            const isChosen = chosenAnswer === key;
            return (
              <div
                key={key}
                onClick={() => onChoose(key)}
                className={cn(
                  "flex items-center p-3 md:p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 active:scale-[0.98] md:hover:scale-[1.01]",
                  isChosen
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-transparent bg-secondary/50 hover:bg-secondary/80"
                )}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 md:h-10 md:w-10 shrink-0 items-center justify-center rounded-full border-2 font-bold mr-3 md:mr-4 transition-colors shadow-sm text-sm md:text-base",
                    isChosen
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-muted-foreground/20 text-muted-foreground"
                  )}
                >
                  {key}
                </div>
                <span className="text-sm md:text-lg font-medium">{text}</span>
                {isChosen && (
                  <CheckCircle2 className="ml-auto h-5 w-5 md:h-6 md:w-6 text-primary animate-in zoom-in spin-in-45 duration-300" />
                )}
              </div>
            );
          })}
        </CardContent>
      </div>
      <CardFooter className="flex justify-between pt-4 pb-4 md:pt-6 md:pb-6 bg-secondary/20 shrink-0 p-4 md:p-6">
        <Button
          variant="ghost"
          onClick={onPrev}
          disabled={isFirst}
          className="gap-2 hover:bg-background h-9 md:h-10 text-sm md:text-base px-3 md:px-4"
        >
          <ArrowLeft className="h-4 w-4" />{" "}
          <span className="hidden sm:inline">Poprzednie</span>
          <span className="sm:hidden">Wróć</span>
        </Button>
        <Button
          onClick={onNext}
          disabled={!chosenAnswer}
          data-action="next"
          className="gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/30 h-9 md:h-10 text-sm md:text-base px-3 md:px-4"
        >
          {isLast ? "Zakończ" : "Następne"}
          {!isLast && <ArrowRight className="h-4 w-4" />}
        </Button>
      </CardFooter>
    </Card>
  );
}
