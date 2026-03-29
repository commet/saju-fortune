/**
 * Pre-fetch saju data for all members in clients.json
 * Saves results to data/saju-results.json
 * Run: node scripts/fetch-saju.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const clients = JSON.parse(readFileSync(resolve(ROOT, "data/clients.json"), "utf-8"));
const RESULTS_PATH = resolve(ROOT, "data/saju-results.json");

// Load existing results to avoid re-fetching
let existing = {};
if (existsSync(RESULTS_PATH)) {
  existing = JSON.parse(readFileSync(RESULTS_PATH, "utf-8"));
}

function timeToSigin(timeStr) {
  if (!timeStr) return null;
  const [h, m] = timeStr.split(":").map(Number);
  const t = h * 60 + m;
  if (t >= 1410 || t < 90) return "00";
  if (t < 210) return "02";
  if (t < 330) return "04";
  if (t < 450) return "06";
  if (t < 570) return "08";
  if (t < 690) return "10";
  if (t < 810) return "12";
  if (t < 930) return "14";
  if (t < 1050) return "16";
  if (t < 1170) return "18";
  if (t < 1290) return "20";
  return "22";
}

function resolveBirthTime(member) {
  if (member.birthTime) return timeToSigin(member.birthTime);
  if (member.birthTimeRange) {
    const [a, b] = member.birthTimeRange;
    const [ah, am] = a.split(":").map(Number);
    const [bh, bm] = b.split(":").map(Number);
    const mid = ((ah * 60 + am) + (bh * 60 + bm)) / 2;
    const midH = String(Math.floor(mid / 60)).padStart(2, "0");
    const midM = String(Math.round(mid % 60)).padStart(2, "0");
    return timeToSigin(`${midH}:${midM}`);
  }
  // Parse note hints
  const note = member.birthTimeNote || "";
  if (/아침|오전|08|09|morning/i.test(note)) return "08";
  if (/오후|14|15|afternoon/i.test(note)) return "14";
  if (/저녁|18|19|evening/i.test(note)) return "18";
  // No time info — use noon as default
  return "12";
}

function formatBirthday(dateStr) {
  return dateStr.replace(/-/g, "");
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchOne(member) {
  const birthday = formatBirthday(member.birthDate);
  const time = resolveBirthTime(member);
  const birthdayType = member.calendar === "음력" ? "LUNAR" : "SOLAR";
  const gender = member.gender === "M" ? "MALE" : "FEMALE";
  const key = `${birthday}_${time}_${birthdayType}_${gender}`;

  if (existing[key]) {
    console.log(`  ✓ cached: ${member.name}`);
    return { key, data: existing[key], time, birthdayType };
  }

  console.log(`  → fetching: ${member.name} (${birthday}, ${time}, ${birthdayType}, ${gender})`);
  const res = await fetch("https://api.aifortunedoctor.com/manse", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ birthday, time, birthdayType, gender }),
  });

  if (!res.ok) {
    console.error(`  ✗ failed: ${member.name} (${res.status})`);
    return { key, data: null, time, birthdayType };
  }

  const json = await res.json();
  return { key, data: json.data, time, birthdayType };
}

async function main() {
  const results = { ...existing };
  const enrichedGroups = [];

  for (const group of clients.groups) {
    console.log(`\nGroup ${group.id}:`);
    const enrichedMembers = [];

    for (const member of group.members) {
      const { key, data, time, birthdayType } = await fetchOne(member);
      if (data) {
        results[key] = data;
      }
      enrichedMembers.push({
        ...member,
        apiTime: time,
        apiBirthdayType: birthdayType,
        cacheKey: key,
        hasSaju: !!data,
      });

      // Delay between API calls
      if (!existing[key]) await sleep(1500);
    }

    enrichedGroups.push({
      ...group,
      members: enrichedMembers,
    });
  }

  // Save raw API results
  writeFileSync(RESULTS_PATH, JSON.stringify(results, null, 2), "utf-8");
  console.log(`\n✓ Saved ${Object.keys(results).length} results to data/saju-results.json`);

  // Save enriched groups
  writeFileSync(
    resolve(ROOT, "data/enriched-groups.json"),
    JSON.stringify({ groups: enrichedGroups }, null, 2),
    "utf-8"
  );
  console.log("✓ Saved enriched-groups.json");
}

main().catch(console.error);
