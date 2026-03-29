import { NextRequest, NextResponse } from "next/server";
import { SajuApiResponse } from "@/lib/types";

// In-memory cache to minimize API calls
const cache = new Map<string, { data: SajuApiResponse; timestamp: number }>();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { birthday, time, birthdayType, gender } = body;

  if (!birthday || !time || !birthdayType || !gender) {
    return NextResponse.json({ error: "모든 필드를 입력해주세요." }, { status: 400 });
  }

  const cacheKey = `${birthday}_${time}_${birthdayType}_${gender}`;
  const cached = cache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return NextResponse.json(cached.data);
  }

  try {
    const res = await fetch("https://api.aifortunedoctor.com/manse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ birthday, time, birthdayType, gender }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "사주 API 요청에 실패했습니다." }, { status: res.status });
    }

    const data: SajuApiResponse = await res.json();
    cache.set(cacheKey, { data, timestamp: Date.now() });
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "사주 API 서버에 연결할 수 없습니다." }, { status: 502 });
  }
}
