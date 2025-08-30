/*
  # Enable UUID extension

  1. Extensions
    - Enable uuid-ossp extension for UUID generation
    - Enable pgcrypto extension for additional crypto functions

  2. Functions
    - Create helper function for getting current user ID
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Helper function to get current user ID (for connection testing)
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS uuid
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT auth.uid();
$$;