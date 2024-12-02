"use client";

import { format, parseISO } from "date-fns";
import { DailyTasks } from "@/components/features/tasks/components/[date]/daily-tasks";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ContextProvider from "@/components/features/tasks/contexts/[date]/context.provider";
import { type Usable, use } from "react";

interface PageParams {
  date: string;
}

interface PageProps {
  params: Usable<PageParams>;
}

export default function TasksPage({ params }: PageProps) {
  const params_ = use<PageParams>(params);
  const date = parseISO(params_.date);

  return (
    <ContextProvider date={params_.date}>
      <div className="min-h-screen flex flex-col items-center justify-start p-24">
        <h1 className="text-4xl font-bold mb-8">
          Goals for {format(date, "MMMM d, yyyy")}
        </h1>
        <DailyTasks />
        <Link href="/calendar" className="mt-8">
          <Button variant="outline">Back to Calendar</Button>
        </Link>
      </div>
    </ContextProvider>
  );
}
