import { TABLES } from "@/lib/enums/supabase-tables.enum";
import { getSupabaseClient } from "@/lib/supabase/client";
import { APIDate, DateType } from "@/types/dates";

type FormattedDate = `${number}-${number}-${number}`;

export function readDate(date: FormattedDate) {
  return async (): Promise<DateType> => {
    const supabase = getSupabaseClient();

    const { data, error } = await supabase
      .from(TABLES.DATES)
      .select()
      .eq("date", date)
      .limit(1)
      .single();

    if (error || !data) {
      console.error("Error fetching date:", error);
      throw new Error();
    }

    // Transform
    const retrievedData = data as APIDate;

    return {
      id: retrievedData.id,
      date: retrievedData.date,
    };
  };
}
