"use client";

import { useDailyGoals } from "@/components/features/goals/contexts/list/context.provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
// import { useRouter } from "next/router";

export default function DailyGoals() {
  const { goals, newGoal, setNewGoal, addGoal } = useDailyGoals();

  // const router = useRouter();

  // const handleCreateGoal = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newGoal.trim()) {
  //     const createdGoal = await createGoal(newGoal);
  //     setGoals([...goals, createdGoal]);
  //     setNewGoal("");
  //     router.refresh();
  //   }
  // };

  //   const handleDeleteGoal = async (id: string) => {
  //     await deleteGoal(id);
  //     setGoals(goals.filter((goal) => goal.id !== id));
  //     router.refresh();
  //   };

  // TODO: Use form?
  return (
    <>
      <div className="flex space-x-2 mb-6">
        <Input
          type="text"
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          placeholder="Enter a new goal"
          className="flex-grow"
        />
        <Button onClick={addGoal}>Add Goal</Button>
      </div>
      <div className="self-stretch flex flex-row gap-[2%] justify-center">
        {goals.map((goal) => (
          <Card
            key={goal.id}
            className="p-4 flex basis-[32%] justify-between items-center"
          >
            <span>{goal.text}</span>
            <Button
              variant="ghost"
              size="icon"
              // onClick={() => handleDeleteGoal(goal.id)}
              aria-label="Delete goal"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
