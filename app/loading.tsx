import DotLoadingSpinner from "@/app/_components/ui/DotLoadingSpinner";

export default function Loading() {
  return (
    <main className="flex flex-1 items-center justify-center">
      <DotLoadingSpinner size="lg" />
    </main>
  );
}
