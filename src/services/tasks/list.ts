import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";
import { APITask, Task } from "@/types/task";

export function fetchTasks(date: string) {
  return async (): Promise<Task[]> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(TABLES.TASKS)
      .select()
      .eq("date", date);

    if (error || !data) {
      console.error("Error fetching tasks:", error);
      // TODO: Stop execution?
      return [];
    }

    // Transform
    return (data as unknown as APITask[]).map((tasks) => ({
      id: tasks.id,
      text: tasks.text,
      date: tasks.date,
      completed: tasks.is_completed,
      custom: true,
    }));
  };
}
