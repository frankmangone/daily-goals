"use client";

import { type Goal as GoalType } from "@/types/goal";
import { createContext, PropsWithChildren, useContext, useState } from "react";

type TrimmerGoal = Omit<GoalType, "id">;

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

export const useDailyGoals = (): DailyGoalsContextData => {
  return useContext(DailyGoalsContext);
};

const baseGoals = [
  { id: 1, text: "Exercise for 30 minutes", completed: false },
  { id: 2, text: "Read 20 pages", completed: false },
  { id: 3, text: "Meditate for 10 minutes", completed: false },
  { id: 4, text: "Write in journal", completed: false },
  { id: 5, text: "Learn something new", completed: false },
];

export default function DailyGoalsProvider(props: PropsWithChildren) {
  const { children } = props;

  // Initialize goals
  const [goals, setGoals] = useState<Map<number, TrimmerGoal>>(() => {
    const map = new Map<number, TrimmerGoal>();

    baseGoals.forEach((goal) => {
      const { id, ...rest } = goal;
      map.set(id, rest);
    });

    return map;
  });

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

  return (
    <DailyGoalsContext.Provider value={value}>
      {children}
    </DailyGoalsContext.Provider>
  );
}
