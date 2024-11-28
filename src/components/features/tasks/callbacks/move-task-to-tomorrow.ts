import { UpdateTaskPayload } from "@/services/tasks";
import { UnsavedTask } from "@/types/task";
import { MutateOptions } from "@tanstack/react-query";
import { addDays, format, parse } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type Tasks = Map<number, UnsavedTask>

interface MoveTaskToTomorrowParams {
    tasks: Tasks
    setTasks: Dispatch<SetStateAction<Tasks>>
    apiUpdate: (variables: UpdateTaskPayload, options?: MutateOptions<void, Error, UpdateTaskPayload, unknown> | undefined) => void
}

type MoveTaskToTomorrowFn = (id: number) => Promise<void>

/**
 * Thunk to generate the callback to move a task to tomorrow.
 * @param {MoveTaskToTomorrowParams} params 
 * @returns {MoveTaskToTomorrowFn}
 */
export const generateMoveTaskToTomorrow = (params: MoveTaskToTomorrowParams): MoveTaskToTomorrowFn => {
    const { tasks, setTasks, apiUpdate } = params;

    return async (id: number) => {
        const task = tasks.get(id);
        const today = parse(task!.date, "yyyy-MM-dd", new Date());
        const tomorrow = addDays(today, 1);
        
        await apiUpdate({ id, date: format(tomorrow, "yyyy-MM-dd") });

        const updatedTasks = new Map(tasks);
        updatedTasks.delete(id);
        setTasks(updatedTasks);
      }
  };