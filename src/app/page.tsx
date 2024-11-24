import { Calendar } from "@/components/pages/home/calendar";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Calendar Goals App</h1>
      <Calendar />
    </main>
  );
}
