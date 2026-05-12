import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

// The Cadence app lives as static HTML/JS under /public.
// This route just hands off to the static landing page.
export const Route = createFileRoute("/")({
  component: RedirectToLanding,
});

function RedirectToLanding() {
  useEffect(() => {
    window.location.replace("/landing.html");
  }, []);
  return null;
}
