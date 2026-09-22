// Theoretical complete monument on the surveyed plan.
// Standing stones stay. Fallen bodies are ghosted by the page.
// 55 is the partner of 56, using 56's position and skew (Twisted Trilithon).
// The Altar Stone is not moved.

const CE = 412245.35;
const CN = 142194.11;

function xy(e, n) {
  return { x: e - CE, z: -(n - CN) };
}
function en(x, z) {
  return { e: x + CE, n: CN - z };
}
function hypot(a, b) {
  return Math.hypot(a, b);
}
function localX(yawDeg) {
  const t = yawDeg * Math.PI / 180;
  return { x: Math.cos(t), z: -Math.sin(t) };
}
function yawOutward(x, z) {
  const a = Math.atan2(x, -z);
  return Math.atan2(Math.sin(a), -Math.cos(a)) * 180 / Math.PI;
}

function pose(id, role, x, z, yaw, w, t, h, extra) {
  const p = en(x, z);
  return Object.assign({
    id: String(id),
    role,
    status: 'standing',
    e_m: p.e,
    n_m: p.n,
    yaw_deg: yaw,
    width_m: w,
    thickness_m: t,
    height_m: h,
    z_base_m: 0,
    footprint_along_m: w,
    footprint_across_m: t,
    virtual: true,
    virtualLabel: String(id).replace(/^v/, ''),
  }, extra || {});
}

export function planComplete(array) {
  const by = {};
  for (const e of array) by[String(e.id)] = e;
  const ghost = new Set();
  for (const e of array) {
    const id = String(e.id);
    if (id === '80') continue;
    const st = String(e.status || '');
    if (st === 'fallen' || st === 'fallen_fragment' || st === 'recumbent' || st === 'empty_socket_placeholder' || st === 'on_ground') {
      ghost.add(id);
    }
  }

  const virtuals = [];
  const phase = 55.78;
  const radius = 15.45;
  const sarsenH = 4.15;
  const sarsenW = 1.95;
  const sarsenT = 1.1;
  // Missing uprights, and stumps such as 8, 12, 14, 15, 19, 25, 26: ghost the remains, stand a stone on the circle.
  for (let n = 1; n <= 30; n++) {
    const e = by[String(n)];
    const st = e ? String(e.status || '') : '';
    const needsUpright = !e || st === 'stump_or_low' || st === 'fallen' || st === 'fallen_fragment';
    if (!needsUpright) continue;
    if (e && st === 'stump_or_low') ghost.add(String(n));
    const a = (phase + (n - 1) * 12) * Math.PI / 180;
    const x = radius * Math.sin(a);
    const z = -radius * Math.cos(a);
    virtuals.push(pose(String(n), 'sarsen_upright', x, z, yawOutward(x, z), sarsenW, sarsenT, sarsenH));
  }

  // 55 beside 56, same skew. Lower number sits along +local X from the higher, as 51 does from 52.
  const s56 = by['56'];
  if (s56) {
    const p = xy(s56.e_m, s56.n_m);
    const lx = localX(s56.yaw_deg);
    const w55 = 2.2;
    const gap = s56.width_m / 2 + w55 / 2 + 0.85;
    virtuals.push(pose('55', 'trilithon_upright', p.x + lx.x * gap, p.z + lx.z * gap, s56.yaw_deg, w55, 0.9, s56.height_m));
  }
  const s60 = by['60'];
  if (s60) {
    const p = xy(s60.e_m, s60.n_m);
    const lx = localX(s60.yaw_deg);
    const w59 = 2.3;
    const gap = s60.width_m / 2 + w59 / 2 + 0.35;
    virtuals.push(pose('59', 'trilithon_upright', p.x + lx.x * gap, p.z + lx.z * gap, s60.yaw_deg, w59, 1.0, s60.height_m));
  }

  // Empty bluestone sockets and the two fallen horseshoe stones: stand a stone on that plan point.
  for (const id of ['33', '35', '40', '68', '72']) {
    const e = by[id];
    if (!e) continue;
    const p = xy(e.e_m, e.n_m);
    const w = Math.max(e.width_m || 0.8, 0.8);
    const t = Math.max(e.thickness_m || 0.5, 0.45);
    const h = Math.max(e.height_m || 0, id === '72' ? 1.8 : 1.5);
    virtuals.push(pose('v' + id, 'bluestone', p.x, p.z, e.yaw_deg || 0, w, t, h, { virtualLabel: id }));
  }

  const b65 = by['65'];
  const b67 = by['67'];
  if (b65 && b67 && !by['66']) {
    const a = xy(b65.e_m, b65.n_m);
    const b = xy(b67.e_m, b67.n_m);
    virtuals.push(pose('66', 'bluestone', (a.x + b.x) / 2, (a.z + b.z) / 2, ((b65.yaw_deg || 0) + (b67.yaw_deg || 0)) / 2, 0.7, 0.45, 1.6));
  }

  const at = {};
  for (const e of array) {
    if (ghost.has(String(e.id))) continue;
    at[String(e.id)] = xy(e.e_m, e.n_m);
  }
  for (const v of virtuals) at[String(v.id)] = xy(v.e_m, v.n_m);

  function widthOf(id, fallback) {
    const e = by[id] || virtuals.find((v) => v.id === id);
    return e && e.width_m ? e.width_m : fallback;
  }
  // Trilithon lintels reach the outer ends of the two uprights, as 152, 154 and 158 do.
  function trilithonLintel(id, a, b, h, thick) {
    const A = at[a];
    const B = at[b];
    if (!A || !B) return;
    const dx = B.x - A.x;
    const dz = B.z - A.z;
    const centres = Math.hypot(dx, dz);
    const along = centres + widthOf(a, 2.2) / 2 + widthOf(b, 2.2) / 2;
    const yaw = Math.atan2(-dz, dx) * 180 / Math.PI;
    virtuals.push(pose(id, 'trilithon_lintel', (A.x + B.x) / 2, (A.z + B.z) / 2, yaw, along, thick, h, {
      supports: [a, b],
      virtualLabel: String(id).replace(/^v/, ''),
    }));
  }
  if (!by['156'] || ghost.has('156')) trilithonLintel('v156', '55', '56', 1.05, 0.95);
  if (!by['160a'] || ghost.has('160a')) trilithonLintel('v160', '59', '60', 0.8, 1.2);

  // Outer lintels sit on the sarsen circle. Stumps off that circle are not used as supports.
  const step = 12 * Math.PI / 180;
  const chord = 2 * radius * Math.sin(step / 2);
  const lintelR = radius * Math.cos(step / 2);
  for (let n = 1; n <= 30; n++) {
    const lid = String(100 + n);
    const have = by[lid];
    if (have && !ghost.has(lid)) continue;
    const mid = (phase + (n - 1) * 12 - 6) * Math.PI / 180;
    const x = lintelR * Math.sin(mid);
    const z = -lintelR * Math.cos(mid);
    const yaw = -(phase + (n - 1) * 12 - 6);
    virtuals.push(pose('v' + lid, 'sarsen_lintel', x, z, yaw, chord, 1.05, 0.75, {
      virtualLabel: lid,
      circleLintel: true,
    }));
  }

  return { ghost, virtuals };
}
