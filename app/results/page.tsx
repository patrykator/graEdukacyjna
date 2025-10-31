"use client";

import { pytania } from "../data/questions";
import { useQuizStore } from "../stores/quizStore";
import { useRouter } from "next/navigation";

function Page() {
  const lastScore = useQuizStore((s) => s.lastScore);
  const reset = useQuizStore((s) => s.reset);
  const router = useRouter();

  return (
    <div>
      <p>
        Twoj wynik: {lastScore} / {pytania.length}
      </p>
      <button
        onClick={() => {
          reset(pytania.length);
          router.push("/quiz");
        }}
      >
        Zagraj ponownie
      </button>
    </div>
  );
}

export default Page;
