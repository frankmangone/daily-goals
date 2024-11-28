"use client";

import { format, parseISO } from "date-fns";
import { DailyTasks } from "@/components/features/tasks/components/daily-tasks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import DailyGoalsProvider from "@/components/features/tasks/components/context";
import { use } from "react";

interface PageProps {
  params: {
    date: string;
  };
}

export default function TasksPage({ params }: PageProps) {
  const params_ = use(params);
  const date = parseISO(params_.date);

  return (
    <DailyGoalsProvider date={params_.date}>
      <div className="min-h-screen flex flex-col items-center justify-center p-24">
        <h1 className="text-4xl font-bold mb-8">
          Goals for {format(date, "MMMM d, yyyy")}
        </h1>
        <DailyTasks />
        <Link href="/" className="mt-8">
          <Button variant="outline">Back to Calendar</Button>
        </Link>
      </div>
    </DailyGoalsProvider>
  );
}
