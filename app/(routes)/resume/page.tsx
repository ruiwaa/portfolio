import type { Metadata } from "next";
import Resume from "@/app/_components/sections/Resume";

export const metadata: Metadata = {
  title: "Resume",
};

export default function ResumePage() {
  return (
    <main className="flex flex-1 flex-col">
      <Resume />
    </main>
  );
}
