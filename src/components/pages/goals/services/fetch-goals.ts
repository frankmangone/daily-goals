import { getSupabaseClient } from "@/lib/supabase/client";
import { API__Goal, Goal } from "@/types/goal";

export function fetchGoals(date: string) {
  return async (): Promise<Goal[]> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from("goals")
      .select()
      .eq("date", date);

    if (error || !data) {
      console.error("Error fetching goals:", error);
      // TODO: Stop execution?
      return [];
    }

    // Transform
    // TODO: Autogenerate types for responses if possible w/supabase
    return (data as unknown as API__Goal[]).map((goal) => ({
      id: goal.id,
      text: goal.text,
      date: goal.date,
      completed: goal.is_completed,
      custom: true,
    }));
  };
}
