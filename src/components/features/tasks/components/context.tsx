"use client";

import { UnsavedTask, type Task as TaskType } from "@/types/tasks";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createTask,
  fetchTasks,
  deleteTask,
  updateTask,
} from "@/services/tasks";
import Spinner from "@/components/ui/spinner";
import {
  generateToggleTask,
  generateAddTask,
  generateRemoveTask,
  generateMoveTaskToTomorrow,
} from "../callbacks";
import { parseTasks } from "../helpers/parse-tasks";

interface DailyGoalsContextData {
  goals: TaskType[];
  dailyTasks: TaskType[];
  //
  addTask: () => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  moveTaskToTomorrow: (id: number) => void;
  //
  newGoal: string;
  setNewGoal: (text: string) => void;
  error: string;
  setError: (text: string) => void;
}

const DailyGoalsContext = createContext<DailyGoalsContextData>({
  goals: [],
  dailyTasks: [],
  addTask: () => {},
  toggleTask: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  removeTask: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
  moveTaskToTomorrow: (id: number) => {}, // eslint-disable-line @typescript-eslint/no-unused-vars
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
    data: tasksData,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["goals", date], queryFn: fetchTasks(date) });

  const { mutate: apiCreate } = useMutation({ mutationFn: createTask(date) });
  const { mutate: apiDelete } = useMutation({ mutationFn: deleteTask });
  const { mutate: apiUpdate } = useMutation({ mutationFn: updateTask });

  // Initial data load ======================

  const [tasks, setTasks] = useState<Map<number, UnsavedTask>>(new Map());

  // Update goals whenever query data changes
  useEffect(() => {
    if (tasksData) {
      const map = new Map<number, UnsavedTask>();
      tasksData.forEach((task) => {
        const { id, ...rest } = task;
        map.set(id, rest);
      });
      setTasks(map);
    }
  }, [tasksData]);

  // Use react hook forms?
  const [newGoal, setNewGoal] = useState("");
  const [error, setError] = useState("");

  // Interaction callbacks ==================

  const addTask = generateAddTask({
    tasks,
    text: newGoal,
    setText: setNewGoal,
    setError,
    setTasks,
    apiCreate,
  });
  const toggleTask = generateToggleTask({ tasks, setTasks, apiUpdate });
  const removeTask = generateRemoveTask({ tasks, setTasks, apiDelete });
  const moveTaskToTomorrow = generateMoveTaskToTomorrow({
    tasks,
    setTasks,
    apiUpdate,
  });

  const { dailyTasks, goals } = parseTasks(tasks);

  const value: DailyGoalsContextData = {
    goals,
    dailyTasks,
    //
    toggleTask,
    addTask,
    removeTask,
    moveTaskToTomorrow,
    //
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
