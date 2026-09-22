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
  for (const n of [9, 13, 17, 18, 20, 24]) {
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
    const gap = s56.width_m / 2 + w55 / 2 + 0.35;
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

  function lintel(id, a, b, role, h, thick) {
    const A = at[a];
    const B = at[b];
    if (!A || !B) return;
    const dx = B.x - A.x;
    const dz = B.z - A.z;
    const span = Math.hypot(dx, dz);
    const yaw = Math.atan2(-dz, dx) * 180 / Math.PI;
    virtuals.push(pose(id, role, (A.x + B.x) / 2, (A.z + B.z) / 2, yaw, Math.max(span, 2.4), thick, h, {
      supports: [a, b],
      virtualLabel: String(id).replace(/^v/, ''),
    }));
  }

  for (let n = 1; n <= 30; n++) {
    const left = n === 1 ? '30' : String(n - 1);
    const right = String(n);
    const lid = String(100 + n);
    const have = by[lid];
    if (have && !ghost.has(lid)) continue;
    lintel('v' + lid, left, right, 'sarsen_lintel', 0.75, 1.05);
  }
  if (!by['156'] || ghost.has('156')) lintel('v156', '55', '56', 'trilithon_lintel', 1.05, 0.95);
  if (!by['160a'] || ghost.has('160a')) lintel('v160', '59', '60', 'trilithon_lintel', 0.85, 1.2);

  return { ghost, virtuals };
}
