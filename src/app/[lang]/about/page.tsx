import { notFound } from 'next/navigation';
import Image from 'next/image';
import { isValidLocale, type Locale } from '@/lib/i18n/config';
import { createPageMetadata } from '@/lib/metadata';
import { profile } from '@/lib/site-content';

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return createPageMetadata(lang, 'about', {
    en: {
      title: 'About',
      description: 'Background, interests, and academic journey of Yuning Gu.',
    },
    zh: {
      title: '关于我',
      description: '谷昱宁的学术背景、研究兴趣与个人经历。',
    },
  });
}

const copy = {
  en: {
    title: 'About me',
    intro:
      'I am an M2 student in Development of Drugs and Health Products (D2HP) at the Faculty of Pharmacy, Université Paris-Saclay.',
    storyEyebrow: 'Academic profile',
    paragraphs: [
      'My undergraduate training in Pharmaceutic Preparations at Heilongjiang University of Chinese Medicine gave me a foundation in formulation science, modern drug-delivery systems, pharmaceutical analysis, and experimental pharmacology. Together, these subjects taught me to see drug development across design, manufacture, quality evaluation, and biological effect.',
      'Beyond coursework, I investigated natural-product interventions for diabetes using GC–MS, enzyme-inhibition assays, network pharmacology, molecular docking, and in vivo validation. Quality-control experience at Bayer (China) and Dihon Pharmaceutical further introduced me to HPLC, near-infrared spectroscopy, microbiological testing, and GMP systems.',
      'In the D2HP programme at Université Paris-Saclay, my training has expanded to drug development, major pathologies, pharmacy and biotechnology, and interdisciplinary pharmaceutical science. I have also extended my experimental background into clinical data analysis, using NHANES data to study the predictive performance of UHR for cardiovascular disease in cancer patients.',
      'From April to July 2026, under the supervision of Dr. habil. Tamás Sovány at the University of Szeged, I investigated hot-melt extrusion of HPMC-based filaments for potential FDM tablet printing. Across these experiences, I am most interested in connecting formulation technology, drug delivery, experimental pharmacology, and population evidence to develop health products that are both scientifically robust and practically relevant.',
    ],
    focusLabel: 'Working across',
    focusTags: [
      'Formulation science',
      'Drug delivery',
      'Experimental pharmacology',
      'Pharmaceutical analysis',
      'Clinical data',
    ],
    chapterEyebrow: 'Current chapter',
    chapterTitle: 'Building a bridge from evidence to formulation technology.',
    chapterItems: [
      {
        period: '2026–2027',
        title: 'D2HP · M2',
        detail: 'Faculty of Pharmacy, Université Paris-Saclay',
      },
      {
        period: '2025–2026',
        title: 'D2HP · M1',
        detail: 'Faculty of Pharmacy, Université Paris-Saclay',
      },
      {
        period: 'Apr–Jul 2026',
        title: 'Research internship',
        detail: 'Faculty of Pharmacy, University of Szeged',
      },
    ],
    beyondEyebrow: 'Beyond research',
    beyondTitle: 'A few things that keep me curious.',
    beyondIntro:
      'Outside the laboratory, I value activities that create space for observation, movement, imagination, and new perspectives.',
    interests: [
      {
        title: 'Fishing',
        label: 'Outdoors',
        text: 'Fishing gives me a slower rhythm outside the laboratory and a quiet way to observe changing natural environments.',
      },
      {
        title: 'Badminton & swimming',
        label: 'Movement',
        text: 'Both help me reset, stay consistent, and return to research with a clearer mind.',
      },
      {
        title: 'Travel',
        label: 'Perspective',
        text: 'I enjoy discovering cities through their everyday spaces, food, museums, and local ways of life.',
      },
      {
        title: 'Games & alternative history',
        label: 'Systems & stories',
        text: 'Strategy games and alternative-history fiction let me explore complex systems and imagine how small choices reshape larger outcomes.',
      },
      {
        title: 'Electronic music & J-pop',
        label: 'Listening',
        text: 'Music is part of my daily rhythm, from focused study sessions to long journeys between cities.',
      },
    ],
  },
  zh: {
    title: '关于我',
    intro:
      '我现就读于巴黎萨克雷大学药学院 M2 Development of Drugs and Health Products（D2HP）项目。',
    storyEyebrow: '学术简介',
    paragraphs: [
      '本科阶段，我在黑龙江中医药大学主修药物制剂，系统学习制剂科学、现代药物递送、药物分析与实验药理。这些课程使我从药物的设计、制备、质量评价和生物效应等环节理解药物研发，并奠定了实验与分析基础。',
      '课程之外，我参与天然产物干预糖尿病研究，运用 GC–MS、酶抑制实验、网络药理、分子对接和体内验证探索活性成分及作用机制；在拜耳（中国）与滇虹药业的质量控制实习中，我进一步接触了 HPLC、近红外光谱、微生物检测及 GMP 质量体系。',
      '在巴黎萨克雷大学 D2HP 项目中，我的学习拓展至药物开发、重大疾病、药学与生物技术以及跨学科药物科学。我也将实验研究经验延伸至临床数据分析，利用 NHANES 数据研究 UHR 对癌症患者心血管疾病的预测表现。',
      '2026 年 4 月至 7 月，我在塞格德大学 Dr. habil. Tamás Sovány 指导下，研究 HPMC 基丝材的热熔挤出及其用于 FDM 片剂打印的潜力。贯穿这些经历的核心兴趣，是连接制剂技术、药物递送、实验药理与人群证据，探索兼具科学严谨性与实际应用价值的药物和健康产品。',
    ],
    focusLabel: '关注领域',
    focusTags: ['制剂科学', '药物递送', '实验药理', '药物分析', '临床数据'],
    chapterEyebrow: '当前阶段',
    chapterTitle: '从研究证据走向药物制剂技术。',
    chapterItems: [
      {
        period: '2026–2027',
        title: 'D2HP · M2',
        detail: '巴黎萨克雷大学药学院',
      },
      {
        period: '2025–2026',
        title: 'D2HP · M1',
        detail: '巴黎萨克雷大学药学院',
      },
      {
        period: '2026.04–07',
        title: '科研实习',
        detail: '塞格德大学药学院',
      },
    ],
    beyondEyebrow: '研究之外',
    beyondTitle: '让我保持好奇的日常。',
    beyondIntro:
      '离开实验室后，我喜欢通过观察、运动、想象和旅行，为日常生活保留不同的节奏与视角。',
    interests: [
      {
        title: '钓鱼',
        label: '户外',
        text: '钓鱼让我放慢节奏，也让我在安静的等待中观察水域、天气与自然环境的细微变化。',
      },
      {
        title: '羽毛球与游泳',
        label: '运动',
        text: '规律的运动帮助我恢复专注、保持状态，并以更清晰的思路回到学习与研究中。',
      },
      {
        title: '旅行',
        label: '视角',
        text: '我喜欢通过城市空间、食物、博物馆和当地人的日常生活认识一个新的地方。',
      },
      {
        title: '电子游戏与架空历史',
        label: '系统与故事',
        text: '策略游戏和架空历史小说让我探索复杂系统，也让我思考微小选择如何改变更大的历史走向。',
      },
      {
        title: '电子音乐与 J-pop',
        label: '聆听',
        text: '音乐构成了我的日常节奏，无论是专注学习，还是在不同城市之间旅行。',
      },
    ],
  },
} satisfies Record<
  Locale,
  {
    title: string;
    intro: string;
    storyEyebrow: string;
    paragraphs: string[];
    focusLabel: string;
    focusTags: string[];
    chapterEyebrow: string;
    chapterTitle: string;
    chapterItems: Array<{ period: string; title: string; detail: string }>;
    beyondEyebrow: string;
    beyondTitle: string;
    beyondIntro: string;
    interests: Array<{ title: string; label: string; text: string }>;
  }
>;

export default async function AboutPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const content = copy[lang];

  return (
    <div className="page-shell">
      <header className="page-heading">
        <p className="eyebrow">{profile.name}</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>

      <div className="contact-grid about-grid">
        <div className="profile-card">
          <div className="portrait-wrap">
            <Image
              src="/images/avatar.webp"
              width="416"
              height="416"
              alt={`${profile.name} portrait`}
              sizes="(max-width: 720px) 72vw, 416px"
            />
          </div>
          <div className="profile-card-copy">
            <p className="card-label">Yuning Gu · 谷昱宁</p>
            <p>{lang === 'zh' ? '药物科学 · 制剂技术 · 临床研究' : 'Pharmaceutical sciences · Formulation · Clinical research'}</p>
          </div>
        </div>

        <article className="contact-card about-story">
          <p className="eyebrow">{content.storyEyebrow}</p>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="about-focus">
            <span>{content.focusLabel}</span>
            <div className="tag-list">
              {content.focusTags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>

        <aside className="about-chapter">
          <p className="card-label">{content.chapterEyebrow}</p>
          <h2>{content.chapterTitle}</h2>
          <div className="about-chapter-grid">
            {content.chapterItems.map((item) => (
              <div className="about-chapter-item" key={item.period}>
                <span>{item.period}</span>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <section className="interests-section" aria-labelledby="interests-title">
        <div className="section-heading interests-heading">
          <div>
            <p className="eyebrow">{content.beyondEyebrow}</p>
            <h2 id="interests-title">{content.beyondTitle}</h2>
          </div>
          <p>{content.beyondIntro}</p>
        </div>

        <div className="interests-grid">
          {content.interests.map((interest, index) => (
            <article
              className={`interest-card ${index === 0 ? 'interest-card-featured' : ''}`}
              key={interest.title}
            >
              <div className="interest-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{interest.label}</span>
              </div>
              <h3>{interest.title}</h3>
              <p>{interest.text}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
