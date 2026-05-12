
-- 1. Drop sensitive Strava columns from profiles (data lives in strava_connections)
ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS strava_token,
  DROP COLUMN IF EXISTS strava_refresh,
  DROP COLUMN IF EXISTS strava_client_id,
  DROP COLUMN IF EXISTS strava_client_secret;

-- 2. Lock down strava_connections — tokens must not be client-readable.
DROP POLICY IF EXISTS "strava_select_own" ON public.strava_connections;
DROP POLICY IF EXISTS "strava_insert_own" ON public.strava_connections;
DROP POLICY IF EXISTS "strava_update_own" ON public.strava_connections;
-- (No SELECT/INSERT/UPDATE policies remain → only service_role can access.)

-- 3. Activities: remove public-read policies
DROP POLICY IF EXISTS "Anyone can read activities" ON public.activities;
DROP POLICY IF EXISTS "activities_select_public" ON public.activities;
-- "Users manage own activities" (ALL) and activities_*_own remain → owner-only.

-- 4. Group members: restrict to authenticated users
DROP POLICY IF EXISTS "Anyone can read members" ON public.group_members;
DROP POLICY IF EXISTS "members_select_all" ON public.group_members;
CREATE POLICY "members_select_authenticated"
  ON public.group_members
  FOR SELECT
  TO authenticated
  USING (true);

-- 5. Fix mutable search_path on set_updated_at
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
begin new.updated_at = now(); return new; end;
$$;

-- 6. Revoke EXECUTE on SECURITY DEFINER functions from anon & authenticated.
-- They are only used as triggers (run by table owner), so callers don't need EXECUTE.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.set_updated_at() FROM PUBLIC, anon, authenticated;
