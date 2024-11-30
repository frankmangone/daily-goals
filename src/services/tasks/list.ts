import { FUNCTIONS } from "@/lib/enums";
import { getSupabaseClient } from "@/lib/supabase/client";
import { APITask, Task } from "@/types/tasks";

export function fetchTasks(date: string) {
  return async (): Promise<Task[]> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.rpc(FUNCTIONS.GET_TASKS_BY_DATE, {
      _date: date,
    });

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
      isDailyGoal: tasks.is_daily_goal,
    }));
  };
}
