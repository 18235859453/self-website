# 个人网站开发计划

> **给 Claude Code（CC）的说明**  
> 请按本文档 **阶段顺序** 执行，每阶段结束前必须运行 `npm run build` 并通过验收清单。  
> **不要跳过阶段**；未通过验收前不要进入下一阶段。  
> 每完成一个阶段，在本文档对应阶段的「状态」处标记为 `[x]`，并简要记录完成日期（可选）。

---

## 项目概要

| 项 | 约定 |
|---|---|
| 目标 | 个人网站：**个人简历** + **博客** |
| 部署 | **Cloudflare Pages**（先用 `*.pages.dev` 子域名） |
| 不做 | NAS 自建、自有域名、数据库、用户登录、后台 CMS |
| 框架 | **Astro** + **Tailwind CSS** |
| 博客 | Astro **Content Collections** + Markdown |
| 简历 | 数据驱动（`src/data/resume.ts`），单页 `/resume` |
| 语言 | 中文为主（结构预留英文扩展可选） |

---

## 执行前：用户需填写的配置

在开始阶段 1 前，若以下占位仍为默认值，可先用占位内容开发，用户后续再替换。

```yaml
# 在 src/data/site.ts 或 resume.ts 中最终会用到 — CC 可用合理占位
name: "你的名字"
title: "你的头衔 / 一句话定位"
email: "your@email.com"
github: "https://github.com/yourname"
# 可选: linkedin, twitter, 微信说明等
locale: zh-CN
theme: system  # light | dark | system
```

---

## 站点结构

```text
/                     首页：简介 + 入口（简历 / 博客）+ 最新文章
/resume               个人简历
/blog                 博客列表
/blog/[slug]          文章详情
/rss.xml              RSS（阶段 3 实现）
/sitemap-index.xml    Sitemap（阶段 4，随 @astrojs/sitemap）
```

---

## 仓库目标结构

```text
self-website/
├── DEVELOPMENT_PLAN.md    # 本文件
├── README.md
├── astro.config.mjs
├── package.json
├── public/
│   ├── favicon.svg
│   └── resume.pdf          # 可选，阶段 2
├── src/
│   ├── content/
│   │   └── blog/*.md
│   ├── data/
│   │   ├── resume.ts
│   │   └── site.ts
│   ├── components/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   └── pages/
│       ├── index.astro
│       ├── resume.astro
│       ├── blog/index.astro
│       ├── blog/[...slug].astro
│       └── 404.astro
└── .node-version            # 内容为 20
```

---

## Cloudflare Pages 构建配置（阶段 5 对照）

| 设置项 | 值 |
|--------|-----|
| Framework preset | Astro（或 None + 自定义命令） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `20` |
| 生产分支 | `main`（或用户指定默认分支） |

环境变量：第一版无需。

---

# 阶段 0：环境与仓库

**状态：** `[x]` 已完成 · 2026-05-20

### CC 任务

1. 若目录为空：初始化 git 仓库（若尚未初始化）。
2. 确认 Node.js 20+ 可用；创建 `.node-version`，内容为 `20`。
3. 创建最小 `README.md`：本地开发、构建、部署说明占位。

### 用户任务

- [ ] 安装 Node.js LTS、Git
- [ ] 创建 GitHub 仓库并准备 push（阶段 5 前完成即可）

### 验收

- [ ] `.node-version` 存在
- [ ] `README.md` 存在

---

# 阶段 1：项目脚手架 + 全局布局

**状态：** `[x]` 已完成 · 2026-05-20

### CC Prompt（复制执行）

```text
在本仓库用 Astro 创建个人网站项目，集成 Tailwind CSS。
要求：
1. 页面：首页 /、简历 /resume（占位）、博客列表 /blog（占位）、博客详情动态路由。
2. BaseLayout：顶栏导航（首页、简历、博客）、页脚（版权 + 社交链接占位）。
3. 风格：简洁、移动端优先；支持 light/dark（跟随 system 或 class 切换二选一）。
4. 创建 src/data/site.ts 存放站点级配置（name、title、links）。
5. README：补充 npm install、npm run dev、npm run build。
6. 运行 npm run build，修复所有错误。
不要：数据库、CMS、评论、API、自有域名相关配置。
```

### 验收清单

- [ ] `npm install` 成功
- [ ] `npm run dev` 可本地预览
- [ ] `npm run build` 无错误，输出在 `dist/`
- [ ] 导航四个路由可访问
- [ ] 移动端布局无明显错位

---

# 阶段 2：个人简历页

**状态：** `[x]` 已完成 · 2026-05-20

### CC Prompt

```text
实现 /resume 个人简历页，数据全部来自 src/data/resume.ts（TypeScript 类型完整）。
简历区块：
- 头部：姓名、头衔、联系方式（邮箱、GitHub 等，从 site.ts / resume.ts 读取）
- 个人简介（3-5 句）
- 工作经历（公司、职位、时间段、bullet 要点）
- 教育背景
- 技能分组（如：语言、框架、工具）
- 项目亮点（3-6 条，含可选外链）
要求：
1. 首页增加醒目入口「查看简历」。
2. 打印友好：@media print 样式，隐藏导航等无关元素。
3. 可选：public/resume.pdf + 页内「下载 PDF」链接（若无 PDF 则隐藏按钮）。
4. 不要把简历内容硬编码在 .astro 组件里。
5. npm run build 通过。
```

### `resume.ts` 数据结构参考（CC 实现）

```ts
export interface Resume {
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
```

### 验收清单

- [ ] 仅修改 `resume.ts` 即可更新简历内容
- [ ] 打印预览可读
- [ ] 首页可进入简历页

---

# 阶段 3：博客系统

**状态：** `[x]` 已完成 · 2026-05-20

### CC Prompt

```text
用 Astro Content Collections 实现博客：
1. src/content/config.ts 定义 blog collection schema：
   title, description, pubDate (date), tags (string[] 可选), draft (boolean 默认 false)
2. 至少 2 篇示例文章（中文），一篇带代码块测试高亮。
3. /blog 列表：按 pubDate 降序；显示标题、日期、摘要、标签。
4. /blog/[slug] 详情：prose 排版、代码高亮、可选文内目录。
5. draft: true 的文章不出现在列表、RSS、首页最新文章。
6. 生成 /rss.xml（RSS 2.0）。
7. 首页展示「最新 3 篇文章」。
8. npm run build 通过。
不要：评论系统、全文搜索（可留 TODO）。
```

### 文章 Frontmatter 示例

```yaml
---
title: "文章标题"
description: "摘要，用于列表和 SEO"
pubDate: 2026-05-20
tags: ["随笔", "技术"]
draft: false
---
```

### 验收清单

- [ ] 新增 `.md` 文件后列表与详情自动生效
- [ ] `draft: true` 不对外展示
- [ ] `/rss.xml` 可访问且包含非 draft 文章
- [ ] 代码块渲染正常

---

# 阶段 4：首页、SEO、体验打磨

**状态：** `[x]` 已完成 · 2026-05-20

### CC Prompt

```text
完善全站体验与 SEO：
1. 首页：个人简介 + CTA（简历 / 博客）+ 最新 3 篇文章 + 技能或亮点简述（从 resume 摘取可选）。
2. 每页 title / description；Open Graph 基础 meta（og:title, og:description, og:type）。
3. 集成 @astrojs/sitemap，生成 sitemap；添加 public/robots.txt 指向 sitemap。
4. 自定义 404 页面，风格与全站一致。
5. public/favicon.svg（简洁字母或图标）。
6. 博客阅读体验：行宽、字号、移动端间距优化。
7. npm run build 通过。
```

### 验收清单

- [ ] 各页浏览器标签 title 正确
- [ ] sitemap、robots.txt 可访问
- [ ] 404 路由正常
- [ ] favicon 显示

---

# 阶段 5：部署到 Cloudflare Pages

**状态：** `[x]` 已完成 · 2026-05-20

### CC Prompt

```text
为 Cloudflare Pages 部署做准备：
1. 确认 build 输出为 dist，astro.config 无错误。
2. 更新 README「部署」章节，步骤：
   - push 到 GitHub
   - Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect Git
   - Build: npm run build，Output: dist，Node 20
3. 如有需要，添加 wrangler 相关说明（仅文档，第一版可不引入 Workers）。
4. 检查无敏感信息（.env 不入库）；.gitignore 含 node_modules、dist、.env
5. npm run build 最终通过。
```

### 用户任务（CC 在 README 中写清，用户手动操作）

1. Push 代码到 GitHub。
2. Cloudflare → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**。
3. 选择仓库，构建设置见本文档「Cloudflare Pages 构建配置」。
4. 首次部署成功后访问 `https://<project-name>.pages.dev`。
5. 验证 `/resume`、`/blog`、`/rss.xml`。

### 验收清单

- [ ] 公网 URL 可访问
- [ ] 简历页、博客列表、文章详情正常
- [ ] 再次 `git push` 后自动重新部署（用户确认）

---

# 阶段 6：上线后维护（持续）

**状态：** 长期

| 操作 | 做法 |
|------|------|
| 发新文章 | 在 `src/content/blog/` 新建 `.md` → commit → push |
| 改简历 | 编辑 `src/data/resume.ts` → push |
| 改站点信息 | 编辑 `src/data/site.ts` → push |
| 本地预览 | `npm run dev` |

### 第二版 backlog（本阶段不实现，除非用户明确要求）

- [ ] 标签页 `/tags/[tag]`
- [ ] 站内搜索（Pagefind）
- [ ] 评论（Giscus）
- [ ] 访问统计（Umami / Cloudflare Web Analytics）
- [ ] 中英双语
- [ ] 绑定自有域名（Cloudflare DNS）

---

## CC 全局约束（每阶段遵守）

1. **最小改动**：只实现当前阶段范围，不提前做 backlog。
2. **构建必须通过**：每阶段结束运行 `npm run build` 并修复错误。
3. **汇报格式**（每阶段结束时输出）：
   - 完成了什么
   - 变更的文件列表
   - 用户需要执行的命令（若有）
   - 如何本地验证
   - 下一阶段名称
4. **不要提交**：`.env`、密钥、token。
5. **代码风格**：与 Astro 官方推荐一致；组件小而清晰；避免过度抽象。

---

## 阶段进度总览

| 阶段 | 名称 | 状态 |
|------|------|------|
| 0 | 环境与仓库 | `[x]` |
| 1 | 脚手架 + 布局 | `[x]` |
| 2 | 个人简历 | `[x]` |
| 3 | 博客系统 | `[x]` |
| 4 | SEO + 体验 | `[x]` |
| 5 | Cloudflare Pages 部署 | `[x]` |
| 6 | 持续维护 | 长期 |

---

## 给 CC 的启动指令（用户首次使用）

用户在新会话中可对 Claude Code 说：

```text
请阅读仓库根目录的 DEVELOPMENT_PLAN.md，从第一个未完成的阶段开始执行。
严格按文档中的 CC Prompt 和验收清单推进；每阶段结束前运行 npm run build。
```

---

*文档版本：1.0 · 部署目标：Cloudflare Pages · 功能：简历 + 博客*
