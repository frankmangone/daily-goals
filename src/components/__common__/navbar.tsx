"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar, Target } from "lucide-react";

export function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="flex justify-between items-center p-4 bg-background border-b">
      <div className="flex-1">
        <h1 className="text-xl font-bold">Task Manager</h1>
      </div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/goals" passHref>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center space-x-2",
                pathname === "/goals" && "bg-accent text-accent-foreground"
              )}
            >
              <Target className="h-4 w-4" />
              <span>Goals</span>
            </Button>
          </Link>
        </li>
        <li>
          <Link href="/calendar" passHref>
            <Button
              variant="ghost"
              className={cn(
                "flex items-center space-x-2",
                pathname === "/calendar" && "bg-accent text-accent-foreground"
              )}
            >
              <Calendar className="h-4 w-4" />
              <span>Calendar</span>
            </Button>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
