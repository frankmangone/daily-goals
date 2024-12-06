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
  generateEditTask,
  generateRemoveTask,
  generateMoveTaskToTomorrow,
} from "../../callbacks";
import { parseTasks } from "../../helpers/parse-tasks";

interface DailyTasksContextData {
  goals: TaskType[];
  dailyTasks: TaskType[];
  //
  addTask: () => void;
  toggleTask: (id: number) => void;
  removeTask: (id: number) => void;
  moveTaskToTomorrow: (id: number) => void;
  editTask: (id: number, text: string) => void;
  //
  newTask: string;
  setNewTask: (text: string) => void;
  error: string;
  setError: (text: string) => void;
}

const DailyTasksContext = createContext<DailyTasksContextData>({
  goals: [],
  dailyTasks: [],
  addTask: () => {},
  editTask: () => {},
  toggleTask: () => {},
  removeTask: () => {},
  moveTaskToTomorrow: () => {},
  newTask: "",
  setNewTask: () => {},
  error: "",
  setError: () => {},
});

export const useDailyTasks = (): DailyTasksContextData => {
  return useContext(DailyTasksContext);
};

interface DailyTasksProviderProps extends PropsWithChildren {
  date: string;
}

export default function DailyTasksProvider(props: DailyTasksProviderProps) {
  const { children, date } = props;

  // API Calls ==============================
  const {
    data: tasksData,
    error: fetchError,
    isLoading,
  } = useQuery({ queryKey: ["tasks", date], queryFn: fetchTasks(date) });

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
  const [newTask, setNewTask] = useState("");
  const [error, setError] = useState("");

  // Interaction callbacks ==================

  const addTask = generateAddTask({
    tasks,
    text: newTask,
    setText: setNewTask,
    setError,
    setTasks,
    apiCreate,
  });
  const toggleTask = generateToggleTask({ tasks, setTasks, apiUpdate });
  const editTask = generateEditTask({ tasks, setTasks, apiUpdate });
  const removeTask = generateRemoveTask({ tasks, setTasks, apiDelete });
  const moveTaskToTomorrow = generateMoveTaskToTomorrow({
    tasks,
    setTasks,
    apiUpdate,
  });

  const { dailyTasks, goals } = parseTasks(tasks);

  const value: DailyTasksContextData = {
    goals,
    dailyTasks,
    //
    toggleTask,
    addTask,
    removeTask,
    moveTaskToTomorrow,
    editTask,
    //
    newTask,
    setNewTask,
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
    <DailyTasksContext.Provider value={value}>
      {children}
    </DailyTasksContext.Provider>
  );
}
