"use client";

import { pytania } from "../data/questions";
import { useQuizStore } from "../stores/quizStore";

function Page() {
  const computeScore = useQuizStore((s) => s.computeScore);
  const total = computeScore(pytania);
  const storedScore = useQuizStore((s) => s.score);
  const reset = useQuizStore((s) => s.reset);

  return (
    <div>
      <p>
        Twoj wynik: {total} / {pytania.length}
      </p>
      <button
        onClick={() => {
          reset();
        }}
      ></button>
    </div>
  );
}

export default Page;
