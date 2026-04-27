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
  { name: "BGY (partenza)",      latlng: [45.6657,  9.6958], day: "Giorno 1" },
  { name: "Peñíscola",           latlng: [40.3676,  0.3932], day: "Giorno 1–2" },
  { name: "Cabo de Gata",        latlng: [36.7817, -2.2422], day: "Giorno 2–4" },
  { name: "Ronda",               latlng: [36.7462, -5.1612], day: "Giorno 4–6" },
  { name: "Córdoba",             latlng: [37.8893, -4.7793], day: "Giorno 6–8" },
  { name: "Valencia / Albufera", latlng: [39.4738, -0.3756], day: "Giorno 8–9" },
  { name: "Andorra la Vella",    latlng: [42.5063,  1.5218], day: "Giorno 9–10" },
  { name: "BGY (rientro)",       latlng: [45.6659,  9.6953], day: "Giorno 10" },
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
