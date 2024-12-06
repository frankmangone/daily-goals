import { CreateGoalPayload } from "@/services/goals";
import { CreateTaskPayload } from "@/services/tasks";
import { Goal } from "@/types/goals";
import { UnsavedTask } from "@/types/tasks";
import { MutateOptions } from "@tanstack/react-query";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";

type Goals = Goal[];

interface AddGoalParams {
  text: string;
  setText: Dispatch<SetStateAction<string>>;
  setError: Dispatch<SetStateAction<string>>;
  goals: Goals;
  setGoals: Dispatch<SetStateAction<Goals>>;
  //
  apiCreate: (
    variables: CreateGoalPayload,
    options?: MutateOptions<void, Error, CreateGoalPayload, unknown> | undefined
  ) => void;
}

type AddGoalFn = () => Promise<void>;

/**
 * Thunk to generate the add goal callback used in our component logic.
 * @param {AddGoalParams} params
 * @returns {AddGoalFn}
 */
export const generateAddGoal = (params: AddGoalParams): AddGoalFn => {
  const { goals, text, apiCreate, setGoals, setText, setError } = params;

  return async (): Promise<void> => {
    if (text.trim() !== "") {
      // TODO: Wrap in try/catch
      await apiCreate({ text });

      // TODO: move creation to a factory?
      // TODO: get actual ID from server response
      setGoals([...goals, { id: 89812831, text }]);
      //
      setText("");
      setError("");
    } else {
      setError("Please enter a goal");
    }
  };
};
