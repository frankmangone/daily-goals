import { TABLES } from "@/lib/enums";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { APIGoal, Goal } from "@/types/goals";

export function fetchGoals() {
  return async (): Promise<Goal[]> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase.from(TABLES.GOALS).select();

    if (error || !data) {
      console.error("Error fetching goals:", error);
      // TODO: Stop execution?
      return [];
    }

    // Transform
    return (data as unknown as APIGoal[]).map((goal) => ({
      id: goal.id,
      text: goal.text,
    }));
  };
}
