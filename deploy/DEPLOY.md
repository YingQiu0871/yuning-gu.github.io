# 部署指南：自有域名 + 境外 VPS

本文档把站点从 GitHub Pages 迁移到**自有域名 + 境外服务器**的完整流程写清楚。
整体架构（**双站**：学术主页 + 独立博客，各是一个仓库、各有一套部署）：

```
两个 GitHub 仓库（主页 / 博客）
      │  push 到 main
      ▼
GitHub Actions（各自构建静态站点）
      │  rsync over SSH
      ▼
你的 VPS（Caddy 自动 HTTPS）
   ├─ /var/www/site  →  https://yingqiu.me        （学术主页）
   └─ /var/www/blog  →  https://blog.yingqiu.me  （博客，独立仓库独立部署）
```

> 方案选的是**境外 VPS**，域名解析即可直接上线，**无需 ICP 备案**。

---

## 0. 域名现状（2026-08 查询）

| 域名 | 状态 |
| --- | --- |
| yingqiu.com / .net / .io | ❌ 已被注册 |
| **yingqiu.org / .me / .blog / .tech / .online** | ✅ 可注册 |

推荐在 [Porkbun](https://porkbun.com)、[Cloudflare](https://www.cloudflare.com/products/registrar/)、[NameSilo](https://www.namesilo.com) 注册（价格透明、续费不坑）。`yingqiu.me`（个人品牌感强）与 `yingqiu.org`（经典学术风）是最稳的选择。避免 `.cn`（需实名且政策风险高，没必要）。

站点代码里域名只出现在三个地方，改起来很快：

- `src/lib/site-content.ts` → `SITE_URL` 的默认值（或构建时用 `NEXT_PUBLIC_SITE_URL` 环境变量覆盖）
- `.github/workflows/deploy.yml` → `NEXT_PUBLIC_SITE_URL` 默认值（或 GitHub 仓库变量 `SITE_URL`）
- `deploy/Caddyfile` → `yingqiu.me` 与 `blog.yingqiu.me` 两个站点块

博客仓库同理：`src/lib/metadata.ts` 的 `SITE_URL` 默认值 + 博客仓库自己的工作流。**博客和主页的 GitHub Secrets 是同一套**（`DEPLOY_HOST` / `DEPLOY_USER=deployer` / `DEPLOY_SSH_KEY`），分别加在各自仓库即可，默认部署目录不同（`/var/www/site` 与 `/var/www/blog`）。

## 1. 买服务器

任何一家境外 VPS 均可，最低配（1 vCPU / 1 GB 内存 / 20 GB 盘）对纯静态站绰绰有余：

| 服务商 | 特点 | 参考价 | 付款 |
| --- | --- | --- | --- |
| [Hetzner](https://www.hetzner.com/cloud) | 德国/芬兰机房，欧洲延迟极低，性价比之王（**人在欧洲的首选**） | CX22 约 €4/月（2 vCPU/4 GB） | 信用卡 / PayPal |
| [RackNerd](https://www.racknerd.com) | 美国机房，常年促销，年付极便宜，支持支付宝 | 促销套餐约 $11/年 | 信用卡 / PayPal / 支付宝 |
| [搬瓦工 BandwagonHost](https://bandwagonhost.com) | CN2 GIA 优化线路，国内直连最快，但贵 | $49.99/年起 | 支付宝 / PayPal |
| [Vultr](https://www.vultr.com) / [DigitalOcean](https://www.digitalocean.com) | 界面友好、文档全，有法兰克福机房 | $5–6/月 | 信用卡 / PayPal |

**建议**：人在法国优先 [Hetzner](https://www.hetzner.com/cloud)（本机访问毫秒级、价格最低）；国内访客多也不必买 CN2 贵线路——静态站套上 Cloudflare 免费 CDN 后，美国 $11/年 的 [RackNerd](https://www.racknerd.com) 也完全够用。Hetzner 注册可能需要身份验证，偶尔拒新号；被拒就换 RackNerd 或 Vultr，部署流程完全相同。

### 已有 Azure 学生订阅？（免买服务器）

Azure for Students 含 $100 额度 + 12 个月免费服务（[学生优惠说明](https://studentdiscounthub.com/en/deals/azure-edu/)），可以直接用，不必再买 VPS：

1. 用学校邮箱开通 [Azure for Students](https://azure.microsoft.com/free/students/)，通常需要学生身份验证。
2. 创建虚拟机：镜像 **Ubuntu Server 24.04 LTS**，规格 **B1s**（1 vCPU / 1 GB，免费 750 小时/月），区域选 **France Central**（人在法国延迟最低；境外区域免备案。若无该区域可用则选 West Europe）。

> 免费 750 小时/月只对应两种规格：**B1s**（Linux 用途）与 **B2pts v2**（2 vCPU / 2 GB，Windows 用途）。**B2ts v2 等其他规格不在免费清单内**，会按量消耗 $100 额度。另外每种规格只能常开一台（一台 24/7 每月约 730 小时）。
3. 网络：创建时勾选 **SSH(22)/HTTP(80)/HTTPS(443)** 入站端口（自动生成 NSG）；公共 IP 选**静态**（动态 IP 在停机后可能变化，会导致 DNS 失效）。
4. 之后流程与买 VPS 完全相同：登录 VM 跑 `setup-server.sh` → 配 GitHub Secrets。

免费层 12 个月到期后，用 $100 额度继续付（B1s 约 $8–10/月；学生身份有效期间额度每年续期，[续期说明](https://learn.microsoft.com/en-sg/answers/questions/5870664/azure-for-students-renewal)）。

如果你不想要真服务器，学生包还包含 **Azure Static Web Apps 免费层**（自定义域名 + 自动 HTTPS、与 GitHub Actions 原生集成、零成本零运维），只是它属于托管平台、不能跑其他服务。

系统选 **Debian 12 或 Ubuntu 22.04/24.04**。购买时记住三件事：拿到服务器 **IP**、拿到 **root 密码/密钥**、防火墙（安全组）放行 **22（SSH）、80、443** 端口。

## 2. 解析域名

在域名注册商（或 Cloudflare）的 DNS 控制台添加记录（把服务器 IP 填进去）：

| 类型 | 主机记录 | 值 |
| --- | --- | --- |
| A | @ | 服务器 IPv4 |
| A | blog | 服务器 IPv4 |
| AAAA | @ | 服务器 IPv6（可选） |
| CNAME | www | yingqiu.me |

> 如果用 Cloudflare 做 DNS，SSL/TLS 模式选 “Full” 即可（证书由 Caddy 负责）。也可以暂时开着云朵代理（防暴露真实 IP），不影响 Caddy 签发证书。

## 3. 初始化服务器

1. 把本仓库的 `deploy/` 目录传到服务器（scp、或直接粘贴内容均可）。
2. 本机生成一对**部署专用** SSH 密钥：

   ```bash
   ssh-keygen -t ed25519 -f ~/.ssh/deploy_key -C "github-actions"
   ```

3. 在服务器上以 root 运行（公钥换成你的 `~/.ssh/deploy_key.pub` 内容）：

   ```bash
   bash deploy/setup-server.sh yingqiu.me "ssh-ed25519 AAAA... github-actions"
   ```

   脚本会：安装 Caddy → 创建 `deployer` 用户（带该公钥）→ 建 `/var/www/site` → 写入并启动 Caddy 配置。

4. 验证：`curl -I https://yingqiu.me` 应返回 200（证书全自动，无需手动续期）。

## 4. 配置 GitHub Actions

仓库 **Settings → Secrets and variables → Actions** 添加：

**Secrets（密钥）：**

| 名称 | 值 |
| --- | --- |
| `DEPLOY_HOST` | 服务器 IP 或域名 |
| `DEPLOY_USER` | `deployer` |
| `DEPLOY_SSH_KEY` | `~/.ssh/deploy_key` 的**私钥**内容（含头尾 `-----BEGIN/END-----`） |
| `DEPLOY_PORT` | SSH 端口（默认 22 可省略） |

**Variables（变量，可选）：**

| 名称 | 值 |
| --- | --- |
| `SITE_URL` | `https://yingqiu.me`（不设则用工作流里的默认值） |

之后 **push 到 `main` 即自动上线**；也可以在 Actions 页手动 “Run workflow”。

## 5. 日常使用

```bash
# 本地预览（含博客草稿）
npm run dev

# 本地全量检查
npm run typecheck && npm run lint && npm run build

# 只重新生成 RSS（feed.xml 也会在 build 前自动生成）
npm run feed
```

写博客：在**博客仓库**的 `content/blog/en/` 与 `content/blog/zh/` 里按相同文件名写 MDX 即可（字段说明见博客站内《如何在本博客写一篇文章》）。推送后约 1–2 分钟上线。

## 6. 换域名 / 换服务器

- **换域名**：改 `SITE_URL`（变量或文件默认值）+ `deploy/Caddyfile` 两处域名，重跑 `setup-server.sh`，更新 DNS。
- **换服务器**：新机器重跑第 3 步，DNS 改指向，删旧机器。站点内容全在 git 仓库里，服务器本身无状态、可随时重建。

## 7. 常见问题

- **HTTPS 报证书错误**：多半是 DNS 还没生效或 A 记录指错，`dig yingqiu.me` 确认解析到了服务器 IP。
- **rsync 权限被拒**：确认 `deployer` 是 `/var/www/site` 的属主（脚本已处理；手动建目录时用 `chown -R deployer:deployer /var/www/site`）。
- **国内访问慢**：境外 VPS 的正常现象；可套 Cloudflare CDN 缓解。
- **服务器防火墙**：80/443 必须放行，22 建议限制来源或改用高位端口。

## 8. 备选：Docker 部署

不用系统级 Caddy 的话，服务器装 Docker 后一条命令构建并运行：

```bash
docker compose -f deploy/docker-compose.yml up -d --build
```

镜像内完成构建 + Caddy 托管，80/443 自动映射，效果与方案一相同。

## 9. 套 Cloudflare 免费 CDN（推荐）

作用：隐藏源站真实 IP、免费 DDoS 防护、全球加速（含国内访问优化）。源站 Caddy 已有有效证书，可无缝开启严格 TLS。

1. 注册 [Cloudflare](https://dash.cloudflare.com/sign-up) → **Add a site** → `yingqiu.me` → **Free** 计划。
2. 它会扫描并导入现有记录；确认（没有就手动加）：
   - `A @ 51.107.68.55`（代理状态：**橙云**）
   - `CNAME www yingqiu.me`（**橙云**）
3. **SSL/TLS → Overview**：加密模式选 **Full (strict)**（源站证书有效，此模式最安全）。
4. **SSL/TLS → Edge Certificates**：打开 **Always Use HTTPS**。
5. **Security → Settings**：Security Level 选 Medium，可开 Bot Fight Mode。
6. Cloudflare 会提供**两个 Nameserver** 地址；去 Spaceship → 域名管理 → Nameservers → Custom，把 Cloudflare 的两个 NS 填进去（若 Spaceship 开着 DNSSEC 先关掉）。NS 切换通常几分钟到几小时生效。
7. 生效后回 Cloudflare 验证状态为 Active。之后**源站加固（可选但推荐）**：Azure NSG 的 80/443 入站规则把来源限制为 [Cloudflare IP 段](https://www.cloudflare.com/ips/)，从此只有 Cloudflare 能直连源站，扫描器和攻击全部被挡在 CF 之外。

注意：套了 CF 后，Caddy 的证书续期走 http-01 挑战、经由 Cloudflare 转发，照常自动完成，无需干预。
