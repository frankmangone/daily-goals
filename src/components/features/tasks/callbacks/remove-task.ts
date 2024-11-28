import { UnsavedTask } from "@/types/task";
import { MutateOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type Tasks = Map<number, UnsavedTask>

interface RemoveTaskParams {
    tasks: Tasks
    setTasks: Dispatch<SetStateAction<Tasks>>
    apiDelete: (variables: number, options?: MutateOptions<void, Error, number, unknown> | undefined) => void
}

type RemoveTaskFn = (id: number) => Promise<void>

/**
 * Thunk to generate the remove task callback used in our component logic.
 * @param {RemoveTaskParams} params 
 * @returns {RemoveTaskFn}
 */
export const generateRemoveTask = (params: RemoveTaskParams): RemoveTaskFn => {
    const { tasks, setTasks, apiDelete } = params;

    return async (id: number) => {
        await apiDelete(id);

        const updatedTasks = new Map(tasks);
        updatedTasks.delete(id);
        setTasks(updatedTasks);
    }
  };