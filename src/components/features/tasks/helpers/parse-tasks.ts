import { Task, UnsavedTask } from "@/types/task";

interface ParsedTasks {
    dailyTasks: Task[]
    goals: Task[]
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
        const goal = tasks.get(key);

        if (!goal) return;

        if (goal?.custom) {
            if (goal.completed) {
                completedTasks.push({ ...goal, id: key });
                return;
            }
            unfinishedTasks.push({ ...goal, id: key });
            return;
        }

        if (goal.completed) {
            completedGoals.push({ ...goal, id: key });
            return;
        }

        unfinishedGoals.push({ ...goal, id: key });
    });

    return {
        goals: [...unfinishedGoals, ...completedGoals],
        dailyTasks: [...unfinishedTasks, ...completedTasks],
    }
}