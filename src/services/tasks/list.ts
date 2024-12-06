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
    return (data as unknown as APITask[]).map((task) => ({
      id: task.id,
      text: task.text,
      date: task.date,
      completed: task.is_completed,
      isDailyGoal: task.is_daily_goal,
    }));
  };
}
