export interface Goal {
  id: number;
  text: string;
  completed: boolean;
  custom?: boolean;
}

export interface API__Goal {
  id: number;
  created_at: string;
  text: string;
  is_completed: boolean;
  is_recurrent: boolean;
}
