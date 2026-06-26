"use client";

import { useMemo, useState } from "react";
import { geoNaturalEarth1, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import type { Feature, Geometry } from "geojson";
import worldTopo from "@/lib/world-110m.json";
import type { Office } from "@/lib/site";

// ─── Geometry ────────────────────────────────────────────────────────────────
// viewBox space — the SVG scales fluidly to its container width.
const W = 1200;
const H = 560;

// Countries that host an office — rendered with a brighter purple fill.
const OFFICE_COUNTRIES = new Set([
  "United States of America",
  "United Arab Emirates",
  "South Africa",
  "India",
]);

// ─── Eterna palette ──────────────────────────────────────────────────────────
const LAND = "#2c2440";
const LAND_STROKE = "#473b60";
const LAND_HL = "#492f8f"; // office countries
const LAND_HL_STROKE = "#7e49f2";
const GOLD = "#f2cb07";

type WorldFeature = Feature<Geometry, { name: string }>;

export function GlobalPresenceMap({ offices }: { offices: Office[] }) {
  const [hover, setHover] = useState<Office | null>(null);

  const { features, project, path } = useMemo(() => {
    const topo = worldTopo as unknown as { objects: { countries: unknown } };
    const toFeatures = feature as unknown as (
      t: unknown,
      o: unknown,
    ) => { features: WorldFeature[] };
    const fc = toFeatures(topo, topo.objects.countries);

    const project = geoNaturalEarth1();
    // Zoom to the band that holds every office (Americas → Atlantic → Africa →
    // India), cropping the empty Pacific, East Asia and polar caps for a
    // cleaner, tighter map. Markers stay correct — same projection.
    const FOCUS = {
      type: "Polygon",
      coordinates: [
        [
          [-122, -40],
          [92, -40],
          [92, 56],
          [-122, 56],
          [-122, -40],
        ],
      ],
    };
    const fit = project.fitExtent as unknown as (
      extent: [[number, number], [number, number]],
      object: unknown,
    ) => void;
    fit(
      [
        [28, 18],
        [W - 28, H - 18],
      ],
      FOCUS,
    );

    return { features: fc.features, project, path: geoPath(project) };
  }, []);

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="h-auto w-full"
        role="img"
        aria-label="Map of PhotonMatters offices in Dubai, Ahmedabad, Johannesburg and New York"
      >
        <defs>
          <filter id="pm-pin-glow" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Land masses */}
        <g>
          {features.map((geo, i) => {
            const hl = OFFICE_COUNTRIES.has(geo.properties.name);
            const d = path(geo);
            if (!d) return null;
            return (
              <path
                key={i}
                d={d}
                fill={hl ? LAND_HL : LAND}
                stroke={hl ? LAND_HL_STROKE : LAND_STROKE}
                strokeWidth={hl ? 0.7 : 0.4}
              />
            );
          })}
        </g>

        {/* Office markers */}
        {offices.map((o, i) => {
          const p = project(o.coordinates);
          if (!p) return null;
          const [x, y] = p;
          const active = hover?.city === o.city;
          return (
            <g
              key={o.city}
              transform={`translate(${x}, ${y})`}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => setHover(o)}
              onMouseLeave={() => setHover(null)}
            >
              {/* Pulse rings */}
              <circle
                r={20}
                fill="none"
                stroke={GOLD}
                strokeWidth={0.7}
                className="gp-svg-pulse"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
              <circle
                r={12}
                fill="none"
                stroke={GOLD}
                strokeWidth={0.9}
                className="gp-svg-pulse"
                style={{ animationDelay: `${i * 0.6 + 0.5}s`, animationDuration: "2.1s" }}
              />
              {/* Static halo + core dot */}
              <circle r={8} fill={`${GOLD}22`} stroke={GOLD} strokeWidth={0.7} opacity={0.85} />
              <circle
                r={active ? 5.5 : 4}
                fill={GOLD}
                filter="url(#pm-pin-glow)"
                style={{ transition: "r 0.15s ease" }}
              />
            </g>
          );
        })}
      </svg>

      {/* Tooltip — positioned over the hovered pin (percentages track the fluid SVG) */}
      {hover &&
        (() => {
          const p = project(hover.coordinates);
          if (!p) return null;
          const [x, y] = p;
          return (
            <div
              className="pointer-events-none absolute z-20 w-[230px] -translate-x-1/2 -translate-y-full rounded-2xl border border-white/10 bg-[#241c33]/95 p-4 shadow-[0_24px_60px_rgba(0,0,0,0.55)] backdrop-blur-md"
              style={{ left: `${(x / W) * 100}%`, top: `calc(${(y / H) * 100}% - 18px)` }}
            >
              <div className="flex items-center gap-2">
                <span className="text-h3 font-bold leading-none text-white">{hover.city}</span>
                {hover.badge ? (
                  <span className="rounded-full bg-[color:var(--amber-500)]/15 px-2 py-0.5 text-label font-bold uppercase tracking-[0.1em] text-[color:var(--amber-500)]">
                    {hover.badge}
                  </span>
                ) : null}
              </div>
              <p className="mt-1 text-label font-semibold uppercase tracking-[0.12em] text-[color:var(--amber-500)]">
                {hover.country}
              </p>
              <p className="mt-2 text-caption leading-relaxed text-white/55">{hover.address}</p>
            </div>
          );
        })()}
    </div>
  );
}
