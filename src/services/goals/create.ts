import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";

export interface CreateGoalPayload {
  text: string;
}

export function createGoal() {
  return async (payload: CreateGoalPayload): Promise<void> => {
    const supabase = getSupabaseClient();
    const { error } = await supabase.from(TABLES.GOALS).insert({
      text: payload.text,
    });

    if (error) {
      console.error("Error storing goal:", error);
    }
  };
}
