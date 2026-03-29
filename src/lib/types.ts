export interface SajuElement {
  한자: string;
  한글: string;
  십성: string;
  음양: string;
  오행: string;
}

export interface DaeunCycle {
  대운_시작_전통나이: number;
  천간: SajuElement;
  지지: SajuElement;
}

export interface SeunYear {
  연도: number;
  천간: SajuElement;
  지지: SajuElement;
}

export interface SajuResult {
  연간: SajuElement;
  연지: SajuElement;
  월간: SajuElement;
  월지: SajuElement;
  일간: SajuElement;
  일지: SajuElement;
  시간: SajuElement;
  시지: SajuElement;
  나이: {
    현재_날짜: string;
    만_나이: number;
    전통_나이: number;
  };
  대운_현재_다음: DaeunCycle[];
  세운_현재_5년: SeunYear[];
  오행_갯수: {
    목: number;
    화: number;
    토: number;
    금: number;
    수: number;
  };
}

export interface SajuApiResponse {
  statusCode: number;
  message: string;
  data: SajuResult;
}

export interface FamilyMember {
  id: string;
  name: string;
  birthday: string;
  time: string;
  birthdayType: "SOLAR" | "LUNAR";
  gender: "MALE" | "FEMALE";
  result?: SajuResult;
}

export type Ohaeng = "목" | "화" | "토" | "금" | "수";

// Muted, traditional color palette for 오행
export const OHAENG_STYLE: Record<
  Ohaeng,
  {
    label: string;
    hanja: string;
    color: string;      // text color
    bg: string;          // background
    border: string;      // border
    dot: string;         // solid bg for dots/badges
  }
> = {
  목: { label: "나무", hanja: "木", color: "text-[#2d6a4f]", bg: "bg-[#f0f7f0]", border: "border-[#b7d7b0]", dot: "bg-[#52796f]" },
  화: { label: "불",   hanja: "火", color: "text-[#9e2a2b]", bg: "bg-[#fdf0ef]", border: "border-[#e5b4b3]", dot: "bg-[#ae3f3d]" },
  토: { label: "흙",   hanja: "土", color: "text-[#8b6914]", bg: "bg-[#fdf6e3]", border: "border-[#dcc88c]", dot: "bg-[#a67c28]" },
  금: { label: "쇠",   hanja: "金", color: "text-[#52525b]", bg: "bg-[#f4f4f5]", border: "border-[#c4c4cc]", dot: "bg-[#71717a]" },
  수: { label: "물",   hanja: "水", color: "text-[#1e3a5f]", bg: "bg-[#eef3fa]", border: "border-[#a3bfd9]", dot: "bg-[#2d5f8a]" },
};
