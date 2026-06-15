# Layouts · 风格 C 企家有道企业风（qjyd-corp）

13 个原始登记版式 · 圆角企业 SaaS 美学 · 每个版式说明用途、骨架、关键类名。

> ⚠️ 这套版式与风格 A（电子杂志/电子墨水）和风格 B（瑞士国际主义）**完全不通用**。一份 deck 只能选一套风格。

---

## qjyd-corp locked mode（必须先读）

本主题的 golden source 是：

`assets/template-corp.html`

生成正文页时不要把 qjyd-corp 当成"自由组合的风格包"。默认只能使用本文档登记的 `C01-C13`。每个 slide 都必须在 `<section>` 上写 `data-layout="Cxx"`。

**关键约束**：

- 这套风格**面向企业销售/产品介绍/商务提案**，不适合做艺术、文学、文化类内容。
- 不允许临时发明原始 13 个之外的正文结构。
- SVG 只画几何/装饰图，不放可见正文文字（一切正文都用 HTML）。
- 当用户没指定主题时，**默认使用 🌿薄荷企业**主题（见 `themes-corp.md`）。

---

## 设计语言基线（C 风格）

### 配色（`--accent` 由主题决定，见 `themes-corp.md`）

```css
--accent:        #00BFA5;      /* 海洋青（薄荷企业默认） */
--accent-dark:   #00A896;      /* 渐变深色端 / hover */
--accent-soft:   #E6FFF9;      /* accent 浅化版（卡片底） */
--accent-on:     #ffffff;      /* accent 上的文字色 */

--ink:           #1F2D3D;      /* 主文字（冷藏深蓝，不用纯黑）*/
--text-2:        #5A6B7B;      /* 次要文字 */
--text-3:        #8A97A3;      /* 辅助 / 说明 */
--paper:         #FFFFFF;      /* 主底 */
--paper-soft:    #F7FAFB;      /* 卡片 / 微凹底 */
--paper-dark:    #1F2D3D;      /* 深色块底 */
```

### 字体

```css
--sans:    "Helvetica Neue","Helvetica","Inter","Arial","Segoe UI",system-ui,sans-serif;
--sans-zh: "PingFang SC","Hiragino Sans GB","Source Han Sans SC","Noto Sans SC","Microsoft YaHei UI","微软雅黑",sans-serif;
--mono:    ui-monospace,"SF Mono",Menlo,Consolas,monospace;
```

**字号阶梯**（统一通过 token class 使用，禁止裸写 font-size）：

| token | 字号 | 用途 |
|---|---|---|
| `.qjyd-display` | clamp(80px, 8.6vw, 172px) | 封面巨标 |
| `.qjyd-h1` | clamp(40px, 3.2vw, 88px) | 章节大标 |
| `.qjyd-h2` | clamp(18px, 1.6vw, 30px) | 卡片副标 |
| `.qjyd-lead` | clamp(16px, 1.55vw, 22px) | 引言 |
| `.qjyd-body` | clamp(14px, 1.05vw, 18px) | 正文 |
| `.qjyd-meta` | 13px, letter-spacing:.14em | kicker / tag |

### 形态

| 项 | 值 | 备注 |
|---|---|---|
| 圆角 卡片 | `--radius-card: 8px` | 主卡 |
| 圆角 按钮 | `--radius-btn: 6px` | 主按钮 |
| 圆角 hero | `--radius-hero: 12px` | 大图 |
| 阴影 elevation-1 | `0 2px 8px rgba(31,45,61,.06)` | 卡片默认 |
| 阴影 accent CTA | `0 4px 14px rgba(0,191,165,.28)` | 主按钮 |
| 间距 | `--sp-3..13` = 8/12/16/24/32/40/48/64/80/96/160 px | 8 倍数 |

### 背景

**不用 WebGL**。统一用 SVG 几何浮动层 `.qjyd-bg`（只在 hero 页 fade-in，其他页隐藏）。

### 动效

复用瑞士 Motion One recipe + 柔化 easing `cubic-bezier(.2,0,.2,1)`。截图模式 `?clean=1` 跳过 motion 加载。

---

## 16 个版式速查

| ID | 名称 | data-animate | 用途 | 场景偏向 |
|---|---|---|---|---|
| C01 | 封面 hero | `hero` | 品牌封面 / 产品 hero | 通用 |
| C02 | 章节封 | `chapter` | 大章节分隔 | 通用 |
| C03 | 议程目录 | `agenda` | 6 行章节列表 | 通用 |
| C04 | 大数字 KPI | `kpi-tower` | 单核心 KPI + case study | 通用 |
| C05 | 三段 KPI | `kpi-triple` | 横向并排 3 数据 | 通用 |
| C06 | 时间轴 | `timeline` | 公司/客户上线流程 | 通用 |
| C07 | 4 卡片矩阵 | `cards-2x2` | 4 模块/能力（重展览） | 提案偏多 |
| C08 | 图文左右 | `split-reveal` | 文字+产品截图 | 提案 |
| C09 | 大图全屏 | `image-hero` | 客户故事 / 团队照 | 提案 |
| C10 | 引言金句 | `quote` | 客户证言 / 高管引言 | 提案 |
| C11 | 数据对比表 | `compare` | 3 方案对比 | 通用 |
| C12 | 团队介绍 | `team` | 3-4 人卡片 | 提案 |
| **C14** | **纯文字主张** | **`statement`** | **巨标 + accent rule + 要点 / 引言** | **周报 / 复盘 / 内部同步** |
| **C15** | **成果 / 瓶颈对照** | **`status-duo`** | **DONE 左 vs NEXT 右, 无图** | **周报 / 月报 / 复盘** |
| **C16** | **要点墙 (3 列)** | **`bullet-manifest`** | **6 项纯文字要点, 顶部 hairline** | **周报 / 待办 / 复盘亮点** |
| C13 | 结束页 | `hero` | Thank You / 联系方式 | 通用 |

> **场景偏向说明**: C08 / C09 / C10 / C12 是为"对外讲故事的销售提案"设计的（需要图、客户证言、团队介绍）。
> 做**周报、月报、复盘、团队同步**这类"对内同步进展"的 deck 时，优先使用 **C14 / C15 / C16**——它们是低图密度、高文字密度的版式，避免出现"为了用版式而塞图占位"的尴尬。

---


## C01 · 封面 hero

**用途**：品牌封面、产品 hero、章节大封。

**骨架**：左 60% 文字 + 右 40% SVG 几何装饰。

```html
<section class="slide hero light" data-layout="C01" data-animate="hero">
  <div class="qjyd-cover">
    <div class="cover-left" data-anim>
      <!-- 顶部 brand 区: logo + 公司名 + 分割线 -->
      <div class="brand-block">
        <div class="brand-head">
          <div class="qjyd-logo-mark">薪</div>
          <div>
            <div class="qjyd-meta" style="color:var(--accent-dark)">XINRENXINSHI · SaaS HR PLATFORM</div>
            <div style="font-family:var(--sans-zh);font-size:14px;color:var(--text-2);margin-top:4px;font-weight:500">企家有道网络技术 (北京) 有限公司</div>
          </div>
        </div>
      </div>

      <!-- 中段 hero 文案 -->
      <div data-anim style="display:flex;flex-direction:column;gap:var(--sp-7)">
        <div class="qjyd-display">
          薪人薪事<br>
          <span class="accent-line">智能人力中台</span>
        </div>
        <div class="qjyd-lead" style="max-width:42ch">
          一站式打通招聘、入转调离、薪酬绩效与组织发展，<br>
          让 HR 从重复工作中解放，把时间留给战略与人。
        </div>
      </div>

      <!-- 底部 CTA + 微数据 -->
      <div data-anim style="display:flex;flex-direction:column;gap:var(--sp-5)">
        <div style="display:flex;gap:var(--sp-4)">
          <button class="qjyd-btn">立即了解 →</button>
          <button class="qjyd-btn ghost">预约 Demo</button>
        </div>
        <div style="display:flex;gap:var(--sp-9);font-size:15px;color:var(--text-2)">
          <span><b style="color:var(--accent-dark);font-weight:700;font-size:28px">12,000<span style="font-size:18px">+</span></b>&nbsp;&nbsp;服务企业</span>
          <!-- ... 更多数据栏 -->
        </div>
      </div>
    </div>
    <div class="cover-right" data-anim>
      <svg viewBox="0 0 600 600">
        <!-- 4 叶片旋转环 + 中心 logo (具体见模板) -->
      </svg>
    </div>
  </div>
  <div class="qjyd-foot">...</div>
</section>
```

**⚠️ 使用注意**：
- 主标限 **6 字以内**（默认字号下不会折行），7 字及以上请手动 `<br>` 主动断行。
- `.accent-line` 用 `-webkit-background-clip:text` 做渐变填色，**必须 `display:inline-block`** 才能正确 clip。
- SVG 是装饰性，不要在里面写正文文字（页码、品牌名等用 HTML）。

---

## C02 · 章节封

**用途**：大章节分隔（"Part 02 · 产品架构"）。

**骨架**：左大数字 + 中文字 + 右环形装饰，三栏 grid。

**关键类**：`.qjyd-chapter`、`.ch-num`（巨数字）、`.ch-body`（标题文案）、`.ch-deco`（装饰）。

**示例数据**：章节号 "02"、主标"产品架构 · 从招聘到组织发展"。

---

## C03 · 议程目录

**用途**：演讲开始的 "今天聊什么"。

**骨架**：左标题 + 右 2×3 列表（6 项），每项含 num + title + desc。当前项加 `.current` class 高亮。

**关键类**：`.qjyd-agenda`、`.ag-item`、`.ag-num`、`.ag-title`、`.ag-desc`、`.ag-item.current`。

**布局要点**（2026-06 更新）：
- `.qjyd-agenda` 用 `align-content:stretch`，6 张卡自动撑满整屏垂直空间，**禁止改回 `align-content:start`**（会回到"挤左上"老问题）。
- `.ag-num` 字号 `clamp(56px, 4.4vw, 84px)` + 字重 300（越大越细原则），**不要回退到 36px/700**。
- `.ag-item` 默认带浅灰底（`var(--paper-soft)`），让 6 张卡有视觉重量，不是裸文字列表。

---

## C04 · 大数字 KPI

**用途**：单个核心 KPI + case study 说明。

**骨架**：左大数字 + 右案例卡 + bullet 列表。

**关键类**：`.qjyd-kpi-hero`、`.num-side`、`.ctx-side`、`.qjyd-kpi-mega`（巨数）、`.qjyd-kpi-unit`、`.qjyd-card.soft`、`.qjyd-bullet`。

**左侧三段式必填**（2026-06 新增，避免左列下半空旷）：
- 顶：`.num-meta-row` + `.nm-chip` × N（客户类型/规模/模块标签）
- 中：`.qjyd-kpi-mega` + 副标
- 底：`.ba-block`（before/after 对比条），子类 `.ba-row` / `.ba-label` / `.ba-old`（删除线旧值）/ `.ba-new`（accent 新值）/ `.ba-unit` / `.ba-bar > i`（进度条，`style="width:N%"`）

容器走 `align-items:stretch` + 两栏 `justify-content:space-between`，**禁止只用 `mega + 一行副标`，会让左下大段空白**。

---

## C05 · 三段 KPI

**用途**：横向并排 3 个核心数据。

**骨架**：3 列 grid，每列 `.kpi-cell`（数+label+desc），第三个加 `.accent` class 做高亮强调列。

**关键类**：`.qjyd-kpi-triple`、`.kpi-cell`、`.kpi-cell.accent`、`.kpi-num`、`.kpi-sfx`、`.kpi-label`、`.kpi-desc`。

---

## C06 · 时间轴

**用途**：公司发展史、客户上线流程、产品演进。

**骨架**：5 列 grid + 横向 track 连接线 + 圆点 + 当前节点高亮放大。

**关键类**：`.qjyd-timeline`、`.tl-track`（背景线）、`.tl-node`、`.tl-dot`、`.tl-year`、`.tl-title`、`.tl-desc`、`.tl-node.current`。

**布局要点**（2026-06 更新）：
- 节点用 flex column + `min-height:44vh`，dot/year 在上半部分（贴轨线），`.tl-title` 用 `margin-top:auto` 推到下部，避免内容堆顶导致下半屏空白。
- 年份字号 `clamp(30px,2.8vw,48px)` + 字重 400（"越大越细"），不要回退到旧版 800 / 32px。

**⚠️ 节点数建议 4-5 个**（多于 5 个会挤）。

---

## C07 · 4 卡片矩阵

**用途**：产品矩阵 / 4 大能力 / 4 个模块。

**骨架**：2×2 grid 卡片，每卡含 icon + title + desc + 右上角 tag。最后一卡通常加 `.accent` 做品牌色实底强调。

**关键类**：`.qjyd-cards-2x2`、`.module-card`、`.m-icon`、`.m-title`、`.m-desc`、`.m-tag`、`.module-card.accent`、`.m-chips`、`.m-chip`。

**卡片必须有 chip 行**（2026-06 新增，避免下半截空旷）：
- 每张 `.module-card` 在 `.m-desc` 之后必须追加 `.m-chips`，内含 3-5 个 `.m-chip`（具体子能力）。
- `.m-chips` 用 `margin-top:auto` 自动推到卡片底部，让 icon 在顶、chip 在底，重量均衡。
- `.m-icon` 尺寸 56×56 + 圆角 14（不是 48×48）。
- `.accent` 卡的 chip 自动反白。

**Icon 用 inline SVG**（24×24，`stroke="currentColor"`，自动跟随卡片色变）。

---

## C08 · 图文左右

**用途**：产品功能说明 + 配图（截图/示意图）。

**骨架**：左文字（lead + 卡片 + CTA）+ 右图占位区。

**关键类**：`.qjyd-split`、`.text-side`、`.image-side`（带 IMAGE PLACEHOLDER 水印）。

**右侧 `.image-side` 必须有内容**（2026-06 新增）：模板里已内置占位 mock SVG（手机框 + 对话气泡 + 输入框），真实项目用 `<img src="./images/03-xinling.png">` 替换。**不要保留空 div + 注释**，会让模板首次预览看起来像残缺品。

**生产时**：替换 `.image-side` 内容为真实 `<img src="./images/xxx.png">` 或 SVG。

---

## C09 · 大图全屏

**用途**：客户故事页、团队照、产品截图主推。

**骨架**：左 35% 文字 + 右 65% 大图区，右侧默认是青绿渐变 + 圆点 pattern 占位。

**关键类**：`.qjyd-image-hero`、`.ih-left`、`.ih-right`、`.ih-tag`、`.ih-tag.accent`。

**布局要点**（2026-06 更新）：
- `.ih-right` 默认放占位 mock SVG（团队剪影 + 数据徽章），真实项目替换为 `<img>` 客户照片或产品图。
- `.ih-left` 底部除 `6.5×` 大数字外，必须有一个 CTA 按钮（`.qjyd-btn`），避免左下空。

---

## C10 · 引言金句

**用途**：客户证言、高管引言、关键观点强调。

**骨架**：居中布局，巨大引号 + 大字 quote + 底部分割线 + 头像 + 人名职位。

**关键类**：`.qjyd-quote`、`.q-mark`（巨引号）、`.q-text`、`.q-author`、`.q-avatar`、`.q-name`、`.q-title`。

**布局要点**（2026-06 更新）：
- 引号字符必须用 U+201C `“`（`&ldquo;` 或 `“`），不要用半角 `"`。
- `.q-mark` 字号 `clamp(180px,16vw,280px)` + `line-height:0.55`，让引号"挤"在引文上方做视觉锚点。

**⚠️ 引言字数控制在 30-60 字**（多了字号会被挤小）。

---

## C11 · 数据对比表

**用途**：升级前后、多方案对比、竞品对比。

**骨架**：3 列卡片，每列 head + 5 行数据。最后一列加 `.highlight` 做品牌色高亮 + `RECOMMENDED` 徽章。

**关键类**：`.qjyd-compare`、`.cmp-col`、`.cmp-col.highlight`、`.cmp-head`、`.cmp-row`、`.cmp-val`、`.cmp-badge`。

**⚠️ 数据行控制在 5-6 行**（不然下方留白少）。

---

## C12 · 团队介绍

**用途**：核心团队 3-4 人介绍。

**骨架**：4 列卡片，每卡 avatar（首字母圆球，渐变背景）+ name + title + bio。

**关键类**：`.qjyd-team`、`.team-card`、`.t-avatar`、`.avatar-1..4`（4 种渐变色）、`.t-name`、`.t-title`、`.t-bio`。

**头像必须几何化**（2026-06 重要更新）：
- 旧 `.avatar-1..4` 仅保留兼容，**新内容必须用 `.t-avatar-1`~`.t-avatar-4`**（4 种 clip-path 形状：八边形/圆/六边形/五边形）。
- HTML 结构：`<div class="t-avatar t-avatar-N"><span class="t-initial">字</span></div>`。
- 每张 `.team-card` 必须加 `.t-role-chip` 角色 chip，放在 `.t-title` 之后。
- `.team-card` 加 `height:100%` 配合 `.t-bio` 的 `margin-top:auto`，bio 自动贴底。

**头像替换**（2026-06 更新）：现在默认用 `.t-avatar-N` 几何形状（通过 `clip-path`），不再用圆+首字母。生产如需真实照片直接用 `<img class="t-avatar" src="...">` 覆盖即可。

---



## C14 · 纯文字主张 / Statement

**用途**：周报核心结论、复盘洞察、阶段性表态、产品 manifesto。整页**无图、无 KPI 大字、无卡片矩阵**，只用排版和留白说话。

**两个变体**：

### 变体 A · dense（默认 · 周报 / 复盘高频）

巨标题 + accent 横线 + 3-4 条带数据强调的要点。

```html
<section class="slide light" data-layout="C14" data-animate="statement">
  <div class="qjyd-statement dense">
    <div class="st-kicker" data-anim>STATEMENT · 阶段性结论</div>
    <h1 class="st-display" data-anim>
      机器多承担一点，<br>
      <span class="accent-line">人工才有空间创造</span>。
    </h1>
    <div class="st-rule" data-anim></div>
    <ul class="st-points" data-anim>
      <li>智齿独立承接率达 <b>93%</b> · 创 Q2 单周新高</li>
      <li>人工工时人效 <b>93.97%</b> · 时间进度 79.12%</li>
      <li>知识自沉淀 3.0 上线 · <b>85%</b> 可直接入库</li>
      <li>下一步 · 把客服助手与小薪 / 知识库联动起来</li>
    </ul>
    <div class="st-meta" data-anim>
      <span><b>WEEKLY · 2026.06.12</b></span>
      <span>客户服务部 · 内部同步</span>
    </div>
  </div>
  <div class="qjyd-foot">...</div>
</section>
```

### 变体 B · sparse（manifesto / 表态）

巨标 + accent 横线 + 一段引言（用 `<em>` 包关键短语，自动加 accent 高亮）。

```html
<section class="slide light" data-layout="C14" data-animate="statement">
  <div class="qjyd-statement sparse">
    <div class="st-kicker" data-anim>POSITION · 我们怎么看</div>
    <h1 class="st-display" data-anim>
      客服的下一个十年，<br>
      <span class="accent-line">不是更多坐席</span>。
    </h1>
    <div class="st-rule" data-anim></div>
    <p class="st-lede" data-anim>
      我们认为，客服效率的拐点不在话务量，<br>
      而在 <em>机器与知识的耦合密度</em>。
      智齿独立承接率每提升一个百分点，
      意味着<em>一线坐席</em>能多出一份精力，
      把 <em>沉淀的问题</em> 变成 <em>沉淀的知识</em>。
    </p>
    <div class="st-meta" data-anim>
      <span><b>2026 Q2</b></span>
      <span>客户服务 · 战略备忘录</span>
    </div>
  </div>
  <div class="qjyd-foot">...</div>
</section>
```

**关键设计**：

- 巨标 `font-size: clamp(64px, 6.4vw, 124px)`、weight 700、line-height 0.98——视觉锚点
- `<span class="accent-line">` 用渐变文字色（120deg #00D4B5 → #00897B），不是背景色块
- `.st-rule` 是 96×5 的实色 accent 横线，作为标题与下方内容的视觉分隔，**同时是动效中"横向拉伸"的载体**
- dense 的 `<b>` 自动用无衬线 + accent-dark + weight 700——数字强调用
- sparse 的 `<em>` 自动用 65% 高度的 accent 透明块作背景（像荧光笔），**font-style 仍是 normal**

**适用与不适用**：

| ✅ 适用 | ❌ 不适用 |
|---|---|
| 周报关键结论"这周做成了 X" | 客户证言（用 C10） |
| 复盘洞察"我们意识到 Y" | 多个并列模块的展示（用 C07） |
| 阶段性表态"接下来要 Z" | 数字密集的 KPI 展示（用 C04 / C05） |
| 战略备忘录、产品 manifesto | 流程 / 时间线（用 C06） |

**常见错误**：

1. ❌ 巨标超过 24 个中文字符——会被 `max-width: 24ch` 强行换多行，节奏崩溃。**先改文案**，再调字号
2. ❌ dense 的 bullet 超过 4 条——网格是 2 列，5 条以上会导致最后一行只有 1 条孤儿
3. ❌ sparse 的引言超过 3 行——超出会顶到 `.st-meta`，应该改用 dense 拆成 bullet
4. ❌ 同一份 deck 出现两页 C14——statement 是稀缺资源，太多就稀释了"我有重要论断"的语义


## C15 · 成果 / 瓶颈对照 / Status Duo

**用途**：左栏"DONE / 本周成果"，右栏"NEXT / 待打通"。两栏 1:1 等宽，中间 hairline 分隔，**整页无图**。

**核心设计原则**：

- **左 = accent 海洋青（成果） · 右 = 中性灰（瓶颈/下一步）**
- ❌ 不要用红色给"瓶颈"上色——会变成"出问题告警"，但实际"瓶颈"绝大多数是中性的"下一步"
- DONE 用 accent 实心方点 ●（带 4px 光晕）/ NEXT 用空心圆环 ○

**完整骨架**：

```html
<section class="slide light" data-layout="C15" data-animate="status-duo">
  <div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-7)" data-anim>
    <div class="qjyd-meta">PROGRESS · 知识自沉淀 3.0</div>
    <h1 class="qjyd-h1">本周成果与下一步</h1>
  </div>
  <div class="qjyd-status-duo">
    <div class="sd-col done">
      <div class="sd-tag"><span class="sd-mark"></span>DONE · 本周成果</div>
      <div class="sd-title">3.0 优化完成<br>本周正式启用</div>
      <ul class="sd-points">
        <li><b>85%</b> · 沉淀可直接入库知识占比</li>
        <li><b>100%</b> · 待人工审核分类准确率</li>
        <li>本周起进入正式运营周期</li>
        <li>话后批量沉淀已稳定运行</li>
      </ul>
    </div>
    <div class="sd-rule"></div>
    <div class="sd-col next">
      <div class="sd-tag"><span class="sd-mark"></span>NEXT · 待打通</div>
      <div class="sd-title">知识全自动入库<br>仍差最后一环</div>
      <ul class="sd-points">
        <li>低代码平台知识库接口尚未开放</li>
        <li>当前依赖 <b>手动上传</b> 完成同步</li>
        <li>待开放接口后即可全自动化</li>
        <li>计划与平台侧本月内对齐方案</li>
      </ul>
      <div class="sd-foot">瓶颈不在自沉淀质量, 而在与下游知识库的连接通道。</div>
    </div>
  </div>
  <div class="qjyd-foot">...</div>
</section>
```

**容量规则**：

- `.sd-title` 副标，最多 2 行（用 `<br>` 主动换行控制节奏）
- `.sd-points` 每栏 3-4 条最稳定；超过 5 条会顶到 sd-foot 或溢出
- `.sd-foot` 是**右栏专属**的小结句（出现在瓶颈下方，给一句"瓶颈本质是什么"的总结）；左栏 done 不需要 sd-foot

**适用与不适用**：

| ✅ 适用 | ❌ 不适用 |
|---|---|
| 周报"本周做了 vs 下周做" | 三方对比（用 C11） |
| 复盘"亮点 vs 不足" | 历史路径（用 C06 timeline） |
| 项目"已交付 vs 待交付" | 数字大字报（用 C04） |
| 技术债"已解决 vs 待解决" | 三栏并列概念（用 C11） |

**常见错误**：

1. ❌ 用红色给 NEXT 栏上色——告警语义太重。中性灰才是 qjyd-corp 的"下一步"色
2. ❌ 左右栏内容数量差距过大（左 2 条 vs 右 6 条）——视觉失衡。如果素材天然不平衡，**改用 C14 dense + 一段说明**，而不是硬塞成 duo
3. ❌ 给 `.qjyd-status-duo` 加 `align-items: stretch`——左右栏会被强制等高，sd-points 短的那栏中间会出现大段留白。**保持 `align-items: start`**（模板默认值）
4. ❌ 给 `.sd-foot` 加 `margin-top: auto`——会把 sd-foot 推到页面底部，但左栏没有 sd-foot 时双栏不对称。**保持紧跟 sd-points 之后**



## C16 · 要点墙 (3 列) / Bullet Manifest

**用途**：纯文字要点列表，3 列网格，最常用 6 项；4-9 项均可。**比 C07 卡片矩阵轻 70%**——无卡片框、无 chip、无图标，靠顶部 hairline 分隔每项。

**何时用 C16 而不是 C07**：

| 场景 | C07 cards-2x2 | C16 bullet-manifest |
|---|---|---|
| 4 大产品模块（重展览） | ✅ | ❌ |
| 本周做了 6 件事 | ❌（信息密度低，卡片显空） | ✅ |
| 复盘 5 个亮点 | ❌ | ✅ |
| 待办清单 | ❌ | ✅ |
| 4 大能力对外宣讲 | ✅ | ❌ |

**完整骨架**：

```html
<section class="slide light" data-layout="C16" data-animate="bullet-manifest">
  <div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-8)" data-anim>
    <div class="qjyd-meta">THIS WEEK · 本周完成</div>
    <h1 class="qjyd-h1">六件事，一周交付</h1>
  </div>
  <div class="qjyd-bullet-manifest">
    <div class="bm-item">
      <div class="bm-num">01</div>
      <div class="bm-title">智齿机器人提效</div>
      <div class="bm-desc">独立承接率 <b>93%</b>, chat 有效回答 <b>19,714</b> 条</div>
      <span class="bm-tag">已完成</span>
    </div>
    <!-- ... 02 ~ 05 同结构 ... -->
    <div class="bm-item accent">
      <div class="bm-num">04</div>
      <div class="bm-title">知识自沉淀 3.0 启用</div>
      <div class="bm-desc">85% 可入库, 100% 审核准确, 本周正式上线</div>
      <span class="bm-tag">本周里程碑</span>
    </div>
    <!-- ... 06 ... -->
  </div>
  <div class="qjyd-foot">...</div>
</section>
```

**关键设计**：

- 每项是**顶部 2px 实色 hairline + 编号 + 标题 + 描述 + 状态 tag**
- 默认线色 `var(--line)` 中性灰；加 `.bm-item.accent` 让顶部线变 accent 色 + 编号变 accent-dark + tag 变绿底——**全 deck 至多 1-2 项加 accent**，否则失去强调意义
- `.bm-num` weight 300 偏淡，不抢标题；只有 accent 项才升到 weight 500
- `.bm-desc` 里 `<b>` 自动用无衬线 + accent-dark + weight 700——数字强调

**容量规则**：

| 项数 | 视觉 | 推荐场景 |
|---|---|---|
| 4 项 | 一行 3 + 一行 1（孤儿）—— ❌ 不推荐 | 改用 2×2 grid 或 C07 |
| 5 项 | 一行 3 + 一行 2 —— △ 可接受 | 周报亮点 5 项 |
| **6 项** | **2 行 ×3 列 —— ✅ 最稳** | **周报标准款** |
| 9 项 | 3 行 ×3 列 —— ✅ 满版 | 大型 review |
| 10+ 项 | ❌ 拥挤 | 拆成两页 |

**常见错误**：

1. ❌ 把每项都加 `.bm-item.accent`——失去强调意义。**全 deck 至多 1-2 项 accent**
2. ❌ `.bm-desc` 写成 3 行以上——单元变高，整体网格不对齐。每项描述控制在 1-2 行
3. ❌ `.bm-tag` 写成长句——tag 是状态标签（"已完成 / 推进中 / 阻塞"），不是描述。3-5 字最合适
4. ❌ 用 C16 替代 C07 做产品模块展示——C16 没有图标、没有 chip，对"对外宣讲产品能力"没有视觉冲击力。**C16 是对内同步用的**


## C13 · 结束页 Thank You

**用途**：演示结束、Q&A 提示页、联系方式页。

**骨架**：左 "Thank You" 巨标 + 联系方式 3 列 + 右 logo 圆环呼应。

**关键类**：`.qjyd-thank`、`.th-left`、`.th-right`、`.th-contact`。

**注意**：`Thank` 用 `.accent-line` 渐变，`You.` 保持深色，形成视觉对比。

---

## 截图与导出

### 截图模式

URL 加 `?clean=1` 隐藏 #hint 提示和 #nav 圆点导航：

```
file:///.../template-corp.html?slide=5&clean=1
```

### 启动跳页

URL 加 `?slide=N`（1-based）直接跳到第 N 页：

```
file:///.../template-corp.html?slide=5      → 第 5 页
file:///.../template-corp.html?slide=1      → 第 1 页（默认）
```

### 导出 PDF

浏览器打印 → 选 "Save as PDF" → 自定义尺寸 1920×1080，关闭页眉页脚。

---

## 校验

```bash
node ~/.codex/skills/ang-ppt-skill/scripts/validate-swiss-deck.mjs deck.html
```

（qjyd-corp 沿用 swiss 的校验脚本，只要 section 都带了 `data-layout` 就 OK。）

---

## 2026-06 更新（动效 reveal 修复）

**症状**：第一次翻到 C03（或任何非 hero 页）时，内容像"刷新一下"地一下子涌入。

**根因**：
1. `body.motion-ready [data-anim]{opacity:0}` 把所有页面的容器统一隐藏，等翻到时才 reveal；
2. 旧版 dispatch 在 `playSlide` 里"先 force reveal、再 animate `[0,1]`"，会出现 1→0→1 的突闪；
3. `RECIPES` map 里缺少企业风的 8 个 recipe 名（`agenda` / `kpi-tower` / `kpi-triple` / `timeline` / `cards-2x2` / `split-reveal` / `chapter` / `quote` / `compare` / `team`），全部 fallback 到通用 fade，时长 600ms + 80ms 错峰太长；
4. `go(n)` 用 `setTimeout(__playSlide, 450)` 等 deck transition 完才 reveal，所以会先看到 ~450ms 空白，再"刷"出来。

**修复（已落地到 `template-corp.html`）**：
- `RECIPES` map 增加 10 条企业风 recipe，每个都通过 `hide([...])` 同步把目标元素打回 `opacity:0`，再用 motion 播 250–450ms 的简短入场（fade + ≤8px y/x 位移），无 stagger 链路超过 350ms；
- `playSlide` 的 dispatch 不再在调用 recipe 之前 force-reveal；命中 recipe 时只把 `[data-anim]` 容器同步 hide，再交给 recipe；fallback 路径才一次性 force reveal；
- `go(n)` 改成 `requestAnimationFrame(()=>__playSlide(idx))`，让 reveal 与 deck transform 并行进行，整体在 ~580ms 内完成，视觉上不再出现"先空白再刷出"。

**红线**：
- 新增企业风版式时，**必须**在 `RECIPES` 里注册一条对应名字的 recipe；
- 任何 corp recipe 第一行**必须**先调 `hide([..要 animate 的元素])` 把它们同步打 0，然后才能 `animate(..., {opacity:[0,1], ...})`，否则就会复发"1→0→1"突闪。

---

## 2026-06 更新二（垂直留白调优 + 占位规范化 + C12 回退）

继 reveal 修复之后，针对"内容紧贴顶/底，中间大量留白"的体感问题，做了一轮垂直分布修复：

| 页 | 改动 |
|---|---|
| **C04** | `.qjyd-kpi-hero` 改 `align-items:center`；`.num-side` / `.ctx-side` 去掉 `justify-content:space-between`，改为 `gap` 紧凑排列。同时 `.qjyd-bullet` gap 由 `--sp-4` → `--sp-3`，让三行 bullet 不再松散。|
| **C05** | `.qjyd-kpi-triple` 改 `align-content:center`；`.kpi-cell` 去掉 `height:100%` 与 `justify-content:space-between`，改为内容驱动高度并 `flex-start`。`.kpi-label` `margin-top:auto` → `var(--sp-2)`。|
| **C06** | `.qjyd-timeline` 改 `align-content:center`；`.tl-node` 去掉 `min-height:44vh` 与 `height:100%`。`.tl-title` `margin-top:auto` → `var(--sp-2)`，让 dot/year/title/desc 自然挨着排列，整条轴垂直居中。|
| **C08 / C09** | 把右侧详细 mock SVG（手机框 / 人物剪影 + 数据徽章）替换为统一的 `.qjyd-img-placeholder`（C08 用 paper-soft 虚线框，C09 用 `.accent` 海洋青渐变 + 白色虚线框）。等用户给真实图（`./images/03-xinling.png` / `./images/04-customer.jpg`）后直接替换即可。|
| **C11** | `.qjyd-compare` 改 `align-content:center; align-items:start`，卡片高度由内容决定，整组在垂直方向居中，避免下方大留白。|
| **C12** | **撤回**上一轮的 clip-path 几何头像（八边形/六边形/五边形）和 `.t-role-chip`，恢复为 84×84 圆形渐变底 + 首字母居中的简洁版本。`.t-avatar-1..4` 现在都是 `border-radius:50%` 加海洋青色系渐变。|

### 新增可复用样式：`.qjyd-img-placeholder`

任何"等用户给图"的位置都用它（避免再写复杂占位 SVG）：

```html
<div class="qjyd-img-placeholder">          <!-- 浅底虚线框 -->
  <svg class="ph-icon" viewBox="0 0 64 64">…</svg>
  <div class="ph-title">产品截图占位</div>
  <div class="ph-desc">替换为 ./images/xxx.png<br>建议尺寸 W × H</div>
</div>

<div class="qjyd-img-placeholder accent">   <!-- 海洋青品牌底虚线框 -->
  …
</div>
```

### 原则总结（建议沿用）

1. **大块内容容器优先 `align-content:center` / `align-self:center`**，不要默认 `stretch` 撑满，否则容易出现"内容被推到顶 + 底"的留白。
2. **多段卡片内部不要轻易用 `justify-content:space-between`**——除非每段都是大块视觉锚点；只有 2 段内容时几乎一定会出现中部空洞。
3. **`margin-top:auto` 慎用**——它会把元素推到容器底部，配合大容器高度就是留白制造机。
4. **`min-height:NNvh` 慎用**——被它撑高后内部留白几乎不可避免。

---

## 2026-06 更新三（C04/C06 微调）

### C04: `align-items:center` + 紧凑 gap 会导致"内容堆中间"
- 问题：上一轮把 `.qjyd-kpi-hero` 改 `align-items:center`、左右两列只用 `gap` 紧凑排列，结果整列内容压缩成一坨堆在垂直中央，上下大块留白。
- 修法：恢复 `align-items:stretch`，左右两列改用 `justify-content:space-evenly`，让 chip / mega 数字 / before-after 三段在整列高度内**均匀分布**。这样既不"全挤上"也不"全挤下"，更不会"全挤中间"。

### C06: `align-content:center` 会让 absolute 定位的 `.tl-track` 错位
- 问题：上一轮给 `.qjyd-timeline` 加了 `align-content:center`，把 grid 内容（含 dot 行）整体推到容器中部，但 `.tl-track` 是 `position:absolute; top:calc(var(--sp-6)+14px)`——这个 top 是相对 timeline 容器顶端算的，于是横线还在容器上方，dot 已经被挤到容器中部，**线和 dot 不在一条水平线上**。
- 修法：
  1. 引入 CSS 变量 `--tl-dot-size`、`--tl-pad-top`，把 dot 大小和 padding 锁死；
  2. `.tl-track` 的 `top` 改成 `calc(var(--tl-pad-top) + var(--tl-dot-size)/2 - 1px)`，永远命中 dot 中心；
  3. 去掉 `align-content:center`，改 `align-content:start` + 配合 `padding-top` / `padding-bottom` 让整条 timeline 视觉上居中（但 dot 钉在固定行）；
  4. `.tl-node.current .tl-dot` 用 `margin-top:-4px` 抵消 8px 多出的尺寸，让 current dot 中心仍在 track 线上。

### 红线
- **凡是用 `position:absolute` 定位的"轨/线/分隔条"，绝对不能让它的 grid/flex 父容器使用 `align-content:center`**——容器内容会动，但 absolute 子元素的 top/left 是相对容器边界算的，两者必然错位。要居中就让 padding 平衡。

---

## 2026-06 更新四（C04 字号 / C05 卡大 / C06 下移）

| 页 | 改动 |
|---|---|
| **C04** | `.qjyd-kpi-hero .ctx-side .qjyd-bullet li` 字号 `clamp(16px, 1.18vw, 19px)`、行距 1.65、bullet 圆点 9px——只针对 ctx-side 内的列表，不动全局 `.qjyd-bullet`（C08 等其他页保持原字号）。|
| **C05** | `.kpi-cell` padding 由 sp-7 → sp-9/sp-8；新增 `min-height:48vh`；`justify-content:center` 让内容在卡内垂直居中，避免卡片被居中后内部还集中顶部。|
| **C06** | `--tl-pad-top` 由 `sp-9` 翻倍到 `sp-9 + sp-9`；padding-bottom 由 sp-6 收到 sp-3。整条 timeline 视觉重心向下移约 60-80px，与下方 footer 之间不再"过空"。|

### 经验
- 局部列表字号偏小时，**用嵌套选择器（`.parent .qjyd-bullet li`）单独覆盖**，不要直接改全局 `.qjyd-bullet`——其他页可能依赖小字号。
- 卡片"内容居中后还显得空"的破解：先**给卡片合理的 min-height**（vh 单位最稳），再 `justify-content:center` 把内容居中到卡片内；不要靠外层 `align-content:center` 来居中，那是给整组卡片用的。


---

## 2026-06 更新五（彻底消除 C03 翻页"刷新感"）

### 现象
冷启动后第一次右键翻到 C03（agenda 议程页）时，画面会有 0.5-0.8s 的"白板 → 内容召唤"瞬间，观感像页面被刷新了一下。其他页面也存在但不如 C03 明显。

### 三个并存的根因

1. **`go()` 用 `requestAnimationFrame` 包装 `__playSlide(idx)`**。
   - keydown 触发 `go` → 当帧把 deck transform 到 -200vw → 排一个 rAF 才调 `playSlide`。
   - 浏览器在这一帧里 paint 时，`[data-anim]` 还保持 CSS 默认 `opacity:0`——**用户看到的就是"页面已切过去但内容还没出现"那一帧**，这就是"刷新感"的最大来源。

2. **`resetAnims` 用 `el.style.opacity=''` 清空行内值**。
   - 清空后行内样式没了，CSS 规则 `body.motion-ready [data-anim]{opacity:0}` 立即接管。
   - 即便后面同步代码再设 `opacity='1'`，浏览器的渲染管线在合成层切换 + transform 切换 + opacity 切换的组合下，仍可能 paint 出"opacity:0"那一帧。

3. **recipe 内 `hide(items)` 起点 0**。
   - 即使容器立即 reveal，子元素仍从 0 起 fade，stagger 总时长 0.4-0.6s 内画面是"逐张冒出"的——内容多的页（C03 6 卡）特别像"召唤"。

### 修法（三连）

```js
// 1) go() 改同步,paint 前 reveal 状态已正确
if(window.__playSlide) window.__playSlide(idx);  // 不要再 rAF 包

// 2) resetAnims 改为"reset 即 reveal",杜绝中间 0 帧
function resetAnims(slide){
  slide.querySelectorAll('[data-anim]').forEach(el=>{
    el.style.opacity='1';        // 直接设 1,不留给 CSS 默认值
    el.style.transform='none';
  });
  // ... origCss reset 不变
}

// 3) recipe 子元素起点提到 0.5-0.6,不再"召唤"
items.forEach((el, i)=>{
  el.style.opacity = '0.6';                       // 起点清晰可辨
  animate(el, {opacity:[0.6, 1], y:[2,0]},        // 仅"提亮"
    {duration:.2, delay:.02 + i*.022, easing:EASE_ENTRY_EXP});
});
```

### 验证
playwright + headless Chrome + rAF 持续采样：

| 修复前 | 修复后 |
|---|---|
| C03 first frame: `animOps=[0,0]`, items=0.18,要 50ms 才升起 | C03 first frame: `animOps=[0.5, 1]`, items 起点 0.6 |
| 滑动过程画面是白底 | 滑动过程画面已含 6 张完整卡片 |
| 600ms 才"稳定"  | 200ms 全部到位，0 跳变 |

### 红线（新增）

- **不要用 rAF 包 playSlide**——keydown 触发的 reveal 必须与 transform 切换同帧同步执行，paint 前所有元素状态必须是"应该显示的样子"，否则中间那一帧就是"刷新感"来源。
- **`resetAnims` 不要把 opacity 清成 ''**——CSS 默认值是 0，会被立即接管，造成中间 0 帧。一律直接设 `opacity='1'`。
- **recipe 内 stagger 子元素起点不要给 0**——除非该元素是"延迟登场"语义（如点状强调），否则起点至少 0.4，让翻页过程画面已经"完整"。
- **入场总时长保持 ≤ 400ms**——超过 500ms 用户就会感觉"页面在 loading"。


---

## 2026-06 更新六（图片占位 vs 真实图 规则）

### 模板里两类"图位"，对应两种状态

| 类型 | 模板里的状态 | 何时使用 | 参考实例 |
|---|---|---|---|
| **占位** | `<div class="qjyd-img-placeholder [accent]">...</div>` | 用户**没**提供图、或 skill 在没有图片素材时直接生成 | C09 `.ih-right` |
| **真实图** | `<img class="qjyd-img-fit" src="qjyd-corp/c{N}-{语义}.{ext}" alt="...">` | 用户提供了图、或者 skill 找到了合适素材 | C08 `.image-side` |

### 规则

1. **模板里默认放占位，不要硬塞示例图**——模板是"种子文件"，绑定具体图片会让其他场景下生成的 PPT 也带着错图。
2. **占位本身要"成品级视觉"**——`.qjyd-img-placeholder.accent`（海洋青渐变 + SVG 框 + 文字提示）单独放出去也是合格的幻灯片，**不要做成 dashed border + "PLACEHOLDER" 那种草稿感**。模板既是种子，也是可独立打开的演示样张，占位不能拉低样张品质。
3. **同一个模板里至少留一个"已替换样板"**——让看模板的人立刻看到"放真实图后是这种效果"，复制粘贴 `<img>` 写法即可。当前由 C08 承担这个角色。
4. **占位上方必须留替换指引注释**——告诉 Codex 看到占位时该怎么换成 `<img>`、推荐的图片比例/尺寸、文件命名规则。当前 C09 占位上方已有结构化注释块。

### 图片技术规范（用 `.qjyd-img-fit` 类的硬约束）

- **宽度**：`width:100%`，永远填满父容器
- **高度**：`height:auto`，按图片自然比例展开；`max-height:72vh` 兜底
- **裁切**：`object-fit:cover; object-position:top center`——只有图片自然高度超过 `max-height` 才会裁，且只裁底部
- **推荐图片比例**：`1:1 ~ 1.2:1`（近方形最稳）
  - 横图（>1.3）会被父容器 `width:100%` 缩窄到适配宽度，下方留空
  - 竖图（<0.7）会触发 `max-height` 裁底，丢失下半部分内容
- **文件命名**：`qjyd-corp/c{页号}-{语义}.{jpg|png}`，例如 `c08-xinling.jpg`、`c09-customer.jpg`
- **格式选择**：摄影类 / 渐变多用 `.jpg q88`（~250KB）；截图含文字 / 需要透明用 `.png`（用 `pngcrush` 或 PIL `optimize=True` 压缩）
- **`alt`**：写"主体 + 关键信息"，方便无障碍 + 图片检索；不要只写"产品截图"

### 替换流程（生成 PPT 时）

```
用户提供图片素材?
├─ 否 → 保留模板里的 .qjyd-img-placeholder, 不动
└─ 是 → 整块替换:
       <div class="qjyd-img-placeholder [accent]">
         <svg .../>
         <div class="ph-title">...</div>
         <div class="ph-desc">...</div>
       </div>
       变成:
       <img class="qjyd-img-fit"
            src="qjyd-corp/c{N}-{语义}.{ext}"
            alt="..." />
```

### 红线
- 不要把 `<img>` 嵌在 `<div class="qjyd-img-placeholder">` 里——placeholder 容器有 dashed-like 视觉规则，会和 `.qjyd-img-fit` 的圆角阴影冲突。**整块替换，不要嵌套**。
- 不要在 `.qjyd-img-fit` 上手动改 `width` / `height` / `object-fit`——`.image-side` 和 `.ih-right` 等容器对它有专门的 CSS 适配。手改会破坏父子契约。
- 不要把图片放进 `assets/` 根目录——所有 qjyd-corp 风格的图片素材统一放 `assets/qjyd-corp/` 子目录，便于打包/迁移。
- **不要给图片父容器加 `overflow:hidden`**——`box-shadow` 会被裁掉、子 `<img>` 的 `border-radius` 也会被父容器的方形裁切区"咬掉"导致下方两角变直角。圆角和阴影统一画在 `<img class="qjyd-img-fit">` 自身上，父容器保持 `overflow:visible` + `border-radius:0`。这条规则在 2026-06 时碰过实际案例: 父容器 `overflow:hidden` + 父子都 `border-radius:12px`,结果下方圆角全部丢失,阴影也被吃掉。
- **绝对禁止从 `assets/qjyd-corp/` 借用模板演示图到生成项目里**（除非用户明确指定）。模板里 `c{页号}-{语义}.{ext}` 命名的图都是**演示图**(画面里的具体内容跟用户场景对不上)，不要因为"主题听起来相关"就复用。判断捷径: `xrxs-logo.png` 是品牌位默认用; `c{N}-*` 是演示图默认不复用。**没图就保留 `.qjyd-img-placeholder`**, 让用户自己补; 不要伪装。详见 SKILL.md "qjyd-corp 生成红线速查"第 12 条。

---

## 2026-06 更新七（禁止复用模板演示图 · 真实案例）

### 现象（来源案例）
`项目/客服周报20260612/ppt/index.html` 倒数第二页 (C08 split-reveal):
- 标题"客服助手 · 把薪灵接到一线"、文本讲"意图澄清 / 情绪识别 / 问题回复 / 方案检索 四个动作"
- 但右侧 `<img>` 直接复用了模板里的 `c08-xinling.jpg`(cinlyn 入职流程拆 5 步的对话截图)
- alt 文案被 AI 改成"客服助手对话界面: 意图 / 情绪 / 回复 / 方案 四能力示意"——**alt 改了,图没换**

### 根因
AI 在"用户没提供图"的情况下做了**第三条路径**:
> 周报内容讲薪灵 AI 助手 → 模板 C08 是薪灵对话界面 → 图片语义"高度相关" → 复用比留占位更"完整"

这条逻辑链在远观时成立 (都是"AI 对话 UI"), 但**幻灯片是要被人贴近脸看的**, 截图里的"我下个月入职..."5 步入职规划跟"客服意图澄清/情绪识别"完全不沾边——观众一放大就穿帮。

### 修法 (2026-06 更新七 · 红线)
1. SKILL.md "qjyd-corp 生成红线速查" 把第 11 条改写成"二选一"明确表 (用户给图 → 替换;没给图 → 保留占位), **明确没有第三条路径**。
2. 新增第 12 条: **绝对禁止从 `assets/qjyd-corp/` 借用模板演示图**。列了文件清单告诉 AI 哪些是品牌位 (xrxs-logo.png 默认用)、哪些是演示图 (c08-xinling.jpg 等默认不复用)。
3. 提供"判断捷径": 看到 `c{N}-{语义}.{ext}` 命名的就是演示图,默认不复用。

### 红线
- **AI 不要做"语义关联"判断**——再相关也不能复用模板演示图,因为图里的具体细节肯定对不上用户场景。
- **新增模板演示图时务必用 `c{页号}-{语义}` 命名**——这样 AI 看名字就知道"这是演示图,不要碰"。如果未来某张图想做成"通用素材库",请放到不同子目录(比如 `assets/qjyd-corp/_stock/`)且 SKILL.md 里显式说明"可复用"。


---

## 2026-06 更新八（新增 C14 / C15 / C16 · 周报 / 复盘 / 内部同步场景支持）

### 背景

原 13 个版式全部为"B 端 SaaS 销售提案"设计。当 deck 内容是**周报、复盘、月报、团队同步**这类"对内同步进展"时，会出现：

- C08 / C09 / C10 / C12 用不上（无客户、无团队照、无证言、无产品截图）
- 内容形态多为"一段主张 + 几条要点 + 没有图"——找不到对应版式
- AI 容易**滥用 `.qjyd-img-placeholder`**："反正我没合适版式，塞个占位顶上"——结果是"为了用版式而塞图占位"

### 新增三个版式

| ID | 用途 | 关键特征 |
|---|---|---|
| **C14 · Statement** | 纯文字主张页 | 巨标 + accent rule + 3-4 条要点（dense）or 一段引言（sparse），**整页无图** |
| **C15 · Status Duo** | 成果 / 瓶颈对照 | 左 DONE 海洋青 / 右 NEXT 中性灰，1:1 等宽，**整页无图** |
| **C16 · Bullet Manifest** | 要点墙（3 列） | 6 项纯文字，顶部 hairline，比 C07 cards-2x2 轻 70% |

### 红线 19（新增 · 与 SKILL.md qjyd-corp 红线速查同步）

> **`.qjyd-img-placeholder` 只能在"该页天然需要图但素材未到位"时使用，禁止当作"找不到版式的兜底"**。
>
> 如果一页内容本身不需要图（纯主张 / 纯数据对比 / 纯要点），用 **C14 / C15 / C16**，不要用 `C08 + placeholder` 兜底。
>
> 判断方法：把 placeholder 整块**删掉**问自己——"这页内容信息有没有缺？" 如果没缺，那么这页不需要图，应该换无图版式。

### C15 实现踩过的坑（生成时务必对齐）

1. **不要给 `.qjyd-status-duo` 加 `align-items: stretch`**——左右栏会被强制等高，sd-points 短的那栏中间会出现大段留白。**保持 `align-items: start`**
2. **不要给 `.sd-foot` 加 `margin-top: auto`**——左栏没有 sd-foot 时双栏不对称。**保持紧跟 sd-points 之后**
3. **NEXT 栏不允许用红色**——qjyd-corp 没有红色语义，"瓶颈"是中性的"下一步"，用 `var(--text-2)` / `var(--text-3)`
4. **左右栏内容数量差距 ≤ 2 条**——3 条 vs 5 条勉强可以，2 条 vs 6 条直接换 C14

### C16 与 C07 的边界

- **C07 cards-2x2** = 对外宣讲用的"模块展览"（每个卡有图标 + chip + tag，卡片框圆角 + 弱阴影）
- **C16 bullet-manifest** = 对内同步用的"要点清单"（无框 + 顶部 hairline + 编号 + 状态 tag）
- 凡是"我团队这周做了 N 件事 / 这季度完成了 N 个里程碑"，**永远用 C16**，不要 C07


---

## 2026-06 更新九（C14 / C15 / C16 留白与字号微调）

### 现象

C14 / C15 / C16 三页初版在 1600×900 viewport 下都呈现"内容堆顶部、底部大段空白"。

### 根因

**C14**：`.qjyd-statement` 设了 `justify-content: center`，但 `.st-meta` 的 `margin-top: auto` 把 meta 推到底部 —— **flex 容器一旦有子元素 `margin-top: auto`，`justify-content` 立即失效**（auto margin 吃光所有剩余空间）。结果：kicker / 巨标 / rule / points 挤在顶部，meta 孤悬底部，中间 365px 空白。

**C15**：`.qjyd-status-duo` 用了 `align-items: start`，双栏内容自然从顶部排，下方剩余空间无法被吸收。

**C16**：`.qjyd-bullet-manifest` 用了 `align-content: start`，6 项要点墙整体贴顶。

### 修复

| 版式 | 关键修改 |
|---|---|
| C14 | 删除 `.st-meta` 的 `margin-top: auto` → `justify-content: center` 重新生效 |
| C15 | `align-items: start` → `align-items: center` + sd-rule `height: 100%` |
| C16 | `align-content: start` → `align-content: center` + bm-item `min-height: 120px` |
| 三者共同 | 字号普涨 10-15%（标题、要点、desc 同步上调），row-gap 适度放大让单元呼吸 |

### 红线（追加, 与红线 19 互补）

> **flex / grid 容器使用 `justify-content / align-content: center` 时，禁止子元素同时使用 `margin-top: auto` 或 `margin-bottom: auto`**。两者语义冲突，auto margin 优先级更高，会让 center 静默失效。
>
> 如果一定要让某个子元素贴底（比如卡片内的 tag），请确保**父容器已有显式 `min-height` 或被外部网格拉伸**，不要依赖 `margin-top: auto` 来"推到底"——这是 C16 的 `.bm-tag` 才能保留 `margin-top: auto` 的原因（它的父容器 `.bm-item` 有 `min-height: 120px`）。

### 字号映射（修订后, 三者通用）

| 元素 | 修订前 | 修订后 |
|---|---|---|
| C14 巨标 `st-display` | `clamp(64px, 6.4vw, 124px)` | `clamp(68px, 6.8vw, 132px)` |
| C14 dense 要点 | `clamp(20px, 1.5vw, 26px)` | `clamp(22px, 1.65vw, 30px)` |
| C14 sparse 引言 | `clamp(24px, 1.9vw, 34px)` | `clamp(26px, 2.05vw, 38px)` |
| C15 sd-title | `clamp(28px, 2.4vw, 42px)` | `clamp(30px, 2.6vw, 46px)` |
| C15 sd-points | `clamp(17px, 1.25vw, 22px)` | `clamp(18px, 1.35vw, 24px)` |
| C16 bm-title | `clamp(20px, 1.5vw, 26px)` | `clamp(22px, 1.65vw, 30px)` |
| C16 bm-desc | `clamp(15px, 1.05vw, 18px)` | `clamp(16px, 1.15vw, 20px)` |
| C16 bm-num | `clamp(20px, 1.4vw, 26px)` | `clamp(22px, 1.55vw, 30px)` |
| C16 bm-tag | 11px | 12px |

> 投屏演示场景下，以上字号都属于"够大但不咄咄逼人"的安全区间。如果用户内容明显短（比如 C14 只有 2 条要点），可以再上调 10%；如果接近上限（C14 4 条要点 / C15 4 条 / C16 6 项），保持当前值即可。
