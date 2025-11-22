import { Loader2 } from "lucide-react";

export function Loader() {
  return (
    <div className="flex justify-center items-center h-full min-h-[200px]">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="sr-only">Ładowanie...</span>
    </div>
  );
}
