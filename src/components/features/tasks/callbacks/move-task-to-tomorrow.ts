import { UpdateTaskPayload } from "@/services/tasks";
import { UnsavedGoal } from "@/types/goal";
import { MutateOptions } from "@tanstack/react-query";
import { addDays, format, parse } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type Goals = Map<number, UnsavedGoal>

interface MoveTaskToTomorrowParams {
    tasks: Goals
    setTasks: Dispatch<SetStateAction<Goals>>
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