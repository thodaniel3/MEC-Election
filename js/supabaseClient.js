import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

const supabaseUrl = "https://okxnnbryvxsdpadlhlos.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9reG5uYnJ5dnhzZHBhZGxobG9zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzMzA4NDIsImV4cCI6MjA5MTkwNjg0Mn0.zcpScxFict36y_NQLCtLvmk78W-Tneou59p_IwXfixk"

export const supabase = createClient(supabaseUrl, supabaseKey)