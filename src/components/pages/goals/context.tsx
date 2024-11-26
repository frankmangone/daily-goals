"use client";

import { type Goal as GoalType } from "@/types/goal";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchGoals } from "./services/fetch-goals";
import { createGoal } from "./services/create-goal";
import { deleteGoal } from "./services/delete-goal";
import { updateGoal } from "./services/update-goal";
import Spinner from "@/components/ui/spinner";
import { addDays, format, parse } from "date-fns";

type TrimmedGoal = Omit<GoalType, "id">;

interface DailyGoalsContextData {
  goals: GoalType[];
  todos: GoalType[];
  //
  toggleGoal: (id: number) => void;
  addTodo: () => void;
  removeTodo: (id: number) => void;
  moveGoalToTomorrow: (id: number) => void;
  //
  newGoal: string;
  setNewGoal: (text: string) => void;
  error: string;
  setError: (text: string) => void;
}

const DailyGoalsContext = createContext<DailyGoalsContextData>({
  goals: [],
  todos: [],
  toggleGoal: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  addTodo: () => {},
  removeTodo: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  moveGoalToTomorrow: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  newGoal: "",
  setNewGoal: (text: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  error: "",
  setError: (text: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

export const useDailyGoals = (): DailyGoalsContextData => {
  return useContext(DailyGoalsContext);
};

interface DailyGoalsProviderProps extends PropsWithChildren {
  date: string;
}

export default function DailyGoalsProvider(props: DailyGoalsProviderProps) {
  const { children, date } = props;

  // API Calls ==============================
  const {
    data: goalsData,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["goals", date], queryFn: fetchGoals(date) });

  const { mutate: apiAdd } = useMutation({ mutationFn: createGoal(date) });
  const { mutate: apiRemove } = useMutation({ mutationFn: deleteGoal });
  const { mutate: apiUpdate } = useMutation({ mutationFn: updateGoal });

  // Initial data load ======================

  const [goals, setGoals] = useState<Map<number, TrimmedGoal>>(new Map());

  // Update goals whenever query data changes
  useEffect(() => {
    if (goalsData) {
      const map = new Map<number, TrimmedGoal>();
      goalsData.forEach((goal) => {
        const { id, ...rest } = goal;
        map.set(id, rest);
      });
      setGoals(map);
    }
  }, [goalsData]);

  // Use react hook forms?
  const [newGoal, setNewGoal] = useState("");
  const [error, setError] = useState("");

  // Interaction callbacks ==================

  const toggleGoal = async (id: number) => {
    const updatedGoals = new Map(goals);
    const goal = updatedGoals.get(id);

    if (!goal) return;

    await apiUpdate({ id, is_completed: !goal.completed });
    updatedGoals.set(id, { ...goal, completed: !goal.completed });
    setGoals(updatedGoals);
  };

  const addTodo = async () => {
    if (newGoal.trim() !== "") {
      // TODO: Make this a little bit less messy
      await apiAdd({ text: newGoal });
      const updatedGoals = new Map(goals);
      updatedGoals.set(Date.now(), {
        text: newGoal,
        date: format(new Date(), "yyyy-MM-dd"),
        completed: false,
        custom: true,
      });
      setGoals(updatedGoals);
      //
      setNewGoal("");
      setError("");
    } else {
      setError("Please enter a goal");
    }
  };

  const removeTodo = async (id: number) => {
    await apiRemove(id);
    const updatedGoals = new Map(goals);
    updatedGoals.delete(id);
    setGoals(updatedGoals);
  };

  const moveGoalToTomorrow = async (id: number) => {
    const goal = goals.get(id);
    const today = parse(goal!.date, "yyyy-MM-dd", new Date());
    const tomorrow = addDays(today, 1);
    await apiUpdate({ id, date: format(tomorrow, "yyyy-MM-dd") });
    const updatedGoals = new Map(goals);
    updatedGoals.delete(id);
    setGoals(updatedGoals);
  };

  const completedGoals: GoalType[] = [];
  const unfinishedGoals: GoalType[] = [];

  const completedTodos: GoalType[] = [];
  const unfinishedTodos: GoalType[] = [];

  // Map the elements of the map store to separate arrays for simpler rendering
  goals.keys()?.forEach((key) => {
    const goal = goals.get(key);

    if (!goal) return;

    if (goal?.custom) {
      if (goal.completed) {
        completedTodos.push({ ...goal, id: key });
        return;
      }
      unfinishedTodos.push({ ...goal, id: key });
      return;
    }

    if (goal.completed) {
      completedGoals.push({ ...goal, id: key });
      return;
    }
    unfinishedGoals.push({ ...goal, id: key });
  });

  const value = {
    goals: [...unfinishedGoals, ...completedGoals],
    todos: [...unfinishedTodos, ...completedTodos],
    //
    toggleGoal,
    addTodo,
    removeTodo,
    moveGoalToTomorrow,
    //
    newGoal,
    setNewGoal,
    error,
    setError,
  };

  if (isLoading)
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-4">Loading...</p>
      </div>
    );

  if (fetchError) return <div>Error: {fetchError.message}</div>;

  return (
    <DailyGoalsContext.Provider value={value}>
      {children}
    </DailyGoalsContext.Provider>
  );
}
