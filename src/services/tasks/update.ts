import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";

export interface UpdateTaskPayload {
  id: number;
  is_completed?: boolean;
  date?: string;
  // TODO: Add other keys, compose interfaces
}

export async function updateTask(payload: UpdateTaskPayload): Promise<void> {
  const { id, ...rest } = payload;
  const supabase = getSupabaseClient();

  const { error } = await supabase.from(TABLES.TASKS).update(rest).eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
  }
}
