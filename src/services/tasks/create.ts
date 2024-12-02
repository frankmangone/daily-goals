import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";

export interface CreateTaskPayload {
  text: string;
}

export function createTask(date: string) {
  return async (payload: CreateTaskPayload): Promise<void> => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from(TABLES.TASKS).insert({
      date,
      text: payload.text,
      is_completed: false,
      is_daily_goal: false,
    });

    if (error) {
      console.error("Error storing tasks:", error);
    }
  };
}
