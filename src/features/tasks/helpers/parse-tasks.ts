import { Goal, UnsavedGoal } from "@/types/goal";

interface ParsedTasks {
    dailyTasks: Goal[]
    goals: Goal[]
}

/**
 * Separates tasks into daily and recurrent (goals) tasks, and also discriminates by status.
 * @param {Map<number, Goal>} tasks - The tasks to parse and organize.
 * @returns {}
 */
export const parseTasks = (tasks: Map<number, UnsavedGoal>): ParsedTasks => {
    const completedGoals: Goal[] = [];
    const unfinishedGoals: Goal[] = [];

    const completedTasks: Goal[] = [];
    const unfinishedTasks: Goal[] = [];

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