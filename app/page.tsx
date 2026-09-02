import Hero from "@/app/_components/sections/Hero";
import MyRecorder from "@/app/_components/sections/MyRecorder";
import { LAYOUT } from "@/lib/constants";

export default function Home() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div
        className={`grid grid-cols-1 items-start lg:grid-cols-2 ${LAYOUT.sectionGap}`}
      >
        <Hero />
        <MyRecorder />
      </div>
    </main>
  );
}
