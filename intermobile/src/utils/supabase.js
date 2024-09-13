import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ugyqonyiqqraarbsxplf.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVneXFvbnlpcXFyYWFyYnN4cGxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTkyMjczNTEsImV4cCI6MjAzNDgwMzM1MX0.GwGGMxjTOwZWsVXwH2ktjmwVxEc6EaktV_vNbkvPE0A";

export const supabase = createClient(supabaseUrl, supabaseKey);