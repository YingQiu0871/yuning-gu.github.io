import type { Locale } from '@/lib/i18n/config';

// Site URL: change via the NEXT_PUBLIC_SITE_URL environment variable at build time,
// or edit the fallback below. Deploy script: deploy/setup-server.sh · workflow: .github/workflows/deploy.yml
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yingqiu.me';

export const profile = {
  name: 'Yuning Gu',
  chineseName: '谷昱宁',
  email: 'yuning.gu@universite-paris-saclay.fr',
  personalEmail: 'yuning.gu@outlook.com',
  orcid: 'https://orcid.org/0009-0003-2561-8122',
  googleScholar: 'https://scholar.google.com/citations?user=QUiuMUMAAAAJ&hl=zh-CN',
  linkedin: 'https://www.linkedin.com/in/yuninggu2002',
  github: 'https://github.com/YingQiu0871',
  researchGate: 'https://www.researchgate.net/profile/Yuning-Gu',
};

export const navigation = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'About', href: '/en/about' },
    { label: 'Research', href: '/en/research' },
    { label: 'Publications', href: '/en/publications' },
    { label: 'Blog', href: 'https://blog.yingqiu.me', external: true },
    { label: 'Experience', href: '/en/experience' },
    { label: 'Contact', href: '/en/contact' },
  ],
  zh: [
    { label: '首页', href: '/zh' },
    { label: '关于', href: '/zh/about' },
    { label: '研究', href: '/zh/research' },
    { label: '论文', href: '/zh/publications' },
    { label: '博客', href: 'https://blog.yingqiu.me', external: true },
    { label: '经历', href: '/zh/experience' },
    { label: '联系', href: '/zh/contact' },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string; external?: boolean }>>;

export const homeContent = {
  en: {
    title: 'Pharmaceutical technology, from hot-melt extrusion to printed ',
    titleAccent: 'tablets',
    titleEnd: '.',
    intro:
      'I am an M2 student in Development of Drugs and Health Products (D2HP) at Université Paris-Saclay. My main interest is pharmaceutical technology: hot-melt extrusion and 3D printing of oral dosage forms. Earlier work in natural-product pharmacology and clinical epidemiology gave me the analytical and data skills I bring to it.',
    seekingLabel: 'Open to opportunities',
    seekingText:
      'I am looking for an M2 research internship for spring 2027 and a PhD position starting in autumn 2027, both in pharmaceutical technology.',
    seekingCta: 'Get in touch',
    primaryCta: 'Explore my research',
    secondaryCta: 'View publications',
    statusLabel: 'Current academic focus',
    statusTitle: 'M2 Development of Drugs and Health Products (D2HP)',
    statusBody: 'Faculty of Pharmacy, Université Paris-Saclay',
    location: 'Paris-Saclay, France',
    statLabels: {
      publications: 'Peer-reviewed publications',
      firstAuthor: 'As first or co-first author',
      corresponding: 'As corresponding author',
    },
    focusHeading: 'Research focus',
    focusIntro:
      'My current work is in pharmaceutical technology. Two earlier lines of research, in metabolic health data and in natural products, shaped how I design experiments and read evidence.',
    focusAreas: [
      {
        number: '01',
        tag: 'Current focus',
        title: 'Pharmaceutical technology',
        text: 'Hot-melt extrusion of polymer-based filaments and their suitability for fused deposition modeling (FDM) of tablets, studied during my research internship at the University of Szeged.',
      },
      {
        number: '02',
        tag: 'Earlier work',
        title: 'Metabolic and cardiovascular health',
        text: 'Cross-sectional analysis of NHANES data on biomarkers and cardiovascular risk. It taught me to work with population data and clinical statistics.',
      },
      {
        number: '03',
        tag: 'Earlier work',
        title: 'Natural products and drug delivery',
        text: 'GC–MS, enzyme-inhibition assays, network pharmacology, molecular docking, and in vivo validation of bioactive compounds for diabetes. It gave me my grounding in analytical and experimental methods.',
      },
    ],
    latestHeading: 'Latest highlights',
    latestLink: 'See all experience',
    publicationHeading: 'Selected publications',
    publicationLink: 'View all publications',
    educationHeading: 'Education',
    contactHeading: 'Let’s connect',
    contactBody:
      'If you supervise internships or PhD projects in pharmaceutical technology, or want to talk about hot-melt extrusion and printed dosage forms, I would be glad to hear from you.',
    emailCta: 'Email me',
  },
  zh: {
    title: '药物制剂技术：从热熔挤出到 3D 打印',
    titleAccent: '片剂',
    titleEnd: '。',
    intro:
      '我现就读于巴黎萨克雷大学药学院 M2 Development of Drugs and Health Products（D2HP）项目，主要方向是药物制剂技术，包括热熔挤出和口服固体制剂的 3D 打印。此前在天然产物药理和临床流行病学方面的研究，为我打下了分析与数据方面的基础。',
    seekingLabel: '正在寻找机会',
    seekingText: '我在找 2027 年春季的 M2 科研实习，以及 2027 年秋季入学的博士职位，方向都是药物制剂技术。',
    seekingCta: '联系我',
    primaryCta: '查看研究方向',
    secondaryCta: '查看论文',
    statusLabel: '当前学术方向',
    statusTitle: 'M2 Development of Drugs and Health Products（D2HP）',
    statusBody: '巴黎萨克雷大学药学院',
    location: '法国巴黎萨克雷',
    statLabels: {
      publications: '同行评议论文',
      firstAuthor: '第一或共同第一作者',
      corresponding: '通讯作者',
    },
    focusHeading: '研究方向',
    focusIntro:
      '我目前的研究集中在药物制剂技术。此前在代谢健康数据和天然产物两个方向上的工作，影响了我设计实验和解读证据的方式。',
    focusAreas: [
      {
        number: '01',
        tag: '当前方向',
        title: '药物制剂技术',
        text: '研究高分子丝材的热熔挤出，以及丝材用于熔融沉积成型（FDM）片剂打印的适用性。这是我在塞格德大学科研实习期间的课题。',
      },
      {
        number: '02',
        tag: '此前的研究',
        title: '代谢与心血管健康',
        text: '基于 NHANES 数据，对生物标志物与心血管疾病风险做横断面分析。这段经历让我学会了处理人群数据和临床统计。',
      },
      {
        number: '03',
        tag: '此前的研究',
        title: '天然产物与药物递送',
        text: '运用 GC–MS、酶抑制实验、网络药理、分子对接和体内验证，研究天然活性成分对糖尿病的作用。这段经历打下了我的分析与实验方法基础。',
      },
    ],
    latestHeading: '近期动态',
    latestLink: '查看全部经历',
    publicationHeading: '代表性论文',
    publicationLink: '查看全部论文',
    educationHeading: '教育背景',
    contactHeading: '保持联系',
    contactBody: '如果你在招药物制剂技术方向的实习生或博士生，或者想聊聊热熔挤出和 3D 打印制剂，欢迎给我写信。',
    emailCta: '发送邮件',
  },
} satisfies Record<Locale, Record<string, unknown>>;

export const highlights = {
  en: [
    {
      date: 'Sep 2026',
      title: 'Started M2 D2HP at Université Paris-Saclay',
      text: 'Second year of the international master’s programme in drug development and health products.',
    },
    {
      date: 'Apr–Jul 2026',
      title: 'Completed a research internship at the University of Szeged',
      text: 'Hot-melt extrusion of HPMC-based filaments for potential FDM tablet printing, supervised by Dr. habil. Tamás Sovány.',
    },
    {
      date: 'Jan 2026',
      title: 'New article published in Medicine',
      text: 'A cross-sectional NHANES study evaluating UHR as a predictor of cardiovascular disease in cancer patients.',
    },
  ],
  zh: [
    {
      date: '2026.09',
      title: '进入巴黎萨克雷大学 M2 D2HP',
      text: '药物研发与健康产品方向国际硕士项目的第二年。',
    },
    {
      date: '2026.04–07',
      title: '完成塞格德大学科研实习',
      text: '在 Dr. habil. Tamás Sovány 指导下，开展 HPMC 基丝材热熔挤出及其用于 FDM 片剂打印的潜力研究。',
    },
    {
      date: '2026.01',
      title: '新论文发表于 Medicine',
      text: '基于 NHANES 数据，研究 UHR 对癌症患者心血管疾病的预测表现。',
    },
  ],
} satisfies Record<Locale, Array<{ date: string; title: string; text: string }>>;

export const education = {
  en: [
    {
      degree: 'M2 Development of Drugs and Health Products (D2HP)',
      school: 'Faculty of Pharmacy, Université Paris-Saclay',
      period: '2026–2027',
      description:
        'International pharmaceutical sciences programme covering drug development, major pathologies, pharmacy and biotechnology, and transversal pharmaceutical disciplines.',
    },
    {
      degree: 'M1 Development of Drugs and Health Products (D2HP)',
      school: 'Faculty of Pharmacy, Université Paris-Saclay',
      period: '2025–2026',
      description:
        'First year of the programme, followed by a research internship in pharmaceutical technology at the University of Szeged (Apr–Jul 2026).',
    },
    {
      degree: 'B.S. in Pharmaceutic Preparations',
      school: 'Heilongjiang University of Chinese Medicine',
      period: '2021–2025',
      description:
        'Training in formulation science, modern drug-delivery systems, analytical techniques, and experimental pharmacology.',
    },
    {
      degree: 'Supplementary Training in Programming and AI',
      school: 'University of Helsinki · Online',
      period: 'Jan–Aug 2024',
      description: 'Completed 29 ECTS in Python, Haskell, and artificial intelligence fundamentals.',
    },
  ],
  zh: [
    {
      degree: '药物与健康产品开发 M2（D2HP）',
      school: '巴黎萨克雷大学药学院',
      period: '2026–2027',
      description:
        '全英文国际药物科学项目，课程涵盖药物研发、重大疾病、药学与生物技术以及跨学科药物科学。',
    },
    {
      degree: '药物与健康产品开发 M1（D2HP）',
      school: '巴黎萨克雷大学药学院',
      period: '2025–2026',
      description: '项目第一年，课程结束后在塞格德大学完成药物制剂技术方向的科研实习（2026.04–07）。',
    },
    {
      degree: '药物制剂学学士',
      school: '黑龙江中医药大学',
      period: '2021–2025',
      description:
        '系统学习制剂科学、现代药物递送、药物分析与实验药理，并参与糖尿病相关研究。',
    },
    {
      degree: '编程与人工智能补充课程',
      school: '赫尔辛基大学 · 在线',
      period: '2024.01–08',
      description: '完成 29 ECTS，学习 Python、Haskell 与人工智能基础。',
    },
  ],
} satisfies Record<
  Locale,
  Array<{ degree: string; school: string; period: string; description: string }>
>;

export const experiences = {
  en: [
    {
      title: 'Research Intern',
      organization:
        'Institute of Pharmaceutical Technology and Regulatory Affairs, Faculty of Pharmacy, University of Szeged',
      period: 'Apr–Jul 2026 · Szeged, Hungary',
      supervisor: 'Supervisor: Dr. habil. Tamás Sovány',
      description:
        'Research project: Hot-Melt Extrusion of HPMC-Based Filaments for Potential FDM Tablet Printing.',
      tags: ['Hot-melt extrusion', 'HPMC filaments', 'FDM tablet printing'],
    },
    {
      title: 'Quality Control Intern',
      organization: 'Bayer (China) Limited · Dihon Pharmaceutical Group Co., Ltd.',
      period: '2024–2025 · Yunnan, China',
      supervisor: '',
      description:
        'Worked in a GMP laboratory with HPLC, near-infrared spectroscopy, microbiological testing, batch records, and quality-system documentation.',
      tags: ['GMP', 'HPLC', 'Quality control'],
    },
    {
      title: 'Undergraduate Researcher',
      organization: 'Heilongjiang University of Chinese Medicine',
      period: '2023–2025 · Harbin, China',
      supervisor: '',
      description:
        'Studied natural-product interventions for diabetes using GC–MS, enzyme-inhibition assays, network pharmacology, molecular docking, and in vivo validation.',
      tags: ['Natural products', 'Experimental pharmacology', 'Data analysis'],
    },
  ],
  zh: [
    {
      title: '科研实习生',
      organization: '塞格德大学药学院 · 药物制剂技术与药事管理研究所',
      period: '2026.04–07 · 匈牙利塞格德',
      supervisor: '导师：Dr. habil. Tamás Sovány',
      description: '研究课题：用于潜在 FDM 片剂打印的 HPMC 基丝材热熔挤出研究。',
      tags: ['热熔挤出', 'HPMC 丝材', 'FDM 片剂打印'],
    },
    {
      title: '质量控制实习生',
      organization: '拜耳（中国）有限公司 · 滇虹药业集团股份有限公司',
      period: '2024–2025 · 中国云南',
      supervisor: '',
      description:
        '在 GMP 实验室参与 HPLC、近红外光谱、微生物检测、批记录及质量体系文件相关工作。',
      tags: ['GMP', 'HPLC', '质量控制'],
    },
    {
      title: '本科科研参与者',
      organization: '黑龙江中医药大学',
      period: '2023–2025 · 中国哈尔滨',
      supervisor: '',
      description:
        '运用 GC–MS、酶抑制实验、网络药理、分子对接及体内验证研究天然产物对糖尿病的干预潜力。',
      tags: ['天然产物', '实验药理', '数据分析'],
    },
  ],
} satisfies Record<
  Locale,
  Array<{
    title: string;
    organization: string;
    period: string;
    supervisor: string;
    description: string;
    tags: string[];
  }>
>;

export type Publication = {
  title: string;
  authors: string;
  venue: string;
  date: string;
  doi: string;
  type: 'Journal article' | 'Conference paper';
  note?: string;
  firstAuthor?: boolean;
  corresponding?: boolean;
};

export const publications: Publication[] = [
  {
    title:
      'The predictive performance of the uric acid-to-high-density lipoprotein cholesterol ratio (UHR) for cardiovascular diseases in cancer patients: A cross-sectional study from NHANES',
    authors: 'Yuning Gu; Chuanran Qin',
    venue: 'Medicine',
    date: '2026-01-02',
    doi: '10.1097/MD.0000000000046732',
    type: 'Journal article',
    note: 'First author',
    firstAuthor: true,
  },
  {
    title:
      'Active ingredients and mechanisms of peony seed blended oil in diabetes treatment using Kunming mice: Insights from GC–MS, network pharmacology, and experimental verification',
    authors: 'Yuning Gu; Fengliang Zhong; Tiantian Sun; Zirui Chang',
    venue: 'Journal of Functional Foods, 125, 106652',
    date: '2025',
    doi: '10.1016/j.jff.2024.106652',
    type: 'Journal article',
    note: 'First and corresponding author',
    firstAuthor: true,
    corresponding: true,
  },
  {
    title:
      'Study on the in vitro inhibitory activity of peony seed blended oil on α-amylase and α-glucosidase',
    authors: 'Tiantian Sun; Zirui Chang; Fengliang Zhong; Zishu Li; Yu Fu; Yuning Gu',
    venue: 'Journal of Clinical Medicine Research, 5(2), 151–158',
    date: '2024',
    doi: '10.32629/jcmr.v5i2.2288',
    type: 'Journal article',
    note: 'Corresponding author',
    corresponding: true,
  },
  {
    title: 'Retrosynthetic design of Wulfenioidins L with potential anti-Zika virus activity',
    authors: 'Yuning Gu; Tanghe Wang',
    venue: 'BIO Web of Conferences, 111, 02004',
    date: '2024',
    doi: '10.1051/bioconf/202411102004',
    type: 'Conference paper',
    note: 'Co-first author',
    firstAuthor: true,
  },
];

export const publicationNotes: Record<string, string> = {
  'First author': '第一作者',
  'First and corresponding author': '第一作者兼通讯作者',
  'Corresponding author': '通讯作者',
  'Co-first author': '共同第一作者',
};

export const projects = {
  en: [
    {
      period: '2026',
      title: 'HPMC-Based Filaments for Potential FDM Tablet Printing',
      role: 'Research Intern · University of Szeged · Supervisor: Dr. habil. Tamás Sovány',
      description:
        'Research on the hot-melt extrusion of HPMC-based filaments and their potential suitability for fused deposition modeling of tablets.',
      tags: ['Hot-melt extrusion', 'HPMC', 'FDM'],
    },
    {
      period: '2023–2024',
      title: 'Peony Bark–Dang Gui Formula Microparticles',
      role: 'Research team member',
      description:
        'Development of sustained-release microparticles combining peony bark extract and a traditional formula, supported by HPLC and GC–MS analysis.',
      tags: ['Drug delivery', 'HPLC', 'Natural products'],
    },
    {
      period: '2022–2023',
      title: 'Herbal Health Beverage Innovation',
      role: 'Project lead',
      description:
        'Product and brand development for food-grade herbal beverages combining traditional ingredients with contemporary health communication.',
      tags: ['Product design', 'TCM', 'Entrepreneurship'],
    },
  ],
  zh: [
    {
      period: '2026',
      title: '用于潜在 FDM 片剂打印的 HPMC 基丝材',
      role: '科研实习生 · 塞格德大学 · 导师：Dr. habil. Tamás Sovány',
      description: '研究 HPMC 基丝材的热熔挤出工艺及其用于熔融沉积成型片剂打印的潜力。',
      tags: ['热熔挤出', 'HPMC', 'FDM'],
    },
    {
      period: '2023–2024',
      title: '复方丹皮当归缓释微粒',
      role: '研究团队成员',
      description: '结合牡丹皮提取物与传统方剂开发缓释微粒，并运用 HPLC 与 GC–MS 开展分析。',
      tags: ['药物递送', 'HPLC', '天然产物'],
    },
    {
      period: '2022–2023',
      title: '中药健康饮品创新',
      role: '项目负责人',
      description: '围绕药食同源原料开展产品与品牌设计，将传统成分与现代健康传播相结合。',
      tags: ['产品设计', '中医药', '创新创业'],
    },
  ],
} satisfies Record<
  Locale,
  Array<{ period: string; title: string; role: string; description: string; tags: string[] }>
>;

export const skills = {
  en: [
    {
      title: 'Pharmaceutical technology',
      items: ['Hot-melt extrusion', 'HPMC filament preparation', 'FDM tablet-printing research', 'Drug formulation'],
    },
    {
      title: 'Laboratory and analysis',
      items: ['HPLC', 'GC–MS', 'Spectrophotometry', 'Enzyme-inhibition assays', 'Cell culture', 'Western blot'],
    },
    {
      title: 'Research methods',
      items: ['Experimental design', 'Clinical data analysis', 'Network pharmacology', 'Molecular docking', 'Scientific writing'],
    },
    {
      title: 'Data and software',
      items: ['GraphPad Prism', 'SPSS', 'R', 'Excel', 'ChemDraw', 'Python'],
    },
  ],
  zh: [
    {
      title: '药物制剂技术',
      items: ['热熔挤出', 'HPMC 丝材制备', 'FDM 片剂打印研究', '药物制剂设计'],
    },
    {
      title: '实验与分析',
      items: ['HPLC', 'GC–MS', '分光光度法', '酶抑制实验', '细胞培养', 'Western blot'],
    },
    {
      title: '科研方法',
      items: ['实验设计', '临床数据分析', '网络药理', '分子对接', '科研写作'],
    },
    {
      title: '数据与软件',
      items: ['GraphPad Prism', 'SPSS', 'R', 'Excel', 'ChemDraw', 'Python'],
    },
  ],
} satisfies Record<Locale, Array<{ title: string; items: string[] }>>;

export const pageLabels = {
  en: {
    education: 'Education',
    experience: 'Experience',
    publications: 'Publications',
    research: 'Research',
    contact: 'Contact',
    journalArticles: 'Journal articles',
    conferencePapers: 'Conference papers',
    doi: 'Open DOI',
    supervisor: 'Supervisor',
    email: 'Academic email',
    personalEmail: 'Long-term email',
    affiliation: 'Affiliation',
    programme: 'Programme',
    profiles: 'Academic profiles',
    contactIntro:
      'I am looking for an M2 research internship for spring 2027 and a PhD position starting in autumn 2027, both in pharmaceutical technology. I am also happy to talk about my earlier work on natural products and clinical data.',
  },
  zh: {
    education: '教育背景',
    experience: '学习与研究经历',
    publications: '发表论文',
    research: '研究方向',
    contact: '联系方式',
    journalArticles: '期刊论文',
    conferencePapers: '会议论文',
    doi: '打开 DOI',
    supervisor: '导师',
    email: '机构邮箱',
    personalEmail: '长期邮箱',
    affiliation: '所在机构',
    programme: '项目',
    profiles: '学术主页',
    contactIntro:
      '我在找 2027 年春季的 M2 科研实习和 2027 年秋季入学的博士职位，方向都是药物制剂技术。也欢迎聊我之前在天然产物和临床数据方面的工作。',
  },
} satisfies Record<Locale, Record<string, string>>;
