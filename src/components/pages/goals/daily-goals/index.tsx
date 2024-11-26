"use client";

import { type Goal as GoalType } from "@/types/goal";
import Goal from "./goal";
import { useDailyGoals } from "../context";
import TodoInput from "./todo-input";
import { Card } from "@/components/ui/card";

export function DailyGoals() {
  const { error, goals, todos, toggleGoal, removeTodo, moveGoalToTomorrow } =
    useDailyGoals();

  const renderGoals = (goalsArray: GoalType[], isCustom: boolean) => (
    <div className="space-y-2">
      {goalsArray.map((goal) => (
        <Goal
          key={goal.id}
          toggleGoal={toggleGoal}
          removeGoal={removeTodo}
          moveGoalToTomorrow={moveGoalToTomorrow}
          {...goal}
          isCustom={isCustom}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
          <Card className="p-4 flex items-center justify-between h-14">
            <h3>🚧 Under construction!</h3>
          </Card>
          {/* renderGoals(goals, false) */}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <TodoInput />
          {renderGoals(todos, true)}
        </div>
      </div>
    </div>
  );
}
