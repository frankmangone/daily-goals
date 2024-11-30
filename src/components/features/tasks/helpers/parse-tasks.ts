import { Task, UnsavedTask } from "@/types/tasks";

interface ParsedTasks {
  dailyTasks: Task[];
  goals: Task[];
}

/**
 * Separates tasks into daily and recurrent (goals) tasks, and also discriminates by status.
 * @param {Map<number, UnsavedTask>} tasks - The tasks to parse and organize.
 * @returns {}
 */
export const parseTasks = (tasks: Map<number, UnsavedTask>): ParsedTasks => {
  const completedGoals: Task[] = [];
  const unfinishedGoals: Task[] = [];

  const completedTasks: Task[] = [];
  const unfinishedTasks: Task[] = [];

  // Map the elements of the map store to separate arrays for simpler rendering
  tasks.keys()?.forEach((key) => {
    const task = tasks.get(key);

    if (!task) return;

    if (task?.isDailyGoal) {
      if (task.completed) {
        completedGoals.push({ ...task, id: key });
        return;
      }
      unfinishedGoals.push({ ...task, id: key });
      return;
    }

    if (task.completed) {
      completedTasks.push({ ...task, id: key });
      return;
    }

    unfinishedTasks.push({ ...task, id: key });
  });

  return {
    goals: [...unfinishedGoals, ...completedGoals],
    dailyTasks: [...unfinishedTasks, ...completedTasks],
  };
};
