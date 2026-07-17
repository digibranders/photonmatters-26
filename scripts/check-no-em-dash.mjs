#!/usr/bin/env node
// Fails the build if the em-dash character (U+2014) appears anywhere in tracked
// source files. En-dashes (–, U+2013) for numeric ranges are unaffected.
import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";

// Defined by code point (not a literal glyph) so this guard file does not flag
// itself when it scans the tracked source tree.
const EM_DASH = String.fromCharCode(0x2014);

function trackedFiles() {
  const out = execFileSync("git", ["ls-files"], { encoding: "utf8" });
  return out.split("\n").filter(Boolean);
}

const BINARY_EXT = /\.(png|jpe?g|webp|gif|svg|ico|avif|woff2?|ttf|otf|eot|mp4|mov|pdf|lock)$/i;

const offenders = [];

for (const file of trackedFiles()) {
  if (BINARY_EXT.test(file)) continue;
  let content;
  try {
    content = readFileSync(file, "utf8");
  } catch {
    continue;
  }
  if (!content.includes(EM_DASH)) continue;
  const lines = content.split("\n");
  lines.forEach((line, i) => {
    if (line.includes(EM_DASH)) {
      offenders.push(`${file}:${i + 1}: ${line.trim()}`);
    }
  });
}

if (offenders.length > 0) {
  console.error(`\nFound ${offenders.length} em-dash (U+2014) occurrence(s). Replace with a comma, colon, period, or parentheses:\n`);
  for (const line of offenders) console.error(`  ${line}`);
  console.error("");
  process.exit(1);
}

console.log("No em-dashes found.");
