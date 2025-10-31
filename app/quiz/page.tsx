"use client";

import { useRouter } from "next/navigation";
import { useQuizStore } from "../stores/quizStore";
import { pytania } from "../data/questions";

export default function Page() {
  const router = useRouter();
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const next = useQuizStore((s) => s.next);
  const prev = useQuizStore((s) => s.prev);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const finish = useQuizStore((s) => s.finish);
  const shuffledOrder = useQuizStore((s) => s.shuffledOrder);

  const originalIndex =
    shuffledOrder && shuffledOrder.length
      ? shuffledOrder[currentQuestion - 1]
      : currentQuestion;

  const chosen = useQuizStore((s) => s.answers[originalIndex]);

  const current = pytania[originalIndex - 1];
  const lastQuestion = pytania.length;
  const isLast = currentQuestion === lastQuestion;

  function handleChoose(key: string) {
    setAnswer(originalIndex, key, pytania);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="mb-2">
          <div
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={pytania.length}
            aria-valuenow={currentQuestion}
            style={{
              width: "400px",
              height: "10px",
              background: "#e5e7eb",
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                background: "#3b82f6",
                width: `${Math.round(
                  (currentQuestion / pytania.length) * 100
                )}%`,
                transition: "width 200ms ease",
              }}
            />
          </div>
        </div>

        {current ? (
          <div className="mb-4 border-6   border-gray-800 rounded-lg p-4  w-[500px]">
            <h3 className="m-0">{current.question}</h3>
            <ul className="mt-2 ml-4">
              {Object.entries(current.answers).map(([key, text]) => {
                const isChosen = chosen === key;
                return (
                  <li key={key}>
                    <button
                      onClick={() => handleChoose(key)}
                      className={`px-2 py-1 rounded ${
                        isChosen
                          ? "bg-blue-600 text-white  border-4   border-gray-800 rounded-lg p-4  w-[400px]"
                          : "bg-blue-400 hover:bg-gray-100 border-4 border-gray-800 rounded-lg p-4  w-[400px]"
                      }`}
                    >
                      <strong>{key}:</strong> {text}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        ) : (
          <div>Brak pytań</div>
        )}

        <div className="mt-3">
          <button onClick={() => prev()} disabled={currentQuestion === 1}>
            {currentQuestion !== 1 ? "Poprzednie" : null}
          </button>

          <button
            onClick={() => {
              if (isLast) {
                finish(pytania);
                router.push("/results");
              } else next(pytania.length);
            }}
            disabled={currentQuestion > pytania.length}
            className="ml-2"
          >
            {isLast ? "Zakoncz" : "Nastepne"}
          </button>

          <span className="ml-3">
            Pytanie {currentQuestion} / {pytania.length}
          </span>
        </div>
      </div>
    </div>
  );
}
