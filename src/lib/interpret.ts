import { SajuResult, Ohaeng } from "./types";

/* ────────── 일간 Day Master ────────── */
const DM: Record<string, {
  title: string; nature: string; symbol: string;
  personality: string; strengths: string; challenges: string; career: string; relationship: string;
}> = {
  갑: {
    title: "갑목(甲木)", nature: "양목", symbol: "큰 나무, 거목",
    personality: "큰 나무처럼 곧고 우직한 성격입니다. 한번 결심하면 잘 흔들리지 않고, 정의감이 강하며 리더십이 있습니다. 주변에서 믿음직하다는 소리를 자주 듣는 타입이에요. 성장하려는 본능이 강해서, 항상 위를 향해 뻗어가려는 에너지가 있습니다.",
    strengths: "추진력이 좋고, 큰 그림을 그릴 수 있습니다. 사람들이 자연스럽게 따르는 리더 기질이 있어요.",
    challenges: "고집이 세서 한번 정하면 방향을 바꾸기 어렵습니다. 융통성이 부족하다는 얘기를 들을 수 있어요. 때로는 주변 의견도 들어볼 필요가 있습니다.",
    career: "기획, 경영, 교육, 법조계 등 방향을 제시하고 이끄는 역할이 잘 맞습니다.",
    relationship: "듬직하고 신뢰감 있는 파트너입니다. 다만 자기 방식이 강해서, 상대의 의견을 존중하는 연습이 필요해요.",
  },
  을: {
    title: "을목(乙木)", nature: "음목", symbol: "풀, 꽃, 덩굴",
    personality: "풀이나 꽃처럼 유연하고 적응력이 뛰어납니다. 바람이 불면 흔들리지만 부러지지 않는, 외유내강의 전형적인 타입이에요. 사교성이 좋고 눈치가 빨라서 어디서든 잘 어울립니다. 예술적 감각도 타고난 편입니다.",
    strengths: "어떤 환경에서든 적응을 잘 합니다. 사람들과의 관계를 부드럽게 풀어가는 능력이 탁월해요.",
    challenges: "결정을 내리는 데 시간이 오래 걸릴 수 있습니다. 너무 남의 눈치를 보다가 정작 자기 의견을 놓치는 경우가 있어요.",
    career: "디자인, 마케팅, 상담, 교육, 서비스업 등 사람과 소통하는 분야가 잘 맞습니다.",
    relationship: "섬세하고 배려가 깊은 파트너입니다. 다만 속마음을 잘 드러내지 않아서, 솔직한 대화가 중요해요.",
  },
  병: {
    title: "병화(丙火)", nature: "양화", symbol: "태양",
    personality: "태양 같은 사람입니다. 밝고 열정적이며, 있는 곳이 환해지는 에너지가 있어요. 표현력이 풍부하고 낙천적이라 주변에 사람이 모이는 타입입니다. 한마디로, 분위기 메이커예요.",
    strengths: "열정과 추진력이 넘칩니다. 새로운 걸 시작하는 능력이 뛰어나고, 사람들에게 영감을 줄 수 있어요.",
    challenges: "불처럼 뜨겁지만 지속력은 약할 수 있습니다. 시작은 화려한데 마무리가 약해지기 쉬워요. 꾸준함을 키우는 것이 핵심입니다.",
    career: "방송, 엔터, 영업, 창업, 교육 등 에너지를 발산하는 분야가 잘 맞습니다.",
    relationship: "함께 있으면 즐겁고 활기찬 파트너입니다. 다만 관심이 분산되기 쉬워서, 한 사람에게 집중하는 노력이 필요해요.",
  },
  정: {
    title: "정화(丁火)", nature: "음화", symbol: "촛불, 달빛",
    personality: "촛불이나 달빛처럼 은은하고 따뜻합니다. 겉으로는 조용하지만 내면에 깊은 열정을 품고 있어요. 직관력이 뛰어나고, 사람의 마음을 잘 읽습니다. 섬세하고 감성이 풍부한 타입입니다.",
    strengths: "깊이 있는 통찰력과 직관을 가지고 있습니다. 한 분야에 깊이 파고드는 집중력이 좋아요.",
    challenges: "감정 기복이 있을 수 있고, 너무 깊이 생각해서 걱정이 많아질 수 있습니다. 가끔은 단순하게 생각하는 것도 도움이 됩니다.",
    career: "연구, 예술, 심리상담, 의료, 콘텐츠 제작 등 깊이와 감성이 필요한 분야가 잘 맞습니다.",
    relationship: "세심하고 헌신적인 파트너입니다. 감정적으로 깊은 연결을 중시하며, 진심 어린 소통이 관계의 열쇠예요.",
  },
  무: {
    title: "무토(戊土)", nature: "양토", symbol: "큰 산, 대지",
    personality: "큰 산이나 넓은 대지 같은 사람입니다. 듬직하고 포용력이 크며, 주변에 안정감을 줍니다. '이 사람한테 맡기면 안심이다'는 소리를 듣는 타입이에요. 책임감이 강하고 신뢰를 중시합니다.",
    strengths: "안정적이고 믿음직합니다. 큰 조직이나 프로젝트를 관리하는 능력이 뛰어나요.",
    challenges: "변화를 꺼리는 편이라, 새로운 시도가 늦어질 수 있습니다. 보수적인 태도가 기회를 놓치게 할 수 있어요.",
    career: "경영, 부동산, 공무원, 금융, 관리직 등 안정적이고 책임 있는 위치가 잘 맞습니다.",
    relationship: "든든하고 변하지 않는 파트너입니다. 다만 표현이 서툴 수 있어서, 마음을 말로 전하는 연습이 필요해요.",
  },
  기: {
    title: "기토(己土)", nature: "음토", symbol: "논밭, 정원",
    personality: "논밭이나 정원처럼 만물을 키워내는 성격입니다. 겸손하고 실용적이며, 내적으로 풍요로운 사람이에요. 겉으로는 수수하지만, 속은 꼼꼼하고 단단합니다. 누군가를 돌보고 지원하는 데서 보람을 느끼는 타입입니다.",
    strengths: "실용적이고 꼼꼼합니다. 디테일을 잘 챙기며, 사람을 키우고 지원하는 능력이 좋아요.",
    challenges: "걱정이 많고 소극적일 수 있습니다. 자기 확신이 부족해서 기회를 앞에 두고 망설이기도 해요.",
    career: "교육, 농업, 요식업, 회계, 비서직, HR 등 사람을 돌보거나 디테일이 필요한 분야가 잘 맞습니다.",
    relationship: "헌신적이고 세심한 파트너입니다. 자기 자신도 돌보는 걸 잊지 않는 게 중요해요.",
  },
  경: {
    title: "경금(庚金)", nature: "양금", symbol: "바위, 쇠, 칼",
    personality: "바위나 쇠처럼 강하고 결단력 있는 사람입니다. 의리가 있고 행동력이 뛰어나며, 불의를 보면 참지 못하는 성격이에요. 카리스마가 있어서 사람들이 따르지만, 한편으로는 부딪히는 것도 두려워하지 않습니다.",
    strengths: "결단력과 실행력이 최고입니다. 어려운 상황에서 오히려 빛을 발하는 타입이에요.",
    challenges: "너무 강하게 밀어붙이면 주변이 힘들어할 수 있습니다. 부드러움과 양보를 배우면 더 큰 힘을 발휘할 수 있어요.",
    career: "군인, 법조, 외과, 엔지니어링, 금융, 스포츠 등 강한 추진력이 필요한 분야가 잘 맞습니다.",
    relationship: "의리 있고 든든한 파트너입니다. 다만 강한 성격이 갈등을 만들 수 있어서, 부드러운 대화가 필요해요.",
  },
  신: {
    title: "신금(辛金)", nature: "음금", symbol: "보석, 귀금속, 바늘",
    personality: "보석처럼 섬세하고 예리한 사람입니다. 완벽주의 성향이 있고, 미적 감각과 분석력이 뛰어납니다. 자존심이 강하며, 품격을 중시해요. 겉은 차가워 보일 수 있지만, 가까운 사람에게는 따뜻한 면이 있습니다.",
    strengths: "디테일에 강하고, 높은 기준을 유지합니다. 감각과 분석을 동시에 쓸 수 있는 드문 타입이에요.",
    challenges: "예민하고 까다로운 면이 있어서, 스스로도 피곤해질 수 있습니다. 완벽하지 않아도 괜찮다는 여유가 필요해요.",
    career: "디자인, 보석, 의료, 법률, IT, 금융 분석 등 정밀함이 요구되는 분야가 잘 맞습니다.",
    relationship: "깊고 진심 어린 관계를 원합니다. 신뢰가 쌓이면 한없이 헌신하는 타입이에요.",
  },
  임: {
    title: "임수(壬水)", nature: "양수", symbol: "바다, 큰 강",
    personality: "바다나 큰 강처럼 넓고 깊은 사람입니다. 생각이 깊고 상황 판단이 빠르며, 겉보다 속이 훨씬 복잡한 타입이에요. 겉으로는 덤덤해 보여도 속에서는 계산이 계속 돌아가고 있습니다. 지혜롭고 창의적이며, 자유로운 영혼의 소유자입니다.",
    strengths: "머리가 빠르고 현실 감각이 좋습니다. 전략적 사고와 판단 능력이 뛰어나요.",
    challenges: "생각이 너무 많아서 행동이 늦어질 수 있습니다. 또한 감정을 너무 깊이 묻어두면 스트레스가 쌓여요.",
    career: "기획, 전략, 사업, 컨설팅, IT, 연구 등 머리로 하는 일이 잘 맞습니다.",
    relationship: "깊이 있는 대화를 좋아하며, 지적인 교감이 중요한 파트너입니다.",
  },
  계: {
    title: "계수(癸水)", nature: "음수", symbol: "빗물, 이슬, 안개",
    personality: "빗물이나 이슬처럼 조용하고 깊이 있는 사람입니다. 직관력과 영감이 풍부하며, 남들이 보지 못하는 것을 느끼는 능력이 있어요. 겉은 조용하지만, 내면에는 깊은 세계가 있습니다. 학문적 소양이 깊고 인내심이 강합니다.",
    strengths: "직관과 통찰력이 뛰어납니다. 조용히 관찰하다가 핵심을 짚어내는 능력이 있어요.",
    challenges: "내성적이라 자기 표현이 서투를 수 있습니다. 세상과 소통하는 방법을 더 넓히면 좋겠어요.",
    career: "연구, 학문, 예술, 심리, 종교, 철학, 데이터 분석 등 깊이가 필요한 분야가 잘 맞습니다.",
    relationship: "말보다 행동으로 사랑을 표현합니다. 이해받는 느낌이 중요하며, 깊은 정서적 유대를 원해요.",
  },
};

/* ────────── 십성 ────────── */
const SIPSUNG: Record<string, { role: string; short: string }> = {
  비견: { role: "나와 같은 기운", short: "독립심과 경쟁심이 강합니다. 자기 영역을 지키려는 성향이 있어요." },
  겁재: { role: "나를 돕는 기운", short: "사교적이고 추진력이 있으나, 재물의 변동이 클 수 있습니다." },
  식신: { role: "내가 만들어내는 기운", short: "식복이 있고 표현력이 뛰어납니다. 여유롭고 낙천적인 에너지예요." },
  상관: { role: "내가 표현하는 기운", short: "재능이 뛰어나고 언변이 좋습니다. 기존 질서에 도전하는 성향이 있어요." },
  편재: { role: "활동적 재물", short: "사업 수완이 있고, 큰 재물을 다룰 기회가 있습니다." },
  정재: { role: "안정적 재물", short: "꾸준하고 성실하게 재물을 모으는 타입입니다." },
  편관: { role: "나를 제어하는 힘", short: "권위와 통솔력이 있습니다. 압박 속에서 성장하는 타입이에요." },
  정관: { role: "바른 규율", short: "명예와 질서를 중시합니다. 조직 내에서 인정받기 쉬워요." },
  편인: { role: "비정통 학문", short: "독특한 사고방식과 직관력이 있습니다. 특수 분야에서 빛을 발해요." },
  정인: { role: "바른 학문", short: "학문적 재능이 있고, 어른의 도움을 잘 받습니다." },
};

/* ────────── helpers ────────── */
const OH_NAME: Record<Ohaeng, string> = { 목: "나무(木)", 화: "불(火)", 토: "흙(土)", 금: "쇠(金)", 수: "물(水)" };
const OH_TRAIT: Record<Ohaeng, string> = {
  목: "성장, 추진력, 인자함",
  화: "열정, 표현력, 예의",
  토: "안정, 신뢰, 포용력",
  금: "결단, 의리, 실행력",
  수: "지혜, 유연함, 소통력",
};

function ohaengOverview(counts: Record<Ohaeng, number>, dayMasterOh: Ohaeng): string {
  const strong = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v >= 3);
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0);
  const weak = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 1);

  const parts: string[] = [];

  if (strong.length > 0) {
    for (const [k] of strong) {
      parts.push(`${OH_NAME[k]}의 기운이 ${counts[k]}개로 매우 강합니다. ${OH_TRAIT[k]}에 해당하는 기질이 두드러지며, 일상에서도 이 기운의 영향을 많이 받습니다.`);
    }
  }

  if (missing.length > 0) {
    for (const [k] of missing) {
      parts.push(`${OH_NAME[k]}의 기운이 사주에 없습니다. 이는 ${OH_TRAIT[k]}에 해당하는 에너지가 부족하다는 뜻이에요. 하지만 부족한 기운은 직업, 취미, 인간관계를 통해 충분히 보완할 수 있습니다.`);
    }
  }

  if (missing.length === 0 && strong.length === 0) {
    parts.push("오행이 비교적 고르게 분포되어 있어서 균형 잡힌 사주입니다. 어느 한쪽으로 치우치지 않고 두루 잘 해낼 수 있는 구조예요.");
  } else if (weak.length > 0 && missing.length === 0) {
    const names = weak.map(([k]) => OH_NAME[k]).join(", ");
    parts.push(`${names}의 기운이 약한 편이지만, 다른 오행과의 조화로 충분히 보완됩니다.`);
  }

  return parts.join("\n\n");
}

function lifeDirection(counts: Record<Ohaeng, number>, dm: string): string {
  const strong = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v >= 3).map(([k]) => k);
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);

  const parts: string[] = [];

  if (missing.includes("화") || missing.includes("목")) {
    parts.push("추진력이나 성장성에 해당하는 기운이 부족해서, 시작이 신중하고 결정까지 시간이 걸리는 편입니다. 대신 실수는 적은 타입이에요. 빠르게 성공하기보다는, 확실하게 올라가는 구조입니다.");
  }

  if (strong.includes("토")) {
    parts.push("토(土)의 기운이 강해서 현실 감각과 책임감이 뛰어납니다. 큰 일을 맡을 수 있는 그릇이 있지만, 그만큼 압박감도 함께 옵니다. 편하게 사는 구조라기보다는, 성취하며 사는 타입이에요.");
  }

  if (strong.includes("금")) {
    parts.push("금(金)의 기운이 강해서 판단력과 실행력이 좋습니다. 논리적이고 현실적인 접근이 장점이에요.");
  }

  if (strong.includes("수")) {
    parts.push("수(水)의 기운이 강해서 지혜롭고 적응력이 뛰어납니다. 변화하는 환경에서 오히려 능력을 발휘해요.");
  }

  if (strong.includes("목")) {
    parts.push("목(木)의 기운이 강해서 성장 지향적이고 진취적입니다. 항상 앞으로 나아가려는 에너지가 있어요.");
  }

  if (strong.includes("화")) {
    parts.push("화(火)의 기운이 강해서 열정과 표현력이 넘칩니다. 사람들에게 에너지를 주는 존재예요.");
  }

  if (parts.length === 0) {
    parts.push("오행이 비교적 균형을 이루고 있어서 다방면으로 잘 해낼 수 있는 구조입니다. 어느 한 분야에 극단적으로 치우치지 않아, 유연하게 인생을 설계할 수 있어요.");
  }

  return parts.join("\n\n");
}

function daeunText(data: SajuResult): string {
  const d = data.대운_현재_다음;
  if (!d || d.length === 0) return "";

  const cur = d[0];
  const parts: string[] = [];
  parts.push(
    `현재는 ${cur.천간.한자}${cur.지지.한자}(${cur.천간.한글}${cur.지지.한글}) 대운이 흐르고 있습니다. ` +
    `${cur.대운_시작_전통나이}세부터 시작된 이 대운에서는 ${cur.천간.오행}(${cur.천간.십성})과 ${cur.지지.오행}(${cur.지지.십성})의 기운이 인생 전반에 영향을 미칩니다.`
  );

  if (d[1]) {
    parts.push(
      `다음 대운은 ${d[1].천간.한자}${d[1].지지.한자}(${d[1].천간.한글}${d[1].지지.한글})으로, ` +
      `${d[1].대운_시작_전통나이}세부터 새로운 흐름이 시작됩니다.`
    );
  }

  return parts.join(" ");
}

function seunText(data: SajuResult): string {
  const s = data.세운_현재_5년;
  if (!s || s.length === 0) return "";
  const y = s[0];
  return (
    `${y.연도}년은 ${y.천간.한자}${y.지지.한자}(${y.천간.한글}${y.지지.한글})년입니다. ` +
    `${y.천간.오행}(${y.천간.십성})과 ${y.지지.오행}(${y.지지.십성})의 기운이 올해를 좌우합니다.`
  );
}

/* ────────── 메인 생성 ────────── */
export interface FullReading {
  dayMaster: typeof DM[string];
  overview: string;
  ohaengAnalysis: string;
  lifeDir: string;
  sipsung: { position: string; name: string; info: typeof SIPSUNG[string] }[];
  daeunReading: string;
  seunReading: string;
}

export function generateFullReading(data: SajuResult): FullReading {
  const dm = DM[data.일간.한글] || DM["갑"];
  const oh = data.일간.오행 as Ohaeng;

  // 종합 overview (rich text)
  const sipsungList = [
    { position: "연간", name: data.연간.십성, info: SIPSUNG[data.연간.십성] },
    { position: "연지", name: data.연지.십성, info: SIPSUNG[data.연지.십성] },
    { position: "월간", name: data.월간.십성, info: SIPSUNG[data.월간.십성] },
    { position: "월지", name: data.월지.십성, info: SIPSUNG[data.월지.십성] },
    { position: "시간", name: data.시간.십성, info: SIPSUNG[data.시간.십성] },
    { position: "시지", name: data.시지.십성, info: SIPSUNG[data.시지.십성] },
  ].filter((s) => s.info);

  const strong = (Object.entries(data.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v >= 3).map(([k]) => k);
  const missing = (Object.entries(data.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);

  let overview = `일간이 ${dm.title}인 사주입니다.\n${dm.symbol}에 비유되는 이 기운은, ${dm.personality}\n\n`;

  overview += `이 사주의 오행 구성을 보면, `;
  if (strong.length > 0) {
    overview += `${strong.map((k) => OH_NAME[k]).join("과 ")}의 기운이 특히 강하고`;
  }
  if (missing.length > 0) {
    overview += `${strong.length > 0 ? ", " : ""}${missing.map((k) => OH_NAME[k]).join("과 ")}의 기운은 사주에 없습니다`;
  }
  if (strong.length === 0 && missing.length === 0) {
    overview += "비교적 균형 잡힌 구조";
  }
  overview += ".\n\n";

  overview += `핵심 성향을 정리하면:\n`;
  overview += `• 강점: ${dm.strengths}\n`;
  overview += `• 주의점: ${dm.challenges}\n`;
  overview += `• 맞는 방향: ${dm.career}\n`;
  overview += `• 관계 스타일: ${dm.relationship}`;

  return {
    dayMaster: dm,
    overview,
    ohaengAnalysis: ohaengOverview(data.오행_갯수 as Record<Ohaeng, number>, oh),
    lifeDir: lifeDirection(data.오행_갯수 as Record<Ohaeng, number>, data.일간.한글),
    sipsung: sipsungList,
    daeunReading: daeunText(data),
    seunReading: seunText(data),
  };
}

/* ────────── 궁합 ────────── */
export interface CompatResult {
  summary: string;
  details: { label: string; content: string }[];
  score: number; // 0-100 rough indicator
}

const CHEONGAN_HAP: Record<string, string> = {
  갑기: "갑기합토 — 따뜻한 대지의 결합으로, 서로 부족한 부분을 자연스럽게 채워주는 좋은 궁합입니다.",
  을경: "을경합금 — 강함과 부드러움이 만나 조화를 이루며, 서로를 갈고닦는 관계입니다.",
  병신: "병신합수 — 태양과 보석의 만남으로, 화려하면서도 깊이 있는 관계를 만들 수 있습니다.",
  정임: "정임합목 — 촛불과 바다의 만남으로, 감성적이고 서로에게 영감을 주는 관계입니다.",
  무계: "무계합화 — 대지와 이슬의 만남으로, 안정적이면서도 따뜻한 관계를 만듭니다.",
};

const OHAENG_SANGSAENG: [Ohaeng, Ohaeng][] = [["목", "화"], ["화", "토"], ["토", "금"], ["금", "수"], ["수", "목"]];
const OHAENG_SANGGEUK: [Ohaeng, Ohaeng][] = [["목", "토"], ["토", "수"], ["수", "화"], ["화", "금"], ["금", "목"]];

export function analyzeCompatibility(a: SajuResult, b: SajuResult, nameA: string, nameB: string): CompatResult {
  const details: { label: string; content: string }[] = [];
  let score = 60; // base

  // 1. 일간 궁합 (천간합 체크)
  const pair1 = a.일간.한글 + b.일간.한글;
  const pair2 = b.일간.한글 + a.일간.한글;
  const hap = CHEONGAN_HAP[pair1] || CHEONGAN_HAP[pair2];

  if (hap) {
    details.push({ label: "천간합 (天干合)", content: `${nameA}의 일간 ${a.일간.한자}(${a.일간.한글})과 ${nameB}의 일간 ${b.일간.한자}(${b.일간.한글})이 천간합을 이룹니다. ${hap} 이것은 가장 기본적인 궁합에서 매우 좋은 신호입니다.` });
    score += 15;
  } else {
    details.push({ label: "천간 관계", content: `${nameA}(${a.일간.한자})과 ${nameB}(${b.일간.한자})의 일간은 천간합은 아니지만, 다른 요소에서 궁합을 살펴볼 수 있습니다.` });
  }

  // 2. 오행 상생/상극
  const aOh = a.일간.오행 as Ohaeng;
  const bOh = b.일간.오행 as Ohaeng;

  const isSangsaeng = OHAENG_SANGSAENG.some(([x, y]) => (x === aOh && y === bOh) || (x === bOh && y === aOh));
  const isSanggeuk = OHAENG_SANGGEUK.some(([x, y]) => (x === aOh && y === bOh) || (x === bOh && y === aOh));

  if (isSangsaeng) {
    details.push({ label: "오행 상생 (相生)", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 서로 상생(도움을 주는) 관계입니다. 함께 있으면 서로의 기운이 살아나는 좋은 조합이에요.` });
    score += 10;
  } else if (isSanggeuk) {
    details.push({ label: "오행 상극 (相剋)", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 상극(부딪히는) 관계입니다. 갈등이 생기기 쉽지만, 서로 다른 점이 오히려 자극이 되어 성장할 수 있는 관계이기도 합니다.` });
    score -= 5;
  } else if (aOh === bOh) {
    details.push({ label: "오행 비화 (比和)", content: `둘 다 ${OH_NAME[aOh]}으로 같은 오행입니다. 서로를 깊이 이해할 수 있지만, 비슷한 약점도 공유하게 됩니다. 장단점이 뚜렷한 조합이에요.` });
    score += 5;
  } else {
    details.push({ label: "오행 관계", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 직접적인 상생/상극 관계는 아닙니다. 서로 독립적인 에너지를 가지고 있어, 각자의 영역을 존중하는 것이 중요합니다.` });
  }

  // 3. 오행 보완 분석
  const aMissing = (Object.entries(a.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const bMissing = (Object.entries(b.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const aStrong = (Object.entries(a.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v >= 2).map(([k]) => k);
  const bStrong = (Object.entries(b.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v >= 2).map(([k]) => k);

  const aFillsB = aMissing.length > 0 && bStrong.some((k) => aMissing.includes(k));
  const bFillsA = bMissing.length > 0 && aStrong.some((k) => bMissing.includes(k));

  if (aFillsB || bFillsA) {
    const fills: string[] = [];
    if (bFillsA) {
      const filled = aStrong.filter((k) => bMissing.includes(k));
      fills.push(`${nameA}이(가) ${nameB}에게 부족한 ${filled.map((k) => OH_NAME[k]).join(", ")} 기운을 채워줍니다`);
    }
    if (aFillsB) {
      const filled = bStrong.filter((k) => aMissing.includes(k));
      fills.push(`${nameB}이(가) ${nameA}에게 부족한 ${filled.map((k) => OH_NAME[k]).join(", ")} 기운을 채워줍니다`);
    }
    details.push({ label: "오행 보완", content: `${fills.join(". ")}. 서로의 부족한 부분을 채워주는 관계로, 함께하면 더 완성도 높은 조합이 됩니다.` });
    score += 10;
  }

  // Score cap
  score = Math.min(Math.max(score, 30), 95);

  // Summary
  let summaryTone: string;
  if (score >= 80) summaryTone = "서로에게 매우 좋은 기운을 주고받는 관계입니다. 함께 있을 때 서로의 장점이 더 빛나는 조합이에요.";
  else if (score >= 65) summaryTone = "기본적으로 좋은 궁합입니다. 서로 다른 부분이 있지만, 그 차이가 오히려 관계를 풍요롭게 만들 수 있어요.";
  else if (score >= 50) summaryTone = "서로 다른 기운을 가지고 있어서, 이해와 존중이 필요한 관계입니다. 노력하면 충분히 좋은 관계를 만들 수 있어요.";
  else summaryTone = "기질적으로 부딪히는 부분이 있을 수 있지만, 서로의 차이를 인정하고 소통한다면 오히려 크게 성장할 수 있는 관계입니다.";

  const summary = `${nameA}(${a.일간.한자}, ${DM[a.일간.한글]?.nature || ""})과 ${nameB}(${b.일간.한자}, ${DM[b.일간.한글]?.nature || ""})의 궁합입니다.\n\n${summaryTone}`;

  return { summary, details, score };
}
