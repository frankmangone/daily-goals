import { Database } from "../../database.types";

export interface DateType {
  id: number;
  date: string;
}

export type FormattedDate = `${number}-${number}-${number}`;

export type UnsavedDate = Omit<Date, "id">;

export type APIDate = Database["public"]["Tables"]["dates"]["Row"];
