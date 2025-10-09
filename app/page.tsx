import Link from "next/link";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="flex flex-col gap-6 text-center border-8   p-6 rounded-2xl bg-blue-300">
        <h1 className="text-black text-6xl font-bold">Quiz historyczny</h1>
        <Link
          href="/quiz"
          className="p-4 bg-blue-600 inline-block w-40 rounded-2xl text-[#e5e5e5] text-lg font-[550]"
        >
          Wejdź na quiz
        </Link>
      </div>
    </div>
  );
}
