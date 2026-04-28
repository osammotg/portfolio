import React, { memo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

// Countries where Tommaso has competed (ISO 3166-1 alpha-3)
const PLAYED_COUNTRIES = new Set([
  "USA", // United States
  "COL", // Colombia
  "CHE", // Switzerland
  "FRA", // France
  "DEU", // Germany
  "ITA", // Italy
  "HRV", // Croatia
  "SRB", // Serbia
  "CZE", // Czech Republic
  "GBR", // United Kingdom (England)
  "ESP", // Spain (Canary Islands)
]);

const CLUBS = [
  { name: "Genève Natation",       short: "GN",  flag: "🇨🇭" },
  { name: "Carouge Natation",      short: "CA",  flag: "🇨🇭" },
  { name: "Mira Costa",            short: "MC",  flag: "🇺🇸" },
  { name: "St. Petersburg WP",     short: "SPB", flag: "🇷🇺" },
  { name: "Bristow",               short: "BRS", flag: "🇬🇧" },
];

// GeoJSON from naturalearth/world-110m (hosted by react-simple-maps cdn)
const GEO_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// ISO numeric → alpha-3 for the countries we care about
// (world-atlas uses ISO numeric codes)
const NUMERIC_TO_ALPHA3: Record<string, string> = {
  "840": "USA",
  "170": "COL",
  "756": "CHE",
  "250": "FRA",
  "276": "DEU",
  "380": "ITA",
  "191": "HRV",
  "688": "SRB",
  "203": "CZE",
  "826": "GBR",
  "724": "ESP",
};

const WaterPoloMap = memo(() => (
  // Outer clip: hides Alaska (far left) and trims excess top/bottom
  <div style={{ overflow: "hidden", height: "100%", position: "relative" }}>
    {/*
      Shift the SVG left so the Atlantic fills the container:
      - Natural Earth, scale 220, center [-28, 46] frames Europe + mainland US
      - marginLeft nudges Alaska off the left edge
      - extra width/height ensures no gaps after the shift
    */}
    <div style={{ position: "absolute", inset: 0, marginLeft: "8%", marginTop: "-8%", width: "100%", height: "120%" }}>
      <ComposableMap
        projection="geoNaturalEarth1"
        projectionConfig={{ scale: 220, center: [-28, 46] }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }: { geographies: any[] }) =>
            geographies.map((geo) => {
              const alpha3 = NUMERIC_TO_ALPHA3[String(geo.id)];
              const played = alpha3 ? PLAYED_COUNTRIES.has(alpha3) : false;
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={played ? "rgba(6,182,212,0.75)" : "rgba(255,255,255,0.06)"}
                  stroke="rgba(255,255,255,0.08)"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover:   { outline: "none", fill: played ? "rgba(6,182,212,0.95)" : "rgba(255,255,255,0.1)" },
                    pressed: { outline: "none" },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  </div>
));

WaterPoloMap.displayName = "WaterPoloMap";

export default function WaterPoloCard({ bgImage = "/waterpolo-bg.jpg" }: { bgImage?: string }) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] h-full flex flex-col">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      {/* Highlight shimmer */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.04] to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full p-7">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <span
            className="inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.25em]"
            style={{ borderColor: "rgba(6,182,212,0.3)", background: "rgba(6,182,212,0.1)", color: "#06b6d4" }}
          >
            Water Polo
          </span>
          <span className="font-bold text-white text-2xl leading-none" style={{ fontFamily: "Playfair Display, serif" }}>12</span>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-semibold mb-3 leading-snug text-white" style={{ fontFamily: "Playfair Display, serif" }}>
          12 Years<br />
          <span className="text-fg/70 font-normal text-xl">Semi-Professional</span>
        </h3>

        {/* Description */}
        <p className="text-sm text-fg/85 leading-relaxed mb-5">
          Competed at semi-professional level throughout secondary school and university — water polo taught me everything about commitment, relentless training, and performing under pressure as part of a team. International competitions across 11 countries.
        </p>

        {/* Club pills */}
        <div className="flex flex-wrap gap-2 mb-5">
          {CLUBS.map((c) => (
            <span
              key={c.name}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 text-xs text-fg/80"
            >
              <span>{c.flag}</span>
              <span>{c.name}</span>
            </span>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Map section */}
        <div className="mt-4">
          <p className="text-[9px] uppercase tracking-[0.4em] text-fg/40 mb-2">
            Countries competed in
          </p>
          <div
            className="rounded-2xl overflow-hidden border border-white/[0.07]"
            style={{ background: "rgba(0,0,0,0.5)", height: "140px" }}
          >
            <WaterPoloMap />
          </div>
          {/* Country count */}
          <p className="text-[10px] text-fg/40 mt-1.5 text-right">
            🌍 USA · Colombia · CH · FR · DE · IT · HR · RS · CZ · GB · ES
          </p>
        </div>
      </div>
    </div>
  );
}
