import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://khzlrjtqklotkaruldoz.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoemxyanRxa2xvdGthcnVsZG96Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQyMjU0ODQsImV4cCI6MjA4OTgwMTQ4NH0.8TPIjepjrlO2ZodMbDAnfaGWRyj-WFFKRtgXfvCFxVM"

export const supabase = createClient(supabaseUrl, supabaseKey)