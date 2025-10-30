"use client";

import Link from "next/link";
import { useQuizStore } from "../stores/quizStore";
import { pytania } from "../data/questions";

export default function Page() {
  const currentQuestion = useQuizStore((s) => s.currentQuestion);
  const next = useQuizStore((s) => s.next);
  const prev = useQuizStore((s) => s.prev);
  const setAnswer = useQuizStore((s) => s.setAnswer);
  const setCurrent = useQuizStore((s) => s.setCurrent);
  const chosen = useQuizStore((s) => s.answers[currentQuestion]);
  const score = useQuizStore((s) => s.score);

  const current = pytania[currentQuestion];
  const lastQuestion = pytania.length;

  function handleChoose(key: string) {
    setAnswer(currentQuestion, key, pytania);
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div>
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
          <button onClick={() => prev()} disabled={currentQuestion === 0}>
            {currentQuestion !== 0 ? "Poprzednie" : null}
          </button>

          <button
            onClick={() => next(pytania.length - 1)}
            disabled={currentQuestion >= pytania.length - 1}
            className="ml-2"
          >
            {currentQuestion + 1 === lastQuestion ? (
              <Link href="/results">Zakoncz</Link>
            ) : (
              "Nastepne"
            )}
          </button>

          <span className="ml-3">
            Pytanie {currentQuestion + 1} / {pytania.length}
          </span>
        </div>
      </div>
    </div>
  );
}
