import React from 'react'

// Fixed page-level backdrop: a breathing halo/orb/particle shape, sitting
// behind every section so it reads as one continuous background while the
// page scrolls normally above it.
const AmbientPresence: React.FC = () => (
  <div className="ambient-bg" aria-hidden="true">
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
      <i className="presence-particle presence-particle--one" />
      <i className="presence-particle presence-particle--two" />
      <i className="presence-particle presence-particle--three" />
    </div>
  </div>
)

export default AmbientPresence
