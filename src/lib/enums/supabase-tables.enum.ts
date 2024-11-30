export const TABLES = {
  // Dates keep important metadata about the status of goals.
  DATES: "dates",

  // Goals are essentially recurring tasks, that are created for each
  // day that the service is used.
  GOALS: "goals",

  // Tasks are simply that - tasks associated to a date.
  TASKS: "tasks",
} as const;
