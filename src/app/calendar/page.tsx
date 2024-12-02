import { Calendar } from "@/components/features/calendar/components";

export default function CalendarPage() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold mb-8">Calendar Goals App</h1>
      <Calendar />
    </main>
  );
}
