"use client";

import { type Task as TaskType } from "@/types/task";
import Task from "./task";
import { useDailyGoals } from "../context";
import TodoInput from "./todo-input";
import { Card } from "@/components/ui/card";

export function DailyTasks() {
  const { dailyTasks, toggleTask, removeTask, moveTaskToTomorrow } =
    useDailyGoals();

  const renderTasks = (tasksArray: TaskType[], isCustom: boolean) => (
    <div className="space-y-2">
      {tasksArray.map((task) => (
        <Task
          key={task.id}
          toggleTask={toggleTask}
          removeTask={removeTask}
          moveTaskToTomorrow={moveTaskToTomorrow}
          isCustom={isCustom}
          {...task}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Tasks</h2>
          <Card className="p-4 flex items-center justify-between h-14">
            <h3>🚧 Under construction!</h3>
          </Card>
          {/* Tasks(goals, false) */}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <TodoInput />
          {renderTasks(dailyTasks, true)}
        </div>
      </div>
    </div>
  );
}
