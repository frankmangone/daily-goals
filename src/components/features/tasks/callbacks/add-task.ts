import { CreateTaskPayload } from "@/services/tasks"
import { UnsavedGoal } from "@/types/goal"
import { MutateOptions } from "@tanstack/react-query"
import { format } from "date-fns"
import { Dispatch, SetStateAction } from "react"

type Goals = Map<number, UnsavedGoal>

interface AddTaskParams {
    text: string,
    setText: Dispatch<SetStateAction<string>>,
    setError: Dispatch<SetStateAction<string>>,
    tasks: Goals,
    setTasks: Dispatch<SetStateAction<Goals>>
    //
    apiCreate: (variables: CreateTaskPayload, options?: MutateOptions<void, Error, CreateTaskPayload, unknown> | undefined) => void
}

type AddTaskFn = () => Promise<void>

export const generateAddTask = (params: AddTaskParams): AddTaskFn => {
    const { tasks, text, apiCreate, setTasks, setText, setError } = params

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
    }
  };