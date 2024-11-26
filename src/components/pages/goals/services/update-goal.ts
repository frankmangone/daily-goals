import { supabase } from "@/lib/supabase/client";

interface UpdateGoalPayload {
  id: number;
  is_completed: boolean;
  // TODO: Add other keys, compose interfaces
}

export async function updateGoal(payload: UpdateGoalPayload): Promise<void> {
  const { id, ...rest } = payload;
  const { error } = await supabase.from("goals").update(rest).eq("id", id);

  if (error) {
    console.error("Error updating goal:", error);
  }
}
