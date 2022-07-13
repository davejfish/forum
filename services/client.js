const SUPABASE_URL = 'https://naecyvnfmwcpxcyroblz.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5hZWN5dm5mbXdjcHhjeXJvYmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY2MjM4MDQsImV4cCI6MTk3MjE5OTgwNH0.etgq6aLYRaVsRE4OXn1toSNWnUhRvFKalDJSmm9q4mk';

export const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
