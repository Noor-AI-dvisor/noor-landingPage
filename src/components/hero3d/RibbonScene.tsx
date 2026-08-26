import { useEffect, useMemo, useRef, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Written once per scroll tick by ScrollStory (never via React state, so
 * scrolling never triggers a re-render) and read every rAF inside useFrame.
 * `fromStage`/`toStage` are indices into STAGE_FNS below; `blend` (0-1) is
 * only ever non-trivial during the last step of a section, where the shape
 * morphs into the next section's form right as its content starts revealing.
 */
export type StoryProgress = {
  fromStage: number;
  toStage: number;
  blend: number;
  /** 0-3 continuous index of the active bullet within the current section, or -1 outside a bullet section. */
  activeGroup: number;
};

type RibbonProps = {
  storyRef: RefObject<StoryProgress>;
};

// Noor palette — matches --accent / --accent-soft in src/index.css
const COLOR_A = new THREE.Color("#0fa88f"); // accent (teal)
const COLOR_B = new THREE.Color("#2fc4a8"); // accent-soft
const COLOR_HI = new THREE.Color("#bff3e6"); // highlight boost for the active bullet's group

const COLS = 20;
const ROWS = 7;
const SPACING = 0.5;
const BOX_SIZE: [number, number, number] = [0.4, 0.18, 0.4];
const COUNT = COLS * ROWS;
const GROUP_SIZE = COLS / 4; // 4 column-bands, one per bullet

// Mesh-level transform target per stage: 0 book, 1 panel, 2 ring, 3 cluster, 4 point
const MESH_TARGETS = [
  { rotX: 0, rotZ: 0, posY: 0, spin: 0 },
  { rotX: -0.55, rotZ: 0.12, posY: -0.6, spin: 0 },
  { rotX: -0.15, rotZ: 0, posY: -0.2, spin: 0.11 },
  { rotX: -0.2, rotZ: 0, posY: -0.3, spin: 0 },
  { rotX: 0, rotZ: 0, posY: 0, spin: 0.2 },
];

// Per-instance thickness multiplier (applied to the shared box geometry's Y
// axis, BOX_SIZE[1] = 0.18) for each stage: only stage 0 wants the "thin
// page" look (0.18 * 0.16 ≈ 0.029, inside the 0.02-0.04 target), every other
// stage keeps the normal cube-ish block used by the panel/ring/cluster/point
// states, unchanged from before.
const STAGE_THICKNESS = [0.16, 1, 1, 1, 1];

const lerp = THREE.MathUtils.lerp;

// Two symmetric page groups fanned left/right of a spine at x=0. Crucially,
// x and z here are the exact same base.x/base.z every other stage uses (the
// plain COLS x ROWS grid) — only height (curl/flutter) and a bit of tilt
// deviate from that grid. An earlier version remapped (r,c) into its own
// (side, page, segFrac) coordinate scheme, which looked fine at rest but
// broke badly mid-scroll: blending two DIFFERENT position schemes per
// instance (this one vs. stagePanel's plain base.x/base.z) sent neighboring
// instances toward unrelated targets, tearing the surface into a warped
// plank that cut across the hero text. Sharing base.x/base.z keeps x/z
// static across the whole book -> panel morph, so only height changes.
//
// Columns split into a left half (base.x < 0) and right half (base.x > 0)
// around the spine gap between them; row r (0..ROWS-1) doubles as the
// front-to-back stack index, since base.z already spreads rows out in depth.
function stageBook(base: THREE.Vector3, r: number, t: number, blend: number) {
  const side = Math.sign(base.x) || 1;
  const segFrac = Math.min(1, Math.abs(base.x) / 4.75); // 0 at the spine, 1 at the outer edge
  const stackFrac = r / (ROWS - 1);

  const x = base.x;
  const z = base.z;

  // Permanent gentle rise right at the gutter — reads as the page's natural
  // curl near the spine even once the flutter below has fully settled.
  const curl = 0.3 * Math.exp(-segFrac * 4.2);

  // Pages are anchored at the spine and freest to move at the tip. The
  // flutter decays to 0 well before the hero step ends (see
  // BOOK_SETTLE_BLEND) so the book visibly settles flat — with its spine
  // curl — while it's still on screen, rather than fluttering all the way
  // into the cross-fade toward the next section's shape.
  const settle = Math.max(0, 1 - blend / BOOK_SETTLE_BLEND);
  const flutterEnvelope = Math.pow(segFrac, 1.4);
  const flutterAmp = 0.4 * settle * settle;
  const flutter =
    flutterAmp * flutterEnvelope * Math.sin(t * 2.1 + stackFrac * 3.4 + segFrac * 2.6) +
    flutterAmp * flutterEnvelope * 0.4 * Math.sin(t * 3.4 + stackFrac * 6.2);

  const y = curl + flutter;
  return { x, y, z, rotY: 0, rotZ: side * (curl + flutter) * 0.22 };
}

// blend reaches this value a little before the hero panel's own text has
// fully crossfaded out (see CROSSFADE_SPAN in ScrollStory.tsx), so the book
// is fully calm well within the window where it's still shown behind text —
// it doesn't ride the flutter all the way to blend===1, which is deep into
// the morph toward the next section's (unrelated, downstream) panel shape.
const BOOK_SETTLE_BLEND = 0.3;

function stagePanel(x0: number, z0: number, t: number) {
  const y = Math.sin(x0 * 1.6 + t * 0.5) * 0.05;
  return { x: x0, y, z: z0, rotY: 0, rotZ: 0 };
}

function stageRing(r: number, c: number, t: number) {
  const radius = 1.55 + r * 0.34;
  const angle = (c / COLS) * Math.PI * 2 + t * 0.15 + r * 0.09;
  const y = Math.sin(angle * 2 + t * 0.4) * 0.22;
  return { x: Math.cos(angle) * radius, y, z: Math.sin(angle) * radius * 0.55, rotY: angle, rotZ: 0 };
}

function stageCluster(r: number, c: number, t: number) {
  const g = Math.min(3, Math.floor(c / GROUP_SIZE));
  const localCols = GROUP_SIZE;
  const centers = [
    { x: -2.9, z: -1.1 },
    { x: -0.95, z: 1.25 },
    { x: 0.95, z: -1.25 },
    { x: 2.9, z: 1.1 },
  ];
  const center = centers[g];
  const x = center.x + (c % localCols - (localCols - 1) / 2) * 0.24;
  const z = center.z + (r - (ROWS - 1) / 2) * 0.24;
  const y = Math.sin(t * 0.8 + (r + c) * 0.3) * 0.08;
  return { x, y, z, rotY: 0, rotZ: 0 };
}

function stagePoint(i: number, t: number) {
  const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
  const theta = Math.PI * (1 + Math.sqrt(5)) * i + t * 0.3;
  const radius = 0.9 + Math.sin(t * 1.2 + i * 0.1) * 0.06;
  return {
    x: radius * Math.sin(phi) * Math.cos(theta),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
    rotY: theta,
    rotZ: 0,
  };
}

function stagePosition(stage: number, base: THREE.Vector3, r: number, c: number, i: number, t: number, blend: number) {
  switch (stage) {
    case 0: return stageBook(base, r, t, blend);
    case 1: return stagePanel(base.x, base.z, t);
    case 2: return stageRing(r, c, t);
    case 3: return stageCluster(r, c, t);
    default: return stagePoint(i, t);
  }
}

function Ribbon({ storyRef }: RibbonProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const spinRef = useRef(0);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  const { cells, baseColors } = useMemo(() => {
    const list: { base: THREE.Vector3; r: number; c: number }[] = [];
    const cols: THREE.Color[] = [];
    const originX = -((COLS - 1) * SPACING) / 2;
    const originZ = -((ROWS - 1) * SPACING) / 2;

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        list.push({ base: new THREE.Vector3(originX + c * SPACING, 0, originZ + r * SPACING), r, c });
        cols.push(COLOR_A.clone().lerp(COLOR_B, c / (COLS - 1)));
      }
    }
    return { cells: list, baseColors: cols };
  }, []);

  // setColorAt is the documented way to populate per-instance color — it lazily
  // creates `mesh.instanceColor` with the right size/type and flags it for
  // upload. Assigning a raw InstancedBufferAttribute by hand skips that setup
  // and renders black.
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;
    baseColors.forEach((color, i) => mesh.setColorAt(i, color));
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [baseColors]);

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const t = clock.getElapsedTime();
    const { fromStage, toStage, blend, activeGroup } = storyRef.current;

    // The book is thin (STAGE_THICKNESS) and the camera views it at a
    // shallow ~11° elevation, nearly edge-on. At that angle even the small
    // rotX/rotZ MESH_TARGETS[1] carries for the *next* section's panel tilt
    // reads, on a wide near-flat sheet, as a dramatic diagonal slant — which
    // showed up cutting across the hero text as early as blend~0.15-0.3.
    // Easing (blend^2) only for the hero's own transition keeps the book
    // visually flat/settled through most of the step and catches up to the
    // panel's target transform quickly right at the end, after the hero
    // text has already crossfaded out. Every other stage-to-stage
    // transition (downstream, unchanged) still uses blend linearly.
    const shapeBlend = fromStage === 0 ? blend * blend : blend;

    const meshFrom = MESH_TARGETS[fromStage];
    const meshTo = MESH_TARGETS[toStage];
    mesh.rotation.x = lerp(meshFrom.rotX, meshTo.rotX, shapeBlend);
    mesh.rotation.z = lerp(meshFrom.rotZ, meshTo.rotZ, shapeBlend);
    mesh.position.y = lerp(meshFrom.posY, meshTo.posY, shapeBlend);
    spinRef.current += lerp(meshFrom.spin, meshTo.spin, shapeBlend) * delta;
    mesh.rotation.y = spinRef.current;

    const highlightActive = activeGroup >= 0 && (toStage === 1 || toStage === 2 || toStage === 3);
    const nearestGroup = Math.round(activeGroup);

    // Thickness needs to reach its full (chunky, non-paper-thin) value
    // before mesh.rotation.x crosses ~-11° (~-0.193 rad) — the angle at
    // which this near-flat sheet's top face is exactly edge-on to the
    // camera's own ~11° declination (camera at (0, 2.2, 11.3) looking at
    // the origin: atan(2.2/11.3) ≈ 11.03°). Under the plain shapeBlend
    // curve that crossing happens at blend ≈ 0.59 (shapeBlend ≈ 0.35,
    // where -0.55*shapeBlend ≈ -0.193), and thickness was still only ~46%
    // ramped there, so the mesh passed through a thin, near-invisible
    // sliver mid-handoff. thicknessRace races thickness ahead of the
    // rotation/position blend once blend has already cleared the book's
    // own settle window (>0.35) — leaving the previously-verified settled
    // look at blend<=0.35 untouched — so boxes are fully thick well before
    // the ~0.59 crossing: the edge-on frame then shows a substantial box
    // face instead of a paper edge. Scoped to the book(0)->panel(1) handoff
    // only: every other stage already has STAGE_THICKNESS===1 on both
    // ends, so max(shapeBlend, 0) === shapeBlend there — a no-op.
    const thicknessRace = fromStage === 0 ? THREE.MathUtils.clamp((blend - 0.35) / 0.2, 0, 1) : 0;
    const thicknessBlend = Math.max(shapeBlend, thicknessRace);
    const thicknessY = lerp(STAGE_THICKNESS[fromStage], STAGE_THICKNESS[toStage], thicknessBlend);

    for (let i = 0; i < COUNT; i++) {
      const { base, r, c } = cells[i];
      const a = stagePosition(fromStage, base, r, c, i, t, blend);
      const b = stagePosition(toStage, base, r, c, i, t, blend);

      dummy.position.set(lerp(a.x, b.x, shapeBlend), lerp(a.y, b.y, shapeBlend), lerp(a.z, b.z, shapeBlend));
      dummy.rotation.set(0, lerp(a.rotY, b.rotY, shapeBlend), lerp(a.rotZ, b.rotZ, shapeBlend));

      const g = Math.min(3, Math.floor(c / GROUP_SIZE));
      const isHot = highlightActive && g === nearestGroup;
      const scale = isHot ? 1.22 : 1;
      dummy.scale.set(scale, scale * thicknessY, scale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      if (highlightActive) {
        tmpColor.copy(baseColors[i]).lerp(COLOR_HI, isHot ? 0.55 : 0);
        mesh.setColorAt(i, tmpColor);
      }
    }
    mesh.instanceMatrix.needsUpdate = true;
    if (highlightActive && mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, COUNT]}>
      <boxGeometry args={BOX_SIZE} />
      {/* Deliberately NOT setting vertexColors — three.js's fragment stage
          already treats USE_COLOR as `vertexColors || instancingColor`, so a
          populated instanceColor (via setColorAt above) is enough on its own.
          Turning vertexColors on would also read a per-vertex `color`
          attribute this box geometry doesn't have, zeroing vColor. */}
      <meshStandardMaterial roughness={0.35} metalness={0.15} />
    </instancedMesh>
  );
}

// Locks the HORIZONTAL field of view instead of the vertical one three.js
// uses by default. With a fixed vertical fov, the mesh's share of screen
// width shrinks as the canvas gets wider (aspect grows) since the frustum's
// horizontal extent scales with aspect — that's why the mesh previously read
// as ~65-70% wide at 1920px but comfortably fit at narrower widths. Deriving
// vertical fov from a fixed horizontal target instead keeps the frustum's
// world-space width constant, so the mesh occupies the same ~90-95% share of
// viewport width at any common desktop aspect ratio (1280-1920px), not just
// the one it was tuned against.
function CameraFovLock({ hFovDeg = 51 }: { hFovDeg?: number }) {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const width = useThree((s) => s.size.width);
  const height = useThree((s) => s.size.height);

  useEffect(() => {
    if (!camera.isPerspectiveCamera) return;
    const aspect = width / height;
    const halfHFovRad = THREE.MathUtils.degToRad(hFovDeg) / 2;
    const halfVFovRad = Math.atan(Math.tan(halfHFovRad) / aspect);
    camera.fov = THREE.MathUtils.radToDeg(halfVFovRad) * 2;
    camera.updateProjectionMatrix();
  }, [camera, width, height, hFovDeg]);

  return null;
}

export default function RibbonScene({ storyRef }: RibbonProps) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 2.2, 11.3], fov: 42 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 6, 5]} intensity={1.1} />
      <directionalLight position={[-4, 2, -3]} intensity={0.35} color="#2fc4a8" />
      <CameraFovLock />
      <Ribbon storyRef={storyRef} />
    </Canvas>
  );
}
