#!/usr/bin/env node
// Flags opportunities not re-verified within STALE_MONTHS (default 6).
// Reads the DATA array straight out of index.html, so there's one source of truth.
// Exit codes: 0 = all fresh, 1 = some stale (report written), 2 = couldn't parse.

import { readFileSync, writeFileSync } from "node:fs";

const STALE_MONTHS = Number(process.env.STALE_MONTHS || 6);
const html = readFileSync("index.html", "utf8");

const start = html.indexOf("const DATA = [");
const end = start === -1 ? -1 : html.indexOf("];", start);
if (start === -1 || end === -1) {
  console.error("Could not locate the DATA array in index.html.");
  process.exit(2);
}
const arrayText = html.slice(start + "const DATA = ".length, end + 1); // "[ ... ]"

let data;
try {
  // The array is a JS object literal (unquoted keys), so evaluate it in a sandboxed function.
  data = Function('"use strict"; return (' + arrayText + ");")();
} catch (e) {
  console.error("Failed to parse the DATA array:", e.message);
  process.exit(2);
}

const now = new Date();
const cutoff = new Date(now);
cutoff.setMonth(cutoff.getMonth() - STALE_MONTHS);

const stale = [];
for (const o of data) {
  const v = o.verified ? new Date(o.verified) : null;
  if (!v || isNaN(v.getTime()) || v < cutoff) {
    stale.push({ name: o.name, verified: o.verified || "(none)" });
  }
}

if (stale.length === 0) {
  console.log(`All ${data.length} entries verified within ${STALE_MONTHS} months.`);
  process.exit(0);
}

const report = [
  `## ${stale.length} of ${data.length} entries need re-verification`,
  ``,
  `These haven't been confirmed against their official page in the last **${STALE_MONTHS} months** (checked ${now.toISOString().slice(0, 10)}).`,
  `Re-check each one, then bump its \`verified\` date in \`index.html\`.`,
  ``,
  `| Opportunity | Last verified |`,
  `| --- | --- |`,
  ...stale.map((s) => `| ${s.name} | ${s.verified} |`),
  ``,
].join("\n");

writeFileSync("staleness-report.md", report);
console.log(report);
process.exit(1);
