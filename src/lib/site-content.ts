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
  researchGate: 'https://www.researchgate.net/profile/Yuning-Gu',
};

export const navigation = {
  en: [
    { label: 'Home', href: '/en' },
    { label: 'About', href: '/en/about' },
    { label: 'Research', href: '/en/research' },
    { label: 'Publications', href: '/en/publications' },
    { label: 'Blog', href: '/en/blog' },
    { label: 'Experience', href: '/en/experience' },
    { label: 'Contact', href: '/en/contact' },
  ],
  zh: [
    { label: '首页', href: '/zh' },
    { label: '关于', href: '/zh/about' },
    { label: '研究', href: '/zh/research' },
    { label: '论文', href: '/zh/publications' },
    { label: '博客', href: '/zh/blog' },
    { label: '经历', href: '/zh/experience' },
    { label: '联系', href: '/zh/contact' },
  ],
} satisfies Record<Locale, Array<{ label: string; href: string }>>;

export const homeContent = {
  en: {
    eyebrow: 'Pharmaceutical Sciences · 2025–2026',
    title: 'From pharmaceutics to translational health research.',
    intro:
      'I am an M1 student in Development of Drugs and Health Products (D2HP) at Université Paris-Saclay. My work connects pharmaceutical technology, drug delivery, natural products, and data-informed clinical research.',
    primaryCta: 'Explore my research',
    secondaryCta: 'View publications',
    statusLabel: 'Current academic focus',
    statusTitle: 'M1 Development of Drugs and Health Products (D2HP)',
    statusBody: 'Faculty of Pharmacy, Université Paris-Saclay',
    location: 'Paris-Saclay, France',
    stats: [
      { value: '4', label: 'Publications' },
      { value: '3', label: 'Research themes' },
      { value: '4', label: 'Institutions' },
    ],
    focusHeading: 'Research focus',
    focusIntro:
      'I am interested in how formulation science, experimental pharmacology, and population data can work together to improve medicines and health outcomes.',
    focusAreas: [
      {
        number: '01',
        title: 'Pharmaceutical technology',
        text: 'Hot-melt extrusion, polymer-based filaments, and the potential of fused deposition modeling for tablet manufacturing.',
      },
      {
        number: '02',
        title: 'Metabolic and cardiovascular health',
        text: 'Biomarkers, clinical epidemiology, and experimental approaches to diabetes and cardiovascular risk.',
      },
      {
        number: '03',
        title: 'Natural products and drug delivery',
        text: 'Analytical chemistry, network pharmacology, molecular docking, and modern delivery strategies for bioactive compounds.',
      },
    ],
    latestHeading: 'Latest highlights',
    latestLink: 'See all experience',
    publicationHeading: 'Selected publications',
    publicationLink: 'View all publications',
    educationHeading: 'Education',
    contactHeading: 'Let’s connect',
    contactBody:
      'I welcome conversations about pharmaceutical technology, drug development, clinical research, and international research opportunities.',
    emailCta: 'Email me',
  },
  zh: {
    eyebrow: '药物科学 · 2025–2026',
    title: '从药剂学出发，探索可转化的健康研究。',
    intro:
      '我现就读于巴黎萨克雷大学药学院 M1 Development of Drugs and Health Products（D2HP）项目。我的研究兴趣涵盖药物制剂技术、药物递送、天然产物及数据驱动的临床研究。',
    primaryCta: '查看研究方向',
    secondaryCta: '查看论文',
    statusLabel: '当前学术方向',
    statusTitle: 'M1 Development of Drugs and Health Products（D2HP）',
    statusBody: '巴黎萨克雷大学药学院',
    location: '法国 · 巴黎萨克雷',
    stats: [
      { value: '4', label: '发表论文' },
      { value: '3', label: '研究方向' },
      { value: '4', label: '学习与研究机构' },
    ],
    focusHeading: '研究方向',
    focusIntro:
      '我关注药物制剂、实验药理和人群数据如何相互连接，从不同层面推动药物研发与健康结局改善。',
    focusAreas: [
      {
        number: '01',
        title: '药物制剂技术',
        text: '研究热熔挤出、高分子丝材及熔融沉积成型技术在片剂打印与制造中的潜在应用。',
      },
      {
        number: '02',
        title: '代谢与心血管健康',
        text: '结合生物标志物、临床流行病学和实验方法，研究糖尿病与心血管疾病风险。',
      },
      {
        number: '03',
        title: '天然产物与药物递送',
        text: '运用分析化学、网络药理、分子对接及现代递送策略研究天然活性成分。',
      },
    ],
    latestHeading: '近期动态',
    latestLink: '查看全部经历',
    publicationHeading: '代表性论文',
    publicationLink: '查看全部论文',
    educationHeading: '教育背景',
    contactHeading: '保持联系',
    contactBody:
      '欢迎就药物制剂技术、药物研发、临床研究及国际科研机会与我交流。',
    emailCta: '发送邮件',
  },
} satisfies Record<Locale, Record<string, unknown>>;

export const highlights = {
  en: [
    {
      date: 'Apr–Jul 2026',
      title: 'Research internship at the University of Szeged',
      text: 'Hot-melt extrusion of HPMC-based filaments for potential FDM tablet printing, supervised by Dr. habil. Tamás Sovány.',
    },
    {
      date: 'Jan 2026',
      title: 'New article published in Medicine',
      text: 'A cross-sectional NHANES study evaluating UHR as a predictor of cardiovascular disease in cancer patients.',
    },
    {
      date: '2025–2026',
      title: 'M1 D2HP at Université Paris-Saclay',
      text: 'International training across drug development, pharmaceutical sciences, and health products.',
    },
  ],
  zh: [
    {
      date: '2026.04–07',
      title: '塞格德大学科研实习',
      text: '在 Dr. habil. Tamás Sovány 指导下，开展 HPMC 基丝材热熔挤出及其用于 FDM 片剂打印的潜力研究。',
    },
    {
      date: '2026.01',
      title: '新论文发表于 Medicine',
      text: '基于 NHANES 数据，研究 UHR 对癌症患者心血管疾病的预测表现。',
    },
    {
      date: '2025–2026',
      title: '巴黎萨克雷大学 M1 D2HP',
      text: '围绕药物研发、药物科学与健康产品开展全英文国际化学习。',
    },
  ],
} satisfies Record<Locale, Array<{ date: string; title: string; text: string }>>;

export const education = {
  en: [
    {
      degree: 'M1 Development of Drugs and Health Products (D2HP)',
      school: 'Faculty of Pharmacy, Université Paris-Saclay',
      period: '2025–2026',
      description:
        'International pharmaceutical sciences programme covering drug development, major pathologies, pharmacy and biotechnology, and transversal pharmaceutical disciplines.',
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
      degree: '药物与健康产品开发 M1（D2HP）',
      school: '巴黎萨克雷大学药学院',
      period: '2025–2026',
      description:
        '全英文国际药物科学项目，课程涵盖药物研发、重大疾病、药学与生物技术以及跨学科药物科学。',
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
  },
  {
    title:
      'Active ingredients and mechanisms of peony seed blended oil in diabetes treatment using Kunming mice: Insights from GC–MS, network pharmacology, and experimental verification',
    authors: 'Yuning Gu; Fengliang Zhong; Tiantian Sun; Zirui Chang',
    venue: 'Journal of Functional Foods · 125, 106652',
    date: '2025',
    doi: '10.1016/j.jff.2024.106652',
    type: 'Journal article',
    note: 'First and corresponding author',
  },
  {
    title:
      'Study on the in vitro inhibitory activity of peony seed blended oil on α-amylase and α-glucosidase',
    authors: 'Tiantian Sun; Zirui Chang; Fengliang Zhong; Zishu Li; Yu Fu; Yuning Gu',
    venue: 'Journal of Clinical Medicine Research · 5(2), 151–158',
    date: '2024',
    doi: '10.32629/jcmr.v5i2.2288',
    type: 'Journal article',
    note: 'Corresponding author',
  },
  {
    title: 'Retrosynthetic design of Wulfenioidins L with potential anti-Zika virus activity',
    authors: 'Yuning Gu; Tanghe Wang',
    venue: 'BIO Web of Conferences · 111, 02004',
    date: '2024',
    doi: '10.1051/bioconf/202411102004',
    type: 'Conference paper',
    note: 'Co-first author',
  },
];

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
    affiliation: 'Affiliation',
    programme: 'Programme',
    profiles: 'Academic profiles',
    contactIntro:
      'I welcome academic conversations and potential collaborations in pharmaceutical technology, drug development, natural products, and clinical research.',
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
    affiliation: '所在机构',
    programme: '项目',
    profiles: '学术主页',
    contactIntro:
      '欢迎就药物制剂技术、药物研发、天然产物与临床研究进行学术交流或探讨合作机会。',
  },
} satisfies Record<Locale, Record<string, string>>;
