"use client";

import { type Task as TaskType } from "@/types/tasks";
import Task from "./task";
import { useDailyGoals } from "../context";
import TodoInput from "./todo-input";

export function DailyTasks() {
  const { goals, dailyTasks, toggleTask, removeTask, moveTaskToTomorrow } =
    useDailyGoals();

  const renderTasks = (tasksArray: TaskType[]) => (
    <div className="space-y-2">
      {tasksArray.map((task) => (
        <Task
          key={task.id}
          toggleTask={toggleTask}
          removeTask={removeTask}
          moveTaskToTomorrow={moveTaskToTomorrow}
          {...task}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
          <p className="text-md mb-4 text-gray-500">
            Your daily goals will show up on your task list every day
          </p>
          {renderTasks(goals)}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Tasks</h2>
          <TodoInput />
          {renderTasks(dailyTasks)}
        </div>
      </div>
    </div>
  );
}
