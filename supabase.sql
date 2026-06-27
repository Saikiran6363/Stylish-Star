-- Run this query in your Supabase SQL Editor to create the bookings table

DROP TABLE IF EXISTS bookings;

CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text NOT NULL,
  service text NOT NULL,
  stylist_name text NOT NULL,
  booking_date text NOT NULL,
  booking_time text NOT NULL
);

-- Optional: If you want to enable Row Level Security (RLS) but allow anonymous inserts (since we are doing it from the server)
-- Note: Our server.ts uses the ANON key, not the Service Role key, so if RLS is enabled, you need to allow inserts.
-- The simplest way is to disable RLS for this table or add an insert policy.
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for anonymous users" 
ON bookings FOR INSERT 
TO anon 
WITH CHECK (true);

-- Allow reading for anonymous users if you want to display them later
CREATE POLICY "Enable read access for all users"
ON bookings FOR SELECT
TO anon
USING (true);
