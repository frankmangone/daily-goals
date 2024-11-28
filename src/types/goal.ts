import { Database } from "../../database.types";

export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  custom?: boolean;
}

export type UnsavedGoal = Omit<Goal, 'id'>

export type APIGoal = Database["public"]["Tables"]["goals"]["Row"];
