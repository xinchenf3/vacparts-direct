# VacParts Direct 网站部署 SOP

> 一句话流程：**本地改文件 → `git push` 到 GitHub → GitHub Pages 自动上线 → curl 验证**
> 记住核心教训：**本地文件改了 ≠ 线上更新了，必须 push 才算发布。**

---

## 一、前置条件（一次性确认）

| 项目 | 值 |
|---|---|
| 本地源码目录 | `/workspace/vacparts-direct/` |
| GitHub 仓库 | `https://github.com/xinchenf3/vacparts-direct` |
| 部署分支 | `main` |
| 自定义域名 | `vacparts-direct.com`（由仓库内 `CNAME` 文件绑定，**别删**） |
| 部署平台 | GitHub Pages（DNS 指向 GitHub，非 Cloudflare） |
| 发布方式 | Push 即自动构建，无需手动上传 |

> ⚠️ **CNAME 文件是自定义域名的关键**：覆盖/同步文件时切勿删除仓库根目录的 `CNAME`，否则域名绑定失效、网站变 `xinchenf3.github.io` 原始地址。

---

## 二、标准发布步骤（每次改完都走这套）

```bash
# 1. 进本地源码目录
cd /workspace/vacparts-direct

# 2. 确认改的是最新文件（避免改了旧副本）
grep -c "model:" js/main.js          # 应为 10（产品数量）

# 3. 推送到 GitHub（gh 已登录 xinchenf3 账号）
git init -q 2>/dev/null || true
git remote add origin https://github.com/xinchenf3/vacparts-direct.git 2>/dev/null || true
git fetch origin
git reset --hard origin/main        # 以线上为基准，避免历史冲突
# （若本地有新增/修改，先 cp 覆盖再继续，见下方"安全覆盖"）

git add -A
git commit -m "update: <一句话说明改了啥>"
git push origin main
```

**安全覆盖做法**（本地是修正版、要整体替换线上时）：
```bash
git clone https://github.com/xinchenf3/vacparts-direct.git /tmp/vpd-clone
cp -r /workspace/vacparts-direct/. /tmp/vpd-clone/   # 覆盖，保留 CNAME/.git
cd /tmp/vpd-clone
git add -A && git commit -m "fix: <说明>" && git push origin main
```

---

## 三、发布后验证（必做，别假设成功了）

```bash
# 等 ~1 分钟让 GitHub Pages 构建完，再查：

# 1. 首页关键文案（应为新版，旧头衔应为 0 命中）
curl -s https://vacparts-direct.com/ | grep -c "Official LEFOO Partner"   # 期望 0
curl -s https://vacparts-direct.com/ | grep -o "LEFOO Brand Products" | head -1

# 2. 子页面状态码（期望 200，不是 404）
curl -s -o /dev/null -w "%{http_code}\n" https://vacparts-direct.com/ar.html
curl -s -o /dev/null -w "%{http_code}\n" https://vacparts-direct.com/dl.html

# 3. 产品数量（线上 js 应含 10 个 model:）
curl -s https://vacparts-direct.com/js/main.js | grep -c "model:"
```

> 验证全部通过 = 发布成功。任一异常，回看推送是否真成功（`git log` 最新 commit 是否在 origin/main）。

---

## 四、防坑清单（血泪教训）

- [ ] **改完必须 push**：本地 10 产品/新文案，但线上还是 4 产品/旧头衔——根因就是没 push，本地≠线上。
- [ ] **CNAME 别动**：删了自定义域名就掉了。
- [ ] **加 `.nojekyll`**：仓库根放一个空 `.nojekyll`，防止 GitHub Pages 误启 Jekyll 处理导致 `_` 开头文件/路径异常。
- [ ] **头衔合规**：线上只能用 "LEFOO Brand Products"，**禁止 "Official LEFOO Partner / 授权经销商"**（你非授权经销商，且会进谷歌索引固化）。
- [ ] **产品数对齐**：线上产品页、报价表、站内文案的型号数量要一致，别写 "35+ Models" 又只挂 10 款。
- [ ] **阿拉伯语版同步**：ar.html 改英文文案时，对应阿拉伯语段落也要同步改，避免双语不一致。

---

## 五、谷歌收录与刷新

- 查收录：`site:vacparts-direct.com`（小站常漏报，不准）；直接搜 `vacparts-direct.com` 看首页是否在结果里。
- 改版后主动刷新：Google Search Console → URL 检查 → 请求重新收录（首页 + ar.html）。
- 摘要里的旧头衔会在谷歌重新抓取后自动更新。

---

## 六、安全待办（重要）

- ⚠️ **撤销并更换 GitHub Token**：当前 `gh` 用的 `ghp_***` 属"曾泄露风险"凭证。站点修好后请到
  GitHub → Settings → Developer settings → PAT **撤销旧 token**，重新 `gh auth login`。
- 换 token 前，勿再用旧 token 做敏感操作；日常发布用新 token 即可。

---

## 七、目录结构速查

```
vacparts-direct/
├── index.html        # 英文首页（主入口）
├── ar.html           # 阿拉伯语版
├── dl.html           # 下载页
├── css/style.css
├── js/main.js        # 产品数组（model: 共 10 款）
├── images/
├── CNAME             # 自定义域名绑定（勿删）
└── .nojekyll         # 禁用 Jekyll（建议补加）
```
