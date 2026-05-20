# 个人网站

个人简历 + 博客，基于 Astro + Tailwind CSS，部署在 Cloudflare Pages。

## 本地开发

```bash
npm install
npm run dev        # 启动开发服务器，默认 http://localhost:4321
```

## 构建

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建结果
```

## 部署到 Cloudflare Pages

### 前提

- GitHub 仓库（推送代码后操作）
- Cloudflare 账号

### 部署步骤

1. 将代码推送到 GitHub：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

2. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**。

3. 选择 GitHub 仓库，配置构建设置：

| 设置项 | 值 |
|--------|-----|
| Framework preset | Astro（或 None） |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node.js version | `20` |

4. 点击 **Save and Deploy**。

5. 部署成功后访问 `https://<项目名>.pages.dev`。

6. 验证各页面：`/resume`、`/blog`、`/rss.xml`。

### 后续更新

- 发新文章：在 `src/content/blog/` 新建 `.md` → `git commit` → `git push`（自动部署）
- 改简历：编辑 `src/data/resume.ts` → push
- 改站点信息：编辑 `src/data/site.ts` → push

详细开发计划见 [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)。

