import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";

export async function deleteTask(id: number): Promise<void> {
  const supabase = getSupabaseClient();
  const { error } = await supabase.from(TABLES.TASKS).delete().eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
  }
}
