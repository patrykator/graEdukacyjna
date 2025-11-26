import { LoginButton } from "@/components/login-button";
import { HomeCtaButton } from "@/components/home-cta-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GraduationCap, AlertCircle, AlertTriangle } from "lucide-react";
import { auth, signIn } from "@/auth";
import { getUserResult } from "./actions";

type SearchParams = { [key: string]: string | string[] | undefined };

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth();
  const userResult = await getUserResult();
  const hasPlayed = !!userResult?.completedAt;

  const params = await searchParams;
  const error = params.error;

  let errorMessage = "";
  if (error === "AccessDenied") {
    errorMessage = "Dostęp zabroniony.";
  } else if (error) {
    errorMessage = "Wystąpił błąd podczas logowania. Spróbuj ponownie.";
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-4rem)] p-4">
      <Card className="w-full max-w-md shadow-xl border-primary/10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
            <GraduationCap className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-bold text-primary">
              Quiz Historyczny
            </CardTitle>
            <CardDescription className="text-lg">
              Sprawdź swoją wiedzę z historii.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          {errorMessage && (
            <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 text-sm">
              <AlertCircle className="h-4 w-4" />
              {errorMessage}
            </div>
          )}
          <div className="text-center text-muted-foreground leading-relaxed">
            {!session ? (
              "Zaloguj się swoim kontem szkolnym (@tm1.edu.pl), aby wziąć udział w quizie."
            ) : hasPlayed ? (
              "Dziękujemy za udział! Możesz teraz sprawdzić swoje wyniki i tablicę liderów."
            ) : (
              <div className="space-y-4">
                <p>
                  Gotowy na wyzwanie? Rozpocznij quiz, aby przetestować swoje
                  umiejętności i dowiedzieć się czegoś nowego. Pamiętaj, że
                  możesz podejść tylko raz!
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center pt-4">
          {!session ? (
            <form
              action={async () => {
                "use server";
                await signIn("microsoft-entra-id");
              }}
              className="w-full"
            >
              <LoginButton />
            </form>
          ) : (
            <HomeCtaButton hasPlayed={hasPlayed} />
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
