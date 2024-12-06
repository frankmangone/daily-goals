"use client";

import DailyGoals from "@/components/features/goals/components/list/daily-goals";
import ContextProvider from "@/components/features/goals/contexts/list/context.provider";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GoalsPage() {
  return (
    <ContextProvider>
      <div className="min-h-screen flex flex-col items-center justify-start p-24">
        <h1 className="text-4xl font-bold mb-8">Daily goals</h1>
        <p className="text-md mb-4 text-gray-500">
          Your daily goals are created as a copy of this list, for every day
          that you navigate to.
        </p>
        <DailyGoals />
        <Link href="/calendar" className="mt-8">
          <Button variant="outline">Back to Calendar</Button>
        </Link>
      </div>
    </ContextProvider>
  );
}
