"use client";

import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import { createGoal, fetchGoals } from "@/services/goals";
import { Goal } from "@/types/goals";
import { generateAddGoal } from "../../callbacks/add-goal";

interface DailyGoalsContextData {
  goals: Goal[];
  setGoals: (goals: Goal[]) => void;
  //
  addGoal: () => void;
  newGoal: string;
  setNewGoal: (text: string) => void;
  error: string;
  setError: (text: string) => void;
}

const DailyGoalsContext = createContext<DailyGoalsContextData>({
  goals: [],
  setGoals: () => {},
  //
  addGoal: () => {},
  newGoal: "",
  setNewGoal: () => {},
  error: "",
  setError: () => {},
});

export const useDailyGoals = (): DailyGoalsContextData => {
  return useContext(DailyGoalsContext);
};

type DailyGoalsProviderProps = PropsWithChildren;

export default function DailyGoalsProvider(props: DailyGoalsProviderProps) {
  const { children } = props;

  // API Calls ==============================
  const {
    data: goalsData,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["goals"], queryFn: fetchGoals() });

  const { mutate: apiCreate } = useMutation({ mutationFn: createGoal() });

  // Initial data load ======================

  const [goals, setGoals] = useState<Goal[]>([]);

  // Update goals whenever query data changes
  useEffect(() => {
    if (!goalsData) return;

    setGoals(
      goalsData.map((goal) => ({
        id: goal.id,
        text: goal.text,
      }))
    );
  }, [goalsData]);

  // Use react hook forms?
  const [newGoal, setNewGoal] = useState("");
  const [error, setError] = useState("");

  // Interaction callbacks ==================

  const addGoal = generateAddGoal({
    goals,
    text: newGoal,
    setText: setNewGoal,
    setError,
    setGoals,
    apiCreate,
  });

  const value: DailyGoalsContextData = {
    goals,
    setGoals,
    //
    addGoal,
    newGoal,
    setNewGoal,
    error,
    setError,
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex flex-col justify-center items-center">
        <Spinner />
        <p className="mt-4">Loading...</p>
      </div>
    );
  }

  if (fetchError) return <div>Error: {fetchError.message}</div>;

  return (
    <DailyGoalsContext.Provider value={value}>
      {children}
    </DailyGoalsContext.Provider>
  );
}
