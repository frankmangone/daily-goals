import { supabase } from "@/lib/supabase/client";

export async function deleteGoal(id: number): Promise<void> {
  const { error } = await supabase.from("goals").delete().eq("id", id);

  if (error) {
    console.error("Error deleting goal:", error);
  }
}
