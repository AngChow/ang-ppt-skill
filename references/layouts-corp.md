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

所有 16 个版式都是**通用**的——决定"该用哪个"的不是"对内 vs 对外 / 提案 vs 周报"这种主题标签，而是下面三个**结构维度**：

1. **项数 / 数据点个数** —— 你要放 1 段话 / 3 个 KPI / 4 个要点 / 6 项清单 / 时间节点
2. **是否有图** —— C08 / C09 是图位强制版式（没图就别选，会出 placeholder 留白）；其余 14 个版式都不依赖图
3. **数据形状** —— 大数字 / 平级 KPI / 时间序列 / 引言 / 列表 / 对照 / 矩阵

下面这张表按**这三个维度**列，不再按"主题/场景"分类。

| ID | 名称 | data-animate | 期望项数 | 是否需图 | 数据形状 |
|---|---|---|---|---|---|
| C01 | 封面 hero | `hero` | 1 | 含 logo（可缺省 → 装饰环兜底） | 标题 + 副标 + 微数据 |
| C02 | 章节封 | `chapter` | 1 | 否 | 章节号 + 标题 |
| C03 | 议程目录 | `agenda` | 4-6 | 否 | 编号列表 |
| C04 | 大数字 KPI | `kpi-tower` | **恰 1** 个核心 KPI | 否 | 大数字 + before/after + 上下文卡片 |
| C05 | 三段 KPI | `kpi-triple` | **恰 3** | 否 | 3 个等权数字 / 概念型 KPI + 标签 |
| C06 | 时间轴 | `timeline` | 4-6 节点 | 否 | 年份/阶段序列 |
| C07 | 4 卡片矩阵 | `cards-2x2` | **恰 4** | 否（icon 用 inline SVG） | 标题 + 描述 + chip + 标签 |
| C08 | 图文左右 | `split-reveal` | 1 段 | **是 · 必填** | 文字 + 配图 |
| C09 | 大图全屏 | `image-hero` | 1 段 | **是 · 必填** | 文字 + 主视觉大图 |
| C10 | 引言金句 | `quote` | 1 段 ≤ 60 字 | 否（头像可缺省） | 引言 + 署名 |
| C11 | 数据对比表 | `compare` | **恰 3 列** × 5-6 行 | 否 | 3 方案对比 |
| C12 | 团队/人物卡 | `team` | **恰 3-4** | 否（头像几何化） | 人物卡片 |
| C13 | 结束页 | `hero` | 1 | 含 logo（可缺省） | Thank You + 联系信息 |
| C14 | 纯文字主张 | `statement` | 1 段 + 2-4 条要点 | 否 | 巨标 + accent rule + 要点 |
| C15 | 状态双卡 / 左主右辅 | `status-duo` | **恰 2 列** | 否 | 等权对照用双卡；主次明显用 C15-ASYM |
| C16 | 要点墙 | `bullet-manifest` | 默认 3 列 · **6 / 9 最稳** · `.cols-2` 支持 4 / 8 项 | 否 | 编号 + 标题 + 描述 + 状态 tag |

> **决策路径速查**：
>
> - "我要放 N 项要点" → 看 C16 的 `.cols-N` 容量表（4 项→`.cols-2` / 6 项→默认 3 列 / 9 项→3×3）
> - "我有 1 个核心数字" → C04；"我有 3 个平级数字 / 概念型 KPI" → C05；"我有 4 个等权模块" → C07
> - "我有 1 段话想强调" → 没图 C10 / C14；有图 C08 / C09
> - "我要左右对照" → C15 Status Cards（2 列）；如果一侧是主成果、一侧是行动栏 → C15-ASYM；"我要 3 列对比" → C11
> - "我要时间线" → C06；"我要章节封" → C02；"我要议程" → C03
>
> **跟"主题/场景"无关的提示**：周报、月报、复盘、销售提案、产品介绍——同一个版式可以服务任何主题，只要项数和数据形状对得上。**唯一的硬性筛选是「是否需图」**：手里没有素材时不要选 C08 / C09，避免出 placeholder 占位（红线 19）。

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
      <!-- ⚠️ 装饰 SVG 整段从 assets/template-corp.html 的 C01 cover-right 复制, 不要自己重写几何!
           原因: 模板里这一坨 SVG (双同心环 + 大点阵环 + logo foreignObject + 浮点装饰) 是反复调过的,
           半径、stroke 透明度、点阵 mask 内外径都按"logo 周围留 ≥ 60px 视觉气口"原则定过.
           AI 看到下面这个简化骨架时, 极易自己补一个 r=90 左右的"贴脸内圈", 让 logo 像戴了项圈.
           生成时直接把 template-corp.html 里 <div class="cover-right"> 内整个 <svg>...</svg>
           原样复制到这里, 然后只替换 <img src> 指向项目本地 logo 即可. -->
      <svg viewBox="0 0 600 600" style="width:100%;height:100%;display:block" aria-hidden="true">
        <!-- defs / 大点阵环 / 双同心环 / logo foreignObject / 浮点装饰 -->
        <!-- 详见 assets/template-corp.html 同名 section -->
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
- **装饰 SVG 同心环硬规则（2026-06 新增 · 必读）**：
  - 同心环数量 **上限 = 2**（一实线 + 一虚线），不允许第三圈
  - **最内圈半径 ≥ 180**（在 600×600 viewBox 下），给 logo 留 ≥ 60px 视觉气口
  - **禁止画 r ≤ 100 的"贴脸内圈"**——logo 会瞬间像戴了项圈，破坏封面气质
  - 真实模板（`assets/template-corp.html` C01 cover-right）的环参数是 `r=252, stroke 1.4, opacity .40` + `r=182, stroke 1, opacity .28, dasharray "3 7"`，**优先整段复制不要自创**

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

**结构必填**（2026-06 更新七修订，从"三段式平铺"改成"标题区 + KPI 组"）：

- **标题区**（`.qjyd-h1` 上方的 wrapper）必须包含 3 段：
  - `.qjyd-meta` kicker（章节小字标签）
  - `.qjyd-h1` 大标题
  - `.num-meta-row` + `.nm-chip` × N（KPI 口径标签：统计范围 / 客户类型 / 模块名）
  - chip 行用 `style="margin-top:var(--sp-3)"`（8px）紧贴标题
- **左侧 `.num-side` 内部包一层 `.qjyd-kpi-group`**，组内含两段：
  - `.qjyd-kpi-wrap`（`.qjyd-kpi-mega` 巨数 + `.qjyd-h2` 副标）
  - `.ba-block`（before/after 对比条）：子类 `.ba-row` / `.ba-label` / `.ba-old`（删除线旧值）/ `.ba-new`（accent 新值）/ `.ba-unit` / `.ba-bar > i`（进度条 `style="width:N%"`）
- **右侧 `.ctx-side`** 默认仍是「`.qjyd-card.soft` case 卡 + `.qjyd-bullet` 列表」两段。**bullet 推荐 5–6 条**（≤ 3 条会导致 case 卡下方留 250+ px 空白；7+ 条会把 bullet 顶到页脚区。建议覆盖完整业务漏斗，例如招聘场景：解析 → 面试 → offer → 数据 → 入职 → 产出效益）。

```html
<!-- 标题区: chip 在这里, 紧贴标题 -->
<div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-8)" data-anim>
  <div class="qjyd-meta">CHAPTER 02 · KEY METRIC</div>
  <h1 class="qjyd-h1">客户业务效率提升</h1>
  <div class="num-meta-row" style="margin-top:var(--sp-3)">
    <span class="nm-chip">客户类型</span>
    <span class="nm-chip">规模</span>
    <span class="nm-chip">模块</span>
  </div>
</div>
<div class="qjyd-kpi-hero" style="flex:1">
  <div class="num-side" data-anim>
    <!-- KPI 组: 整组 margin:auto 0 在 num-side 剩余空间内垂直居中 -->
    <div class="qjyd-kpi-group">
      <div class="qjyd-kpi-wrap">
        <div class="qjyd-kpi-mega">65<span class="qjyd-kpi-unit">%</span></div>
        <div class="qjyd-h2" style="color:var(--text-2);font-weight:500">副标</div>
      </div>
      <div class="ba-block">...</div>
    </div>
  </div>
  <div class="ctx-side" data-anim>...</div>
</div>
```

**为什么这么改**（`2026-06 更新七`）：

老版结构把 chip 当成 num-side 的"顶部锚点"，再用 `justify-content:space-evenly` 均布 chip / mega / ba 三段——结果在 16:9 的 ~85vh 列高里，三段间隙都被强行顶到 90+ px，标题↔chip 之间出现了"一片荒漠"。

修复思路：
- chip 行**语义上是标题的 KPI 口径标签**（描述这页的统计范围），归到标题区紧贴标题；
- num-side 只剩一个 `.qjyd-kpi-group`（mega + 副标 + ba），整组 `margin:auto 0` 垂直居中——视觉重心固定在 mega，组内段间距由 group 自身的 gap (`--sp-7`, 32px) 控制；
- 不再用 `space-evenly` / `space-between` 撑满列高（详见红线 22）。

---

## C05 · 三段 KPI

**用途**：横向并排 3 个平级 KPI。KPI 可以是纯数字（如 `70% / 15家 / 0客诉`），也可以是概念型战略锚点（如 `AI / 中台`、`HMOS / 升级`、`移动端 / 底盘`）。

**骨架**：3 列 grid，每列 `.kpi-cell`（num + label + desc），第三个加 `.accent` class 做高亮强调列。

**关键类**：`.qjyd-kpi-triple`、`.kpi-cell`、`.kpi-cell.accent`、`.kpi-num`、`.kpi-num-stack`、`.kpi-main`、`.kpi-sfx`、`.kpi-label`、`.kpi-desc`。

### 写法 A · 数字型 KPI（默认单行）

用于明确数值 + 单位的三联数据，保持模板原有单行节奏：

```html
<div class="qjyd-kpi-triple" data-anim>
  <div class="kpi-cell">
    <div class="kpi-num">70<span class="kpi-sfx">%</span></div>
    <div class="kpi-label">问题解决时间缩短</div>
    <div class="kpi-desc">全链路日志与异常监控让线上问题快速定位。</div>
  </div>
  <!-- 另外两项同结构 -->
</div>
```

### 写法 B · 概念型 KPI（显式两行）

用于三个平级战略能力 / 平台能力 / 模块锚点。只要其中任一项需要换成两行，**三项都必须使用 `.kpi-num-stack` 显式两行**，避免出现“第一项单行、后两项两行”导致 label 基线错位。

```html
<div class="qjyd-kpi-triple" data-anim>
  <div class="kpi-cell">
    <div class="kpi-num kpi-num-stack">
      <span class="kpi-main">AI</span>
      <span class="kpi-sfx">中台</span>
    </div>
    <div class="kpi-label">从量变到质变</div>
    <div class="kpi-desc">合规基础设施、Agent 能力、MCP + ReAct 架构共同形成智能平台基座。</div>
  </div>
  <div class="kpi-cell">
    <div class="kpi-num kpi-num-stack">
      <span class="kpi-main">HMOS</span>
      <span class="kpi-sfx">升级</span>
    </div>
    <div class="kpi-label">从套壳到原生</div>
    <div class="kpi-desc">可观测、私有化、Native 化与体验创新支撑客户价值。</div>
  </div>
  <div class="kpi-cell accent">
    <div class="kpi-num kpi-num-stack">
      <span class="kpi-main">移动端</span>
      <span class="kpi-sfx">底盘</span>
    </div>
    <div class="kpi-label">从响应到稳定供给</div>
    <div class="kpi-desc">双端并行交付、系统适配、安全合规和国际化形成确定性承接能力。</div>
  </div>
</div>
```

**C05 换行规则（重要）**：

1. ✅ 数字型 KPI 默认使用单行 `.kpi-num`，单位继续用 `.kpi-sfx` 上标式小字。
2. ✅ 概念型 KPI 使用 `.kpi-num.kpi-num-stack` + `.kpi-main` / `.kpi-sfx` 两段式结构；stack 会比默认数字型 KPI 略小一档，保留冲击力但避免两行文字压迫卡片留白。
3. ✅ 同一页三项必须统一：要么全部单行数字型，要么全部 stack 两行概念型。
4. ❌ 不要依赖自然换行（例如 `AI中台` 单行、`移动端底盘` 自然两行）——这会让 `.kpi-label` 和 `.kpi-desc` 的基线错位。
5. ❌ 不要为了凑两行给单个数字型 KPI 加 `<br>`；数字三联和概念三联是同一 C05 的两种内部写法，不是两个独立版式。

---

## C06 · 时间轴

**用途**：公司发展史、客户上线流程、产品演进。

**骨架**：5 列 grid + 横向 track 连接线 + 圆点 + 当前节点高亮放大。

**关键类**：`.qjyd-timeline`、`.tl-track`（背景线）、`.tl-node`、`.tl-dot`、`.tl-year`、`.tl-title`、`.tl-desc`、`.tl-node.current`。

**布局要点**（2026-06 更新十一 · 当前版）：
- 节点用 flex column + `gap:var(--sp-4)`，dot → year → title → desc 顺序排列，**不再用 `min-height:44vh` + `margin-top:auto` 的"撑满+贴底"反模式**（参考红线 22 v2 补丁，那种做法跟"贴底反模式"同源）。
- 整条 timeline 通过 `--tl-pad-top: var(--sp-13)`（160px）把 dot 行下移到接近页面中线，让模块视觉重心居中。
- 年份字号 `clamp(30px,2.8vw,48px)` + 字重 400（"越大越细"）。
- **title / desc 字号采用 clamp 跟随屏幕缩放**：title `clamp(18px,1.35vw,22px)`、desc `clamp(15px,1.1vw,18px)` line-height 1.55。**不要回退到旧版固定 16/13 px**（在 1600 宽幕上和年份对比断崖、文字像被压扁）。
- title 与 year 之间 `margin-top:var(--sp-3)`（8px），desc 与 title 之间 `margin-top:var(--sp-2)`（4px）——保持节点内层级清晰。

**⚠️ 节点数建议 4-5 个**（多于 5 个会挤）。

**⚠️ 描述文字行数应一致**（2026-06 更新十一 v2）：所有节点的 `.tl-desc` 应统一为同样的行数（推荐 2 行，可用 `<br>` 强制换行）。如果有的节点 1 行、有的 2 行，节点高度参差不齐，整条时间轴节奏会乱。补 1 行的内容可以是该阶段的产品定位/价值锚点等。

---

## C07 · 4 卡片矩阵

**用途**：4 个等权块——产品矩阵 / 能力矩阵 / 4 个项目周状态 / 复盘 4 个亮点 / 4 个调研维度。**任何「恰好 4 项、需要图标 + 标题 + 描述 + 标签」的内容都适用**，与场景（对内/对外）无关。

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

**用途**：左文字 + 右图。**前提是真有图**——产品截图、示意图、信息图都行；周报里如果某项工作有 demo 截图也适用。**没图请别选这个版式**（会出 placeholder 留白），改用 C10 / C14 / C16 等纯文字版式。

**骨架**：左文字（lead + 卡片 + CTA）+ 右图占位区。

**关键类**：`.qjyd-split`、`.text-side`、`.image-side`（带 IMAGE PLACEHOLDER 水印）。

**右侧 `.image-side` 必须有内容**（2026-06 新增）：模板里已内置占位 mock SVG（手机框 + 对话气泡 + 输入框），真实项目用 `<img src="./images/03-xinling.png">` 替换。**不要保留空 div + 注释**，会让模板首次预览看起来像残缺品。

**生产时**：替换 `.image-side` 内容为真实 `<img src="./images/xxx.png">` 或 SVG。

---

## C09 · 大图全屏

**用途**：左 35% 文字 + 右 65% 大图。**前提同样是真有图**——客户故事、团队照、产品全景图、关键截图都行；任何「一张主视觉撑全场」的内容都适用。**没图请改用 C04 / C10 / C14**。

**骨架**：左 35% 文字 + 右 65% 大图区，右侧默认是青绿渐变 + 圆点 pattern 占位。

**关键类**：`.qjyd-image-hero`、`.ih-left`、`.ih-right`、`.ih-tag`、`.ih-tag.accent`。

**布局要点**（2026-06 更新）：
- `.ih-right` 默认放占位 mock SVG（团队剪影 + 数据徽章），真实项目替换为 `<img>` 客户照片或产品图。
- `.ih-left` 底部除 `6.5×` 大数字外，必须有一个 CTA 按钮（`.qjyd-btn`），避免左下空。

---

## C10 · 引言金句

**用途**：用一句话承载一页——客户证言、高管引言、本周洞察、复盘关键判断、reading note 摘录都适用。**与「提案 / 周报」主题无关**，只要内容是「一段 ≤ 60 字想被高亮的话」就用它。

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

## C12 · 团队/人物卡

**用途**：3-4 个人物卡片——核心团队介绍、新成员入职、项目组成员、本月之星、嘉宾介绍都适用。**任何「需要把 3-4 个人摆出来」的场景都用它**，不限于销售提案。

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

| ✅ 适用（任何「一段话 + 几条要点」的强调页） | ❌ 不适用 |
|---|---|
| 周报关键结论 / 复盘洞察 / 阶段性表态 | 引言带署名（用 C10，引号 + 头像） |
| 战略备忘录 / 产品 manifesto / OKR 总纲 | 多个并列模块的展示（用 C07 / C16） |
| 客户复盘的"我们意识到 Y" | 数字密集的 KPI 展示（用 C04 / C05） |
| 销售提案的核心主张 / 投资 thesis | 流程 / 时间线（用 C06） |

> C14 与 C10 的边界：**C14 = 我（说话人）的主张**（带要点支撑），**C10 = 引用别人的一句话**（带引号 + 头像 + 署名）。两者都能讲"一段话"，区别在「这是不是引用」。

**常见错误**：

1. ❌ 巨标超过 24 个中文字符——会被 `max-width: 24ch` 强行换多行，节奏崩溃。**先改文案**，再调字号
2. ❌ dense 的 bullet 超过 4 条——网格是 2 列，5 条以上会导致最后一行只有 1 条孤儿
3. ❌ sparse 的引言超过 3 行——超出会顶到 `.st-meta`，应该改用 dense 拆成 bullet
4. ❌ 同一份 deck 出现两页 C14——statement 是稀缺资源，太多就稀释了"我有重要论断"的语义


## C15 · 状态双卡 / Status Cards + Status Asym

**用途**：任何“两栏状态对照”的场景——成果 vs 下一步、本周 vs 下周、问题 vs 方案、旧方案 vs 新方案、A 方案 vs B 方案、已完成 vs 待完成、亮点 vs 不足。**整页无图**。

> 2026-06 更新：C15 默认从旧版 `qjyd-status-duo` hairline 双栏升级为 **Status Cards 双卡片整体**。原因是旧版“标题画布左对齐 + 主内容居中”的双轨网格在单页理论上成立，但放进整套 qjyd-corp deck 翻页时，仍容易显得“这一页没有左对齐”。新版 C15 让标题与主内容都从画布左缘起步，同时用两张等高卡片形成中轴与整体感。

### 选择规则

| 内容形状 | 推荐结构 | 说明 |
|---|---|---|
| 两侧基本等权：成果 vs 下一步、本周 vs 下周、问题 vs 方案、A/B 方案 | **C15 Status Cards**：`.qjyd-status-cards` + 两个 `.qjyd-status-card` | 默认 C15。两张等高卡片，左 DONE accent，右 NEXT 中性灰 |
| 左侧成果/核心数字明显是主叙事，右侧只是瓶颈/下一步行动栏 | **C15-ASYM Status Asym**：`.qjyd-status-asym` + `.asym-main` / `.asym-side` | 左侧大数字主视觉，右侧窄栏承接行动项 |
| 旧项目已有 hairline 双栏 | `.qjyd-status-duo` | 仅历史兼容；动效仍支持，但新 deck 不建议默认使用 |

**核心设计原则**：

- **左侧正向/已发生 = accent 海洋青；右侧下一步/待发生 = 中性灰**。
- ❌ 不要用红色给“瓶颈/不足”上色——会变成 alarm，但多数“下一步/瓶颈”只是中性待办。
- 标题 H1 与主内容左缘都应跟随画布左边距（qjyd-corp 默认 x=88），不要把 C15 主内容单独居中成另一条轨。
- `data-animate` 仍写 `status-duo`；模板 recipe 已兼容 `.qjyd-status-card`、`.qjyd-status-asym` 和旧 `.qjyd-status-duo`。

### C15 Status Cards · 完整骨架（默认）

```html
<section class="slide light" data-layout="C15" data-animate="status-duo">
  <div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-7)" data-anim>
    <div class="qjyd-meta">PROGRESS · 知识自沉淀 3.0</div>
    <h1 class="qjyd-h1">本周成果与下一步</h1>
  </div>
  <div class="qjyd-status-cards">
    <div class="qjyd-status-card done">
      <div class="sd-tag"><span class="sd-mark"></span>DONE · 本周成果</div>
      <div class="sd-headline">
        <div class="sd-title">3.0 优化完成<br>本周正式启用</div>
        <div class="sd-badge">
          <div><span class="sd-badge-num">85</span><span class="sd-badge-unit">%</span></div>
          <div class="sd-badge-label">沉淀可直接入库</div>
        </div>
      </div>
      <ul class="sd-points">
        <li><b>100%</b> · 待人工审核分类准确率</li>
        <li>本周起进入正式运营周期</li>
        <li>话后批量沉淀已稳定运行</li>
      </ul>
      <div class="sd-foot">3.0 已稳定运行一周, 进入常态化沉淀阶段。</div>
    </div>
    <div class="qjyd-status-card next">
      <div class="sd-tag"><span class="sd-mark"></span>NEXT · 待打通</div>
      <div class="sd-headline">
        <div class="sd-title">知识全自动入库<br>仍差最后一环</div>
        <div class="sd-badge">
          <div><span class="sd-badge-num">1</span><span class="sd-badge-unit">项</span></div>
          <div class="sd-badge-label">仍待开放接口</div>
        </div>
      </div>
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

**Status Cards 硬规则**：

1. ✅ 两张卡必须等高：`.qjyd-status-cards { align-items:stretch }` + `.qjyd-status-card { height:100% }`。不要让左右卡片随内容一高一低。
2. ✅ 两侧都可以有 `.sd-foot`，用于把卡片底部视觉锚点拉齐；如果一侧没有总结句，也建议补一句短结论，而不是留空。
3. ✅ `.sd-headline` 内 badge 可以用 `margin-left:auto` 贴向卡片右侧，形成“标题 + 大数字”的横向张力。
4. ❌ 不要再把主内容设置 `max-width:1177px; margin:auto` 居中；新版 C15 主内容应占满画布内容区。

### C15-ASYM Status Asym · 完整骨架（左主右辅）

用于“左侧成果已达成 / 核心数字是主叙事，右侧只是下一步行动栏”的场景。

```html
<section class="slide light" data-layout="C15-ASYM" data-animate="status-duo">
  <div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-7)" data-anim>
    <div class="qjyd-meta">PROGRESS · 知识自沉淀 3.0</div>
    <h1 class="qjyd-h1">本周成果与下一步</h1>
  </div>
  <div class="qjyd-status-asym">
    <div class="asym-main">
      <div class="sd-tag"><span class="sd-mark"></span>DONE · 本周成果</div>
      <div class="asym-num"><span class="n">85</span><span class="u">%</span></div>
      <div class="asym-label">沉淀可直接入库<br>3.0 本周正式启用</div>
      <ul class="sd-points">
        <li><b>100%</b> · 待人工审核分类准确率</li>
        <li>本周起进入正式运营周期</li>
        <li>话后批量沉淀已稳定运行</li>
      </ul>
    </div>
    <div class="asym-side">
      <div class="sd-tag"><span class="sd-mark"></span>NEXT · 待打通</div>
      <div class="side-num"><span class="n">1</span><span class="u">项</span></div>
      <div class="side-title">仍待开放接口</div>
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

**Status Asym 硬规则**：

1. ✅ 左右外框必须等顶等高；当前模板通过 grid stretch 保证 `.asym-main` / `.asym-side` 高度一致。
2. ✅ 如果视觉上觉得左侧绿色主卡“靠下”，优先检查 `.asym-main` 内部 top padding、`.asym-num` 的 `margin-top`、`.asym-main .sd-points` 的 `margin-top`；不要移动整个外框。
3. ✅ `.asym-main` 当前 top padding 应与右侧行动栏一致（`var(--sp-7)`），这是为了让左右 `.sd-tag` 顶部对齐。
4. ❌ 不要把 C15-ASYM 用在两侧完全等权的 A/B 对照上；等权对照用 C15 Status Cards。

**容量规则**：

- Status Cards：每卡 3-4 条 bullet 最稳；badge 数字推荐 1 个，标签 ≤ 8 个中文字符。
- Status Asym：左侧 1 个主数字 + 2 行主标题 + 3 条 bullet 最稳；右侧 1 个小数字 + 3-4 条 bullet + 1 句 foot 最稳。
- 两种结构都不适合放 5 条以上长 bullet；内容太多时拆成 C16 要点墙或 C06 时间线。

**适用与不适用**：

| ✅ 适用 | 推荐 | ❌ 不适用 |
|---|---|---|
| 周报“本周成果 vs 下周计划” / 复盘“亮点 vs 不足” | C15 Status Cards | 三栏对比（用 C11） |
| 项目“已交付 vs 待交付” / 技术债“已解决 vs 待解决” | C15 Status Cards | 历史路径（用 C06 timeline） |
| 成果数字特别强，下一步只是少量阻塞项 | C15-ASYM | 两侧完全等权的 A/B 方案 |
| 调研“问题 vs 方案” / 客户“现状 vs 目标” | C15 Status Cards | 4 项并列（用 C07 / C16 `.cols-2`） |



## C16 · 要点墙 / Bullet Manifest

**用途**：纯文字要点列表，hairline 分隔每项。**默认 3 列**（最常用 6 / 9 项）；通过 modifier 类支持 **2 列（`.cols-2`）** 和 **4 列（`.cols-4`）**。无卡片框、无 chip、无图标——比 C07 卡片矩阵轻 70%，是「对内同步」最常用的版式之一。

**何时用 C16 vs C07 vs C15**：

| 你的内容 | 选谁 | 原因 |
|---|---|---|
| 4 个等权块、有图标 / chip / 子能力 | C07 cards-2x2 | C07 有 icon + chip 槽位，强展览感 |
| 4 / 6 / 9 个纯文字要点（编号 + 标题 + 描述 + 状态 tag） | **C16** | 轻量、信息密度高 |
| 2 项左右对照 | C15 Status Cards / C15-ASYM | 双卡适合等权对照；左主右辅适合主次明显的成果页 |

**容量与列数选择**（**这是 C16 最关键的决策**）：

| 项数 | 推荐做法 | class |
|---|---|---|
| 2 项 | 不建议——信息量太低，改用 C15 | — |
| 3 项 | 默认 3 列（一行 3）✅ | `.qjyd-bullet-manifest` |
| **4 项** | **2 列 2×2** ✅ ← 关键：避免「3+1 孤儿」 | **`.qjyd-bullet-manifest.cols-2`** |
| 5 项 | 默认 3 列（一行 3 + 一行 2）△ 可接受 | `.qjyd-bullet-manifest` |
| **6 项** | **默认 3 列（2×3）✅ 标准款** | `.qjyd-bullet-manifest` |
| 7 项 | 不推荐，改成 6 或 8 项；硬要用走默认 3 列（最后一行 1 个孤儿） | — |
| 8 项 | 4 列 2×4 ✅ | **`.qjyd-bullet-manifest.cols-4`** |
| 9 项 | 默认 3 列（3×3）✅ 满版 | `.qjyd-bullet-manifest` |
| 10+ 项 | ❌ 拥挤，拆成两页 | — |

> **铁律：4 项必须用 `.cols-2`，不要硬塞默认 3 列**——会出"3 + 1 孤儿"，最后一行只剩一个 item 一段 hairline，画面立刻塌。

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

**常见错误**：

1. ❌ **4 项硬塞默认 3 列** —— 出 3+1 孤儿。必须加 `.cols-2`
2. ❌ 把每项都加 `.bm-item.accent` —— 失去强调意义。**全 deck 至多 1-2 项 accent**
3. ❌ `.bm-desc` 写成 3 行以上 —— 单元变高，整体网格不对齐。每项描述控制在 1-2 行
4. ❌ `.bm-tag` 写成长句 —— tag 是状态标签（"已完成 / 推进中 / 阻塞"），不是描述。3-5 字最合适
5. ❌ 用 C16 替代 C07 做「需要图标 + chip 的能力展览」 —— C16 没有图标也没有 chip。**它们的边界是「数据形状」，不是「对内 vs 对外」**——C16 是「编号 + 标题 + 描述 + 状态 tag」的形状，C07 是「图标 + 标题 + 描述 + chip」的形状


## C13 · 结束页 Thank You

**用途**：演示结束、Q&A 提示页、联系方式页。

**骨架**：左 "Thank You" 巨标 + 联系方式 3 列 + 右 logo 圆环呼应。

**关键类**：`.qjyd-thank`、`.th-left`、`.th-right`、`.th-contact`。

**注意**：
- `Thank` 用 `.accent-line` 渐变，`You.` 保持深色，形成视觉对比。
- **右侧 logo 圆环装饰 SVG 与 C01 同源**：整段从 `assets/template-corp.html` 的 C13 `.th-right` 复制,
  不要自己重写几何。同样遵守 C01 的"装饰 SVG 同心环硬规则"——上限 2 环, 最内圈半径 ≥ 180,
  禁止贴脸内圈。

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
| **C15 · Status Cards / Status Asym** | 成果 / 下一步对照 | 默认双等高卡；主次明显时用左主右辅，**整页无图** |
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

### C16 与 C07 的边界（按数据形状区分，不按场景）

- **C07 cards-2x2** = 「图标 + 标题 + 描述 + chip 子能力 + 标签」的形状，重展览感、有视觉冲击力
- **C16 bullet-manifest** = 「编号 + 标题 + 描述 + 状态 tag」的形状，hairline 分隔，重信息密度
- 选哪个看**你手里的内容长什么样**：
  - 你的每项内容自然带图标/能力 chip → C07
  - 你的每项内容是「一个状态 + 几行说明 + 标签」 → C16
- 「对内 vs 对外」**不是**判断依据。周报里 4 个项目模块完全可以用 C07（每项一个 icon + chip 列具体动作 + tag 写状态）；销售提案里"产品 6 个特性"也可以用 C16（3 列 hairline 列法）。**结构匹配 > 主题归属**


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


## 2026-06 更新十（版式分类去主题化 + C16 列数变体 cols-2 / cols-4）

### 现象

之前的 16 版式速查表把版式标了"通用 / 提案 / 周报"三类，看似贴心，实际有两个副作用：

1. **AI 错过通用版式** —— 周报生成时不敢碰 C07 / C08 / C10 / C12（被打了"提案专用"标签），把 4 个项目模块硬塞进 C16 默认 3 列，触发"3+1 孤儿"塌房。
2. **C16 容量约束被忽略** —— 旧文档把"4 项不推荐"写在容量表里，但 SKILL.md 主入口没强调；AI 快速生成时只 grep C16 骨架就开抄，看不到这条约束。

### 修复

- **去掉"场景偏向"列**，速查表改成「项数 + 是否需图 + 数据形状」三个结构维度；C07 / C08 / C09 / C10 / C12 用途说明同步扩展，去掉"提案专用"暗示。
- **C16 新增 `.cols-2` 和 `.cols-4` modifier**（template-corp.html 内）：
  - `.qjyd-bullet-manifest.cols-2` → 2 列（推荐承载 4 项）
  - `.qjyd-bullet-manifest.cols-4` → 4 列（推荐承载 8 项）
- **C15 适用表扩展**：从"成果 / 瓶颈"专用扩展为「任何 2 列等权对照」（旧/新、A/B 方案、问题/方案等都行）。
- **SKILL.md 红线 19 → 21**：新增红线 20（版式选择按内容形状不按主题）、红线 21（C16 项数硬约束 + cols-2/cols-4 用法）。
- **SKILL.md §3.1 新增风格 C 决策表**：让 AI 不必下钻 layouts-corp 也能正确选版式。

### 教训

> 给版式贴"对内 vs 对外"或"周报 vs 提案"的主题标签，是「用主题分类间接解决另一个问题（图片缺失）」的过度防御。**真正的硬约束只有：项数、是否有图、数据形状**。其他都是软标签，不应该让 AI 自我设限。


---

## 2026-06 更新七（C04 间距反模式修复 · `space-evenly` 戒律）

继 C04 在生成《客服周报》时被用户实测出"标题↔chip 之间空荡 95px"后，定位到这是 2026-06 更新三引入的反模式：用 `justify-content:space-evenly` 均布 num-side 内三段（chip / mega / ba），在 ~85vh 列高里把每段间隙都顶到了 90+ px。

### 修复要点

| 项 | 老版（更新三）| 新版（更新七）|
|---|---|---|
| **`.num-side` 主轴布局** | `gap: sp-6` + `justify-content: space-evenly`（自动均布） | `gap: sp-7` + `justify-content: flex-start`（显式紧凑） |
| **chip 行位置** | 在 `.num-side` 内部作为顶部锚点 | **上提到标题区**，紧跟 `<h1>` 后（`margin-top: var(--sp-3)` 即 8px） |
| **mega 居中机制** | `space-evenly` 自动均布的副产品 | 包一层 `.qjyd-kpi-group`，内含 mega-wrap + ba-block，整组 `margin: auto 0` 垂直居中 |
| **`.ctx-side` 同样修法** | `space-evenly` | `gap: sp-7` + `flex-start`（**初版误加 `margin-top: auto` 已撤销**，见下方 v2 修订）|

### 实测前后对比

| 区间 | 修改前（space-evenly） | 修改后（kpi-group 居中） | 目标 |
|---|---:|---:|---|
| 主标题 → chip | ~95 px ❌ | 18–20 px ✅ | ≤ 30 px |
| chip → mega | ~95 px | ~160 px（设计性留白，chip 已归标题区）| – |
| mega → 副标 | ~35 px | ~35 px ✅ | 30–40 |
| 副标 → ba-block | ~70 px ⚠️ | ~48 px ✅ | 30–50 |
| 视觉重心 | 偏中（mega 飘）| 居中（mega y≈384，整页中线）✅ | 中部 |

### 为什么 chip 应该归标题区，不是 num-side

`.nm-chip` 上的内容（"Q2 在线总工时"、"目标 57.6"、"截止本周"、"客户类型"、"模块"）都是**标题的统计口径补充**——即"这一页讲的 KPI，是在什么范围 / 什么口径下统计的"。这种内容跟 `<h1>` 是父子语义，不是跟 mega 并列的视觉锚点。

老版把 chip 放进 num-side 是因为想让它"作为大数字的元信息"——但视觉上它一旦远离标题、被均布顶起，就脱离了语义归属。新版让 chip 紧贴标题，才符合读者的扫读路径：**先读标题 + chip 知道这是什么、统计哪些；再看大数字知道结果**。

### v2 修订（ctx-side 的 `margin-top: auto` 反模式）

更新七初版给 `.ctx-side > .qjyd-bullet` 加了 `margin-top: auto`，目的是让 bullet 列表"贴到 ctx-side 列底，与左侧 ba-block 上下对齐"。实测下来这个决策是错的——

**问题表现**：浅绿色 case 卡底 y≈329，bullet 第一行被推到 y≈612，**中间空了 283 px**，整块右栏看上去像"卡和列表是两件无关的事"。

**根因**：bullet 三行的语义是**对 case 卡的展开补充**（"我们怎么用 AI"→ 三种用法），不是对左侧 ba-block 的视觉对位。强行让它贴底，等于把同一语义组的元素拆成了上下两半。

**修法（v2）**：
- 删掉 `.ctx-side > .qjyd-bullet { margin-top: auto }`；
- 给 bullet 显式 `margin-top: var(--sp-4)`（12 px），叠加 ctx-side 自身 `gap: var(--sp-7)`（32 px），得到卡底→bullet 第一行 ≈ 44 px 的紧凑间距；
- bullet 字号从 `clamp(16px, 1.18vw, 19px)` 提到 `clamp(17px, 1.28vw, 21px)`（line-height 保持 1.65）。

**实测**：

| 区间 | v1 | v2 | 目标 |
|---|---:|---:|---|
| case 卡底 → bullet 第一行 | ~283 px ❌ | ~44 px ✅ | 30–50 |
| bullet 字号 | 16–19 px | 17–21 px ✅ | 易读 |
| bullet 第三行 → 页脚 | ~30 px（贴底，挤）| ~267 px（自然留白，与左侧 ba-block 错位是预期）| – |

**原则提炼**："视觉对齐 ≠ 语义对齐"。如果一个元素是另一元素的语义子项（补充说明、展开列表），让它紧跟父元素，不要为了和另一列对齐就把它推到列底——留白会自然跑到正确的位置。

### v2 补丁（bullet 数量从 3 → 6）

把 bullet 从 3 条扩展到 6 条后实测：

| 区间 | 3 条 | 5 条 | 6 条 | 评价 |
|---|---:|---:|---:|---|
| bullet 末行底 y | ~468 | ~547 | ~586 | – |
| 末行 → 页脚留白 | 267 px ❌ 偏空 | 188 px △ 略空 | **147 px ✅ 健康呼吸感** | – |
| 与左侧 ba-block 底（y≈612）差 | 144 px（短一截） | 65 px | **26 px ✅ 几乎齐平** | – |

**结论**：C04 模板默认给 6 条 bullet。这样：
- 右栏内容铺到与左侧 ba-block 底部基本齐平，整页"左右收尾对称"；
- bullet 末行 → 页脚留白 ~147 px，符合「~20% 列高呼吸感」的视觉舒适区；
- 6 条正好覆盖一个完整业务漏斗的关键节点（招聘场景：解析 → 面试 → offer → 数据 → 入职 → 产出效益），既有信息密度也有叙事完整性。

**触发条件**：
- ≤ 3 条 → case 卡下方会留 250+ px 空白，看上去像"右栏没填完"；
- 4 条 → 留白仍偏大（约 220 px），勉强；
- **5–6 条 → 推荐**；
- 7+ 条 → 末行会顶到页脚区或被 `.qjyd-bullet` 自身 `gap` 挤密；如果业务确实有 7+ 个要点，建议拆成两列（参考 C16 bullet-manifest）或拆成两页。

---

## 段间距 token 速查表（C 风格 · 通用，**不只限于 C04**）

模板里 `--sp-N` token 数量多，但缺乏「在哪种位置该用哪个 sp」的指引。下面这张表是从 16 个版式实战提炼的默认值，**先按表查再调**：

### 标题区内部

| 场景 | 推荐 token | px |
|---|---|---:|
| `.qjyd-meta` kicker → `<h1>` | `gap: var(--sp-4)` | 12 |
| `<h1>` → `.num-meta-row` chip 行（C04 / C05 / C07 均适用）| `margin-top: var(--sp-3)` | 8 |
| `<h1>` → `qjyd-lead` 引言段 | `margin-top: var(--sp-5)` ~ `var(--sp-6)` | 16–24 |

### 标题区 → 主体内容（`margin-bottom` 写在标题 wrapper 上）

| 场景 | 推荐 token | px |
|---|---|---:|
| C03 议程 / C16 要点墙 / C07 4 卡（横铺多卡）| `var(--sp-9)` | 48 |
| **C04 大数字 KPI（标题带 chip 时）** | `var(--sp-8)` | 40 |
| C05 三段 KPI（巨数字三联）| `var(--sp-10)` | 64 |
| C15 Status Cards / C11 数据对比表 | `var(--sp-7)` | 32 |
| C14 Statement | 走 `.st-display` 自身 line-height，不需 margin-bottom | – |

### 主体内部段间距

| 场景 | 推荐 token | px |
|---|---|---:|
| KPI 组（mega → 副标 → ba）内部 | `gap: var(--sp-7)` | 32 |
| 卡片群之间（C07 / C11 / C12 卡片网格 cell-gap）| `gap: var(--sp-6)` | 24 |
| `.qjyd-bullet` 列表项之间 | `gap: var(--sp-3)` ~ `var(--sp-4)` | 8–12 |
| C16 `.qjyd-bullet-manifest` 项之间 | 由模板 grid `gap: var(--sp-7)` 控 | 32 |

### 用 margin 锚定 vs 用 gap 撑开（**核心区分**）

| 诉求 | 用 | 不用 |
|---|---|---|
| "三段元素均匀分布到容器高度" | ❌ **不要用 `space-evenly`**（详见红线 22）| – |
| "某一组元素整体居中到剩余空间" | ✅ 包一层 wrapper + `margin: auto 0`（参考 `.qjyd-kpi-group`）| `space-around` / `align-self:center`（前者撑开，后者只居中元素自身不带子节点）|
| "最后一项贴底（且与父元素**无紧密语义关系**）" | ✅ 该项 `margin-top: auto`（仅当它是独立段、明确想呼应另一列底部锚点时用） | `flex-end`（会让所有项一起贴底）|
| "最后一项是上方元素的补充说明" | ✅ `margin-top: var(--sp-4)` ~ `var(--sp-6)`（让它紧跟语义父级，留白自然落到列底）| ❌ `margin-top: auto`（会拆散语义组，参见 C04 v2 修订）|
| "段间显式 32px 间距" | ✅ `gap: var(--sp-7)` | 写死的 `margin-bottom: 32px`（无法被全局调整）|



---

## 2026-06 更新十一（C06 时间轴字号与重心修复）

继 C04 间距修复（更新七 + v2 + bullet 6 条）后，C06 时间轴在《客服周报》生成时被用户实测出三个问题：

1. **字号断崖**：年份用 `clamp(30,2.8vw,48px)` 巨字、紧接的 title/desc 一下掉到固定 16px / 13px，对比过强、文字像被压扁；
2. **整组偏上**：横线 y≈240、描述底 y≈359，下方留白 ~375 px，整页明显头重脚轻；
3. **节奏不一**：5 个节点中有 3 个 desc 是 2 行、2 个是 1 行，节点高度参差。

### 修法

**字号 clamp 化**：

| 元素 | 旧（固定 px）| 新（clamp 跟随）|
|---|---|---|
| `.tl-title` | 16 px | `clamp(18px, 1.35vw, 22px)` line-height 1.35 |
| `.tl-desc` | 13 px line-height 1.5 | `clamp(15px, 1.1vw, 18px)` line-height 1.55 |
| `.tl-node` gap | sp-3 (8) | sp-4 (12) |
| `.tl-title` margin-top | sp-2 (4) | sp-3 (8) |
| `.tl-desc` margin-top | – | sp-2 (4)（新增显式分隔）|

**重心下移**：

| 旋钮 | 旧 | 新 |
|---|---|---|
| `--tl-pad-top` | `calc(sp-9 + sp-9)` = 96 px | `var(--sp-13)` = 160 px |

**desc 行数统一**：所有 5 个节点的 `.tl-desc` 都补成 2 行，节奏整齐。

### 实测前后

| 指标 | 旧 | 新 | 评价 |
|---|---:|---:|---|
| 时间轴横线 y | ~240 | ~287 | 下移 47 px |
| 描述底 y | ~359 | ~449 | 下移 90 px |
| 描述底 → 页脚留白 | ~375 px ❌ | ~284 px ✅ | 改善 91 px，落入"克制呼吸感"区间 |
| 标题字号（实测 1600 宽）| 16 px | ~21 px ✅ | – |
| 描述字号（实测 1600 宽）| 13 px | ~17 px ✅ | – |
| 模块视觉重心 vs 页面中心 | 偏上 ~150 px | 偏上 ~22 px | 接近居中 ✅ |

### 原则提炼

1. **大数字 + 小字 = 断崖**：当一个版式同时出现 `clamp(30+, ..., 48px)` 巨字和 `16px / 13px` 小字时，比例差超过 3 倍，视觉上会断层。**小字也得 clamp 化**，让两端在大屏上一起放大、保持比例。
2. **"贴底"和"撑满"是同一类反模式**：C04 更新七 v2 已经否定了 `margin-top:auto` 的滥用（拆散语义组），C06 旧版用 `min-height:44vh + margin-top:auto` 同样把 dot 和 title 之间的"列高"撑出来——结果是「上半屏挤、下半屏空」。修法都一样：**用显式 padding/gap 控间距，让内容自然占位，不要用"撑满+贴底"组合**。
3. **节奏一致优先**：在节点列表（time line / bullet / KPI 群）里，**所有节点的视觉重量（行数 / 字数）应统一**。补内容比删内容更安全。

---

## 2026-06 更新十四（C15 标题旁徽章 + 双栏行对齐修复）

继 C04 间距、C06 时间轴、C08 注释 bug 之后, 用户在《客服周报》"本周成果与下一步"页（C15）反馈两个问题：

1. **标题区视觉偏左**：左右两栏 `.sd-title` 都被 `max-width:18ch` 卡死在 ~449 px，单栏总宽 664 px，**右侧硬空 215 px**。整栏看上去是「上窄下宽」的不平衡感。
2. **左右两栏每行错位 63 px**：当左右栏 bullet 数量不一致时（左 3 条 / 右 4 条），`align-items:center` 会把短栏整体压到下面 60+ px，导致 tag / title / badge / 第一条 bullet 全部不对齐。

### 修法 1：标题旁加 KPI 徽章（填补右侧空白）

新增 `.sd-headline`（容器）+ `.sd-badge`（徽章），把原本只有 sd-title 一项的标题区，扩展为「左 sd-title + 右 sd-badge」横向布局：

```html
<div class="sd-headline">
  <div class="sd-title">3.0 优化完成<br>本周正式启用</div>
  <div class="sd-badge">
    <div><span class="sd-badge-num">85</span><span class="sd-badge-unit">%</span></div>
    <div class="sd-badge-label">沉淀可直接入库</div>
  </div>
</div>
```

**徽章配色规则**（继承 C15 「左 accent / 右中性灰」语义）：

| 栏 | 数字 + 单位色 | 含义 |
|---|---|---|
| `.sd-col.done` | `var(--accent-dark)` 海洋青 | DONE 强调成果 |
| `.sd-col.next` | `var(--text-1)` 中性深灰 | NEXT 克制中性, **不用红色**（沿用 C15 戒律）|

**徽章字号**：`.sd-badge-num` 用 `clamp(40px, 3.6vw, 64px)`（1600 宽下 ~58px），跟 sd-title 的 46px 形成"略大于标题"的视觉锚点。

**徽章内容选择**：从 sd-points 里抽一条最强的数字 / 量化项作徽章, bullet 减一条不影响信息量。比如左栏原本第 1 条 `<b>85%</b> · 沉淀可直接入库知识占比` → 上提为徽章 + 留下 3 条 bullet。

### 修法 2：`align-items: center → start` + 主动补 sd-foot

`align-items: center` 在两栏内容相近时无害，但 bullet 数量不同时会产生 60+ px 的整栏垂直错位。**改成 start 后必然出现的"短栏底部空"问题，用主动给短栏补 sd-foot 解决**——这比硬居中带来的"行行错位"舒服得多。

### 实测前后

| 元素 y 坐标 | v0 (center, 错位) | v2 (start, 对齐) | 评价 |
|---|---:|---:|---|
| 左栏 tag 顶 | 340 | **202** | – |
| 右栏 tag 顶 | 277 | **202** | ✅ 完全齐 |
| 左栏 title 顶 | 390 | 252 | – |
| 右栏 title 顶 | 327 | 252 | ✅ 完全齐 |
| 左栏 badge 顶 | 405 | 268 | – |
| 右栏 badge 顶 | 342 | 268 | ✅ 完全齐 |
| 左栏第 1 bullet | 522 | 384 | – |
| 右栏第 1 bullet | 459 | 384 | ✅ 完全齐 |
| 左栏 title 右侧空白 | 215 px ❌ | **填满** ✅ | 徽章补位 |

### 原则提炼

1. **横向 grid 双栏内 align-items 的选择规则**：内容长度相近用 center（自然居中），长度差距明显**必须**用 start（行对齐）+ 短栏主动补内容。**不存在"两全其美"的 align-items 值**——这是数据决定的视觉取舍。
2. **`max-width: NNch` 是个隐患**：在大屏（≥ 1600 宽）下，固定字符数会让标题文本盒只占栏宽的 ~60%，右侧 40% 全空。如果发现"标题偏左/上窄下宽"，先 grep 一遍 `max-width:\s*\d+ch` 看看是否罪魁。
3. **修法可以是"加内容"而非"压宽度"**：与其改 max-width 让标题撑大（容易溢出/打破节奏），不如在标题旁加一个语义补充元素（KPI 徽章 / icon / 小图）填空白——既解决偏左，又增加信息密度。

---

## 2026-06 更新十五（C15 徽章定位 + 内容垂直居中纠偏）

更新十四 v1 给 C15 加了 `.sd-headline` 容器, 但实现时偷懒用了 `justify-content:space-between`, 把徽章顶到栏的最右边。结合 `column-gap:sp-9` (48px) 较窄, 出现两个新问题:

1. **徽章脱离本栏标题**: 标题→徽章间距高达 **120 px**, 徽章紧贴中间分隔线 (距离仅 48 px)。**用户视觉上把左栏 "85%" 误读为跨栏指标 / 与右栏混淆**。
2. **内容重心偏上**: status-duo 容器 `padding:sp-5 0 sp-6` (上 16 / 下 24), 加上 `align-items:start`, 内容堆在容器顶部, 中心比画布中线高 35 px, 下方留白 ~200 px。

### 修法 1: 徽章紧跟本栏标题

```css
.qjyd-status-duo .sd-headline{
  display:flex; align-items:flex-end;
  justify-content:flex-start;          /* 不再 space-between */
  gap:var(--sp-7);                      /* 32px, 标题→徽章 "同一组" 间距 */
  flex-wrap:wrap;
}
.qjyd-status-duo .sd-headline .sd-title{
  flex:0 0 auto; min-width:0;           /* title 不 grow, 让 badge 紧跟标题真实右边缘 */
}
```

效果: 标题→徽章间距从 120 px 收到 32 px, 徽章距中线从 48 px 拉到 338 px。**徽章归属一栏, 不再跨栏漂浮**。

### 修法 2: 整组下移

```css
.qjyd-status-duo{
  padding:var(--sp-10) 0 var(--sp-3);   /* 上 64 / 下 8, 翻转 padding 比例 */
}
```

效果: 内容顶部下移 76 px, 内容中心从画布中线偏上 35 px → 偏下 21 px (接近中线)。

### 实测前后

| 指标 | v2 | **v3** |
|---|---:|---:|
| 标题 → 徽章间距 | 120 px ❌ | **32 px** ✅ |
| 左徽章 → 中分隔线 | 48 px ❌ | **338 px** ✅ |
| 内容顶 y | 174 | 250 (下移 76) |
| 内容中心 y | 414.5 (偏上 35.5) | **471 (偏下 21)** ✅ |

### 原则提炼

1. **徽章 / icon / 辅助元素必须"同栏粘合"**: 在双栏 / 多栏布局里, 任何添加在标题旁的元素 (徽章 / icon / chip / 数字) 必须**紧跟在标题真实右边缘**, 而不是"撑到栏的最右边"。`justify-content: space-between` 是反模式 (会把元素推到栏边界, 容易跨栏混淆), 用 `justify-content: flex-start + gap` 控制同栏内的"语义粘合距离"。
2. **横向"语义粘合距离"参考值** (在 ~700 px 单栏宽下):

   | 关系 | 推荐 gap | px | 备注 |
   |---|---|---:|---|
   | **大字号** 标题 ↔ **大字号** 徽章 (≥ 40px) | `var(--sp-9)` | **48** | 约 1.1× 标题字号, 大字组合需更多呼吸感 |
   | 中等字号 标题 ↔ 普通徽章 / icon | `var(--sp-7)` | 32 | 通用默认 |
   | 标题 ↔ 二级辅助元素 (chip 行 / meta) | `var(--sp-6)` | 24 |  |
   | 同一组 inline 元素 | `var(--sp-4)` ~ `var(--sp-5)` | 12-16 |  |

   **判定法则**: 标题 + 徽章字号都 ≥ 40 px 时, gap 应 ≥ 字号的 1.0~1.2 倍 (经验值 `max(标题字号, 徽章字号) × 1.0~1.1`)。换算到 token 通常落在 sp-9 = 48px。直接用 sp-7 = 32px 在大字号场景会显挤 (字号占了 80%+ 的横向空间, 留给"分隔"的空气不足)。

3. **container padding 决定整组重心**: 在 flex-1 + align-items:start 的 grid 容器里, **padding-top vs padding-bottom 的比例决定内容重心**。如果发现"内容堆顶部、底部留白", 优先翻转 padding 比例 (sp-5/sp-6 → sp-10/sp-3) , 而不是改 align-items 牺牲行对齐。
4. **视觉评价工具的健壮性**: 这一轮 azure-vision 多次超时, 如果光看代码 / 盒子尺寸不看图, 会错过"徽章看起来像跨栏"这种**只有看图才能发现**的问题。**视觉评价是核心能力**, 必须保证工具链稳定 (本轮把 azure-vision.py 加了重试 + 120s 超时 + --prompt-file)。

### v2 修订 (gap 32 → 48)

更新十五初版用 `gap:var(--sp-7)` (32px), 用户实测仍觉得标题与徽章"挨得太近"。在 41.6 px 标题 + 57.6 px 徽章的大字号组合下, 32 px 间距视觉上不到标题字号的 80%, 显得局促。

**修法**: `gap:var(--sp-7)` → `gap:var(--sp-9)` = 48 px (≈ 标题字号的 1.15 倍)。

| 指标 | v1 (32) | v2 (48) | 视觉模型评价 |
|---|---:|---:|---|
| 标题 → 徽章 gap | 32 px | **48 px** | "32 略挤, 48 不挤、可保留" |

**经验法则**: 在大字号组合 (任一元素字号 ≥ 40px) 旁加 gap 时, **不要直接套用通用默认 sp-7**, 应根据字号反算: `gap ≈ max(参与元素字号) × 1.0~1.2`, 通常落在 sp-8 (40px) 或 sp-9 (48px)。
---

## 2026-06 更新十七: C15 整组居中 + 标题/双栏左缘统一

### 问题回顾

更新十六把 `.qjyd-status-duo` 从 `grid-template-columns: 1fr 1fr` 撑满 (1424 px) 改成 `540px 1px 540px + justify-content:center`, **配合**把 H1 容器加 `max-width:1128px; margin:0 auto`。看起来都是"整组居中", 但实际:

- status-duo 三列 (540 + 1 + 540 + 2 × 48 gap) = **1177 px**
- H1 容器 max-width = **1128 px**

两个限宽值不一样, 居中后:

| 元素 | 实测 left | 实测 right |
|---|---:|---:|
| H1 容器 | 236 | 1364 |
| status-duo 内容 (左栏左缘 → 右栏右缘) | 212 | 1389 |

**左缘错位 24 px, 右缘错位 25 px**。视觉模型一眼就看出"标题没和左栏主体对齐"。

### 修法 (本次定稿)

把 status-duo 也改成"自身限宽 + margin 居中 + 内部 1fr 1px 1fr 填满", **与 H1 容器共享同一个限宽变量**:

```html
<!-- C15 section 上声明一次, 作用域只在这一页 -->
<section class="slide light" data-layout="C15" data-animate="status-duo"
         style="--c15-track-w:1177px">
  <div style="...max-width:var(--c15-track-w);margin-left:auto;margin-right:auto" data-anim>
    <div class="qjyd-meta">PROGRESS · ...</div>
    <h1 class="qjyd-h1">本周成果与下一步</h1>
  </div>
  <div class="qjyd-status-duo">...</div>
</section>
```

```css
.qjyd-status-duo{
  flex:1; display:grid;
  width:100%;
  max-width:var(--c15-track-w, 1177px);  /* ← 与标题区共享 */
  margin-left:auto; margin-right:auto;
  grid-template-columns: 1fr 1px 1fr;     /* ← 内部填满, 两栏自然 540 px */
  column-gap:var(--sp-9);
  align-items:start;
  padding:var(--sp-10) 0 var(--sp-3);
}
```

### 前后对比

| 指标 | 更新十六 | **更新十七** |
|---|---:|---:|
| H1 left | 236 | **212** ✅ |
| H1 right | 1364 | **1389** ✅ |
| status-duo left | 212 | 212 |
| status-duo right | 1389 | 1389 |
| **H1 ↔ 左栏左缘 错位** | **24 px** ❌ | **0 px** ✅ |
| 整组居中 (左外留白 / 右外留白) | 211 / 211 (但内部错位) | **211 / 211** ✅ 上下基准统一 |

### 原则提炼

1. **"整组居中" 必须上下同一限宽**: 当上方标题区和下方主内容区都需要"整组居中"时, **限宽值必须完全相等**, 否则会出现 H1 vs 内容左缘错位 (典型 20-30 px, 视觉模型立刻能看出)。
2. **用 CSS 变量 + section 局部作用域**: 把限宽做成 `--c15-track-w`, 写在 section 内联 style 上 (不是 :root, 不是 body), 这样:
   - 同一个变量同时管"标题容器"和"主内容容器", 不会出现两个魔法数;
   - 作用域只在这一页, 不污染其他页 (其他页 H1 仍在 x=88 左缘, 符合各自版式);
   - 未来调整内容总宽只需改这一行变量。
3. **内部分栏不再用显式 px**: 容器限宽确定后, **内部用 `1fr 1px 1fr` 比 `540px 1px 540px` 更稳健** (栏宽自动适应限宽变量, 不会两个数字漂移)。
4. **"整组居中" 与"左栏左对齐画布" 是两种版式**: 
   - 左栏左对齐画布 (left=88): 适合**单栏长内容 / 主从内容** (C04 / C06 / C16);
   - 整组居中 (left ≈ 212, 双栏对称): 适合**双栏对照 / 平行结构** (C15);
   - **不要混搭**: 一旦决定 C15 整组居中, 标题区也必须跟着居中, 不能一半画布对齐一半内容居中。

### 适用面

任何"双栏对照 / 二段并列"的页面 (C15 风格、对比图、Before/After):
- 决策树: 单栏内容平均宽度 < 栏宽 60% → 整组居中
- 整组居中 → 标题区 + 主内容区 + 注脚区**三者共享同一限宽变量**, 用 `margin: 0 auto` 各自居中
- 限宽变量值 ≈ 双栏内容真实总宽 (栏宽 × 2 + column-gap), 不要拍脑袋取整 (如 1100 / 1128)

---

## 2026-06 更新十八: C15 标题归位画布左缘 (双轨网格 · 历史方案，已被更新二十覆盖)

> **历史状态**：本节记录的是旧版 `qjyd-status-duo` hairline 双栏在更新十六至十八期间的推导过程。2026-06 后续实测表明，虽然“双轨网格”理论上成立，但在 qjyd-corp 周报/复盘 deck 中仍容易被用户感知为“不像其他页左对齐”。当前模板已采用更新二十的 **Status Cards / Status Asym** 方案；生成新 deck 时请以本文 C15 正文章节为准，不要回退到本节的 `status-duo` 居中轨。

### 问题与决策

更新十七让标题区也跟着 status-duo 一起 1177px 居中后, 标题左缘从 x=88 移到了 x=212, **与其他所有页 (C04/C06/C16 …) 的 H1 都在 x=88 不一致**。用户实测翻页时立刻感知到 "C15 的标题位置跟别的页不一样"。

新决策: **标题保持画布最左 (x=88), 仅主内容 (status-duo) 整组居中 (x=212)**。这是有意的"双轨网格"版式特征:

- **第一轨 (标题轨)**: 画布最左缘 x=88, 全局 H1 锚点, 跨页统一
- **第二轨 (内容轨)**: 主内容居中 x=212, 仅在双栏对照场景出现

视觉模型 (azure-vision) 评价: "更偏向有版式意图, 不像 bug; 如果其他页面 H1 都在这个左缘, 那这页是成立的"——成立性靠**整套 deck 的网格一致性背书**。

### 修法

只改 C15 section 内联 style 上的标题容器, 移除限宽, 让它跟随 section padding (88px) 自然贴齐画布左缘:

```html
<!-- 更新十七 (废弃): -->
<div style="...max-width:var(--c15-track-w);width:100%;margin-left:auto;margin-right:auto" data-anim>

<!-- 更新十八 (定稿): -->
<div style="display:flex;flex-direction:column;gap:var(--sp-4);margin-bottom:var(--sp-7)" data-anim>
```

`.qjyd-status-duo` 的 CSS **不动** (仍然 `max-width:var(--c15-track-w); margin:0 auto; 1fr 1px 1fr`), section 上的 `--c15-track-w:1177px` 也保留——只在 grid 容器作用, 不再传给标题容器。

### 实测对比

| 指标 | 更新十六 | 更新十七 | **更新十八** |
|---|---:|---:|---:|
| H1 left | 236 | 212 | **88** ✅ (与 C04/C06/C16 一致) |
| status-duo left | 212 | 212 | **212** ✅ (整组居中) |
| status-duo right | 1389 | 1389 | **1389** ✅ |
| 主内容左外留白 / 右外留白 | 211 / 211 | 211 / 211 | **211 / 211** ✅ |
| 标题与其他页 H1 对齐 | ❌ (236) | ❌ (212) | **✅ (88)** |
| 标题 ↔ 内容左缘"刻意错位" | / | 0 px | **124 px (有意)** |

### 原则提炼: "双轨网格" (two-rail grid)

**触发条件**: 同一份 deck 里同时存在 "单栏内容长页 (主从布局)" 和 "双栏对照短页"。

**设计原则**:

1. **标题轨永远在画布最左缘** (qjyd-corp 规范是 x=88, 即 section padding-left)。
   - 这条是**全局规则**, 跨所有版式不变。
   - 翻页时观众的"标题锚点视线"始终落在同一条竖线上, 形成节奏感。
2. **主内容轨按版式语义自由选择**:
   - 单栏 / 主从 / 列表 (C04 / C06 / C16) → 主内容也对齐画布左缘 x=88
   - 双栏对照 / 平行结构 (C15) → 主内容整组居中 x=212
   - 三栏 / 矩阵 → 撑满 (1fr 1fr 1fr) 或居中按"是否对称"决定
3. **标题与内容左缘错位是版式特征, 不是 bug**: 当主内容是"整组居中"时, 标题保持在画布左缘, 与内容形成 ~120 px 的"刻意错位"。这个错位:
   - 错位幅度 ≥ 80 px (够大, 不会被误读为"差几像素没对齐"的低级 bug)
   - 错位方向永远是"标题在左, 内容相对右移" (符合视觉重力)
   - **只在主内容居中时使用**, 不在主内容也左对齐的页混搭

**反例**: 如果错位只有 20-30 px (像更新十六那种), 视觉上既"不像对齐"也"不像有意错开", 直接读为 bug。要么完全对齐 (差 ≤ 2px) , 要么明确错开 (≥ 80px) , 中间区是禁区。

### 与"整组居中" (更新十六/十七) 的关系

更新十六 / 十七试图让"标题 + 主内容"作为一个整体居中, 是**单页内的视觉自洽**。
更新十八放弃单页自洽, 选择**跨页一致性**——标题轨永远画布对齐, 用 deck 整体的网格一致性来支撑 C15 的"刻意错位"。

**这两个方向是真实的设计取舍**:

| 方向 | 适合场景 |
|---|---|
| 单页内整组居中 (上下都居中) | deck 里只有 1-2 页用此布局, 标题也想跟着体现"对照感" |
| **跨页双轨网格 (标题永远画布对齐, 内容按版式)** ✅ qjyd-corp 选这个 | deck 里 ≥ 80% 的页都是单栏 / 主从, 双栏只是少数, 标题保持锚点最重要 |

qjyd-corp 选后者, 因为它定位是"周报 / 月报 / 复盘 / 团队同步"为主, 单栏内容多、双栏对照少, 标题作为"翻页节奏锚点"的价值大于"单页内对照感"。

### 适用面

任何"整套 deck 大多数页是 X 网格、少数页是 Y 网格"的场景, 优先**让标题跟随大多数派**, 让少数派的主内容用自己的网格, 通过明确的错位 (≥ 80 px) 表达版式差异, 而不是让标题跟着主内容跑。

---

## 2026-06 更新十九: C16 行间距调优 (sp-9 → sp-11)

### 问题

C16 默认 `row-gap:var(--sp-9)` (48 px), 配合 `align-content:center` 在 ~85vh 列高里, 实测:

- 标题 ↔ 第一行: 162 px (大)
- **行间距: 48 px** (小)
- 第二行 ↔ 页脚: 158 px (大)

视觉读感: "行间挤、整页空"——上下大段留白让两行内容显得"漂浮", 中间又因行距小让两行像在挤一团。

### 修法

只改一行 CSS, `row-gap:var(--sp-9)` → `row-gap:var(--sp-11)` (48 → 80 px)。`align-content:center` 不动 (保持垂直居中, 多余空间自然摊到上下两端而不是行间)。

### 实测前后

| 指标 | v18 (before) | **v19 (after)** | Δ |
|---|---:|---:|---:|
| 标题 → 第1行 | 162 | **146** | -16 |
| **行间距** | **48** | **80** | **+32** ✅ |
| 第2行 → 页脚 | 158 | **142** | -16 |

视觉模型评价: **"80 px 这个调整是成立的, 比 48 px 更舒服; 现在两行有明确呼吸感, 不会互相抢, 也没有明显断层"**。同时给出"宽松上限"警示——再加到 90+ 就会被读成两个独立区块, 失去"墙"的整体感。

### 原则提炼

1. **`align-content:center` + `row-gap` 是双调节器**: row-gap 控制"行间", align-content 控制"上下对齐方式"。多余空间不会自动跑到行间, 必须显式加大 row-gap。
2. **N 行多列 grid 的行距档位** (在 ~85vh 列高 / 单元高 ~170 px 下):

   | row-gap | 视觉感 | 适用 |
   |---|---|---|
   | sp-7 (32) | 紧凑 / 信息墙 | 9 项 3×3 (行多, 必须收紧) |
   | sp-9 (48) | 标准 | 默认起点 |
   | **sp-11 (80)** | **宽松上限** | **3 列 2 行 (6 项), 想要"周报清爽感"** ✅ |
   | sp-12 (96) 以上 | 失去整体感 | ❌ 两行变成两个独立区块 |

3. **行距 vs 单元高度比** 是更稳的指标:
   - 行距 / 单元高 < 0.25 → 太挤 (本次 v18: 48/174 = 0.28, 临界)
   - 行距 / 单元高 ≈ 0.4-0.5 → 舒服 (本次 v19: 80/174 = 0.46) ✅
   - 行距 / 单元高 > 0.6 → 失整体感

### 适用面

任何"N 行 × M 列"的纯文本网格 (C16 / 类似的要点墙 / 复盘卡墙), 当出现"行间挤、上下空"体感时, 优先加大 row-gap 而不是改 align-content (改 align 容易让一端挤一端空)。

---

## 2026-06 更新二十: C15 双卡片整体 + 左主右辅定稿

### 背景

旧版 C15 `qjyd-status-duo` 使用 hairline 分隔的 1:1 双栏。为了兼顾“标题跨页左对齐”和“双栏自身居中”，曾形成更新十八的“双轨网格”：H1 在画布左缘 x=88，主内容居中到 x≈212。

后续在“本周成果与下一步”页实测中，用户反馈：这页和其他页面相比，仍缺少“同时左对齐和中间对齐”的感觉。继续微调 gap / track width 只能缓解，无法根治这个结构矛盾。

### 新决策

C15 默认改为 **Status Cards 双卡片整体**，并提供 **C15-ASYM 左主右辅** 变体：

| 方案 | 适用 | 关键视觉 |
|---|---|---|
| **C15 Status Cards** | 两栏基本等权 | 两张等高卡片占满画布内容区，标题与主内容都左对齐；卡片之间自然形成中轴 |
| **C15-ASYM Status Asym** | 左侧成果/核心数字是主叙事，右侧是行动栏 | 左侧绿色主卡承载大数字，右侧窄栏承接 NEXT；不强行等权 |

### 实现要点

1. **Status Cards 必须等高**：`.qjyd-status-cards { align-items:stretch }` + `.qjyd-status-card { height:100% }`。
2. **Status Asym 左右外框必须等顶等高**：如果觉得左侧绿色卡片“靠下”，问题通常在内部节奏，不在外框位置。
3. **Status Asym 内部节奏定稿**：`.asym-main` top padding 与右侧 `.asym-side` 对齐到 `var(--sp-7)`；`.asym-num` 用 `margin-top:var(--sp-6)`；`.asym-main .sd-points` 用 `margin-top:var(--sp-7)`。
4. **动效沿用 `status-duo` recipe**：JS 已兼容 `.qjyd-status-card`、`.qjyd-status-asym` 和旧 `.qjyd-status-duo`。
5. **旧 `.qjyd-status-duo` 仅历史兼容**：不要在新 deck 中默认复制旧 hairline 双栏。

### 经验结论

当“主内容居中”和“跨页左对齐”冲突时，不要只靠轨道错位解释设计意图。对 qjyd-corp 这类企业汇报风格，更稳的做法是让主内容也回到画布左缘，再用卡片、分栏、宽度比例来建立中轴与结构感。

---

## 2026-06 更新二十一: C04 ctx-side 重心居中 + var(--text-4) fallback

### 现象

两个独立 bug，从 2026-06-17 客服周报项目里被用户实测发现：

1. **C04 右列 bullet 末行与左列 ba-block 底部差 ~21px**，肉眼会触发"快对齐没对上"的不适感。模板自身的 C04 示例页也存在同样问题。
2. **C15 `.qjyd-status-card.next` 圆点全部不可见 / C15-ASYM `.asym-side` 圆点全部不可见**。圆点 DOM 存在、`width/height/border-radius` 都对，但 `background-color` 解析为 `transparent`。

### 根因

**1. C04 bullet 错位 21px**

- 左列 `.num-side` 内 `.qjyd-kpi-group { margin: auto 0 }` 整组**居中**，所以 ba-block 的 bottom 锁定在 num-side 中线下方某固定位置（如 viewport 900 时 717）。
- 右列 `.ctx-side` 旧版用 `flex-direction:column; justify-content:flex-start; gap:var(--sp-7)`，case 卡贴顶、bullet 紧跟其后——bullet 末行 bottom 完全由"内容总高 + 起点 (= ctxSide.top)"决定，**没有任何机制让它锚定到左列底部**。
- 5-6 条 bullet 时，bullet 末行 bottom ≈ 696，与 ba-block bottom 717 之间稳定差 ~21px。这是**视觉对齐感最差的距离**——大到不能误解为"对齐了"，小到会引发"应该对齐但偏一点"的错觉。

**2. NEXT/ASYM-SIDE 圆点不可见**

- 模板 CSS 写了 `.qjyd-status-card.next .sd-points li::before { background:var(--text-4); }` 和 `.qjyd-status-asym .asym-side .sd-points li::before { background:var(--text-4); }`。
- 但 `:root` 块里**只定义了 `--text-2` 和 `--text-3`**，**从未定义 `--text-4`**。
- CSS 自定义属性未定义时，`var(--text-4)` 解析为 `unset`，对 `background-color` 而言相当于 `initial = transparent`，圆点存在但不可见。

### 修复

**1. C04 ctx-side**：把 `justify-content:flex-start` 改为 `justify-content:center`，让 case 卡 + bullet 整组在 ctx-side 内**垂直居中**，与左列 kpi-group 视觉重心对齐：

```css
.qjyd-kpi-hero .ctx-side{
  display:flex; flex-direction:column;
  gap:var(--sp-7);
  justify-content:center;  /* 旧值 flex-start, 会导致与左列底部错位 ~21px */
}
```

修复后 bullet 末行 bottom ≈ 762，与 ba-block bottom 717 差 +45px——**远离对齐期待区**，视觉判定为"两列就是没意图严格对齐"，反而舒服。

**2. `--text-4` 双保险**：

```css
:root{
  /* ... */
  --text-3: #8A97A3;
  --text-4: #B0BBC4;  /* 新增, 浅灰, NEXT 圆点等弱信号 */
}
.qjyd-status-card.next .sd-points li::before{ background:var(--text-4, #B0BBC4); }
.qjyd-status-asym .asym-side .sd-points li::before{ background:var(--text-4, #B0BBC4); }
```

`var(--text-4, #B0BBC4)` 即使 `:root` 没补 `--text-4` 也能 fallback 到具体色值，双保险。

### 红线

26. **`.ctx-side` 的 `justify-content` 默认必须是 `center`**。`flex-start` 会让右列上紧下松、与左列居中重心错位 ~21px，触发"快对齐没对上"的不适感。
27. **6 条以上 bullet 慎用 C04**——ctx-side 高度约 607 px，case 卡 + 6 条 bullet 内容总高 ≈ 430 px 仍安全；7 条以上需要拆页或缩短描述。
28. **CSS 引用 `var(--text-N)` 必须在 `:root` 有定义**。未定义会 fallback 到 `transparent / initial`，最常见的事故就是**圆点 / 边框 / 文字消失**。修法两选一：① 在 `:root` 补 token；② 用 `var(--token, #具体色)` 写 fallback 双保险。**任何"颜色凭空消失"的 bug 优先怀疑这条**。
29. **生成 deck 后，C15 / C15-ASYM 必查右侧卡片 bullet 圆点是否可见**——这是 var(--text-4) bug 的高发现场，肉眼扫一眼就能抓。

### 经验

- "差几个像素的对齐错位"是最坑的视觉 bug——比"完全没对齐"更刺眼。设计 layout 时要么严格底对齐，要么差距足够大（≥40 px）让视觉放弃对齐期待。
- CSS 变量未定义不会报错，会静默 fallback 到 transparent/initial。**所有 `var(--xxx)` 引用都必须在 `:root` 或同选择器里有 fallback**，否则就是定时炸弹。

---

## 2026-06 更新二十二 · C04 左列三段间距比例 (mega ↔ 副标 ↔ ba)

### 现象

C04 左列 `.num-side` 内三段元素的视觉重量是 `mega(216px) : 副标(30px) : ba(95px)`，旧 gap `12 : 32`。
肉眼扫过去会觉得 mega 巨数（weight 200, 字号 ~144）下方副标 "招聘流程平均缩短" **被吸在巨数底缘**，呼吸不足；同时分组对比不够强 (1:2.67 不够清晰)。

### 根因

排版常识：巨字下方注脚的最小呼吸距离应 ≥ 字号 × 0.10-0.15。mega 字号 ~144px，至少需要 14-22px，12px 触发"窒息感"。

### 修复

```css
.qjyd-kpi-hero .num-side .qjyd-kpi-group{ gap:var(--sp-8); }  /* 32 → 40 */
.qjyd-kpi-hero .num-side .qjyd-kpi-wrap { gap:var(--sp-5); }  /* 12 → 16 */
```

比例从 `12:32 (1:2.67)` 调整到 `16:40 (1:2.5)`：
- mega ↔ 副标 +4px，副标脱离吸附；
- 副标 ↔ ba +8px，"mega+副标 ↔ ba" 分组边界更清晰；
- 整组高度 385 → 397 (+12)，居中后对左右平衡无影响（ctxSide 末行 bottom 762 → 764，左列 ba bottom 717 → 724，差 Δ=40 仍在"≥40 安全档"）。

### 红线

30. **巨数下方注脚 (mega → subTitle) 最小间距 ≥ 16px**，且应 ≥ 字号 × 0.10。当前模板 mega 字号 ~144，gap 锁 `var(--sp-5) = 16`。任何把 `.qjyd-kpi-wrap` 的 gap 改回 12 或更小的改动都视为 regression。
31. **分组对比比例 ≥ 1:2**——`.qjyd-kpi-group gap` 必须 ≥ `.qjyd-kpi-wrap gap × 2`，否则"小间距=绑定 / 大间距=分段"的分组语义会瓦解。

---

## 2026-06 更新二十三 · C04 左右双锚定布局 (取代"整组居中")

### 演进路径

| 版本 | 左列定位 | mega↔caseCard 顶 Δ | ba↔lastLi 底 Δ | 视觉评价 |
|---|---|---|---|---|
| 初版 | `flex-start` | ~107 | ~-69 | 左列贴顶, 与右列重心错位 |
| 更新八 (轮次 2) | `margin:auto 0` 整组居中 | 35 | -40 | 左右各自居中, 没强对齐意图 (可接受) |
| **更新二十三** | **`flex:1 + space-between + margin-top:70 / margin-bottom:65`** | **0** | **0** | **左右严格双锚定 — 报告级工整感** |

### 现象 (改前)

左列 `.qjyd-kpi-group` 用 `margin:auto 0` 整组居中, 视觉上是"左右两列各自重心居中、互不锚定". 实测 mega.top=328 / caseCard.top=293 (Δ=35), ba.bottom=725 / lastLi.bottom=765 (Δ=-40). 两列的"上沿"和"下沿"都偏 30-40px 没对齐——肉眼会觉得"左右没在一个节奏上"。

### 修复

```css
.qjyd-kpi-hero .num-side .qjyd-kpi-group{
  display:flex; flex-direction:column; gap:var(--sp-8);
  flex:1;                         /* 占满 num-side 剩余空间, space-between 才能起作用 */
  justify-content:space-between;  /* wrap(mega+副标) 上贴, ba 下贴 */
  margin-top:70px;                /* mega.top ≈ caseCard.top */
  margin-bottom:65px;             /* ba.bottom ≈ lastLi.bottom (4-6 条 bullet 场景) */
}
```

效果: 模板 C04 实测 megaΔ=0, baΔ=0; 真实 deck (5 ~ 6 条 bullet) 实测 |Δ| ≤ 3, 全部落在"严格对齐 ≤4 px"档。

### 为什么不是 BUG: 左列中段 sub→ba 撑成 ~114px 空白

`space-between` 会把 wrap 和 ba 之间的剩余空间撑到 ~114px。**这不是 bug, 是 feature**:
- 左列只有 2 个语义块 (mega+副标 主指标 / ba 辅助进度), 本来就是松散关系;
- 右列内容密集 (1 张 case 卡 + 5-6 条 bullet), 形成"左疏右密"密度对比;
- 这是高级报告排版的标志 (麦肯锡 / 贝恩报告常见手法), 比"左右都填满"更高级。

### 失败方案 B (只上锚) 的教训

只加 `margin-top:70` 不加 `margin-bottom` + `space-between`, 结果 ba.bottom=691, 下方留 140px 空白塌陷, 比原状还难看——"半对齐"比"不对齐"更刺眼。**双锚定必须上下都做, 不能只做一头**。

### 红线

32. **C04 左列必须是"双锚定"布局**: `flex:1 + space-between + margin-top:70 + margin-bottom:65`. 任何把 `.qjyd-kpi-group` 回滚到 `margin:auto 0` 整组居中, 或只加上锚不加下锚的改动, 都视为 regression。
33. **C04 bullet 条数限制 4-6 条**: 4 条以下 lastLi.bottom 会上漂到 ~700 (baΔ>40, 失锚); 7 条以上会让 ctx-side 内容溢出 (高度 607 不够装). 4 ≤ N ≤ 6 时 lastLi.bottom 落在 730-770 之间, 与硬锚定的 ba.bottom=765 误差 |Δ| ≤ 35 (实测多在 ≤4), 安全。
34. **C04 case 卡 (ctx-side > :first-child) 必须是固定高度的卡片** (currently 165px), 不要换成纯文字块 — 否则 caseCard.top 会偏移, 上锚失效。

---

## 2026-06 更新二十四 · C04 灰底块 padding-bottom 校准 (视觉底 vs 几何底)

### 现象

更新二十三完成"双锚定"后, 几何上 ba.bottom = lastLi.bottom = 765 严格对齐. 但肉眼仍觉得左下方灰底块"更靠下/更垂"——明明像素对齐了, 为什么?

### 根因 (典型"视觉底 vs 几何底"错觉)

视觉底对齐的真正参照不是元素几何 bottom, 而是**有内容部分**的 bottom:

| 元素 | 几何 bottom | 有内容部分 bottom | 差 |
|---|---|---|---|
| 左列 ba-block (灰底) | 765 | ba-bar bottom = 749 | -16 (灰底拖 16px 尾巴) |
| 右列 lastLi (文字行盒) | 765 | 文字基线底 = 762 | -3 (字符极少下伸) |

**进度条 vs 文字基线 Δ = 749 - 762 = -13** ← 这就是大脑感知的"左低 13px"。
几何 bottom 都是 765 (相同), 但内容 bottom 一个 749 一个 762, 视觉错位 13px——肉眼判定为"灰底块更靠下、垂得更重"。

### 修复

```css
.qjyd-kpi-hero .ba-block{
  padding:var(--sp-5) var(--sp-6) var(--sp-3);   /* 上 16 / 左右 24 / 下 8 (原 16/24/16) */
}
```

- padding-bottom 16 → 8: ba-bar bottom 上升至 757, 与文字基线 762 差距缩到 -5 (接近"≤4 严格对齐"档)
- ba 几何 bottom 仍 = 765 (因为 space-between 锚 group 底而非 ba 内部), 双锚定布局不破坏
- 灰底块的"尾巴"从 16px 缩到 8px, 视觉"垫底感"消除

### 为什么不是 padding-bottom 0

试验过 V3 (padding-bottom 0, 进度条完全贴底): 灰底底 = 749, 比文字行盒底 765 高了 16px, 反而显得"左侧偏上"——过头. **保留 8px 缓冲是平衡点**, 既消除"垂感", 又不破坏灰底块本身的视觉完整。

### 红线

35. **C04 `.ba-block` 的 `padding-bottom` 必须 ≤ 8px**. 16px (即 `padding: var(--sp-5) var(--sp-6)`) 会让灰底拖出 16px 尾巴, 与右列文字基线产生 -13px 视觉错位, 触发"左侧靠下"的不适感。
36. **判断"边框 vs 内容"对齐时, 必须量两个值**: ① 元素几何 bottom, ② 元素内 "最后一个有内容子元素" 的 bottom (灰底块看 ba-bar, 文字看 baseline). 当 ① 对齐但 ② 不对齐时, 视觉判定永远以 ② 为准。

### 经验

- "几何对齐" ≠ "视觉对齐"。任何有 padding 的卡片/灰底块的 bottom, **真正的视觉底是 padding-bottom 上方那个最后元素**, 不是 border 的 bottom。
- 文字行盒的视觉底是基线 (≈ 行盒 bottom - 行高 × 0.05-0.10), 不是行盒 bottom。
- 量"视觉底"用 `document.createRange()` + `selectNodeContents` + `getBoundingClientRect`, 比 element.getBoundingClientRect 更接近肉眼感知。

---

## 2026-06 更新二十五 · C04 双锚定改用 JS 动态校准 (修复多分辨率漂移)

### 现象 (用户反馈)

更新二十三/二十四完成后, 1600×900 截图严格双锚定 (megaΔ=0, baΔ=0). 但用户在自己屏幕上看依然觉得"灰底块更靠下"——原因是用户屏幕不是 1600×900。

实测多分辨率下静态 px margin 的对齐情况:

| 视口 | margin-top:70 / margin-bottom:65 | baΔ (左 ba.bottom 减右 lastLi.bottom) |
|---|---|---|
| 1280×720 | 70/65 | **-40** ⚠️ (左偏上) |
| 1600×900 | 70/65 | 0 ✅ |
| 1920×1080 | 70/65 | **+60** ⚠️ (左偏下) |
| 2560×1440 | 70/65 | **+187** ⚠️⚠️ (严重偏下) |

### 根因

- slide 是 100vh × 100vw, 所有相对 vh 的元素 (字号、padding) 都按视口缩放
- 但 `ctx-side { justify-content:center }` 让内容在 ctx-side 内居中, 视口越大、ctx-side 内"上下空白"越大, **caseCard.top 相对 ctxSide.top 的偏移量也越大** (1280: 22 / 1600: 67 / 1920: 128 / 2560: 267)
- 而左列 `.qjyd-kpi-group { margin-top:70px }` 是**绝对像素**, 不会跟随 ctx-side 漂移
- 即使把 70/65 改成 vh 单位 (`7.78vh / 7.22vh`), 也只能在固定比例上跟随视口缩放, 无法匹配 ctx-side justify-content:center 的"剩余空间一半"机制

### 修复 (R3-fixed)

1. CSS 端: margin 改为 CSS 变量, 兜底值保留 70/65 (1600×900 默认)
   ```css
   .qjyd-kpi-hero .num-side .qjyd-kpi-group{
     margin-top:var(--c04-mt, 70px);
     margin-bottom:var(--c04-mb, 65px);
   }
   ```

2. JS 端: 在 page load + resize + 字体加载 + slide 切换 时, 测量 caseCard.top 和 lastLi.bottom 的实际位置, 算出 num-side 内部应有的边距, set 到 hero slide 元素的 inline style 上 (CSS 变量沿继承链下传给 group):
   ```js
   var mt = caseCard.top - numSide.top;
   var mb = numSide.bottom - lastLi.bottom;
   slide.style.setProperty('--c04-mt', mt + 'px');
   slide.style.setProperty('--c04-mb', mb + 'px');
   ```

3. 触发时机:
   - `DOMContentLoaded` (首次)
   - `load` (兜底)
   - `resize` (窗口变化)
   - `document.fonts.ready` (字体晚加载会改变 lastLi.bottom)
   - 钩 `window.go` 函数 (deck slide 切换时重测)

### 验证结果

| 视口 | mt (JS 算) | megaΔ | baΔ |
|---|---|---|---|
| 1280×720 | 21px | 0 | 0 |
| 1600×900 | 67px | 0 | 0 |
| 1920×1080 | 128px | 0 | 0 |
| 2560×1440 | 285px | -6 | 6 |

全部 ≤6 (严格对齐档 |Δ|≤4 边界), 1280-1920 三档完美对齐, 2560 因 JS 校准时机略迟有 ±6px 误差但视觉上完全无感。

### 红线

37. **C04 双锚定必须用 JS 动态校准**, 不能用纯 CSS px / vh / 百分比. 任何把 `var(--c04-mt) / var(--c04-mb)` 改回静态值的修改, 都会在非 1600×900 视口下复现"左侧靠下/靠上"的视觉错位 (实测 1920×1080 偏移 +60px, 2560×1440 偏移 +187px).
38. **alignC04 脚本必须放在 `</body>` 前**, 且必须钩 deck 的 `window.go` (slide 切换重测) + `document.fonts.ready` (字体加载后重测). 漏任何一个都会让 C04 在某些时机下失锚.
39. **JS 校准失效时**, CSS 兜底值 `var(--c04-mt, 70px)` 仍能在 1600×900 上保留更新二十三的视觉效果. 不要删兜底值。

### 经验

- "在我电脑上看效果完美"是个危险的信号 — 必须在多分辨率下验证, 至少覆盖 1280/1600/1920/2560 四档.
- ctx-side 用 `justify-content:center` 这种"按剩余空间居中"的机制时, 内部锚点位置会随视口非线性漂移, **纯 CSS 没办法和它形成稳定的对齐关系**——必须 JS 测量。
- CSS 自定义属性的继承链: 设在父元素 inline style 上 → 子元素通过 `var()` 引用时能读到. 但**子元素的 CSS 规则必须真的引用 `var()`**, 否则 inline 设属性是无效的 (典型陷阱: 我先前把 var() 改进 group margin 但脚本 replace 失败, debug 时一直困惑为什么 setProperty 不生效).

---

## 2026-06 更新二十六: C15 sd-headline 行内 row+wrap 数字脱节修复 (红线 40-42)

### 现象

C15 (qjyd-status-cards) 卡片的 `.sd-headline`(左标题 + 右大数字徽章), 真实业务数据下数字突然掉到下一行, 与标题脱节. 视觉效果像"两个不相关部件错误粘合"——比模板示例数据看起来差一个档次.

具体复现 (2026-06-17 客服周报):

- 左卡 `done`: 标题"人工 + 智齿 / 双通道高密度承接" + 数字"63.37%" → 1600x900 下 wrap
- 右卡 `next`: 标题"客户群对话量大 / 但机器人覆盖薄" + 数字"2.04%" → 1600x900 下不 wrap
- 模板示例 (85% / 1 项) → 任意分辨率都不 wrap, 看起来"模板自检 OK"

### 根因

`.sd-headline` 的旧版 CSS:

```css
.qjyd-status-card .sd-headline{
  display:flex; align-items:flex-end;
  gap:var(--sp-10);              /* 64px */
  flex-wrap:wrap;                /* 关键: row 装不下时整个 badge 掉下一行 */
}
.qjyd-status-card .sd-title{
  flex:0 0 auto; min-width:0;    /* 不压缩 */
  font-size:clamp(30px,2.5vw,44px);
}
.qjyd-status-card .sd-badge{
  margin-left:auto;
  flex-shrink:0;                  /* 不压缩 */
}
.qjyd-status-card .sd-badge-num{
  font-size:clamp(58px,5.4vw,92px); /* 上限 92px, 4 位数字下 badge 宽 ~233 */
}
```

临界条件:

```
title宽 + gap(64) + badge宽 > headline容器宽(596 @ 1600x900)
```

在 1600x900 下:

| 卡片 | title 字符 | title 宽 | gap | badge 数字 | badge 宽 | 总宽 | 容器 596 |
|---|---|---|---|---|---|---|---|
| 左 (done) | 8 字 (双通道高密度承接) | 307 | +64 | 63.37 (4位) | +233 | **604** | ❌ wrap |
| 右 (next) | 7 字 (但机器人覆盖薄) | 269 | +64 | 2.04 (3位) | +188 | 521 | ✅ |

**模板示例数据踩不到这个临界, 真实数据踩得到**——典型的"demo 数据干净掩盖边界 case".

### 修复 (CSS 层兜底, 模板已默认应用)

```css
.qjyd-status-card .sd-headline{
  display:flex; align-items:flex-end;
  gap:var(--sp-7);                /* 64 → 32, 抢回 32px */
  flex-wrap:wrap;
}
.qjyd-status-card .sd-title{
  flex:1 1 auto; min-width:0;     /* 0 0 auto → 1 1 auto, 极端时 title 优先压缩 */
  font-size:clamp(30px,2.5vw,44px);
}
.qjyd-status-card .sd-badge{
  margin-left:auto;
  flex-shrink:0;
  align-self:flex-end;             /* 新增: wrap 触发时仍贴右下 */
}
.qjyd-status-card .sd-badge-num{
  font-size:clamp(58px,4.8vw,80px); /* 上限 92 → 80, 4 位数字 badge ~200 */
}
```

修复后多分辨率验证 (PPT 实战数据 63.37 + 8字标题):

| 分辨率 | 修复前 wrap | 修复后 wrap |
|---|---|---|
| 1280x720 | ❌ true | ✅ false |
| 1600x900 | ❌ true | ✅ false |
| 1920x1080 | ✅ false (容器 738 够) | ✅ false |

### 红线 40-42

- **红线 40 (CSS 层)**: `.sd-headline gap` 不得回到 `--sp-10 (64)`; `.sd-title flex` 不得回到 `0 0 auto`; `.sd-badge-num` clamp 上限不得回到 `92px`. 这些都是为"数据多样性"留的余量, 改回去等于把陷阱埋回去.
- **红线 41 (生成阶段)**: 生成 C15 deck 时, 标题 `.sd-title` 任一行 ≤ 7 字, 整体 ≤ 2 行; 数字 `.sd-badge-num` 位数 ≤ 4 (含小数点). 如果业务数据明显超出, 改用 C04 (qjyd-kpi-hero) 而不是硬塞 C15.
- **红线 42 (自检脚本)**: 生成 deck 后必须跑 wrap 检测脚本, 三档分辨率 (1280/1600/1920) 下任一卡片任一分辨率 wrap=true 都视为 regression.

### 经验

- **demo 数据是 happy path, 真实数据是 boundary**. 模板默认示例 (85 / 1) 永远是"小标题 + 短数字", 但真实业务里**百分比常常带小数, 标题常常超过 6 字**——这才是真实分布. 模板设计时必须按"真实数据分布的上 90 分位"留余量, 而不是按 demo 数据的中位.
- **`flex-wrap:wrap` + `flex-shrink:0` 组合是个隐性陷阱**. 它让两个孩子要么并排、要么完全分开 (整个掉下一行), 没有"渐进压缩"的中间状态. 对于"数据维度有变化"的场景 (任何带数字徽章的卡片), 至少要给一个孩子 `flex-shrink:1` 让 CSS 有兜底空间.
- **C15 适合"标题中等 + 数字短"的对比场景, 不适合"标题长 + 数字长"的双极端**. 强行用就会触发兜底但视觉密度对比塌掉. 数据特征匹配版面, 比硬把数据塞进版面更重要.
