import { supabase } from "@/lib/supabase/client";

interface GoalPayload {
  text: string;
}

export function createGoal(date: string) {
  return async (payload: GoalPayload): Promise<void> => {
    const { error } = await supabase.from("goals").insert({
      date,
      text: payload.text,
      is_completed: false,
      is_recurrent: false,
    });

    if (error) {
      console.error("Error storing goals:", error);
    }
  };
}
