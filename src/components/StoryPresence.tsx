import "./story/story.css";

// Ambient background presence — a breathing halo/orb/particle CSS treatment
// (adapted from the noor-learning-animation design reference). Shared
// between the desktop ScrollStory panel (which drives data-theme and the
// active particle from scroll position, see ScrollStory.tsx's handleUpdate)
// and the mobile layout's static AmbientPresence wrapper — living in its
// own file, rather than inside ScrollStory.tsx, so a mobile component using
// it doesn't statically pull in GSAP and the whole scroll-jacking module,
// which would defeat the React.lazy() split that keeps ScrollStory out of
// the mobile bundle. The shape's motion is all continuous CSS (presence-
// breathe/float/morph/speak/core/twinkle) — rootRef/particleRefs are only
// needed by callers that want to drive the theme/active-particle from
// scroll; both are optional so it also mounts as a plain static backdrop.
export function StoryPresence({
  rootRef,
  particleRefs,
}: {
  rootRef?: (el: HTMLDivElement | null) => void;
  particleRefs?: (el: HTMLElement | null, i: number) => void;
}) {
  return (
    <div
      className="story-presence-layer"
      data-theme="teal"
      ref={rootRef}
      aria-hidden="true"
    >
      <div className="presence-stage">
        <div className="presence-halo presence-halo--outer" />
        <div className="presence-halo presence-halo--middle" />
        <div className="presence-orb">
          <div className="presence-shine" />
          <div className="presence-wave" />
          <div className="presence-wave presence-wave--two" />
          <div className="presence-wave presence-wave--three" />
          <div className="presence-core" />
        </div>
        <i
          className="presence-particle presence-particle--one"
          ref={(el) => particleRefs?.(el, 0)}
        />
        <i
          className="presence-particle presence-particle--two"
          ref={(el) => particleRefs?.(el, 1)}
        />
        <i
          className="presence-particle presence-particle--three"
          ref={(el) => particleRefs?.(el, 2)}
        />
      </div>
    </div>
  );
}
