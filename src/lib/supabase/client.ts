"use client";

import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://whwxnzjjtqnchuqigtll.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indod3huempqdHFuY2h1cWlndGxsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI0NzE2MTQsImV4cCI6MjA0ODA0NzYxNH0.FFfoa7DoPg1nt0AtFjvG0Lt5U_mGHQohm0R2rS9AtHU"
);
