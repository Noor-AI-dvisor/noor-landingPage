import { StoryPresence } from "./StoryPresence";

// App-level backdrop: the same breathing halo/orb/particle shape ScrollStory
// shows behind its pinned desktop panels, mounted as a plain fixed-position
// layer instead. On desktop this sits behind ScrollStory's own copy (each
// section repaints an opaque-ish background over it, so it's never actually
// seen there) — its real job is being the persistent background for the
// mobile stacked layout (App.tsx), which has no such pinned-stage backdrop
// of its own. Static teal theme, no scroll-driven theme/particle changes:
// the shape's motion is continuous CSS regardless, so this still reads as
// "alive" without needing any scroll-position wiring.
export default function AmbientPresence() {
  return (
    <div
      className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <StoryPresence />
    </div>
  );
}
