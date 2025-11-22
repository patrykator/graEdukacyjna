import { Progress } from "@/components/ui/progress";

type QuizProgressProps = {
  current: number;
  total: number;
};

export function QuizProgress({ current, total }: QuizProgressProps) {
  const progress = (current / total) * 100;

  return (
    <div className="space-y-2 shrink-0 md:mb-8 md:space-y-4">
      <div className="flex justify-between text-sm font-medium text-muted-foreground">
        <span>
          Pytanie {current} z {total}
        </span>
        <span>{Math.round(progress)}% ukończono</span>
      </div>
      <Progress value={progress} className="h-2 md:h-3 bg-secondary" />
    </div>
  );
}

