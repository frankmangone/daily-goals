import { Database } from "../../database.types";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  custom?: boolean;
}

export type UnsavedTask = Omit<Task, 'id'>

export type APITask = Database["public"]["Tables"]["tasks"]["Row"];
