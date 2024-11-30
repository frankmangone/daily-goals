import { CreateTaskPayload } from "@/services/tasks";
import { UnsavedTask } from "@/types/tasks";
import { MutateOptions } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type Tasks = Map<number, UnsavedTask>;

interface AddTaskParams {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  tasks: Tasks;
  setTasks: Dispatch<SetStateAction<Tasks>>;
  //
  apiCreate: (
    variables: CreateTaskPayload,
    options?: MutateOptions<void, Error, CreateTaskPayload, unknown> | undefined
  ) => void;
}

type AddTaskFn = () => Promise<void>;

export const generateAddTask = (params: AddTaskParams): AddTaskFn => {
  const { tasks, text, apiCreate, setTasks, setText, setError } = params;

  return async (): Promise<void> => {
    if (text.trim() !== "") {
      // TODO: Wrap in try/catch
      await apiCreate({ text });

      const updatedGoals = new Map(tasks);
      updatedGoals.set(Date.now(), {
        text,
        date: format(new Date(), "yyyy-MM-dd"),
        completed: false,
        custom: true,
      });
      setTasks(updatedGoals);
      //
      setText("");
      setError("");
    } else {
      setError("Please enter a goal");
    }
  };
};
