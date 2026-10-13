// 3 Kingdoms mock: page behaviour shared by both variants.
// GSAP + ScrollTrigger + Lenis are loaded as UMD globals before this module.
import { initBowl } from './bowl3d.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const mobile = () => innerWidth < 760;
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function boot(cfg) {
  const bowl = initBowl(document.getElementById('bowl'), cfg.bowl);

  // ---------- smooth scroll (Lenis) wired to ScrollTrigger, per gsap-scrolltrigger guidance ----------
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  if (!reduce && window.Lenis) {
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
      const el = document.querySelector(a.getAttribute('href')); if (!el) return; e.preventDefault(); lenis.scrollTo(el, { offset: -10 });
    }));
  }

  // ---------- process: one pinned, scrubbed timeline drives the bowl ----------
  const proc = document.getElementById('process');
  if (proc) {
    const steps = [...proc.querySelectorAll('.step')];
    const weight = document.getElementById('weight');
    const roller = document.getElementById('roller');
    const caption = document.getElementById('step-caption');
    let shown = -1;
    const update = p => {
      proc.style.setProperty('--p', p.toFixed(4));
      const drop = clamp(p / 0.38), w = clamp((p - 0.3) / 0.25), sp = clamp((p - 0.55) / 0.25);
      bowl.set({ drop, spice: 0.15 + sp * 0.7, steam: 0.6 + sp * 0.6 });
      if (weight) weight.textContent = String(Math.round(w * 500)).padStart(3, '0') + 'g';
      const active = p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.82 ? 2 : 3;
      steps.forEach((s, i) => s.classList.toggle('on', i === active));
      if (caption && shown !== active) { shown = active; const st = steps[active]; caption.textContent = st.querySelector('h3').textContent + ': ' + [...st.querySelectorAll('p:not(.weigh)')].map(p => p.textContent).join(' '); }
      if (roller) drawRoller(roller, p);
    };
    if (reduce) { update(1); proc.classList.add('static'); }
    else ScrollTrigger.create({ trigger: proc, start: 'top top', end: () => '+=' + innerHeight * 2.6, pin: true, scrub: 0.6, invalidateOnRefresh: true, onUpdate: s => update(s.progress) });
    update(0);
  }

  // ---------- bowl placement per section ----------
  // A section can anchor the bowl to an element (data-anchor / data-anchor-m); the bowl then follows it as the page scrolls.
  const parse = s => s.split(',').map(Number);
  let active = null, last = '';
  const anchorOf = sec => sec && (mobile() ? sec.dataset.anchorM : sec.dataset.anchor);
  const follow = () => {
    const sel = anchorOf(active); if (!sel) return;
    const el = active.querySelector(sel); if (!el) return;
    const r = el.getBoundingClientRect();
    const sx = ((r.left + r.width / 2) / innerWidth) * 2 - 1, sy = -(((r.top + r.height / 2) / innerHeight) * 2 - 1);
    const key = sx.toFixed(3) + sy.toFixed(3); if (key === last) return; last = key;
    bowl.set({ sx, sy });
  };
  gsap.ticker.add(follow);
  document.querySelectorAll('[data-bowl]').forEach(sec => {
    const apply = () => {
      const [sx, sy, scale] = parse(mobile() && sec.dataset.bowlM ? sec.dataset.bowlM : sec.dataset.bowl);
      active = sec; last = '';
      const s = { sx, sy, scale };
      if (sec.dataset.drop) s.drop = +sec.dataset.drop;
      if (sec.dataset.steam) s.steam = +sec.dataset.steam;
      bowl.set(s);
    };
    ScrollTrigger.create({ trigger: sec, start: 'top 55%', end: 'bottom 45%', onEnter: apply, onEnterBack: apply });
  });
  const first = document.querySelector('[data-bowl]');
  if (first) { active = first; const [sx, sy, scale] = parse(mobile() && first.dataset.bowlM ? first.dataset.bowlM : first.dataset.bowl); bowl.set({ sx, sy, scale, drop: 0 }); follow(); }

  // ---------- one orchestrated load moment ----------
  if (!reduce) {
    const lines = document.querySelectorAll('[data-load]');
    gsap.from(lines, { yPercent: 105, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.07, delay: 0.15 });
  }

  fitText(); addEventListener('resize', fitText); if (document.fonts) document.fonts.ready.then(() => { fitText(); ScrollTrigger.refresh(); });
  ScrollTrigger.refresh();
  clockAndStatus(); setInterval(clockAndStatus, 1000);
  ticket();
  spiceDial(bowl);
  document.querySelectorAll('[data-zh]').forEach(b => b.addEventListener('click', () => toast(b.dataset.zh)));
  return bowl;
}

// Fit a line of type to its container's full measure, like set wood type.
function fitText() {
  document.querySelectorAll('.fit').forEach(el => {
    const span = el.firstElementChild; if (!span) return;
    el.style.fontSize = '';
    const base = parseFloat(getComputedStyle(el).fontSize), w = span.getBoundingClientRect().width;
    if (w) el.style.fontSize = (base * el.clientWidth / w * 0.998) + 'px';
  });
}

// Polygon that gains sides as it rolls: square to circle (the reference's "bumpy road" device).
function drawRoller(svg, p) {
  const W = svg.viewBox.baseVal.width, H = svg.viewBox.baseVal.height;
  const n = Math.round(4 + p * 36), r = H * 0.42, cx = r + p * (W - 2 * r), cy = H / 2, rot = p * 12;
  const pts = []; for (let i = 0; i < n; i++) { const a = rot + i / n * Math.PI * 2; pts.push((cx + Math.cos(a) * r).toFixed(1) + ',' + (cy + Math.sin(a) * r).toFixed(1)); }
  svg.querySelector('polygon').setAttribute('points', pts.join(' '));
  svg.querySelector('circle').setAttribute('cx', cx.toFixed(1));
}

// Brisbane time and real opening hours: Fri 11:00 to 19:30, other days 11:00 to 19:00.
function clockAndStatus() {
  const now = new Date();
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Brisbane', weekday: 'short', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23' }).formatToParts(now).map(p => [p.type, p.value]));
  const h = +parts.hour, m = +parts.minute, day = parts.weekday;
  const close = day === 'Fri' ? 19.5 : 19, t = h + m / 60;
  const closeLabel = day === 'Fri' ? '7:30pm' : '7pm';
  let status;
  if (t >= 11 && t < close) status = { open: true, en: `Open now, till ${closeLabel}` };
  else if (t < 11) status = { open: false, en: 'Opens 11am today' };
  else status = { open: false, en: 'Closed, opens 11am tomorrow' };
  document.querySelectorAll('[data-clock]').forEach(el => el.textContent = `${parts.hour}:${parts.minute}:${parts.second}`);
  document.querySelectorAll('[data-status]').forEach(el => { el.textContent = status.en; el.closest('[data-open]')?.setAttribute('data-open', status.open); });
  document.querySelectorAll('[data-today]').forEach(el => el.textContent = status.open ? `Open till ${closeLabel} today` : status.en);
}

// Order ticket: each add is one printed line. Honest copy: shown at the counter, no online checkout yet.
function ticket() {
  const lines = document.getElementById('ticket-lines'), total = document.getElementById('ticket-total'), count = document.querySelectorAll('[data-ticket-count]');
  if (!lines) return;
  let sum = 0, n = 0;
  document.querySelectorAll('[data-add]').forEach(b => b.addEventListener('click', () => {
    const [name, price] = b.dataset.add.split('|');
    const row = document.createElement('li'); row.className = 'tline';
    row.innerHTML = `<span>1 × ${name}</span><b>${price === 'counter' ? 'at counter' : '$' + (+price).toFixed(2)}</b>`;
    lines.querySelector('.empty')?.remove(); lines.appendChild(row);
    if (price !== 'counter') sum += +price; n++;
    total.textContent = '$' + sum.toFixed(2);
    count.forEach(c => c.textContent = n);
    toast(`Added ${name}. ${n} ${n === 1 ? 'item' : 'items'} on your ticket.`);
    b.classList.remove('pressed'); void b.offsetWidth; b.classList.add('pressed');
  }));
}

// Draggable chilli: sets the spice level 1 to 6 and re-tints the broth. Keyboard: arrows, Home, End.
function spiceDial(bowl) {
  const track = document.getElementById('spice-track'), knob = document.getElementById('spice-knob'), label = document.getElementById('spice-label');
  if (!track) return;
  let v = 3;
  const set = (nv, fromDrag) => {
    v = Math.min(6, Math.max(1, nv));
    knob.style.setProperty('--x', ((v - 1) / 5).toFixed(3));
    knob.setAttribute('aria-valuenow', v); knob.setAttribute('aria-valuetext', `Level ${v} of 6`);
    label.textContent = `Level ${v} of 6`;
    bowl.set({ spice: (v - 1) / 5, drop: 1 });
    track.style.setProperty('--v', (v - 1) / 5);
  };
  const fromX = x => { const r = track.getBoundingClientRect(); return Math.round(clamp((x - r.left) / r.width) * 5) + 1; };
  let drag = false;
  knob.addEventListener('pointerdown', e => { drag = true; knob.setPointerCapture(e.pointerId); knob.classList.add('grab'); });
  knob.addEventListener('pointermove', e => { if (drag) set(fromX(e.clientX), true); });
  knob.addEventListener('pointerup', () => { drag = false; knob.classList.remove('grab'); });
  track.addEventListener('click', e => { if (e.target === track || e.target.classList.contains('stop')) set(fromX(e.clientX)); });
  knob.addEventListener('keydown', e => {
    const m = { ArrowRight: 1, ArrowUp: 1, ArrowLeft: -1, ArrowDown: -1 };
    if (m[e.key]) { set(v + m[e.key]); e.preventDefault(); }
    if (e.key === 'Home') { set(1); e.preventDefault(); } if (e.key === 'End') { set(6); e.preventDefault(); }
  });
  set(3);
}

function toast(msg) {
  let t = document.getElementById('toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); document.body.appendChild(t); }
  t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('show'), 2600);
}
