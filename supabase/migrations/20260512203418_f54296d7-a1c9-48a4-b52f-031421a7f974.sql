
DROP VIEW IF EXISTS public.strava_connections_safe;

CREATE OR REPLACE FUNCTION public.get_my_strava_connection()
RETURNS TABLE (
  user_id uuid,
  strava_athlete_id bigint,
  athlete_id text,
  athlete_firstname text,
  athlete_lastname text,
  athlete_profile text,
  athlete_city text,
  athlete_country text,
  scope text,
  expires_at timestamptz,
  connected_at timestamptz,
  last_sync_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    sc.user_id, sc.strava_athlete_id, sc.athlete_id,
    sc.athlete_firstname, sc.athlete_lastname, sc.athlete_profile,
    sc.athlete_city, sc.athlete_country, sc.scope,
    sc.expires_at, sc.connected_at, sc.last_sync_at, sc.updated_at
  FROM public.strava_connections sc
  WHERE sc.user_id = auth.uid();
$$;

REVOKE EXECUTE ON FUNCTION public.get_my_strava_connection() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_my_strava_connection() TO authenticated;
