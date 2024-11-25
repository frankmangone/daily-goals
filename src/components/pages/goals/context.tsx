"use client";

import { API__Goal, type Goal as GoalType } from "@/types/goal";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "@/lib/supabase/client";
import { useQuery } from "@tanstack/react-query";

type TrimmedGoal = Omit<GoalType, "id">;

interface DailyGoalsContextData {
  goals: GoalType[];
  todos: GoalType[];
  //
  toggleGoal: (id: number) => void;
  addTodo: () => void;
  removeTodo: (id: number) => void;
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
  newGoal: "",
  setNewGoal: (text: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  error: "",
  setError: (text: string) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
});

function fetchGoals(date: string) {
  return async (): Promise<API__Goal[]> => {
    const { data, error } = await supabase
      .from("goals")
      .select()
      .eq("date", date);

    if (error) console.error("Error fetching goals:", error);
    return data as API__Goal[];
  };
}

export const useDailyGoals = (): DailyGoalsContextData => {
  return useContext(DailyGoalsContext);
};

interface DailyGoalsProviderProps extends PropsWithChildren {
  date: string;
}

export default function DailyGoalsProvider(props: DailyGoalsProviderProps) {
  const { children, date } = props;

  const {
    data: goalsData,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["goals", date], queryFn: fetchGoals(date) });

  const [goals, setGoals] = useState<Map<number, TrimmedGoal>>(new Map());

  // Update goals whenever query data changes
  useEffect(() => {
    if (goalsData) {
      const map = new Map<number, TrimmedGoal>();
      goalsData.forEach((goal) => {
        const { id, ...rest } = goal;
        const newGoal: TrimmedGoal = {
          text: rest.text,
          completed: rest.is_completed,
          custom: true, // TODO: Revisit this, it's not gonna work like that
        };
        map.set(id, newGoal);
      });
      setGoals(map);
    }
  }, [goalsData]);

  // Use react hook forms?
  const [newGoal, setNewGoal] = useState("");
  const [error, setError] = useState("");

  const toggleGoal = (id: number) => {
    const updatedGoals = new Map(goals);
    const goal = updatedGoals.get(id);

    if (!goal) return;

    updatedGoals.set(id, { ...goal, completed: !goal.completed });
    setGoals(updatedGoals);
  };

  const addTodo = () => {
    if (newGoal.trim() !== "") {
      const updatedGoals = new Map(goals);
      updatedGoals.set(Date.now(), {
        text: newGoal,
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

  const removeTodo = (id: number) => {
    const updatedGoals = new Map(goals);
    updatedGoals.delete(id);
    setGoals(updatedGoals);
  };

  const completedGoals: GoalType[] = [];
  const unfinishedGoals: GoalType[] = [];

  const completedTodos: GoalType[] = [];
  const unfinishedTodos: GoalType[] = [];

  // Map the elements of the map store to separate arrays for simpler rendering
  goals.keys().forEach((key) => {
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
    //
    newGoal,
    setNewGoal,
    error,
    setError,
  };

  if (isLoading) return <div>Loading...</div>;
  if (fetchError) return <div>Error: {fetchError.message}</div>;

  return (
    <DailyGoalsContext.Provider value={value}>
      {children}
    </DailyGoalsContext.Provider>
  );
}
