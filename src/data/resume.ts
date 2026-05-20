export interface Resume {
  name: string;
  title: string;
  email: string;
  github: string;
  summary: string;
  experience: Array<{
    company: string;
    role: string;
    period: string;
    highlights: string[];
  }>;
  education: Array<{
    school: string;
    degree: string;
    period: string;
  }>;
  skills: Array<{ category: string; items: string[] }>;
  projects: Array<{
    name: string;
    description: string;
    url?: string;
    tech?: string[];
  }>;
}

export const resume: Resume = {
  name: "你的名字",
  title: "你的头衔",
  email: "your@email.com",
  github: "https://github.com/yourname",
  summary:
    "这是一段个人简介，约 3-5 句话。介绍你的职业背景、核心能力和当前关注的方向。你可以在这里简要说明你的经验领域、技术栈偏好以及职业目标。这段文字帮助访客快速了解你。",
  experience: [
    {
      company: "示例公司 A",
      role: "高级前端工程师",
      period: "2022.01 — 至今",
      highlights: [
        "主导公司核心产品的前端架构设计与迭代",
        "推动组件库建设，覆盖 80+ 业务组件",
        "优化首屏加载性能，LCP 从 3.2s 降至 1.1s",
      ],
    },
    {
      company: "示例公司 B",
      role: "前端工程师",
      period: "2020.07 — 2021.12",
      highlights: [
        "参与电商平台前端开发，负责商品详情和订单模块",
        "引入 TypeScript，完善类型系统，减少线上 bug 30%",
      ],
    },
  ],
  education: [
    {
      school: "示例大学",
      degree: "计算机科学与技术 · 本科",
      period: "2016 — 2020",
    },
  ],
  skills: [
    {
      category: "语言",
      items: ["TypeScript", "JavaScript", "HTML", "CSS"],
    },
    {
      category: "框架",
      items: ["React", "Next.js", "Astro", "Vue"],
    },
    {
      category: "工具",
      items: ["Git", "Webpack", "Vite", "Figma"],
    },
  ],
  projects: [
    {
      name: "个人网站",
      description: "基于 Astro + Tailwind CSS 的个人简历与博客站点，部署在 Cloudflare Pages。",
      tech: ["Astro", "Tailwind CSS", "Cloudflare"],
    },
    {
      name: "开源组件库",
      description: "一个轻量级的 React 组件库，支持 Tree Shaking 和按需加载。",
      url: "https://github.com/yourname/ui-lib",
      tech: ["React", "TypeScript", "Rollup"],
    },
  ],
};
