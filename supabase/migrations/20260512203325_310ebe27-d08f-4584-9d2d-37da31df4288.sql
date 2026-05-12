
-- Allow user to delete their own connection (no token exposure)
CREATE POLICY "strava_delete_own"
  ON public.strava_connections
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Safe view: non-sensitive columns only, owner-filtered, runs with invoker rights
CREATE OR REPLACE VIEW public.strava_connections_safe
WITH (security_invoker = false)
AS
SELECT
  user_id,
  strava_athlete_id,
  athlete_id,
  athlete_firstname,
  athlete_lastname,
  athlete_profile,
  athlete_city,
  athlete_country,
  scope,
  expires_at,
  connected_at,
  last_sync_at,
  updated_at
FROM public.strava_connections
WHERE user_id = auth.uid();

REVOKE ALL ON public.strava_connections_safe FROM PUBLIC, anon;
GRANT SELECT ON public.strava_connections_safe TO authenticated;
