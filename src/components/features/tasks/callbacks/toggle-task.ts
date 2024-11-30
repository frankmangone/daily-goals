import { UpdateTaskPayload } from "@/services/tasks";
import { UnsavedTask } from "@/types/tasks";
import { MutateOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type Tasks = Map<number, UnsavedTask>;

interface ToggleTaskParams {
  tasks: Tasks;
  setTasks: Dispatch<SetStateAction<Tasks>>;
  apiUpdate: (
    variables: UpdateTaskPayload,
    options?: MutateOptions<void, Error, UpdateTaskPayload, unknown> | undefined
  ) => void;
}

type ToggleTaskFn = (id: number) => Promise<void>;

/**
 * Think to generate the toggle task callback used in our component logic.
 * @param {ToggleTaskParams} params
 * @returns {}
 * @async
 */
export const generateToggleTask = (params: ToggleTaskParams): ToggleTaskFn => {
  const { tasks, setTasks, apiUpdate } = params;

  return async (id: number) => {
    const updatedTasks = new Map(tasks);
    const task = updatedTasks.get(id);

    if (!task) return;

    // TODO: Wrap in try / catch
    await apiUpdate({ id, is_completed: !task.completed });
    updatedTasks.set(id, { ...task, completed: !task.completed });
    setTasks(updatedTasks);
  };
};
