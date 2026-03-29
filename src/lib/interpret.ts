import { SajuResult, Ohaeng } from "./types";

/* ────────── 일간 Day Master ────────── */
const DM: Record<string, {
  title: string; nature: string; symbol: string;
  intro: string; personality: string; strengths: string; challenges: string; career: string; relationship: string;
}> = {
  갑: {
    title: "갑목(甲木)", nature: "양목", symbol: "큰 나무, 거목",
    intro: "큰 나무입니다. 숲 속에서 하늘을 향해 쭉쭉 뻗어가는 거목이에요.",
    personality: "이런 분들은 한번 결심하면 잘 안 흔들립니다. 곧은 성격에 정의감이 강하고, 주변에서 \"저 사람한테 맡기면 된다\"는 소리를 들어요. 리더 기질이 있어서 사람들이 자연스럽게 따르는 타입입니다.\n\n근데 나무가 곧으면 어떻게 될까요? 바람이 세면 부러질 수도 있어요. 고집이 세서 한번 정하면 방향을 잘 안 바꾸고, 융통성이 부족하다는 얘기를 들을 수 있습니다. 가끔은 주변 의견도 한번 들어보는 여유가 필요합니다.",
    strengths: "큰 그림을 그릴 수 있고, 추진력이 좋습니다. 어려운 일 앞에서도 뒤로 안 빠지는 타입이에요.",
    challenges: "고집이 너무 세면 주변이 힘들어합니다. \"내가 맞아\"보다 \"한번 들어볼게\"가 필요한 순간이 있어요.",
    career: "기획, 경영, 교육, 법 쪽처럼 방향을 제시하고 이끄는 일이 체질입니다.",
    relationship: "듬직해서 옆에 있으면 안심되는 파트너예요. 다만 \"내 방식\"이 강해서, 상대 의견도 존중하는 연습이 관계를 오래가게 합니다.",
  },
  을: {
    title: "을목(乙木)", nature: "음목", symbol: "풀, 꽃, 덩굴",
    intro: "풀이나 꽃 같은 존재입니다. 바람이 불면 흔들리지만, 절대 부러지지 않아요.",
    personality: "전형적인 외유내강입니다. 겉으로는 부드럽고 순해 보이는데, 속은 꽤 단단해요. 눈치가 빠르고 사교성이 좋아서 어디 가든 잘 어울리는 타입이고, 예술적 감각도 타고난 편입니다.\n\n대신 결정을 내리는 데 시간이 좀 걸려요. 이것저것 따져보다가 타이밍을 놓칠 수 있고, 남의 눈치를 너무 보다가 정작 자기 의견을 잃어버리는 경우도 있습니다.",
    strengths: "적응력이 최고입니다. 어떤 환경에 던져놔도 살아남아요. 사람 관계를 부드럽게 푸는 능력도 탁월합니다.",
    challenges: "우유부단해질 수 있어요. \"이것도 괜찮고 저것도 괜찮고...\" 하다가 기회를 놓치기 쉽습니다.",
    career: "디자인, 마케팅, 상담, 서비스업 등 사람과 소통하는 분야에서 빛을 발합니다.",
    relationship: "섬세하고 배려 깊은 파트너예요. 다만 속마음을 잘 안 드러내서, 솔직한 대화가 관계의 열쇠입니다.",
  },
  병: {
    title: "병화(丙火)", nature: "양화", symbol: "태양",
    intro: "태양입니다. 있는 곳마다 환해지고, 사람이 모이는 에너지를 가졌어요.",
    personality: "한마디로 분위기 메이커예요. 밝고 열정적이고, 표현력이 풍부합니다. 새로운 사람 만나는 걸 좋아하고, 어딜 가든 분위기를 띄우는 타입이에요.\n\n근데 태양도 너무 뜨거우면 문제잖아요? 시작은 화려한데 마무리가 약해지기 쉽고, 지속력이 좀 부족할 수 있어요. \"아 그거 재밌겠다!\" 하고 시작했다가 금방 싫증나는 패턴이 있다면, 이 기운 때문입니다.",
    strengths: "추진력과 열정이 넘칩니다. 뭘 시작하든 에너지가 폭발하고, 주변에 영감을 줄 수 있어요.",
    challenges: "꾸준함이 최대 과제예요. 시작한 걸 끝까지 가져가는 힘을 키우면 정말 무서운 사람이 됩니다.",
    career: "방송, 엔터, 영업, 창업, 교육 등 에너지를 쏟아붓는 분야가 체질이에요.",
    relationship: "함께 있으면 즐겁고 활기차요. 다만 관심이 분산되기 쉬워서, 한 사람에게 집중하는 연습이 필요합니다.",
  },
  정: {
    title: "정화(丁火)", nature: "음화", symbol: "촛불, 달빛",
    intro: "촛불이나 달빛 같은 존재입니다. 은은하지만, 그 빛이 없으면 어두운 곳을 밝힐 수 없어요.",
    personality: "겉으로는 조용해 보이는데, 내면에 깊은 열정을 품고 있는 타입이에요. 직관력이 뛰어나서 사람의 마음을 잘 읽고, 뭔가 느낌으로 아는 것들이 많습니다.\n\n대신 감정 기복이 있을 수 있어요. 너무 깊이 생각해서 걱정이 많아지고, 남들은 신경도 안 쓰는 걸 혼자 끙끙대는 경우도 있습니다. 가끔은 단순하게 생각하는 것도 약이에요.",
    strengths: "직관과 통찰력이 뛰어납니다. 한 분야에 파고드는 집중력도 좋아서, 깊이 있는 일에 강해요.",
    challenges: "너무 예민해지면 스스로도 피곤해집니다. 완벽하지 않아도 괜찮다는 마음의 여유가 필요해요.",
    career: "연구, 예술, 심리상담, 의료, 콘텐츠 제작 등 깊이와 감성이 필요한 분야가 딱 맞습니다.",
    relationship: "감정적으로 깊은 연결을 원하는 파트너예요. 진심 어린 소통이 이 사람의 마음을 여는 열쇠입니다.",
  },
  무: {
    title: "무토(戊土)", nature: "양토", symbol: "큰 산, 대지",
    intro: "큰 산이에요. 움직이지 않고, 묵묵히 그 자리를 지키는 존재입니다.",
    personality: "듬직하고 포용력이 커서 주변에 안정감을 줍니다. \"이 사람한테 맡기면 안심이다\"라는 소리를 듣는 타입이에요. 책임감이 강하고 신뢰를 중시하며, 약속을 잘 지킵니다.\n\n대신 변화를 꺼리는 편이에요. 새로운 시도보다 익숙한 걸 선호하고, 보수적인 성향이 기회를 놓치게 할 수도 있습니다. 가끔은 모험도 필요합니다.",
    strengths: "안정적이고 믿음직합니다. 큰 프로젝트를 맡아서 끝까지 해내는 능력이 있어요.",
    challenges: "변화에 느린 편이에요. \"지금 이대로가 좋은데...\"라는 생각이 발목을 잡을 수 있습니다.",
    career: "경영, 부동산, 공무원, 금융 등 안정적이고 책임감 있는 위치가 잘 맞아요.",
    relationship: "변하지 않는 든든한 파트너입니다. 다만 표현이 서툴러서, 마음을 말로 전하는 연습이 관계를 더 깊게 만들어요.",
  },
  기: {
    title: "기토(己土)", nature: "음토", symbol: "논밭, 정원",
    intro: "논밭이나 정원 같은 존재입니다. 겉으로는 수수하지만, 그 안에서 만물이 자라나요.",
    personality: "겸손하고 실용적인 사람이에요. 화려하진 않지만 꼼꼼하고 단단합니다. 누군가를 돌보고 지원하는 데서 보람을 느끼는 타입이고, 내적으로는 풍요로운 편입니다.\n\n대신 걱정이 좀 많아요. 자기 확신이 부족해서 기회가 와도 \"내가 할 수 있을까...\" 하며 망설이는 경우가 있습니다. 자신감을 키우는 것이 가장 큰 과제예요.",
    strengths: "디테일에 강하고, 사람을 키우는 능력이 탁월합니다. 꼼꼼한 일 처리는 타의 추종을 불허해요.",
    challenges: "소극적일 때가 있어요. \"나는 안 돼\"보다 \"한번 해볼까\" 하는 마음이 인생을 바꿉니다.",
    career: "교육, 요식업, 회계, HR, 돌봄 관련 등 사람을 돌보거나 디테일이 필요한 분야가 잘 맞아요.",
    relationship: "헌신적이고 세심한 파트너예요. 다만 자기 자신도 돌보는 걸 잊지 않는 게 중요합니다.",
  },
  경: {
    title: "경금(庚金)", nature: "양금", symbol: "바위, 쇠, 칼",
    intro: "바위나 쇠 같은 존재입니다. 강하고 날카롭고, 한번 정하면 밀어붙입니다.",
    personality: "결단력이 있고 행동력이 뛰어난 사람이에요. 의리가 있어서 한번 인연을 맺으면 끝까지 가고, 불의를 보면 참지 못하는 성격입니다. 카리스마가 있어서 사람들이 따르지만, 부딪히는 것도 두려워하지 않아요.\n\n대신 너무 강하게 나가면 주변이 힘들어할 수 있습니다. 칼이 날카로우면 잘 베지만, 상처도 주거든요. 부드러움을 배우면 더 큰 힘을 발휘할 수 있어요.",
    strengths: "어려운 상황에서 오히려 빛나는 타입이에요. 결단력과 실행력은 최고입니다.",
    challenges: "강한 게 장점이자 약점이에요. 양보와 부드러움을 배우면 무적이 됩니다.",
    career: "법, 의료, 엔지니어링, 금융, 스포츠 등 강한 추진력이 필요한 분야에서 두각을 나타냅니다.",
    relationship: "의리 있고 든든한 파트너예요. 다만 갈등 시 강하게 나가기보다 한 발 물러서는 지혜가 필요합니다.",
  },
  신: {
    title: "신금(辛金)", nature: "음금", symbol: "보석, 귀금속, 바늘",
    intro: "보석 같은 존재입니다. 작지만 빛나고, 정밀하고 예리해요.",
    personality: "완벽주의 성향이 있고, 미적 감각과 분석력이 뛰어납니다. 자존심이 강하고 품격을 중시하는 사람이에요. 겉은 차가워 보일 수 있는데, 가까운 사람에게는 뜻밖에 따뜻합니다.\n\n대신 예민하고 까다로운 면이 있어서, 스스로도 피곤해질 때가 있어요. 기준이 높은 건 좋지만, 모든 걸 완벽하게 하려다 지치는 경우가 있습니다.",
    strengths: "감각과 분석을 동시에 쓸 수 있는 드문 타입이에요. 디테일에 강하고, 눈이 높습니다.",
    challenges: "완벽주의가 독이 될 때가 있어요. \"괜찮아, 80점이면 충분해\"라는 여유가 삶의 질을 올립니다.",
    career: "디자인, 의료, 법률, IT, 금융 분석 등 정밀함이 필요한 분야에서 빛을 발합니다.",
    relationship: "신뢰가 쌓이면 한없이 헌신하는 타입이에요. 처음에는 벽이 있지만, 그 안에 들어가면 따뜻한 사람입니다.",
  },
  임: {
    title: "임수(壬水)", nature: "양수", symbol: "바다, 큰 강",
    intro: "바다나 큰 강 같은 존재입니다. 잔잔한 물이 아니라, 깊이 있고 끊임없이 흐르는 물이에요.",
    personality: "생각이 깊고 상황 판단이 빠릅니다. 겉보다 속이 훨씬 복잡한 타입인데요, 겉으로는 덤덤해 보여도 속에서는 계산이 계속 돌아가고 있어요.\n\n이런 분들은 보통 머리가 좋고, 전략적 사고에 강합니다. 그래서 단순 노동보다는 기획, 분석, 전략 쪽이 훨씬 잘 맞아요. \"머리로 먹고 사는 사주\"라고 보셔도 됩니다.\n\n대신 생각이 너무 많아서 행동이 늦어질 수 있고, 감정을 깊이 묻어두면 스트레스가 쌓여요.",
    strengths: "전략적 사고와 판단 능력이 뛰어납니다. 머리 회전이 빠르고, 현실 감각도 좋아요.",
    challenges: "생각이 너무 많으면 행동이 늦어져요. 70% 확신이면 일단 실행하는 연습이 필요합니다.",
    career: "기획, 전략, 사업, 컨설팅, IT, 연구 등 머리 쓰는 일에서 진가를 발휘합니다.",
    relationship: "지적인 교감을 중요시하는 파트너예요. 깊이 있는 대화가 관계를 깊게 만듭니다.",
  },
  계: {
    title: "계수(癸水)", nature: "음수", symbol: "빗물, 이슬, 안개",
    intro: "빗물이나 이슬 같은 존재입니다. 조용하지만 어디에나 스며들고, 없으면 메마르게 되는 물이에요.",
    personality: "겉은 조용한데, 내면에 깊은 세계가 있는 사람이에요. 직관력과 영감이 풍부해서, 남들이 못 보는 걸 느끼는 능력이 있습니다. 학문적 소양이 깊고, 인내심도 강한 편이에요.\n\n대신 내성적이라 자기 표현이 서투를 수 있습니다. 좋은 생각이 있어도 말을 안 해서 묻히는 경우가 있어요. 표현력을 키우면 인생이 확 달라집니다.",
    strengths: "직관과 통찰력이 뛰어나요. 조용히 관찰하다가 핵심을 정확히 짚어내는 능력이 있습니다.",
    challenges: "표현력이 약하면 기회를 놓쳐요. 좋은 생각은 밖으로 꺼내야 빛을 발합니다.",
    career: "연구, 학문, 예술, 심리, 데이터 분석 등 깊이가 필요한 분야에서 진가를 발휘해요.",
    relationship: "말보다 행동으로 사랑을 표현합니다. 이해받는 느낌이 이 사람에게는 정말 중요해요.",
  },
};

/* ────────── 십성 ────────── */
const SIPSUNG: Record<string, { role: string; short: string }> = {
  비견: { role: "나와 같은 기운", short: "독립심과 자존심이 강합니다. \"내 일은 내가 알아서 한다\"는 마인드의 소유자예요." },
  겁재: { role: "나를 돕는 기운", short: "사교적이고 추진력이 있지만, 재물의 변동이 크기도 합니다. 사람을 통해 기회가 오는 구조예요." },
  식신: { role: "내가 만들어내는 기운", short: "식복(食福)이 있고 여유로운 타입이에요. 먹는 것, 만드는 것, 표현하는 것에 재능이 있습니다." },
  상관: { role: "내가 표현하는 기운", short: "재능이 뛰어나고 말을 잘 해요. 기존 틀을 깨는 힘이 있어서, 예술이나 창작 쪽에서 빛납니다." },
  편재: { role: "활동적 재물", short: "사업 수완이 있고 큰 돈을 다룰 수 있는 그릇이에요. 활동적이고 도전적인 재물 구조입니다." },
  정재: { role: "안정적 재물", short: "꾸준히 모으는 타입이에요. 화려하진 않지만 성실하게 재물을 쌓아갑니다." },
  편관: { role: "나를 단련하는 힘", short: "권위와 통솔력이 있습니다. 압박 속에서 오히려 강해지는 사람이에요." },
  정관: { role: "바른 규율", short: "명예와 질서를 중시해요. 조직 안에서 인정받기 쉽고, 공정한 리더가 될 수 있습니다." },
  편인: { role: "비정통 학문", short: "독특한 사고방식의 소유자예요. 남들과 다른 관점에서 보는 능력이 특수 분야에서 빛납니다." },
  정인: { role: "바른 학문", short: "학문적 재능이 있고, 윗사람의 도움을 잘 받아요. 배우는 것을 좋아하는 사람입니다." },
};

/* ────────── helpers ────────── */
const OH_NAME: Record<Ohaeng, string> = { 목: "나무(木)", 화: "불(火)", 토: "흙(土)", 금: "쇠(金)", 수: "물(水)" };

function ohaengOverview(counts: Record<Ohaeng, number>): string {
  const strong = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v >= 3);
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0);
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  const parts: string[] = [];

  // 오행 분포 특징 분석
  const ohDesc: Record<Ohaeng, string> = {
    목: "성장하려는 힘, 계획을 세우고 앞으로 나아가려는 에너지",
    화: "열정과 표현력, 시작하는 힘과 추진력",
    토: "현실감각, 책임감, 중심을 잡아주는 힘",
    금: "판단력, 결단력, 논리적으로 정리하는 힘",
    수: "지혜, 유연함, 흐름을 읽는 힘",
  };

  if (strong.length > 0) {
    for (const [k, v] of strong) {
      const pct = Math.round((v / total) * 100);
      parts.push(`${OH_NAME[k]}의 기운이 ${v}개(${pct}%)로 매우 강합니다.\n이건 ${ohDesc[k]}이 두드러진다는 뜻이에요. 일상에서도 이 기운의 영향을 크게 받고, 성격에서도 뚜렷하게 나타납니다.`);
    }
  }

  if (missing.length > 0) {
    for (const [k] of missing) {
      parts.push(`${OH_NAME[k]}의 기운이 사주에 없습니다.\n이건 ${ohDesc[k]}이 약하다는 의미예요. 하지만 걱정할 필요는 없습니다. 부족한 기운은 직업 선택, 취미 활동, 함께하는 사람을 통해 충분히 채울 수 있어요.`);
    }
  }

  if (missing.length === 0 && strong.length === 0) {
    parts.push("오행이 비교적 고르게 퍼져 있어요. 이런 사주는 어느 한쪽으로 극단적으로 치우치지 않아서, 다방면에서 균형 있게 능력을 발휘할 수 있는 구조입니다.");
  }

  return parts.join("\n\n");
}

function lifeDirection(counts: Record<Ohaeng, number>, dmHangeul: string): string {
  const strong = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v >= 3).map(([k]) => k);
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const parts: string[] = [];

  // 복합 패턴 분석
  if (missing.includes("화") && missing.includes("목")) {
    parts.push("추진력(火)과 성장성(木) 모두 사주에 없는 구조예요. 이건 뭘 의미하냐면, 시작이 굉장히 신중하고 결정까지 오래 고민한다는 뜻입니다.\n\n근데 반대로 말하면? 실수가 적어요. 빠르게 치고 나가는 타입은 아니지만, 한번 움직이면 확실하게 가는 사람입니다.\n\n이런 사주는 처음부터 잘 풀리는 구조가 아닌 대신, 시간이 갈수록 올라가는 구조예요. 특히 30대 이후부터 점점 자리를 잡아가는 흐름이 강합니다.");
  } else if (missing.includes("화")) {
    parts.push("열정과 추진력에 해당하는 火 기운이 없어요. 뭔가 시작하기까지 시간이 걸리고, \"일단 해볼까!\" 하는 순발력이 약할 수 있습니다.\n\n대신 장점은? 신중하다는 거예요. 충동적인 실수가 적고, 한번 시작하면 꾸준히 가는 타입입니다.");
  } else if (missing.includes("목")) {
    parts.push("성장과 계획에 해당하는 木 기운이 없어요. 장기적인 방향을 잡는 것보다 눈앞의 현실을 처리하는 데 집중하는 경향이 있습니다.\n\n하지만 이건 현실 감각이 뛰어나다는 뜻이기도 해요. 공상보다 실행에 강한 구조입니다.");
  }

  if (strong.includes("토")) {
    parts.push("토(土) 기운이 아주 강합니다. 쉽게 말하면 책임, 압박, 현실 — 이런 기운이에요.\n\n이건 \"편하게 사는 구조\"가 아니라 \"큰일을 맡을 수 있는 구조\"라는 뜻이에요. 책임 있는 자리, 관리, 리더 역할 — 이쪽으로 갈수록 운이 살아납니다.");
  }

  if (strong.includes("금")) {
    parts.push("금(金) 기운이 강해서 판단력과 실행력이 좋습니다. 논리적이고 현실적인 사람이라, 감정보다 이성으로 움직이는 타입이에요.");
  }

  if (strong.includes("수")) {
    parts.push("수(水) 기운이 강해서 머리가 잘 돌아가고 적응력이 뛰어납니다. 변화가 많은 환경에서 오히려 능력을 발휘하는 구조예요.");
  }

  if (strong.includes("목")) {
    parts.push("목(木) 기운이 강해서 항상 성장하고 앞으로 나아가려는 에너지가 있어요. 현재에 안주하지 않고 계속 뭔가를 배우고 도전하는 타입입니다.");
  }

  if (strong.includes("화")) {
    parts.push("화(火) 기운이 강해서 열정과 표현력이 넘칩니다. 주변에 에너지를 주는 존재이고, 사람들이 자연스럽게 끌리는 매력이 있어요.");
  }

  if (parts.length === 0) {
    parts.push("오행이 비교적 균형 잡혀 있어서, 특정 분야에 극단적으로 강하거나 약하지 않아요. 이건 장점이에요. 유연하게 인생을 설계할 수 있고, 다양한 분야에서 두루 능력을 발휘할 수 있는 구조입니다.");
  }

  return parts.join("\n\n");
}

function daeunText(data: SajuResult): string {
  const d = data.대운_현재_다음;
  if (!d || d.length === 0) return "";

  const cur = d[0];
  const sipsungTone: Record<string, string> = {
    비견: "자기 자신의 힘이 강해지는 시기예요. 독립심이 커지고, 자기 영역을 넓혀가는 흐름입니다.",
    겁재: "사람을 통해 기회가 오지만, 경쟁도 따르는 시기예요. 인간관계 관리가 핵심입니다.",
    식신: "여유롭고 풍요로운 시기예요. 먹고 즐기는 복이 있고, 창작이나 표현 활동에 좋은 때입니다.",
    상관: "재능이 폭발하는 시기지만, 기존 질서와 충돌할 수 있어요. 표현은 하되, 선을 지키는 게 중요합니다.",
    편재: "재물 운이 활발해지는 시기예요. 큰 돈이 들어오기도 하지만, 나가기도 쉬운 때입니다.",
    정재: "안정적으로 재물이 쌓이는 시기예요. 꾸준한 노력이 결실을 맺는 흐름입니다.",
    편관: "도전과 압박이 함께 오는 시기예요. 힘들지만 성장하는 때이고, 이 시기를 잘 넘기면 한 단계 올라갑니다.",
    정관: "사회적 인정과 명예가 따르는 시기예요. 조직 안에서 자리를 잡기 좋은 흐름입니다.",
    편인: "배움과 변화의 시기예요. 새로운 분야를 공부하거나, 기존과 다른 방향을 모색하게 됩니다.",
    정인: "학문적 성장과 귀인의 도움이 있는 시기예요. 공부, 자격증, 승진 등에 유리한 흐름입니다.",
  };

  let text = `현재 ${cur.천간.한자}${cur.지지.한자}(${cur.천간.한글}${cur.지지.한글}) 대운이 ${cur.대운_시작_전통나이}세부터 흐르고 있습니다.\n\n`;
  const tone = sipsungTone[cur.천간.십성];
  if (tone) text += `천간에 ${cur.천간.십성}이 왔는데, ${tone}\n\n`;
  const tone2 = sipsungTone[cur.지지.십성];
  if (tone2) text += `지지에는 ${cur.지지.십성}이 있어서, ${tone2}`;

  if (d[1]) {
    text += `\n\n다음 대운은 ${d[1].천간.한자}${d[1].지지.한자}(${d[1].천간.한글}${d[1].지지.한글})으로, ${d[1].대운_시작_전통나이}세부터 흐름이 바뀝니다.`;
  }

  return text;
}

function seunText(data: SajuResult): string {
  const s = data.세운_현재_5년;
  if (!s || s.length === 0) return "";
  const y = s[0];

  const sipTone: Record<string, string> = {
    비견: "경쟁과 독립의 해. 자기 힘으로 돌파해야 하는 상황이 올 수 있어요.",
    겁재: "인간관계가 활발해지는 해. 사람을 통해 기회가 오지만, 지출도 늘 수 있어요.",
    식신: "여유와 풍요의 해. 먹고 즐기는 것에 복이 있고, 좋은 아이디어가 떠오르는 해예요.",
    상관: "표현력이 폭발하는 해. 자기 재능을 드러내기 좋지만, 말조심도 필요해요.",
    편재: "재물 변동이 큰 해. 수입도 늘지만 지출도 커질 수 있어요. 투자는 신중하게.",
    정재: "안정적인 수입이 기대되는 해. 꾸준함이 빛을 발하는 시기예요.",
    편관: "도전과 변화의 해. 압박감이 있지만, 이걸 잘 넘기면 크게 성장합니다.",
    정관: "안정과 인정의 해. 직장이나 사회에서 좋은 평가를 받을 수 있어요.",
    편인: "배움과 변화의 해. 새로운 걸 시작하거나, 기존 방향을 재정비하는 시기예요.",
    정인: "귀인의 해. 주변의 도움과 지원이 있고, 공부나 자기 계발에 좋은 때입니다.",
  };

  let text = `${y.연도}년은 ${y.천간.한자}${y.지지.한자}(${y.천간.한글}${y.지지.한글})년이에요.\n\n`;
  const t1 = sipTone[y.천간.십성];
  if (t1) text += `• ${y.천간.십성}: ${t1}\n`;
  const t2 = sipTone[y.지지.십성];
  if (t2) text += `• ${y.지지.십성}: ${t2}`;

  return text;
}

/* ────────── 사주 전체 이미지 생성 ────────── */
const OH_IMAGE: Record<Ohaeng, { scene: string; vibe: string }> = {
  목: { scene: "싱그러운 숲", vibe: "성장과 생명력이 넘치는" },
  화: { scene: "활활 타오르는 불", vibe: "열정과 에너지가 강렬한" },
  토: { scene: "단단한 대지", vibe: "묵직하고 안정적인" },
  금: { scene: "날카로운 쇠", vibe: "차갑고 결단력 있는" },
  수: { scene: "깊은 바다", vibe: "지혜롭고 유연한" },
};

function buildOpening(data: SajuResult, dm: typeof DM[string]): string {
  const counts = data.오행_갯수;
  const dominant = (Object.entries(counts) as [Ohaeng, number][]).sort((a, b) => b[1] - a[1])[0];
  const domOh = dominant[0];
  const domCount = dominant[1];
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const img = OH_IMAGE[domOh];
  const dmOh = data.일간.오행 as Ohaeng;

  let text = "";

  // 첫 인상 — 전체 사주의 이미지
  if (domCount >= 4) {
    text += `딱 보자마자 "${img.scene}" 같은 느낌이 확 들어오는 사주입니다.\n${OH_NAME[domOh]} 기운이 ${domCount}개나 되니까, ${img.vibe} 에너지가 사주 전체를 지배하고 있어요.\n\n`;
  } else if (domCount >= 3) {
    text += `전체적으로 ${img.vibe} 기운이 느껴지는 사주예요.\n${OH_NAME[domOh]}이 ${domCount}개로 중심을 잡고 있습니다.\n\n`;
  } else {
    text += `오행이 비교적 고르게 퍼져 있는 사주예요.\n한쪽으로 확 치우치지 않아서, 유연하게 여러 방면에서 능력을 발휘할 수 있는 구조입니다.\n\n`;
  }

  // 일간 본질
  text += `이분의 본질은 ${dm.title}.\n\n`;
  text += `👉 ${dm.intro}\n\n`;

  // 구조 비유
  if (domOh !== dmOh && domCount >= 3) {
    const dmImg = OH_IMAGE[dmOh];
    text += `재미있는 건, 본인은 ${dmImg.scene} 같은 기운인데\n사주 전체는 ${img.scene} 기운이 강하다는 거예요.\n\n`;
    text += `쉽게 비유하면?\n👉 "${OH_IMAGE[dmOh].scene} 위에 ${img.scene}이 놓인 구조"\n\n`;
  }

  return text;
}

function buildPersonality(data: SajuResult, dm: typeof DM[string]): string {
  const counts = data.오행_갯수;
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const strong = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v >= 3).map(([k]) => k);

  let text = dm.personality + "\n\n";

  // 오행 불균형에서 오는 성격 포인트
  if (missing.length > 0 || strong.length > 0) {
    text += "── 오행으로 보는 성격 포인트\n\n";

    if (strong.includes("화" as Ohaeng)) {
      text += `🔥 화(火)가 ${counts["화"]}개 — 감정과 열정이 강합니다.\n`;
      text += `• 추진력 강함\n• 성격이 뜨거운 편\n• 시작하는 힘이 좋지만, 지속력은 관리 필요\n\n`;
    }
    if (strong.includes("토" as Ohaeng)) {
      text += `🏔 토(土)가 ${counts["토"]}개 — 현실감각과 책임감이 강합니다.\n`;
      text += `• 묵묵히 해내는 타입\n• 안정을 추구\n• 대신 변화에 느릴 수 있음\n\n`;
    }
    if (strong.includes("금" as Ohaeng)) {
      text += `⚔ 금(金)이 ${counts["금"]}개 — 판단력과 결단력이 뛰어납니다.\n`;
      text += `• 논리적이고 현실적\n• 칼같은 결정력\n• 때로 차갑게 느껴질 수 있음\n\n`;
    }
    if (strong.includes("수" as Ohaeng)) {
      text += `🌊 수(水)가 ${counts["수"]}개 — 머리가 잘 돌아가고 유연합니다.\n`;
      text += `• 상황 판단이 빠름\n• 적응력 뛰어남\n• 생각이 너무 많아질 수 있음\n\n`;
    }
    if (strong.includes("목" as Ohaeng)) {
      text += `🌿 목(木)이 ${counts["목"]}개 — 성장 지향적이고 진취적입니다.\n`;
      text += `• 앞으로 나아가려는 힘이 강함\n• 계획을 세우고 실행\n• 때로 조급할 수 있음\n\n`;
    }

    if (missing.includes("목" as Ohaeng)) {
      text += `❌ 목(木) 없음 — 유연성이 부족할 수 있어요.\n• 타협이 어려운 편\n• 장기 계획보다 눈앞의 현실에 집중\n\n`;
    }
    if (missing.includes("화" as Ohaeng)) {
      text += `❌ 화(火) 없음 — 추진력이 약할 수 있어요.\n• 시작이 신중하고 결정이 느림\n• 대신 실수는 적은 타입\n\n`;
    }
    if (missing.includes("토" as Ohaeng)) {
      text += `❌ 토(土) 없음 — 안정감이 부족할 수 있어요.\n• 변화가 잦고 중심잡기가 어려움\n• 대신 자유롭고 유연한 삶의 구조\n\n`;
    }
    if (missing.includes("금" as Ohaeng)) {
      text += `❌ 금(金) 없음 — 결단력이 약할 수 있어요.\n• 우유부단해지기 쉬움\n• 대신 부드럽고 포용력 있는 성격\n\n`;
    }
    if (missing.includes("수" as Ohaeng)) {
      text += `❌ 수(水) 없음 — 소통력이 약할 수 있어요.\n• 감정 표현이 서투른 편\n• 대신 행동으로 보여주는 타입\n\n`;
    }
  }

  return text;
}

function buildSummaryLine(data: SajuResult, dm: typeof DM[string]): string {
  const counts = data.오행_갯수;
  const dominant = (Object.entries(counts) as [Ohaeng, number][]).sort((a, b) => b[1] - a[1])[0];
  const missing = (Object.entries(counts) as [Ohaeng, number][]).filter(([, v]) => v === 0);

  const traits: string[] = [];
  if (counts["화"] >= 3) traits.push("열정적");
  if (counts["토"] >= 3) traits.push("책임감 강한");
  if (counts["금"] >= 3) traits.push("결단력 있는");
  if (counts["수"] >= 3) traits.push("지혜로운");
  if (counts["목"] >= 3) traits.push("성장 지향적인");
  if (traits.length === 0) traits.push("균형 잡힌");

  const traitStr = traits.join(", ");

  return `👉 한마디로: "${traitStr} 에너지로 살아가는 ${dm.symbol}의 사주"`;
}

function buildChecklist(data: SajuResult, dm: typeof DM[string]): string {
  const counts = data.오행_갯수;
  const items: string[] = [];

  // 일간 기반
  if (["갑", "경"].includes(data.일간.한글)) items.push("내가 좀 강한 편이다");
  if (["을", "계"].includes(data.일간.한글)) items.push("겉으로는 조용한데 속은 다르다");
  if (["병", "정"].includes(data.일간.한글)) items.push("감정이 풍부한 편이다");
  if (["무", "기"].includes(data.일간.한글)) items.push("책임감이 강하다는 말을 듣는다");
  if (["임"].includes(data.일간.한글)) items.push("머리 회전이 빠르다고 느낀다");
  if (["신"].includes(data.일간.한글)) items.push("기준이 높고 까다로운 편이다");

  // 오행 기반
  if (counts["화"] >= 3) items.push("한번 화나면 쉽게 안 내려간다");
  if (counts["토"] >= 3) items.push("변화보다 안정을 선호한다");
  if (counts["금"] >= 3) items.push("감정보다 이성으로 판단하는 편이다");
  if (counts["수"] >= 3) items.push("혼자 생각하는 시간이 필요하다");
  if (counts["목"] >= 3) items.push("가만히 있으면 답답하다");
  if (counts["목"] === 0) items.push("고집 있다는 말을 들어봤다");
  if (counts["화"] === 0) items.push("시작하기까지 시간이 오래 걸린다");
  if (counts["수"] === 0) items.push("감정 표현이 서투른 편이다");

  if (items.length === 0) return "";

  const selected = items.slice(0, 4);
  return "── 혹시 이런 느낌 있으셨을까요?\n\n" + selected.map((i) => `• ${i}`).join("\n");
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

  const sipsungList = [
    { position: "연간", name: data.연간.십성, info: SIPSUNG[data.연간.십성] },
    { position: "연지", name: data.연지.십성, info: SIPSUNG[data.연지.십성] },
    { position: "월간", name: data.월간.십성, info: SIPSUNG[data.월간.십성] },
    { position: "월지", name: data.월지.십성, info: SIPSUNG[data.월지.십성] },
    { position: "시간", name: data.시간.십성, info: SIPSUNG[data.시간.십성] },
    { position: "시지", name: data.시지.십성, info: SIPSUNG[data.시지.십성] },
  ].filter((s) => s.info);

  // 종합 overview — 스토리텔링 스타일
  const opening = buildOpening(data, dm);
  const personality = buildPersonality(data, dm);
  const summaryLine = buildSummaryLine(data, dm);
  const checklist = buildChecklist(data, dm);

  let overview = opening;
  overview += personality;

  // 강점/약점 정리
  overview += "── 핵심 정리\n\n";
  overview += `✔ 강점: ${dm.strengths}\n`;
  overview += `✔ 잘 맞는 방향: ${dm.career}\n`;
  overview += `⚠ 주의할 점: ${dm.challenges}\n`;
  overview += `💕 관계: ${dm.relationship}\n\n`;

  overview += summaryLine;

  if (checklist) {
    overview += "\n\n" + checklist;
  }

  return {
    dayMaster: dm,
    overview,
    ohaengAnalysis: ohaengOverview(data.오행_갯수 as Record<Ohaeng, number>),
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
  score: number;
}

const CHEONGAN_HAP: Record<string, string> = {
  갑기: "갑기합토(甲己合土) — 큰 나무와 논밭의 만남이에요. 서로 부족한 부분을 자연스럽게 채워주는, 아주 좋은 궁합입니다.",
  을경: "을경합금(乙庚合金) — 꽃과 바위의 만남이에요. 부드러움과 강함이 만나 서로를 갈고닦는 관계입니다.",
  병신: "병신합수(丙辛合水) — 태양과 보석의 만남이에요. 화려하면서도 깊이 있는 관계를 만들 수 있습니다.",
  정임: "정임합목(丁壬合木) — 촛불과 바다의 만남이에요. 감성적이고 서로에게 영감을 주는 관계입니다.",
  무계: "무계합화(戊癸合火) — 큰 산과 이슬의 만남이에요. 안정적이면서도 따뜻한 관계를 만듭니다.",
};

const OHAENG_SANGSAENG: [Ohaeng, Ohaeng][] = [["목", "화"], ["화", "토"], ["토", "금"], ["금", "수"], ["수", "목"]];
const OHAENG_SANGGEUK: [Ohaeng, Ohaeng][] = [["목", "토"], ["토", "수"], ["수", "화"], ["화", "금"], ["금", "목"]];

export function analyzeCompatibility(a: SajuResult, b: SajuResult, nameA: string, nameB: string): CompatResult {
  const details: { label: string; content: string }[] = [];
  let score = 60;

  // 1. 천간합
  const pair1 = a.일간.한글 + b.일간.한글;
  const pair2 = b.일간.한글 + a.일간.한글;
  const hap = CHEONGAN_HAP[pair1] || CHEONGAN_HAP[pair2];

  const dmA = DM[a.일간.한글] || DM["갑"];
  const dmB = DM[b.일간.한글] || DM["갑"];

  if (hap) {
    details.push({ label: "천간합 — 자연스러운 끌림", content: `${nameA}의 ${a.일간.한자}(${dmA.symbol})과 ${nameB}의 ${b.일간.한자}(${dmB.symbol})이 천간합을 이루고 있어요.\n\n${hap}\n\n사주에서 천간합은 \"자연스럽게 끌리는 관계\"를 의미합니다. 인위적으로 만든 게 아니라, 기운 자체가 서로를 당기는 거예요.` });
    score += 15;
  } else {
    details.push({ label: "일간 관계", content: `${nameA}은(는) ${dmA.title}(${dmA.symbol}), ${nameB}은(는) ${dmB.title}(${dmB.symbol})입니다.\n\n천간합은 아니지만, 각자의 기운이 어떻게 어울리느냐에 따라 좋은 관계를 충분히 만들 수 있어요.` });
  }

  // 2. 오행 관계
  const aOh = a.일간.오행 as Ohaeng;
  const bOh = b.일간.오행 as Ohaeng;
  const isSS = OHAENG_SANGSAENG.some(([x, y]) => (x === aOh && y === bOh) || (x === bOh && y === aOh));
  const isSG = OHAENG_SANGGEUK.some(([x, y]) => (x === aOh && y === bOh) || (x === bOh && y === aOh));

  if (isSS) {
    details.push({ label: "오행 상생 — 서로를 살려주는 관계", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 상생 관계예요.\n\n상생은 한쪽이 다른 쪽을 도와주는 관계입니다. 함께 있으면 서로의 기운이 살아나고, 자연스럽게 좋은 영향을 주고받아요.` });
    score += 10;
  } else if (isSG) {
    details.push({ label: "오행 상극 — 다르기에 자극이 되는 관계", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 상극 관계예요.\n\n상극이라고 나쁜 게 아니에요. 서로 다른 점이 갈등이 될 수도 있지만, 그 차이가 서로를 성장시키는 자극이 되기도 합니다. 핵심은 \"다름을 인정하는 것\"이에요.` });
    score -= 5;
  } else if (aOh === bOh) {
    details.push({ label: "같은 오행 — 깊이 이해하는 관계", content: `둘 다 ${OH_NAME[aOh]}이에요.\n\n같은 기운이라 서로를 깊이 이해할 수 있습니다. 대신 비슷한 약점도 공유하게 되어서, 서로를 보완해줄 수 있는 다른 요소가 있으면 더 좋아요.` });
    score += 5;
  } else {
    details.push({ label: "오행 관계", content: `${nameA}의 ${OH_NAME[aOh]}과 ${nameB}의 ${OH_NAME[bOh]}은 직접적인 상생/상극은 아니에요.\n\n각자 독립적인 에너지를 가지고 있어서, 서로의 영역을 존중하며 함께할 수 있는 관계입니다.` });
  }

  // 3. 오행 보완
  const aMissing = (Object.entries(a.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const bMissing = (Object.entries(b.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v === 0).map(([k]) => k);
  const aStrong = (Object.entries(a.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v >= 2).map(([k]) => k);
  const bStrong = (Object.entries(b.오행_갯수) as [Ohaeng, number][]).filter(([, v]) => v >= 2).map(([k]) => k);

  const fills: string[] = [];
  const bFillsA = bStrong.filter((k) => aMissing.includes(k));
  const aFillsB = aStrong.filter((k) => bMissing.includes(k));

  if (bFillsA.length > 0) fills.push(`${nameB}이(가) ${nameA}에게 부족한 ${bFillsA.map((k) => OH_NAME[k]).join(", ")} 기운을 채워줍니다`);
  if (aFillsB.length > 0) fills.push(`${nameA}이(가) ${nameB}에게 부족한 ${aFillsB.map((k) => OH_NAME[k]).join(", ")} 기운을 채워줍니다`);

  if (fills.length > 0) {
    details.push({ label: "오행 보완 — 서로의 빈자리를 채우는 관계", content: `${fills.join(".\n")}.\n\n이건 정말 좋은 신호예요. 한 사람에게 없는 기운을 다른 사람이 채워주는 구조이기 때문에, 함께 있으면 더 완성도 높은 조합이 됩니다.` });
    score += 10;
  }

  score = Math.min(Math.max(score, 30), 95);

  // Summary
  const summary = `${nameA}(${a.일간.한자}, ${dmA.symbol})과 ${nameB}(${b.일간.한자}, ${dmB.symbol})의 궁합입니다.\n\n` +
    `${dmA.symbol}과 ${dmB.symbol}의 만남 — ` +
    (score >= 75
      ? "기운이 서로 잘 어울리는 좋은 조합이에요. 함께 있을 때 서로의 장점이 더 빛나고, 자연스럽게 좋은 방향으로 흘러갈 수 있는 관계입니다."
      : score >= 60
        ? "서로 다른 기운을 가지고 있어서 새로운 것을 배울 수 있는 관계예요. 차이를 이해하고 존중하면 오히려 더 깊은 관계로 발전할 수 있습니다."
        : "기질적으로 다른 부분이 있어서 노력이 필요한 관계예요. 하지만 궁합은 숙명이 아니라 참고 자료입니다. 서로를 이해하려는 마음이 가장 중요해요.");

  return { summary, details, score };
}
