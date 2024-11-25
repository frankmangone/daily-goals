import { supabase } from "@/lib/supabase/client";
import { Goal } from "@/types/goal";

export function fetchGoals(date: string) {
  return async (): Promise<Goal[]> => {
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
    return data.map((goal) => ({
      id: goal.id,
      text: goal.text,
      completed: goal.is_completed,
      custom: true,
    }));
  };
}
