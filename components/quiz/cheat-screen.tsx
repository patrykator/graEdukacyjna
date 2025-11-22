import { AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

type CheatScreenProps = {
  onRedirect: () => void;
};

export function CheatScreen({ onRedirect }: CheatScreenProps) {
  return (
    <div className="container max-w-lg mx-auto py-10 px-4 min-h-[80vh] flex flex-col justify-center">
      <Card className="shadow-xl border-destructive/50 border-2 animate-in fade-in zoom-in-95 duration-300">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/5 mb-4">
            <AlertTriangle className="h-10 w-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-bold text-destructive">
            Naruszenie Zasad
          </CardTitle>
          <CardDescription className="text-lg font-medium pt-2">
            Wykryto opuszczenie obszaru quizu.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Twój wynik został już wysłany. Quiz został zakończony.
          </p>
          <div className="flex items-center justify-center gap-2 text-sm font-medium bg-secondary/50 p-3 rounded-lg">
            <Lock className="h-4 w-4" />
            Odpowiedzi zablokowane
          </div>
        </CardContent>
        <CardFooter className="justify-center pt-2">
          <Button
            onClick={onRedirect}
            variant="outline"
            size="lg"
            className="w-full"
          >
            Przejdź do wyników
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

