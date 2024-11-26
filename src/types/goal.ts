export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  date: string;
  custom?: boolean;
}

export interface API__Goal {
  id: number;
  created_at: string;
  date: string;
  text: string;
  is_completed: boolean;
  is_recurrent: boolean;
}
