import type { Metadata } from "next";
import { Noto_Sans_KR, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const sansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-kr",
});

const serifKr = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-noto-serif",
});

export const metadata: Metadata = {
  title: "사주편지 — 우리 가족 사주 이야기",
  description: "가족 구성원의 사주팔자를 한눈에 보고, 오행의 균형과 운의 흐름을 풀어드립니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${sansKr.variable} ${serifKr.variable} h-full antialiased`}>
      <body className="min-h-full font-[family-name:var(--font-noto-kr)]">{children}</body>
    </html>
  );
}
