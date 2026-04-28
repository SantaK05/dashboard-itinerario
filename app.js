// ── Theme ──────────────────────────────────────────────
const root   = document.documentElement;
const toggle = document.getElementById('theme-toggle');
const saved  = localStorage.getItem('theme');

if (saved) root.dataset.theme = saved;

const TILES = {
  light: {
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attr: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
  dark: {
    url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attr: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors © <a href="https://carto.com/attributions">CARTO</a>',
  },
};

// ── Map ────────────────────────────────────────────────
const stops = [
  { name: "BGY / Orio al Serio",          latlng: [45.6657,  9.6958], day: "Giorno 1 — partenza" },
  { name: "Kals / Matrei in Osttirol",    latlng: [47.0014, 12.6336], day: "Giorno 1–3" },
  { name: "Krasno / Baške Oštarije",      latlng: [44.8614, 14.9892], day: "Giorno 3–5" },
  { name: "Kulen Vakuf / Bihać",          latlng: [44.5775, 16.0394], day: "Giorno 5–7" },
  { name: "Jajce / Travnik",              latlng: [44.3417, 17.2722], day: "Giorno 7–8" },
  { name: "Blidinje Nature Park",         latlng: [43.6833, 17.4667], day: "Giorno 8–10" },
  { name: "Omiš / Brela",                latlng: [43.4428, 16.6877], day: "Giorno 10–11" },
  { name: "Buzet / Hum (Istria)",         latlng: [45.4064, 13.9703], day: "Giorno 11–12" },
  { name: "BGY / Orio al Serio",          latlng: [45.6659,  9.6953], day: "Giorno 12 — rientro" },
];

const map = L.map('route-map', { zoomControl: true, scrollWheelZoom: false });

function isDark() { return root.dataset.theme === 'dark'; }

let tileLayer = L.tileLayer(
  isDark() ? TILES.dark.url : TILES.light.url,
  { attribution: isDark() ? TILES.dark.attr : TILES.light.attr, maxZoom: 19 }
).addTo(map);

const line = L.polyline(stops.map(s => s.latlng), {
  color: '#2C5F8A', weight: 3, opacity: 0.75, dashArray: '6 4',
}).addTo(map);

const dotIcon = (accent) => L.divIcon({
  className: '',
  html: `<div style="width:12px;height:12px;border-radius:50%;background:${accent};border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.3)"></div>`,
  iconSize: [12, 12], iconAnchor: [6, 6],
});

stops.forEach((s, i) => {
  const accent = (i === 0 || i === stops.length - 1) ? '#C06B50' : '#2C5F8A';
  L.marker(s.latlng, { icon: dotIcon(accent) })
    .addTo(map)
    .bindPopup(`<strong>${s.name}</strong><br><span style="font-size:11px;opacity:.7">${s.day}</span>`);
});

map.fitBounds(line.getBounds(), { padding: [32, 32] });

// ── Toggle handler ─────────────────────────────────────
toggle.addEventListener('click', () => {
  const next = isDark() ? 'light' : 'dark';
  root.dataset.theme = next;
  localStorage.setItem('theme', next);

  const t = TILES[next];
  tileLayer.remove();
  tileLayer = L.tileLayer(t.url, { attribution: t.attr, maxZoom: 19 }).addTo(map);
});
