import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { resolve } from "path";

export async function GET() {
  try {
    const root = process.cwd();
    const enriched = JSON.parse(readFileSync(resolve(root, "data/enriched-groups.json"), "utf-8"));
    const results = JSON.parse(readFileSync(resolve(root, "data/saju-results.json"), "utf-8"));

    // Merge saju results into each member
    const groups = enriched.groups.map((g: any) => ({
      ...g,
      members: g.members.map((m: any) => ({
        ...m,
        saju: results[m.cacheKey] || null,
      })),
    }));

    return NextResponse.json({ groups });
  } catch (e) {
    return NextResponse.json({ error: "데이터를 불러올 수 없습니다." }, { status: 500 });
  }
}
