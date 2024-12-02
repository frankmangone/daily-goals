import { UpdateTaskPayload } from "@/services/tasks";
import { UnsavedTask } from "@/types/tasks";
import { MutateOptions } from "@tanstack/react-query";
import { Dispatch, SetStateAction } from "react";

type Tasks = Map<number, UnsavedTask>;

interface EditTaskParams {
  tasks: Tasks;
  setTasks: Dispatch<SetStateAction<Tasks>>;
  apiUpdate: (
    variables: UpdateTaskPayload,
    options?: MutateOptions<void, Error, UpdateTaskPayload, unknown> | undefined
  ) => void;
}

type EditEditFn = (id: number, text: string) => Promise<void>;

/**
 * Thunk to generate the edit task callback used in our component logic.
 * @param {EditTaskParams} params
 * @returns {EditEditFn}
 */
export const generateEditTask = (params: EditTaskParams): EditEditFn => {
  const { tasks, setTasks, apiUpdate } = params;

  return async (id: number, text: string) => {
    const updatedTasks = new Map(tasks);
    const task = updatedTasks.get(id);

    if (!task) return;

    // TODO: Wrap in try / catch
    await apiUpdate({ id, text });
    updatedTasks.set(id, { ...task, text });
    setTasks(updatedTasks);
  };
};
