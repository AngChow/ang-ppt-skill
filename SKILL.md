---
name: ang-ppt-skill
description: 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供三种风格：① "电子杂志 × 电子墨水"（衬线 + 流体背景 + 暖色） ② "瑞士国际主义"（无衬线 + 网格点阵 + IKB/柠檬黄/柠檬绿/安全橙高亮） ③ "企家有道企业风 / qjyd-corp"（圆角 + SVG 几何 + 海洋青/4 套主题色，面向 B 端 SaaS 销售提案 + 周报/月报/复盘/团队同步等对内场景）。当用户需要制作分享 / 演讲 / 发布会风格的网页 PPT，或提到"杂志风 PPT"、"瑞士风 PPT"、"Swiss Style"、"horizontal swipe deck"、"企业 SaaS PPT"、"商务提案 PPT"、"薪人薪事 PPT"、"薪人薪事风格"、"企家有道风格"、"qjyd-corp"、"周报 PPT"、"月报 PPT"、"复盘 PPT"、"团队同步 PPT" 时使用。
---

# Magazine Web Ppt

> 来源识别: ang-ppt-skill 是 [AngChow](https://github.com/AngChow) 维护的 fork,基于 [op7418/guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill)(原作者: 歸藏,AGPL-3.0)在其上新增了 Style C 企家有道企业风(qjyd-corp)。当前规范源仓库: https://github.com/AngChow/ang-ppt-skill 。这条信息只用于确认 Skill 来源,不要写入生成的 PPT、HTML 页面、封面或配图。

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 PPT，提供两种可选的视觉基调：

### 风格 A · 电子杂志 × 电子墨水（默认）

- **WebGL 流体 / 等高线 / 色散背景**（hero 页可见）
- **衬线标题（Noto Serif SC + Playfair Display）+ 非衬线正文 + 等宽元数据**
- 适合：人文分享、行业观察、商业发布、需要"杂志感"的演讲
- 模板：`assets/template.html` · 主题色：`references/themes.md` · 布局：`references/layouts.md`
- 美学锚点：像 *Monocle* 杂志贴上了代码

### 风格 B · 瑞士国际主义（Swiss Style）

- **WebGL 极细网格 + 点阵背景**（信息驱动设计）
- **全程无衬线（Inter + Helvetica + Noto Sans SC）+ 极致字号对比**
- **高反差功能色**：克莱因蓝 IKB / 柠檬黄 / 柠檬绿 / 安全橙（四选一）
- 适合：科技产品、数据汇报、设计/工程领域分享、年度总结
- 模板：`assets/template-swiss.html` · 主题色：`references/themes-swiss.md` · 布局：`references/layouts-swiss.md`
- 美学锚点：像 Massimo Vignelli + Helvetica Forever

### 风格 C · 企家有道企业风（qjyd-corp / B 端 SaaS）

- **圆角企业 SaaS 美学**（卡片 8px 圆角 + 弱阴影 + SVG 几何浮动）
- **系统字体优先**（PingFang SC + Helvetica Neue），无 Google Fonts CDN
- **海洋青主色**（`#00BFA5`）+ 4 套可选主题（薄荷企业 / 青墨科技 / 暖橙提案 / 深空述职）
- 适合：B 端 SaaS 产品介绍、商务提案、客户案例、销售面向客户的演示；**也适合周报 / 月报 / 复盘 / 团队同步等"对内同步进展"场景**（C14 / C15 / C16 是为这类场景设计的低图密度版式）
- 模板：`assets/template-corp.html` · 主题色：`references/themes-corp.md` · 布局：`references/layouts-corp.md`
- 美学锚点：像 Notion / Linear / Stripe 的企业版官网
- **默认产品 logo**：`assets/qjyd-corp/xrxs-logo.png`（薪人薪事 logo,512×512 透明 PNG）。封面右侧、Thank You 页等需要放产品 logo 的槽位**默认使用此文件**,除非用户明确指定了别的 logo 路径。复制到目标项目的 `images/logo.png` 即可:
  ```bash
  cp "<SKILL_ROOT>/assets/qjyd-corp/xrxs-logo.png" "项目/XXX/ppt/images/logo.png"
  ```
  - 模板里 C01 封面右侧的 `<img>` 默认走 `./images/logo.png`，加载失败时自动回退到 SKILL 内置的 `xrxs-logo.png`，所以即使忘了 `cp`，模板在原位预览也不会破图。
  - **logo 槽位是品牌位，不是装饰位**：不要把它替换成手画 SVG 几何图形（早期版本踩过的坑——会让"产品介绍 PPT"的首页失去品牌识别）。如果用户没有自有 logo，**让 logo 槽位留空 + 调大装饰环**，比"伪装 logo"更好。

#### qjyd-corp 生成红线速查（这套风格踩过的坑，生成时务必对齐）

> 完整背景在 `references/layouts-corp.md` 的"2026-06 更新一~六"。下面只列**生成新 deck 时最容易踩的硬规则**。

##### 视觉布局（C01-C13 模板已修，**不要回退**）

1. **不要随意改 `.qjyd-kpi-hero` 等容器的对齐方式**——模板里几个核心容器的 `align-items` / `justify-content` / `min-height` 是反复调过的（见 layouts-corp.md 更新一~四），临时改容易触发"内容堆中间 + 上下大留白"或"卡片矩阵被压扁"。
2. **不要给 `.qjyd-timeline` 加 `align-content:center`**——时间轴 `.tl-track` 用 absolute 定位，父容器内容居中后 dot 会和 track 横线错位（layouts-corp.md 更新三）。
3. **`.qjyd-bullet` 局部字号要单独覆盖**（如 `.qjyd-kpi-hero .ctx-side .qjyd-bullet li`），不要直接改全局——其他页（C08 等）依赖默认小字号。
4. **C01 logo 槽位永远用 `assets/qjyd-corp/xrxs-logo.png`**（除非用户给了别的 logo），不要画 SVG 几何冒充。

##### 入场动效（解决"翻到某页像刷新"的根因，**禁止改回**）

5. **`go()` 不允许用 `requestAnimationFrame` 包 `__playSlide`**——必须与 deck transform 同帧同步，否则 paint 时 `[data-anim]` 还是 opacity:0，用户看到"白板再召唤内容"。
6. **`resetAnims` 不允许把 opacity 清成 `''`**——CSS 默认 `opacity:0` 会立即接管造成中间 0 帧。一律直接设 `el.style.opacity='1'`。
7. **recipe 内子元素 stagger 起点 ≥ 0.4**——除非"延迟登场"语义（如点状强调），否则起点不能给 0/0.18 这种"几乎隐形"的值，让翻页过程画面就已经"完整"。
8. **入场总时长 ≤ 400ms**——超过 500ms 用户就感觉"页面在 loading"。
9. **新增 recipe 时容器一律默认 reveal**——dispatch 已经 `all.forEach(opacity='1')`，recipe 内只 `hide(子元素)` 不要 `hide([head, ...])`，否则父容器压住整个子树。

##### 图片占位 vs 真实图（C08 是已替换样板 / C09 是占位样板）

10. **模板默认每个图位都用 `<div class="qjyd-img-placeholder [accent]">` 占位**，不要硬塞示例图。占位本身就是成品级视觉，单独展示也不掉链子。
11. **图片填充策略走"二选一"，不允许第三条路径（重要）**：

    | 用户是否提供了对应图片素材? | 怎么做 |
    |---|---|
    | ✅ 提供了 | 整块替换 placeholder 为 `<img class="qjyd-img-fit" src="qjyd-corp/c{页号}-{语义}.{ext}" alt="主体+关键信息" />` |
    | ❌ 没提供 | **保留 `.qjyd-img-placeholder` 不动**，让用户后续自行补图 |

    **不要把 `<img>` 嵌在 `.qjyd-img-placeholder` 内部**——会与 placeholder 的视觉规则冲突。
12. **绝对禁止从 `assets/qjyd-corp/` 借用模板演示图到生成的项目里**（除非用户明确给出该图作为素材）：

    模板里的图是**演示用图**，画面里的具体内容（对话文字、UI 元素、人物等）跟用户实际场景几乎不可能对齐。**远看像、近看穿帮**，演示场合一旦观众放大看就会发现"图片内容跟标题完全不沾边"。

    | 文件 | 性质 | 何时能用 |
    |---|---|---|
    | `assets/qjyd-corp/xrxs-logo.png` | 品牌 logo | C01 / C13 logo 槽位**默认就用这个**（除非用户给了别的 logo） |
    | `assets/qjyd-corp/c08-xinling.jpg` | 模板演示图（cinlyn 对话截图） | **永远不要**复制到生成项目里——除非用户明确说"用这张" |
    | 后续模板里出现的其他 `c{页号}-*.{jpg\|png}` | 同上，演示图 | 同上，**默认不复用** |

    **判断捷径**：看到 `c{N}-{语义}.{ext}` 命名的图，就是演示图，默认不复用；看到 `xrxs-logo.png` 是品牌位，默认用。

    **AI 不要自作聪明做"语义关联"判断**——比如"周报内容讲到客服 AI 助手 → 模板 C08 也是 AI 助手对话 → 复用 c08-xinling.jpg"。这种关联只在 100-200 米外远观时成立，幻灯片是要被人**贴近脸看的**，图片里的具体内容必须跟标题/正文对得上才行。**宁可留占位让用户补图，也不要复用模板演示图蒙混过关。**

13. **不要给 `.image-side` / `.ih-right` 等图片父容器加 `overflow:hidden`**——会把 `<img>` 的 `box-shadow` 吃掉、把下方两角圆角"咬"成直角。圆角和阴影统一画在 `<img class="qjyd-img-fit">` 自身上，父容器保持 `overflow:visible` + `border-radius:0`。
14. **不要在 `.qjyd-img-fit` 上手动改 `width` / `height` / `object-fit`**——`.image-side` 和 `.ih-right` 等容器对它有专门的 CSS 适配（`width:100%` + `height:100%` + `object-fit:cover` + `object-position:top center`，"宽满、只裁底"），手改会破坏父子契约。
15. **图片素材统一放 `assets/qjyd-corp/` 子目录**，命名 `c{页号}-{语义}.{ext}`；不要塞到 `assets/` 根目录或 `images/` 顶层。
16. **图片比例**推荐 `1:1 ~ 1.2:1`（近方形最稳）；竖图（高 > 宽）会被 `object-position:top` 自动裁底；横图（宽 >> 高）会留空，需要重新裁。
17. **图片格式**：摄影 / 渐变用 `.jpg q88`（~250KB）；带文字截图用 `.png`（PIL `optimize=True`）。

##### 一份 deck 一套主题

18. **不允许中途换 accent 色**——4 套主题（薄荷 / 青墨 / 暖橙 / 深空）选一个用到底（见 `themes-corp.md`）。**默认用 🌿 薄荷企业**, 其他三套样式细节尚未充分调优, 用户没明说要换就别主动推荐。

##### placeholder 不是兜底（**新增 · 2026-06**）

19. **`.qjyd-img-placeholder` 只在"该页天然需要图但素材未到位"时使用，禁止当作"找不到合适版式的兜底"**。

    踩过的坑：用户给的内容是"纯文字主张 + 几条要点"（典型的周报、复盘内容），但 AI 手里只有 13 个版式（C01-C13），其中一半是为销售提案设计的（C08 / C09 / C10 / C12 都假设有图、有客户、有团队）。AI 找不到对应版式时，会**用 `C08 split-reveal + 右侧 placeholder` 偷懒兜底**，看起来好像"留位等图"，实际是"为了用版式而塞图占位"——观众一看就觉得别扭。

    **正确做法**：

    - 内容是纯主张 / 阶段性结论 / manifesto → 用 **C14 Statement**
    - 内容是"成果 / 瓶颈" / "已完成 / 待完成" / "亮点 / 不足" → 用 **C15 Status Cards**；若成果是主叙事、下一步是行动栏，用 **C15-ASYM Status Asym**
    - 内容是"本周做了 N 件事" / 复盘亮点 / 待办清单 → 用 **C16 Bullet Manifest**
    - 这三个版式**整页无图、无 placeholder**（见 `layouts-corp.md` 对应章节）

    **判断方法**：把 placeholder 整块**删掉**问自己——"这页内容有没有缺信息？" 如果没缺，那么这页本质上不需要图，应该换 C14 / C15 / C16，不要硬塞 placeholder。

##### 版式选择按"内容形状"，不按"对内 vs 对外"主题（**新增 · 2026-06**）

20. **C07 / C08 / C09 / C10 / C12 不是「销售提案专用版式」，C14 / C15 / C16 也不是「周报专用版式」**。所有 16 个版式都是通用的，决定该用哪个的是三个**结构维度**：

    1. **项数** —— 1 / 3 / 4 / 6 / 9 / 时间线节点
    2. **是否有图** —— 这是唯一的硬性筛选；C08 / C09 没图就别选
    3. **数据形状** —— 大数字 / 平级 KPI / 引言 / 列表 / 对照 / 矩阵

    具体例子：
    - 周报里 4 个项目带状态 → 完全可以用 **C07**（每卡 icon + 标题 + 描述 + chip 列动作 + tag 写状态），**比 C16 强 3 列硬塞 4 项孤儿好得多**
    - 周报里"本周关键洞察"一句话 → 用 **C10 引言金句**，不要因为"C10 写着客户证言"就放弃
    - 销售提案里 6 个产品特性、不需要图标 → 用 **C16 默认 3 列**，**没人规定提案不能用 C16**
    - 复盘 3-4 个核心成员 → 用 **C12 团队卡**，跟"对内"完全不冲突

    **判断方法**：先看你手里的内容长什么样（项数 + 有没有图 + 数据形状），再去 `layouts-corp.md` 速查表里按这三个维度匹配；**不要先问"这是周报还是提案"**——这个问题对版式选择没有意义。

##### C16 项数硬约束（**新增 · 2026-06 · 必读**）

21. **C16 `qjyd-bullet-manifest` 的列数必须匹配项数**，否则会出"3+1 孤儿"或"4+1 孤儿"等塌房现象。**4 项必须用 `.cols-2`，不能硬塞默认 3 列**：

    | 项数 | class | 视觉 |
    |---|---|---|
    | 3 | `.qjyd-bullet-manifest` | 一行 3 ✅ |
    | **4** | **`.qjyd-bullet-manifest.cols-2`** | **2×2 ✅** |
    | 5 | `.qjyd-bullet-manifest` | 3 + 2（孤儿但可接受）△ |
    | 6 | `.qjyd-bullet-manifest` | 2×3 ✅ 标准款 |
    | 8 | `.qjyd-bullet-manifest.cols-4` | 2×4 ✅ |
    | 9 | `.qjyd-bullet-manifest` | 3×3 ✅ 满版 |

    `.cols-2` / `.cols-4` 是 modifier 类，写在 `.qjyd-bullet-manifest` 后即可，不会破坏入场动效（recipe 选择器是按类前缀匹配的）。**写 C16 之前先数一遍项数，4 项不加 `.cols-2` 直接 P0 自检失败。**

##### 不要用 `space-evenly` / `space-between` 撑满列高（**新增 · 2026-06 · 更新七**）

22. **flex/grid 容器内默认不允许用 `justify-content:space-evenly` / `space-between` 来"自动均布"多段内容**。在 16:9 (~85vh) 的列高里，这两个值会把每段间隙都顶到 90+ px，反而产生"标题 ↔ chip 之间隔着一片荒漠"的体感。

    踩过的坑：C04 `.num-side` 在 2026-06 更新三里为了避免"内容堆中间"，从 `align-items:center` 改成了 `justify-content:space-evenly`——结果在《客服周报》生成时被用户实测出"标题↔chip 95px 留白"，定位回这个 evenly。

    **正确做法（按诉求选）**：

    | 诉求 | 用 | 不用 |
    |---|---|---|
    | "整组元素居中到剩余空间" | ✅ 包一层 wrapper + `margin: auto 0`（如 `.qjyd-kpi-group`）| `space-evenly` / `space-around` |
    | "最后一项贴底，且与上方元素**无紧密语义关系**" | ✅ 该项 `margin-top: auto`（仅当它是独立段、明确想呼应另一列底部锚点时用） | `flex-end` |
    | "最后一项是上方元素的补充说明" | ✅ `margin-top: var(--sp-4)` ~ `var(--sp-6)`（紧跟语义父级） | ❌ `margin-top: auto`（会拆散语义组）|
    | "段间显式 32px 间距" | ✅ `gap: var(--sp-7)` + `justify-content: flex-start` | 任何 `space-*` |

    **判定方法**：把 `justify-content:space-evenly` 临时去掉看一眼——如果内容立刻"挤顶"才是真问题，那时再用 `margin-top:auto` 单挑要居中的元素；如果去掉后视觉就合理，说明 evenly 本来就不该用。

    > **`margin-top: auto` 也要慎用（v2 补丁）**：它会把元素推到列底。如果该元素跟上方的另一个元素是**同一语义组**（比如 bullet 是 case 卡的"补充说明"），不要把它推到列底——让它紧跟父元素就行，留白会自然跑到列底（且与对侧列底部的锚点形成视觉呼应）。"贴底"只在元素是独立段、且明确想呼应另一列底部锚点时使用。**反例**：C04 `.ctx-side > .qjyd-bullet` 初版误加了 `margin-top: auto`，把 bullet 推到 y≈612，与上方 case 卡（卡底 y≈329）之间生生空了 283 px，看上去像"两件无关的事"——v2 改成 `margin-top: var(--sp-4)` 后间距收到 ~44 px，语义组重新粘合。

    完整 token 速查表见 `layouts-corp.md` 末尾的「段间距 token 速查表」章节。

##### HTML 注释里禁止出现连续两个减号（**新增 · 2026-06 · 更新十二**）

23. **HTML 注释体内不允许出现连续两个减号紧跟 `>` 的组合**（也就是字面量"右尖括号前的 dash dash"）。HTML 解析器看到这个组合会**立刻关闭注释**，从那个位置之后到真正的结尾箭头之间的所有内容会被当成 DOM 文本节点渲染到页面上。

    踩过的坑：C08 `.image-side` 注释里写了一段"用法说明"，结尾用 `-->  占位写法见 C09 .ih-right` 的格式表示"提示去看 C09"——这个 `-->` 把注释提前关闭了，结果用户看到右侧产品截图上方多出一行 "占位写法见 C09 .ih-right ============================================" 的乱码文字。

    **正确做法**：

    | 场景 | 用 | 不用 |
    |---|---|---|
    | 注释里想写"看 / 跳到 / 引用" | ✅ `见 / 参考 / 跳到` 等中文词 | ❌ `-->` 当箭头用 |
    | 注释里想画箭头 | ✅ `→` (Unicode 箭头) | ❌ `-->` |
    | 注释里写 CSS 变量名 | ✅ 用反引号包起来：`var(--sans)` | ⚠️ 裸写 `--sans` 大多数浏览器宽容，但仍是不规范 |
    | 注释里想强调"双连字符" | ✅ "连续两个减号" 用文字描述 | ❌ 字面量 `"` 双连字符 `"` |

    **批量自检脚本**（生成完 deck 后跑一次）：

    ```python
    import re
    src = open('artifact.html', encoding='utf-8').read()
    for m in re.finditer(r'<!--', src):
        start = m.end()
        end = re.search(r'-->', src[start:])
        if not end: continue
        body = src[start:start+end.start()]
        if '-->' in body:
            print(f'BUG: 注释提前关闭 @ line {src[:m.start()].count(chr(10))+1}')
    ```

    **判定方法**：生成完 deck 后用 Playwright 截图，对**每页右侧/底部边缘有真实图片或大块 SVG 的页**重点扫一眼——这种 bug 的典型表现是"图片上方 / 旁边有看上去像调试日志的乱码文字"。如果发现，立刻搜源码里所有 `-->` 出现的位置，确认它们都是注释结尾、不是注释体内的箭头符号。

##### C15 两栏页默认用“画布左对齐”的双卡 / 左主右辅（**新增 · 2026-06 · 更新二十五，替代更新十八默认策略**）

24. **C15 不再默认使用“标题画布左对齐 + 主内容居中”的 hairline 双栏**。实测在 qjyd-corp 周报/复盘类 deck 中，这种双轨网格虽然理论上成立，但翻页时仍容易被感知为“这一页不像其他页左对齐”。当前模板已将 C15 默认升级为 **Status Cards 双卡片整体**，并额外提供 **C15-ASYM 左主右辅** 变体。

    **当前默认选择规则**：

    | 内容形状 | 用法 | 视觉原则 |
    |---|---|---|
    | 两侧基本等权（成果 vs 下一步、本周 vs 下周、问题 vs 方案、A/B 方案） | **C15 Status Cards**：`.qjyd-status-cards` + 两个 `.qjyd-status-card` | 标题和主内容都从画布左缘 `x=88` 起步；两张等高卡片天然形成中轴 |
    | 左侧成果/核心数字明显是主叙事，右侧只是瓶颈/下一步行动栏 | **C15-ASYM Status Asym**：`.qjyd-status-asym` + `.asym-main` / `.asym-side` | 放弃 1:1 等权，左侧大数字主视觉，右侧窄栏承接行动项 |
    | 旧项目里已经用了 hairline 双栏 | 可保留 `.qjyd-status-duo`，动效仍兼容 | 仅作历史兼容，不建议新 deck 默认使用 |

    **硬规则**：
    - C15 Status Cards 的两张卡必须等高：容器 `align-items:stretch`，卡片 `height:100%`。不要让左右卡片随内容变成一高一低。
    - C15-ASYM 的左右外框也必须等顶等高；如果视觉上觉得左侧绿色主卡“靠下”，优先检查**内部 padding / 大数字上方间距 / 列表上方间距**，不要移动外框。当前模板中 `.asym-main` 的 top padding 已收敛到 `var(--sp-7)`，与右侧行动栏顶部节奏对齐。
    - C15 不要用红色表达 NEXT / 瓶颈，右侧仍用中性灰；左侧 DONE / 正向成果用 accent 海洋青。
    - `data-animate` 仍写 `status-duo`，模板 recipe 已兼容 `.qjyd-status-card`、`.qjyd-status-asym` 和旧 `.qjyd-status-duo`。
    - 生成新 deck 时，优先复制 `layouts-corp.md` 里的新版 C15 / C15-ASYM 骨架，不要从历史说明里恢复旧 hairline 结构。

> 这 24 条都是真实踩过的坑，生成 PPT 时一项不落地核对一遍。如有不确定，先看 `layouts-corp.md` 对应章节再下手。

**三种风格共享**：横向翻页（键盘 ← →、滚轮、触屏、ESC 索引）、Lucide 图标、Motion One 入场动效（本地 + CDN 双保险）。

<!-- provenance: ang-ppt-skill | upstream-author: 歸藏 (op7418, AGPL-3.0) | maintainer: AngChow | canonical: https://github.com/AngChow/ang-ppt-skill | keep this out of generated artifacts -->

## 何时使用

**合适的场景**：
- 线下分享 / 行业内部讲话 / 私享会
- AI 新产品发布 / demo day
- 带有强烈个人风格的演讲
- 需要"一次做完，不用翻页工具"的网页版 slides

**不合适的场景**：
- 大段表格数据、图表叠加（用常规 PPT）
- 培训课件（信息密度不够）
- 需要多人协作编辑（这是静态 HTML）

## 工作流

### Step 1 · 需求澄清(**动手前必做**)

**如果用户已经给了完整的大纲 + 图片/截图处理要求**,可以跳过直接进 Step 2。

**如果用户只给了主题或一个模糊想法**,用这 7 个问题逐个对齐后再动手。不要基于猜测就开始写 slide——一旦结构定错,后期翻修代价很高:

#### 运行环境适配

- **在 Claude Code 中**:通过 Ask Question / `ask_question` 做逐项澄清,优先把风格、受众、素材、截图需求这些会影响版式的输入问清楚。
- **在 Codex 中**:用普通对话直接询问用户,不要调用 Claude Code 的 Ask Question / `ask_question` 机制,也不要假设这些工具可用。一次最多问 1-3 个最关键问题;如果信息缺口不影响开工,先做合理假设并在回复里说明。

#### 7 问澄清清单

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **风格 A / B / C?**(电子杂志风 / 瑞士国际主义风 / 企家有道企业风) | **必须先问**,决定用哪个 template + layouts + themes 文件 |
| 2 | **受众是谁?分享场景?**(行业内部 / 商业发布 / demo day / 私享会) | 决定语言风格和深度 |
| 3 | **分享时长?** | 15 分钟 ≈ 10 页,30 分钟 ≈ 20 页,45 分钟 ≈ 25-30 页 |
| 4 | **有没有原始素材?**(文档 / 数据 / 旧 PPT / 文章链接) | 有素材就基于素材,没有就帮他搭 |
| 5 | **有没有图片或截图?希望怎么处理?** | 决定图文版式、图片槽位、截图是否需要 CleanShot X 式适配或 GPT-M 2.0 重构 |
| 6 | **想要哪套主题色?** | 杂志风 5 套(`themes.md`) / 瑞士风 4 套(`themes-swiss.md`) / 企业风 4 套(`themes-corp.md`),挑一。**风格 C 的默认是 🌿 薄荷企业**——非默认主题(青墨/暖橙/深空)样式细节尚未充分调优, 用户没明说要换就直接用薄荷, 不要主动推荐其他三套 |
| 7 | **有没有硬约束?**(必须包含 XX 数据 / 不能出现 YY) | 避免返工 |

#### 风格选择参考(问题 1)

| 如果用户说... | 推荐风格 |
|---|---|
| "杂志感" / "人文" / "Monocle 风" / 不指定 | **A · 电子杂志风** |
| "瑞士风" / "Swiss Style" / "Helvetica" / "极简" / "网格" / "信息图" / "数据驱动" | **B · 瑞士国际主义风** |
| 内容是 AI 产品 / 技术 / 工程 / 数据汇报 | B 更合适 |
| 内容是行业观察 / 人文 / 故事 / 文化 | A 更合适 |
| 用户给了大量 KPI 数字 / 路线图 / 流程 | B 更合适(`Data Hero` 布局是瑞士风专长) |
| 用户给了大量纪实照片 / 人文图片 | A 更合适(图片网格、左文右图是杂志风专长) |
| 用户需要 GPT-M 2.0 生成截图再设计 / 信息图 / 证据墙 | B 也很合适(S22 主图、S15/S16 图片网格可以承载证据图) |
| **"薪人薪事风格" / "企家有道风格" / "企家有道企业风" / "qjyd-corp" / "qjyd"** | **C · 企家有道企业风**(这几个词都是同一套风格的不同叫法,任意命中即直接用 C) |
| "B 端 SaaS PPT" / "商务提案" / "客户介绍 PPT" / "销售面客 PPT" / "客户对接 PPT" / "客户案例集" | C 更合适 |
| 内容是 SaaS 产品介绍 / 行业方案讲解 / 客户成功故事 / 标书演示 | C 更合适 |
| 用户希望"看起来像 Notion / Linear / Stripe 官网" / "看起来像企业官网" | C 更合适 |
| 用户给了产品 logo + 想做封面右侧带 logo 的提案/介绍 deck | C 更合适(C01 封面 logo 槽位即为此设计) |
| 内容是 **周报 / 月报 / 复盘 / 团队同步 / 项目状态汇报 / 双周会** | **C 更合适**(C14/C15/C16 是为这类对内同步场景设计的低图密度版式) |
| 内容是"本周做了 N 件事"/"亮点 vs 不足"/"已完成 vs 待完成" | **C 更合适**(C16 / C15 Status Cards 直接对应,无需图片) |
| 内容是阶段性结论 / 战略备忘录 / manifesto / 关键判断 | **C 更合适**(C14 Statement 巨标 + accent rule + 要点) |

> **风格别名规则(命中即生效,不需要再追问"是不是 C")**:
> "薪人薪事风格"、"薪人薪事 PPT"、"薪人薪事样式"、"企家有道风格"、"企家有道企业风"、"qjyd-corp"、"qjyd"——这些都是 **风格 C · 企家有道企业风** 的不同叫法。**只要用户说出其中任意一个,就直接选风格 C**,不要因为"用户说的是薪人薪事而不是企家有道"就反复确认或拒绝匹配。"薪人薪事"是这套风格的视觉锚点产品(默认 logo / 默认主题色 `#00BFA5` 海洋青),"企家有道"是该产品所属公司的整体品牌——两者在本 skill 里指代同一套设计语言。

#### 大纲协助(如果用户没有大纲)

用"叙事弧"模板搭骨架,再填内容:

```
钩子(Hook)       → 1 页   : 抛一个反差 / 问题 / 硬数据让人停下来
定调(Context)    → 1-2 页 : 说明背景 / 你是谁 / 为什么讲这个
主体(Core)       → 3-5 页 : 核心内容,用 Layout 4/5/6/9/10 穿插
转折(Shift)      → 1 页   : 打破预期 / 提出新观点
收束(Takeaway)   → 1-2 页 : 金句 / 悬念问题 / 行动建议
```

叙事弧 + 页数规划 + 主题节奏表(见 `layouts.md`),**三张表对齐后**再进 Step 2。

大纲建议保存为 `项目记录.md` 或 `大纲-v1.md`,便于后续迭代。

#### 图片约定(告知用户)

在动手前向用户说清:

- **文件夹位置**:`项目/XXX/ppt/images/` 下(和 `index.html` 同级)
- **命名规范**:`{页号}-{语义}.{ext}`,例如 `01-cover.jpg` / `03-figma.jpg` / `05-dashboard.png`
  - 页号补零便于排序
  - 语义用英文,短、具体、和内容对应
- **规格建议**:
  - 单张 ≥ 1600px 宽(避免大屏模糊)
  - JPG 用于照片/截图,PNG 用于透明 UI/图表
  - 总大小控制在 10MB 内(影响翻页流畅度)
- **如何替换**:保持**同名覆盖**最稳(HTML 里不用改路径);如果文件名变了,记得全局搜 `images/旧名` 改成新名
- **没图怎么办**:和用户对齐,可以先用占位色块生成结构,等图片后期补;但要告知 layout 4/5/10 等图文混排页没图就没法验证视觉效果

#### 截图需求约定(动手前必须问)

只要用户提到产品截图、网页截图、代码截图、设计稿、dashboard、旧 PPT 截图或"帮我美化截图",都要先确认:

- **截图位置**:截图文件在哪个文件夹?是否已经命名好?
- **使用目的**:保真展示 / 截图美化 / 截图再设计 / UI 情景图?
- **落位比例**:最终放进哪个版式槽位?常用 `21:9` / `16:10` / `16:9` / `4:3` / `1:1`
- **内容要求**:是否必须保留全部文字、品牌、数据?是否有敏感信息要遮挡?
- **视觉处理**:是否需要主题背景、留边、居中/角落对齐、拆成长截图面板?

默认策略:先让内容适配模板,再处理图片比例。截图需要保真时,先读 `references/screenshot-framing.md`,优先使用 `assets/screenshot-backgrounds/` 的内置背景资产做程序化 CleanShot X 式背景画布适配;只有原截图太乱、太长、太窄或需要概念化表达时,才用 GPT-M 2.0 做截图再设计。

#### Codex 配图生成(可选)

如果当前运行环境是 **Codex**,完成 deck 初稿后,主动问用户是否需要用 GPT-M 2.0 生成配图并插入 PPT。不要默认生成。

推荐询问方式:

> 要不要为这份 PPT 生成几张配图?可以做成人文纪实照片、杂志风信息图、流程/对比/系统关系图,或把截图再设计成统一的杂志风视觉。

如果用户确认生成,再问他想要哪种图片类型或风格;如果用户没有偏好,根据页面内容自行推荐 1-3 张最值得生成的配图。

如果用户提供的是截图,先判断是**截图美化**还是**截图再设计**:

- 截图美化:读 `references/screenshot-framing.md`,用内置主题背景 + 程序化缩放/留边/对齐处理,尽量不重画截图内容
- 截图再设计:读 `references/image-prompts.md`,按当前版式槽位生成目标比例图片,并保持语言、主题色和边距一致

生成配图时遵守:

- 提示词保持简短,只框定主题、用途、风格和比例,不要写长篇摄影指导
- 图片风格必须贴合当前 deck 风格:风格 A 用"电子杂志 × 电子墨水";风格 B 用"瑞士国际主义 / Swiss Style"
- 信息图、图表、截图再设计里的文字语言必须跟随用户正在使用的语言;中文 deck 用中文,英文 deck 用英文
- 先看 `references/image-prompts.md` 选择图片类型和基础提示词
- 如果处理用户原始截图,先看 `references/screenshot-framing.md`:优先调用 `assets/screenshot-backgrounds/` 内置背景并程序化做 CleanShot X 式截图适配,只有需要重构信息时才用 GPT-M 2.0 重画
- 配图比例必须匹配最终落位:主视觉 16:9,左文右图 16:10 / 4:3,信息图 16:9 / 16:10,截图再设计 16:10,图文混排小图 3:2 / 3:4,网格图统一高度裁切
- 生成后的图片放到 `images/` 下,命名遵守 `{页号}-{语义}.{ext}`

### Step 2 · 拷贝模板

**根据 Step 1 选定的风格,拷贝对应的模板**到目标位置（通常是 `项目/XXX/ppt/index.html`），同时在同级建一个 `images/` 文件夹准备接图片。

```bash
mkdir -p "项目/XXX/ppt/images"

# 风格 A · 电子杂志风
cp "<SKILL_ROOT>/assets/template.html" "项目/XXX/ppt/index.html"

# 或 风格 B · 瑞士国际主义风
cp "<SKILL_ROOT>/assets/template-swiss.html" "项目/XXX/ppt/index.html"

# 或 风格 C · 企家有道企业风(B 端 SaaS)
cp "<SKILL_ROOT>/assets/template-corp.html" "项目/XXX/ppt/index.html"
```

两个 `template*.html` 都是**完整可运行**的文件——CSS、WebGL shader、翻页 JS、字体/图标 CDN 全已预设好,只有 `<!-- SLIDES_HERE -->` 占位符等待你填充 slide 内容。

**注意**:风格 A / B / C **互相不能混用**。layouts.md 里的类（如 `.h-hero` 衬线大标题、`.display-zh` 等）只在 template.html 有定义；layouts-swiss.md 里的类（如 `.kpi-hero`、`.accent-block`、`.span-N`、`.dots` 等）只在 template-swiss.html 有定义；layouts-corp.md 里的类（如 `.qjyd-cover`、`.qjyd-btn`、`.qjyd-card`、`.qjyd-*` 前缀全家桶）只在 template-corp.html 有定义。一份 deck 只能选一套。

#### 2.1 · 必改占位符（**容易漏**）

拷贝后立刻改掉以下占位符，否则浏览器 Tab 会显示"[必填] 替换为 PPT 标题"这种尴尬文字：

| 位置 | 原始 | 需改为 |
|------|------|--------|
| `<title>` | `[必填] 替换为 PPT 标题 · Deck Title` | 实际 deck 标题(如 `一种新的工作方式 · Luke Wroblewski`) |

每次拷贝完 template.html 第一件事:grep 一下"[必填]" 确认全部替换完。

#### 2.2 · 选定主题色(5 套预设 · 不允许自定义)

本 skill **只允许从 5 套精心调配的预设里选一套**,不接受用户自定义 hex 值——颜色搭配错了画面瞬间变丑,保护美学比给自由更重要。

| # | 主题 | 适合 |
|---|------|------|
| 1 | 🖋 墨水经典 | 通用 / 商业发布 / 不知道选啥的默认 |
| 2 | 🌊 靛蓝瓷 | 科技 / 研究 / 数据 / 技术发布会 |
| 3 | 🌿 森林墨 | 自然 / 可持续 / 文化 / 非虚构 |
| 4 | 🍂 牛皮纸 | 怀旧 / 人文 / 文学 / 独立杂志 |
| 5 | 🌙 沙丘 | 艺术 / 设计 / 创意 / 画廊 |

**操作**:
1. 基于内容主题推荐一套,或直接问用户选哪一套
2. 打开 `references/themes.md`,找到对应主题的 `:root` 块
3. **整体替换** `assets/template.html`(已拷贝版本)开头 `:root{` 块里标有"主题色"注释的那几行(`--ink` / `--ink-rgb` / `--paper` / `--paper-rgb` / `--paper-tint` / `--ink-tint`)
4. 其他 CSS 都走 `var(--...)`,无需任何其他改动

**硬规则**:
- 一份 deck 只用一套主题,不要中途换色
- 不要接受用户给的任意 hex 值——委婉拒绝并展示 5 套让选
- 不要混搭(例如 ink 取墨水经典、paper 取沙丘)——会彻底违和

### Step 3 · 填充内容

#### 3.0 · 预检:类名必须在模板的 `<style>` 里有定义（**最重要**）

**这是所有生成问题的源头**。layouts 骨架使用了很多类名,如果模板的 `<style>` 里没有对应定义,浏览器会 fallback 到默认样式——大标题字体错、卡片挤成一团、pipeline 糊成一行、图片堆到页面底部。

**三种风格类名互不通用**(再次强调):
- 风格 A 模板里有 `h-hero`(衬线)、`stat-card`、`grid-2-7-5`、`frame` 等
- 风格 B 模板里有 `h-hero`(无衬线)、`kpi-hero`、`accent-block`、`span-N`、`dots`、`grid-12` 等
- 风格 C 模板里有 `qjyd-cover`、`qjyd-btn`、`qjyd-card`、`qjyd-display`、`qjyd-h1`、`qjyd-foot`、`qjyd-kpi-triple`、`qjyd-cards-2x2` 等(全部 `qjyd-*` 前缀)
- 同名 class 在两个模板里**视觉表现完全不同**(例:风格 A 的 `h-hero` 是 Noto Serif SC 衬线,风格 B 的 `h-hero` 是 Inter 无衬线)

**在写任何 slide 代码之前:**

1. **先 Read 当前用的模板**(至少读到 `<style>` 块末尾):
   - 风格 A → `assets/template.html`
   - 风格 B → `assets/template-swiss.html`
   - 风格 C → `assets/template-corp.html`
2. **对照对应 layouts 文件的 Pre-flight 列表**,确认你要用的每个类都在 `<style>` 里存在
3. 如果某个类缺失:**在模板的 `<style>` 里补上**,不要在每个 slide 里 inline 重写
4. **模板是唯一的类名来源**——不要发明新类名,如需自定义用 `style="..."` inline
5. **模板也是装饰 SVG / 装饰几何的唯一来源**(2026-06 新增 · 真实踩坑 · 必读):
   - layouts 文档里的"完整骨架"代码块, 对**装饰 SVG**(封面圆环、章节封圆、Thank You logo 环、Swiss 风点阵、杂志风流体背景等)经常只画了**简化伪代码 + 注释**(例如 `<!-- 4 叶片旋转环 + 中心 logo (具体见模板) -->`), **不是模板真实实现的镜像**
   - AI 看到这种伪代码时, 会**自己脑补几何参数**(半径、stroke、透明度、点阵 mask), 极易引入"看上去像但实际多了一圈"的偏差——典型的就是封面 logo 外多一圈"贴脸内圈", 让 logo 像戴了项圈
   - **铁律**: 装饰 SVG **整段从模板对应 section 复制**, 不要按文档伪代码自己补全。需要替换的只是 `<img src>` 路径、文字内容、color tokens; **几何参数(半径/stroke/dasharray/mask 内外径/transform/装饰点位)一律不动**
   - 同理适用于:任何文档里写"具体见模板""详见模板"的代码块,以及任何含 `<!-- ... -->` 省略号注释的 SVG / 装饰段
   - 反例:照着 `layouts-corp.md` C01 简化骨架自己写 `<svg>` + 三圈同心环, 结果第 3 圈贴在 logo 外像项圈(2026-06-17 真实事故)

**风格 A 常见容易遗漏的类**:
`h-hero` / `h-xl` / `h-sub` / `h-md` / `lead` / `kicker` / `meta-row` / `stat-card` / `stat-label` / `stat-nb` / `stat-unit` / `stat-note` / `pipeline-section` / `pipeline-label` / `pipeline` / `step` / `step-nb` / `step-title` / `step-desc` / `grid-2-7-5` / `grid-2-6-6` / `grid-2-8-4` / `grid-3-3` / `grid-6` / `grid-3` / `grid-4` / `frame` / `frame-img` / `img-cap` / `callout` / `callout-src` / `chrome` / `foot`

**风格 B 常见容易遗漏的类**(2026-05 重构后):
- 画布:`canvas-card` / `chrome-min`
- 排版:`h-hero`(无衬线 7.4vw weight 200) / `h-statement`(9.6vw) / `h-xl` / `h-md` / `t-cat`(SemiBold 600 小标) / `t-meta`(mono uppercase) / `lead` / `num-mega` / `mono`
- 卡片(四类互斥):`card-ink` / `card-accent` / `card-fill` / `card-outlined`
- 网格:`grid-12` / `grid-2-9` / `grid-2-9-5` / `span-N`
- 时间线:`timeline-v` + `tl-node` + `tl-axis` + `dot` / `timeline-h` + `tl-h-node` + `tl-h-axis`
- 图表:`kpi-tower-row` + `bar-tower` / `h-bar-chart` + `bar-row` + `bar-fill` / `spec-bars` + `bar-vert`
- 装饰:`dot-mat`(SVG mask 实心点)/ `ring-mat`(描边圆)/ `cross-mat`(× 网格)/ `hr-hairline`
- 版式专属:`cover-split` / `closing-split` / `duo-compare` + `vrule` / `manifesto-top` + `ink-banner-full` / `three-forces` / `loop-diagram` / `matrix-fill` + `matrix-cell` / `brief-grid` + `brief-card` / `system-diagram` / `why-now-grid` / `four-cards` / `stacked-ledger` + `ledger-row` / `tech-spec` / `image-hero` + `hero-img-wrap` + `hero-overlay-block` + `hero-stats`
- 图片混排:`frame-img` / `fit-contain` / `r-21x9` / `r-16x9` / `r-16x10` / `h-22` / `h-26` / `swiss-img-split` / `swiss-img-grid` / `swiss-img-caption` / `swiss-keyline` / `swiss-lined`
- spacing token:`--sp-3`...`--sp-13`(8/12/16/24/32/40/48/64/80/96/160 px)

#### 3.0.5 · 规划主题节奏（**和类预检同等重要**)

**在挑布局之前**,必须先列出每一页的主题 class(`hero dark` / `hero light` / `light` / `dark`)并写到文档或草稿里对齐。详细规则看 `references/layouts.md` 开头的"主题节奏规划"一节。

**强制规则**:

- 每页 section 必须带 `light` / `dark` / `hero light` / `hero dark` 之一,不要只写 `hero`
- 连续 3 页以上同主题 = 视觉疲劳,不允许
- 8 页以上必须有 ≥1 个 `hero dark` + ≥1 个 `hero light`
- 整个 deck 不能只有 `light` 正文页,必须有 `dark` 正文页制造呼吸
- 每 3-4 页插入 1 个 hero 页(封面/幕封/问题/大引用)

**生成后自检**:`grep 'class="slide' index.html` 列出所有主题,人工确认节奏合理再交付。

#### 3.1 · 挑布局

**不要从零写 slide**。打开对应的 layouts 文件,里面有 10 种现成布局骨架,每种都是完整可粘贴的 `<section>` 代码块。

**风格 A** → `references/layouts.md`:

| Layout | 用途 |
|---|---|
| 1. 开场封面 | 第 1 页 |
| 2. 章节幕封 | 每幕开场 |
| 3. 数据大字报 | 抛硬数据 |
| 4. 左文右图(Quote + Image) | 身份反差 / 故事 |
| 5. 图片网格 | 多图对比 / 截图实证 |
| 6. 两列流水线(Pipeline) | 工作流程 |
| 7. 悬念收束 / 问题页 | 幕末 / 收尾 |
| 8. 大引用页(Big Quote) | 衬线金句 / takeaway |
| 9. 并列对比(Before / After) | 旧模式 vs 新模式 |
| 10. 图文混排(Lead Image + Side Text) | 信息密集的图文页 |

**风格 B** → 先读 `references/swiss-layout-lock.md`,再读 `references/layouts-swiss.md`。

瑞士主题默认进入 **Swiss locked mode**:

- 正文页只能使用原始参考 PPT 登记的 22 个版式 `S01-S22`;新增首页/尾页只能使用 Skill 明确提供的 `SWISS-COVER-ASCII` / `SWISS-CLOSING-ASCII`。
- 每个 `<section class="slide">` 必须写 `data-layout="Sxx"`。没有 `data-layout` 就视为未登记版式。
- 不允许临时发明 `P23/P24`、`Swiss Image Split`、`Evidence Grid` 这类原始 22P 之外的正文结构,除非用户明确要求实验版式。
- 顶部中文标题默认左对齐、处在左上内容轴。不要把小标题放左列、大标题放右列,造成视觉居中;只有原始 statement/split 版式允许强中心叙事。
- SVG 只负责几何图形。不要在 SVG 里写文字标签,所有标签改用 HTML 网格/卡片/caption。
- 地理/历史/城市路线/地点关系页使用 `S08 + Swiss Map Component`:先读 `references/swiss-map-component.md`,仍保留 `data-layout="S08"`。

原始 22 个正文版式如下:

| Layout | 用途 |
|---|---|
| S01 Index Cover | 原始索引封面 |
| S02 Vertical Timeline + KPI | 演化对比 / 年代变迁 |
| S03 Split Statement | 核心论点 / 左右分屏 |
| S04 Six Cells | 6 项概念定义 |
| S05 Three Layers | 三层架构 |
| S06 KPI Tower | 4 项数据视觉化高度差 |
| S07 H-Bar Chart | 5-10 项排名比较 |
| S08 Duo Compare | Before/After 对照 |
| S09 Dot Matrix Statement | 大引述 / statement |
| S10 Split Closing | 收束页 |
| S11 Horizontal Timeline | 4-7 步流程 |
| S12 Manifesto + Ink Banner | 阶段性结论 |
| S13 Three Forces | 3 个对等概念深化 |
| S14 Loop Form | 自学闭环 / 自动化 |
| S15 Matrix + Hero Stat | 8-12 项矩阵 + 总数据 |
| S16 Multi-card Brief | 6 项快讯小卡 |
| S17 System Diagram | 三层架构 / 生态地图 |
| S18 Why Now | 三论点 + 数据支撑 |
| S19 Four Cards | 4 项等权特性 |
| S20 Stacked KPI Ledger | 纵向账单数据 |
| S21 Tech Spec Sheet | 产品规格 / benchmark |
| S22 Image Hero | 21:9 顶图 + 标题块 + 三列 KPI |

**登记扩展**:`S08 + Swiss Map Component` 用于地点、人物住所、路线、城市关系。它不是新 layout,而是 S08 右侧插槽的 MapLibre 地图组件;必须按 `references/swiss-map-component.md` 的点位、连线、卡片和右上角缩放/拖动控制实现。

选对应 layout,粘过去,改文案和图片路径即可。**务必先完成 3.0 预检**。

**风格 B 版式多样性硬规则**:
- 7-8 页 deck 至少使用 **6 个不同 S 编号版式**;10 页以上至少使用 8 个不同版式。
- 如果用户说"测试模板 / 看看效果 / 多一点版式",必须覆盖:一个封面、一个收尾、至少 1 个对比或时间线(S08/S11/S02)、至少 1 个结构图(S14/S17/S15)、至少 1 个图片版式(S22 或 S15/S16 图片格改造)。
- 不允许连续 3 页使用同一种主体结构,例如连续三页 `head + grid + card`。
- 图片页不能偷懒发明新结构。2-3 张图时,用 S15/S16 的原始网格骨架改造成图片格;单张大图用 S22。
- 开写 HTML 前先列一张 `页码 → data-layout → 选用理由 → 图片槽位` 草稿;交付前运行 `node <SKILL_ROOT>/scripts/validate-swiss-deck.mjs index.html`。

**风格 C** → `references/layouts-corp.md`。**16 个版式都是通用的**——不要按"对内 vs 对外 / 周报 vs 提案"的主题分类，而是按下面三个**结构维度**选：

1. **项数 / 数据点个数** —— 1 / 3 / 4 / 6 / 9 / 时间线节点
2. **是否有图** —— C08 / C09 必须有真实图（没图就别选，会出 placeholder 留白）；其余 14 个版式不依赖图
3. **数据形状** —— 大数字 / 平级 KPI / 引言 / 列表 / 对照 / 矩阵

**按内容形状选版式（决策表）**：

| 你手里有什么内容 | 推荐版式 |
|---|---|
| 1 个核心数字 + 上下文 + before/after | C04 KPI Hero |
| 3 个平级数字 / 概念型 KPI（三联） | C05 KPI Triple（数字单行；概念型用 `.kpi-num-stack` 显式两行） |
| 4 个等权块（带图标 / chip / 子能力） | C07 cards-2x2 |
| 4 / 6 / 8 / 9 个纯文字要点（编号 + 标题 + 描述 + 状态） | **C16**（4→`.cols-2` / 6/9→默认 3 列 / 8→`.cols-4`） |
| 时间序列 4-6 节点 | C06 Timeline |
| 一段话 ≤ 60 字 + 头像 + 署名（引用别人） | C10 Quote |
| 一段主张 + 2-4 条要点（自己说话） | C14 Statement |
| 一段话 + 一张图 | C08（左文右图）/ C09（大图全屏） |
| 2 列对照（成果/瓶颈、本周/下周、问题/方案、A/B 方案、新/旧） | C15 Status Cards；主次明显时用 C15-ASYM |
| 3 列对比 × 5-6 行数据 | C11 Compare |
| 3-4 个人物卡片 | C12 Team |
| 议程 4-6 行 | C03 Agenda |
| 章节切分 | C02 Chapter / C01 Cover / C13 Thank You |

**C05 KPI Triple 生成规则（qjyd-corp）**：数字型 KPI 保持默认单行 `.kpi-num` + `.kpi-sfx`（如 `70%`、`15家`）；概念型 KPI（如 `AI/中台`、`HMOS/升级`、`移动端/底盘`）使用 `.kpi-num.kpi-num-stack` + `.kpi-main` / `.kpi-sfx` 显式两行。只要同一页任一项需要两行，三项都必须统一使用 stack，禁止依赖自然换行造成 label 基线错位。


**风格 C 选版式的常见误区**：
- ❌ "这是周报，C07 / C08 / C10 / C12 是销售提案专用，不能用" —— **错**。所有版式都是通用的，看内容形状不看主题。
- ❌ "我有 4 个要点，硬塞 C16 默认 3 列" —— **必出 3+1 孤儿**。4 项必须用 `.cols-2`。
- ❌ "我没图，但想用 C08 占位 placeholder" —— 见红线 19，placeholder 不是兜底。改用 C14 / C16 等无图版式。

#### 3.2 · 图片比例规范

永远用**标准比例**,不要用原图奇葩比例(如 `2592/1798`):

| 场景 | 推荐比例 |
|------|---------|
| S22 顶部主图 | **21:9**;照片关键主体放中央安全区 |
| S15/S16 多图格 | 统一 21:9 或统一 16:10,不能混用 |
| 左文右图 主图(风格 A) | 16:10 或 4:3 + `max-height:56vh` |
| 图片网格(风格 A) | **固定 `height:26vh`**,不用 aspect-ratio |
| 左小图 + 右文字 | 1:1 或 3:2 |
| 全屏主视觉 | 16:9 + `max-height:64vh` |
| 图文混排小插图 | 3:2 或 3:4 |

**默认不要让图片 `align-self:end`**——会滑到页面底部,很容易碰到分页组件。用 grid 容器 + `align-items:start`(template 已预设)让图片贴顶即可;如果确实需要图文底对齐,必须先控制图片高度,再使用模板已有安全区类 `.nav-safe-bottom` / `.nav-safe-bottom-tight`,不要让最低处碰到分页组件。

**风格 B 瑞士风额外规则**:
- 单张大图用 S22;多图测试用 S15/S16 的原始卡片网格改造,不要用未登记的 P23/P24
- 生成图片前先写 `data-image-slot`:例如 `s22-hero-21x9` / `s15-grid-21x9` / `s16-brief-21x9`
- S22 配图默认生成 21:9,提示词必须包含 `subject centered in the safe middle area`;照片容器用 `object-position:center 35%`,不要用 `top center`
- 图片容器必须直角、无阴影、无圆角;默认背景用白色 `var(--paper)`,不要用灰底包白底信息图
- 白底 GPT 信息图/流程图/UI 图默认不要加外框描边,不要随手套 `.swiss-keyline`;需要强调时只用 `.swiss-lined` 的顶部 accent 线
- UI/信息图如果是用户原始截图或文字密集图,才用 `.fit-contain`;如果已按 S15/S16 槽位重生成,必须用 `.frame-img.r-21x9` / `.frame-img.r-16x10` 铺满容器,不要固定 `height:18vh` 后把图缩小
- 多图同组必须统一图片槽位、比例和高度,不能混用
- GPT-M 2.0 生成图使用 `image-prompts.md` 的"风格 B:瑞士国际主义配图规则"
- 任何图片、caption、timeline label、footnote 的最低处都不能进入底部分页区域;需要贴底时用 `.nav-safe-bottom` / `.nav-safe-bottom-tight`,不要手写 `bottom:2vh`

#### 3.2.1 · 中文大标题字号分档(风格 B 必做)

中文方块字视觉面积大,不能直接套英文 hero 的 6.8-7vw。写中文大标题前先分档:

| 标题形态 | 推荐字号 |
|---|---|
| 1 行,≤ 8 个中文字符 | `min(6.4vw,11.2vh)` |
| 2 行,每行≤ 8 个中文字符 | `min(5.8vw,10.2vh)` |
| 2 行,任一行 9-12 个中文字符 | `min(5.2vw,9.2vh)` |
| 3 行或更长 | 优先改写标题;不得已用 `min(4.6vw,8.2vh)` |

如果标题挤占了图片或正文区域,先压缩标题文案,再降字号;不要靠把下方内容推到底来硬塞。

#### 3.2.2 · 瑞士风演示最小字号与字重阶梯(风格 B 必做)

瑞士风用于投屏演示时,小字不能按网页注释的 10-12px 写。默认遵守以下下限:

| 文本类型 | 最小字号 |
|---|---|
| 正文段落 / 主要说明 | `18px` |
| 卡片描述 / 列表 / 时间线说明 / caption / 图注 | `16px` |
| meta / kicker / mono label / 图表标签 | `14px` |

如果内容放不下,先删减文案、拆成两页、换更适合的 Sxx 版式,不要把字号压到 10/11/12/13px。尤其是中文 deck,不要为了塞三行解释把 `body-sm`、caption、timeline label 改小。

**字号与字重阶梯(瑞士风核心)** — "越大越细,越小越粗"不是感性描述,而是具体映射:

| 字号区间 | 推荐字重 | 典型场景 |
|---|---|---|
| ≥ 8vw | 200 (ExtraLight) | 封面大字、巨号 KPI、h-statement |
| 4-7.9vw | 200-300 | 章节标题(h-xl/h-xl-zh)、大编号 |
| 1.8-3.9vw | 300-400 | 中型标题、takeaway 标题(≈1.8vw)、中号数字 |
| 1-1.7vw / 16-20px | 400-500 | 正文段落、卡片描述、说明文字 |
| 13-15px(小字) | 500-600 | meta、kicker、角标、图表标签、caption 强调 |

**硬规则:**
- 同一页内,字号越小的元素字重必须 ≥ 字号越大的元素(不允许 16px 正文用 300 而 1.8vw 标题用 500)
- 16px 左右的小字拒绝使用 weight 300(太细不可读),最低 400,推荐 500
- 封面/IkB 反白大标题内强调字用 `italic + weight 300`,不要用 accent 色(蓝压蓝看不见)

组件细节(字体、颜色、网格、图标、callout、stat-card 等)在 `references/components.md`。

### Step 4 · 对照检查清单自检

生成完一定要打开 `references/checklist.md`，逐项对照。里面总结了**真实迭代过程中踩过的所有坑**，P0 级别的问题（emoji、图片撑破、标题换行、字体分工）必须全部通过。

#### 4.0 · 不只看代码:必须打开网页做视觉核对

代码只能证明类名和结构存在,不能证明版式舒服。生成后必须打开网页逐页看:

1. 同时打开当前模板或生成页与测试 PPT,逐页比对版式与组件用法。
2. 截图前等入场动效稳定(约 1-2 秒),不要把动画中间态当成版式问题。
3. 先看视觉:大标题字重、标题与内容间距、图片是否与正文对齐、图片/说明是否碰到底部分页组件。
4. 再看代码:确认该页选用的版式与内容形状匹配,没有把数据专用版式拿来讲概念,也没有把可选组件堆成装饰。
5. 对照原始参考模板时,以实际页面用法为准,不要只看 CSS helper 定义;原始页面的大字实际多为 200/300,不要被 raw CSS 里的 700/800/900 带偏。
6. 如果页面别扭,先判断是版式选错、必选组件缺失、可选组件滥用,还是间距/安全区问题;不要直接靠加 margin 硬救。

#### 4.0.1 · 截图自检的环境降级路径

视觉核对优先用 `mcp__node_repl-js` 调 `import('playwright')` + `chromium.launch()` 批量截图。常见兜底链路:

1. **首选**:`node_repl` + Codex 内嵌的 playwright(在 `/Applications/Codex.app/Contents/Resources/cua_node/lib/node_modules/` 下)。直接 `import('playwright')` 即可。
2. **首次报错** `Executable doesn't exist at .../chromium_headless_shell-XXXX/...`:Codex 内嵌的 playwright npm 包钉死了某个 chromium build,但浏览器二进制要用户首次自己下载。**不要放弃自检**,先跑一次 Codex 内嵌的 playwright-core CLI 装 headless shell(只下 ~94 MiB):
   ```bash
   /Applications/Codex.app/Contents/Resources/cua_node/bin/node \
     /Applications/Codex.app/Contents/Resources/cua_node/lib/node_modules/playwright-core/cli.js \
     install --only-shell chromium
   ```
   官方源 `cdn.playwright.dev` 国内通常可达;不通时设 `PLAYWRIGHT_DOWNLOAD_HOST=https://npmmirror.com/mirrors/playwright` 走阿里云镜像。
3. **playwright 装不上时** fallback 到系统 Chrome headless:
   ```bash
   /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome \
     --headless --disable-gpu --hide-scrollbars \
     --window-size=1600,900 --virtual-time-budget=2500 \
     --screenshot=/tmp/slide_01.png \
     "file:///path/to/index.html?slide=1&clean=1"
   ```
4. **三条都不行**才提示用户人工逐页核对,不要默默跳过自检。

#### 4.0.2 · 封面 / Thank You / 章节封必做"模板对照截图"(2026-06 新增)

风格 A / B / C 的封面、Thank You、章节封都依赖**装饰 SVG**(同心环、点阵环、流体背景、几何浮动等)。这些 SVG 在 layouts 文档里通常是**简化伪代码 + "具体见模板"注释**,AI 极易按伪代码自己补全几何, 引入"多一圈贴脸内圈""少一层点阵环""装饰浮点位置不对"等偏差——用户翻页时立刻能感觉"哪儿不对", 但 P0/P1 自检清单不一定抓得到。

**硬规则**:生成 deck 后, 必须把以下 3 类页和模板的对应页**并排截图人工对照**:

| 必查页 | 对照对象 | 重点看 |
|---|---|---|
| 第 1 页(封面) | 模板第 1 页(C01 / 风格 A 1 / SWISS-COVER) | logo 周围圈数、点阵环内外径、浮动小点位置 |
| 最后一页(Thank You) | 模板对应页(C13 / 杂志风收尾 / SWISS-CLOSING) | 同上, 尤其 logo 圆环装饰 |
| 任意一页章节封 | 模板章节封(C02 等) | 大圆 + 数字位置、内外环间距 |

**操作**:用 Step 4.0.1 同款 Playwright 工具对模板 URL 和生成 deck URL 各截一张同页, 在回复里 `view_image` 两张图前后比对; 如发现装饰元素增删/位置/半径不一致, 按 Step 3.0 原则 5 把整段装饰 SVG 从模板回滚复制。

**不要相信"我按文档骨架写的所以一定对"**——文档里凡是带 `<!-- ... -->` 省略号或写"具体见模板"的 SVG 段, 都是 AI 容易脑补出错的高危区。

#### 4.0.3 · "颜色凭空消失" + "差一点对齐" 两类隐性 bug 必查 (2026-06 新增 · 真实踩坑)

CSS 有两类 bug 不会报错、不会被 P0/P1 自检抓到, 但用户翻页时立刻能感觉"哪儿不对":

**类型 1: `var(--xxx)` 未定义导致颜色凭空消失 (transparent/initial 静默 fallback)**

模板 CSS 写了 `background:var(--text-4)` 之类的引用, 但 `:root` 里从未定义 `--text-4` 时, 浏览器静默 fallback 到 `transparent`——圆点 / 边框 / 文字 / 背景**整块消失**, 但 DOM 还在、几何参数都对。生成后必查的高发位置:

- 列表圆点 (`li::before` 的 `background`)
- 卡片边框 (`border-color` 用 var)
- 文字色 (`color: var(--xxx)`)
- 装饰条 (`background: var(--xxx)`)

**自检方法**: 用 Playwright `getComputedStyle(el, '::before').backgroundColor` 看实际计算值, 出现 `rgba(0,0,0,0)` 即是 bug。**或者更轻量**: 生成后逐页扫一眼, 凡是"按理应该有圆点 / 描边 / 角标"但**实际看不见**的位置, 优先怀疑这条。

**修法两选一**:
1. 在 `:root` 补 token 定义 (推荐, 一处补全 deck 所有引用都生效)
2. 把所有 `var(--xxx)` 改写为 `var(--xxx, #具体 fallback 色)` (双保险, 即使 root 缺定义也不消失)

**类型 2: "差一点对齐" 错位 (10-30 px 量级)**

最常见的反例: 左右两列重心一个居中、一个贴顶, bullet 末行的 bottom 比左列底部锚点矮 20-30 px。这个差距落在"视觉对齐期待区", 比"完全没对齐"更刺眼。

**自检方法**: 量化两列底部锚点的 y 坐标差:

```js
// playwright 内
const a = document.querySelector('.num-side .ba-block').getBoundingClientRect().bottom;
const b = document.querySelector('.ctx-side ul li:last-child').getBoundingClientRect().bottom;
console.log('Δ =', a - b);
```

判定:
- |Δ| ≤ 4 px: 严格对齐 ✅
- 5 ≤ |Δ| ≤ 30 px: ⚠️ 危险区, 视觉会期待对齐但失败——必须修
- |Δ| ≥ 40 px: ✅ 视觉判定为"两列没意图对齐", 反而舒服

**修法**: 要么严格对齐 (二选一锚点), 要么把差距做大 (改 `justify-content:center` / 加 `margin`) 让视觉放弃对齐期待。

**这两类 bug 在 `references/layouts-corp.md` 的"2026-06 更新二十一"有完整案例与红线 26-29**。

#### 4.0.4 · 巨数 + 注脚的最小呼吸距离 (2026-06 新增 · C04 三段间距)

C04 (qjyd-kpi-hero) 左列三段结构 `mega 巨数 / 副标 / ba-block 进度条` 有两条容易翻车的间距规则:

**规则 1: mega 下方注脚 (subTitle) 的 gap ≥ 16px, 且 ≥ 字号 × 0.10**

mega 字号 ~144px (`font-size: 65%` 折算自 num-mega base), gap 低于 16 会让副标"被吸"在巨数底缘, 失去呼吸。当前模板 `.qjyd-kpi-wrap { gap: var(--sp-5) /* 16 */ }`, 不要改回 `--sp-4 (12)`。

**规则 2: 分组对比 ≥ 1:2**

`.qjyd-kpi-group gap` (副标 ↔ ba) 必须 ≥ `.qjyd-kpi-wrap gap` × 2, 否则"小间距=mega+副标 绑定 / 大间距=与 ba 分段"的分组语义会瓦解。当前模板 `group:40 / wrap:16 = 1:2.5` ✅。

**自检**:

```js
// playwright 内, 在 C04 页
const wrap = getComputedStyle(document.querySelector('.qjyd-kpi-wrap')).gap;  // 期望 16px
const group = getComputedStyle(document.querySelector('.qjyd-kpi-group')).gap; // 期望 40px (≥ wrap × 2)
```

不满足任一条都视为 regression。详见 `references/layouts-corp.md` "2026-06 更新二十二" 红线 30-31。

#### 4.0.5 · C04 左右双锚定布局 — 上下硬锚定 (2026-06 新增 · 更新二十三)

C04 (qjyd-kpi-hero) 左列的 `.qjyd-kpi-group` 不再用 `margin:auto 0` 整组居中, 而是用双锚定:

1. **mega.top ≈ caseCard.top** (右列首个卡片顶端)
2. **ba.bottom ≈ lastLi.bottom** (右列 bullet 末行底端)

**实现**:
```css
.qjyd-kpi-hero .num-side .qjyd-kpi-group{
  flex:1; justify-content:space-between;
  margin-top:70px; margin-bottom:65px;
}
```

**约束**:
- bullet 条数限制 **4-6 条** (少则 ba 失锚, 多则溢出)
- case 卡必须是固定高度卡片 (currently 165px), 不要换用可变高度元素

**自检**:
```js
// C04 页, playwright 内
const mega = document.querySelector('.qjyd-kpi-mega').getBoundingClientRect().top;
const caseCard = document.querySelector('.ctx-side > :first-child').getBoundingClientRect().top;
const ba = document.querySelector('.ba-block').getBoundingClientRect().bottom;
const lastLi = Array.from(document.querySelectorAll('.ctx-side .qjyd-bullet li'));
const lastBottom = lastLi[lastLi.length-1].getBoundingClientRect().bottom;
const dTop = mega - caseCard;
const dBot = ba - lastBottom;
console.log({ dTop, dBot });  // 期望 |dTop|≤4, |dBot|≤4
```

|dTop|>4 或 |dBot|>4 且差值在 5-30 范围时, 按类型 2 (差一点对齐) 处理。左列中段 sub→ba gap 被撑到 ~114 是"左疏右密"设计特征, 不是 bug。

详见 `references/layouts-corp.md` "2026-06 更新二十三" 红线 32-34。

#### 4.0.6 · "视觉底 vs 几何底" 错觉 — 灰底块 padding-bottom 校准 (2026-06 新增 · 更新二十四)

**当肉眼觉得两个元素"没对齐"但量出来 bottom 一样时, 99% 是这个问题**。

典型场景: 左侧灰底卡片 + 右侧文字行, 几何 bottom 都是 y=765, 但人眼觉得灰底卡片"更靠下、更垂". 原因:

| 元素 | 几何 bottom | "有内容部分" bottom |
|---|---|---|
| 灰底卡片 | 边框底 | padding-bottom 上方的最后一个子元素 (如 ba-bar) |
| 文字行 | 行盒底 | 字符基线 (≈ 行盒 bottom - 3-5px) |

**判定: 如果"内容 bottom" 差 ≥ 8 px, 视觉就会错位, 无论几何 bottom 是否相同**。

**修法**: 减小灰底卡片的 padding-bottom (典型从 16 减到 8), 让"内容底"上升接近"文字基线". 注意几何 bottom 仍由布局锚定 (如 C04 的 space-between), 改 padding-bottom 不会破坏整体布局。

**量法**:
```js
// 真·视觉底用 Range 量基线, 不是 element.getBoundingClientRect
const li = document.querySelector('.qjyd-bullet li:last-child');
const range = document.createRange();
range.selectNodeContents(li);
const baseline = range.getBoundingClientRect().bottom;
const baBar = document.querySelector('.ba-bar').getBoundingClientRect().bottom;
console.log('视觉底 Δ =', baBar - baseline);  // 期望 |Δ| ≤ 8
```

**红线**: 灰底块的 `padding-bottom` 默认 ≤ 8px, 不要用 16px (即不要用 `padding: var(--sp-5) var(--sp-6)` 这种四边等大 padding). 详见 layouts-corp.md "2026-06 更新二十四" 红线 35-36。

#### 4.0.7 · 多分辨率自检 — "在我电脑上看完美"是危险信号 (2026-06 新增 · 更新二十五)

**典型陷阱**: 模板 / deck 在 1600×900 截图严格对齐, 但用户在 1920×1080 / 2560×1440 / Retina 屏幕上看到明显错位.

**根因**: 任何用绝对像素 (px) 写死的 margin / padding / 锚定值, 在视口高度变化时不会随之缩放. 即使用 vh, 也无法匹配 `justify-content:center` 这种"按剩余空间居中"的机制 (剩余空间随视口非线性变化).

**强制规则**:
1. 任何"left.bottom ≈ right.bottom"或"left.top ≈ right.top"这类**跨列对齐**, 截图自检必须**至少覆盖三档分辨率**:
   - 1280×720 (低端笔记本)
   - 1600×900 (默认设计稿)
   - 1920×1080 (主流外接显示器)
2. 如果三档分辨率任一档 |Δ| > 10 px, 视为"分辨率漂移 bug", 必须修。
3. 修法优先级:
   - **首选 JS 动态校准** (在 hero slide 上设 CSS 变量, margin 引用 var)，时机要覆盖 load/resize/字体ready/slide切换
   - 次选 CSS calc + vh + 百分比 (能解决线性缩放, 不能解决 justify-content:center 类非线性)
   - 慎用静态 px margin (仅在两列内容都按 vh 等比例缩放时安全)

**自检脚本**:
```js
// playwright 多视口循环
for (const [w,h] of [[1280,720],[1600,900],[1920,1080]]) {
  const browser = await pw.chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: w, height: h }});
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(1500);
  // navigate to target slide ...
  const Δ = await page.evaluate(() => {
    const left = document.querySelector('.left-anchor').getBoundingClientRect().bottom;
    const right = document.querySelector('.right-anchor').getBoundingClientRect().bottom;
    return left - right;
  });
  console.log(`${w}x${h}: Δ=${Δ}`);  // 期望全部 |Δ| ≤ 10
  await browser.close();
}
```

**详见 `references/layouts-corp.md` "2026-06 更新二十五" 红线 37-39**。

#### 4.0.8 · headline 行内 row+wrap 的"数字脱节"陷阱 (2026-06 新增 · 更新二十六)

**典型故障**: C15 卡片标题左 + 大数字徽章右(即 `.sd-headline { display:flex; flex-direction:row; flex-wrap:wrap }` + `.sd-badge { flex-shrink:0 }`), 真实数据下数字突然掉到下一行, 与标题脱节, 视觉上像"两个独立部件错位粘贴"。

**根因**: row + wrap 在容器宽度不够时, 整个 badge 会被甩到下一行(因为 `flex-shrink:0` 不能压它). 临界条件简单:

```
title宽 + gap + badge宽 > headline容器宽 → wrap
```

**模板示例数据 (85 / 1) 永远踩不到这个临界, 但真实业务数据踩得到**——这是"demo 数据掩盖边界 case"的经典坑:

| title 字数 | title 宽 (≈) | badge 数字位数 | badge 宽 (≈) | 总宽 | 容器 596 (1600×900) |
|---|---|---|---|---|---|
| 6 字 | 230 | 1-2 位 (如 85) | 110 | 340 | ✅ |
| 6 字 | 230 | **4 位** (如 63.37) | 230 | **524** | ✅ 边缘 |
| **8 字** (双通道高密度承接) | 310 | **4 位** (63.37) | 233 | **606** | ❌ **wrap** |

**强制规则 (生成 deck 后必查)**:

```js
// playwright 内, 切到含 .qjyd-status-cards / .qjyd-status-duo 的页, 三档分辨率各跑一遍
const wrapped = await page.evaluate(() => {
  return Array.from(document.querySelectorAll('.qjyd-status-card, .qjyd-status-duo .sd-col')).map(card => {
    const t = card.querySelector('.sd-title');
    const b = card.querySelector('.sd-badge');
    if (!t || !b) return null;
    const tR = t.getBoundingClientRect();
    const bR = b.getBoundingClientRect();
    return { wrap: bR.top - tR.top > 30 };
  }).filter(Boolean);
});
// 期望: 任一卡片任一分辨率 wrap 都为 false
```

**修法优先级**:

1. **CSS 层兜底 (模板已默认应用, 2026-06 更新二十六)**:
   - `.sd-headline { gap: var(--sp-7) /* 32 */ }` — 不要用 `--sp-10 (64)`, 抢回 32px 余量
   - `.sd-title { flex: 1 1 auto; min-width: 0 }` — title 优先被压缩(变 2 行) 而不是 badge wrap
   - `.sd-badge-num { font-size: clamp(58px, 4.8vw, 80px) }` — 上限 80, 4 位数字 badge 宽控制在 ~200px
   - `.sd-badge { align-self: flex-end }` — wrap 触发时仍贴右下与 title 末行对齐
2. **数据层避坑 (生成阶段就要做)**:
   - 标题 `.sd-title` 任一行 ≤ 7 字, 整体 ≤ 2 行
   - 数字 `.sd-badge-num` 位数 ≤ 4 (含小数点)
   - 标题里**少用 `<br>`主动断行**——让 CSS 自然 wrap, 反而可控
3. **彻底改版 (新版面才考虑)**:
   - 改 column 布局: 标题在上, 数字在右下角绝对定位

**数据驱动 layout 检查 (生成 deck 时要做)**:

| 数据特征 | 选用版面 | 理由 |
|---|---|---|
| 数字 ≤ 3 位 + 标题 ≤ 7 字 | C15 status-cards 默认 row 布局 | 安全区, 视觉冲击力最大 |
| 数字 4 位 + 标题 ≤ 7 字 | 同上, 已被 CSS 兜底覆盖 | 模板默认参数已留余量 |
| **数字 5 位+ 或 标题 ≥ 9 字** | **改 C04 (qjyd-kpi-hero)** 单数 + bullet, **不要硬塞 C15** | C15 的 row+wrap 设计假设标题中等长度 + 数字短, 极端数据会强行触发兜底, 但视觉密度对比会塌 |

**详见 `references/layouts-corp.md` "2026-06 更新二十六" 红线 40-42**。


#### 风格 A · 电子杂志风必查

1. **大标题必须是衬线字体**——如果显示成非衬线,99% 是 Step 3.0 预检没做,`h-hero` 类在 template.html 里缺失
2. **图片网格里只用 `height:Nvh`,不用 `aspect-ratio`**(会撑破)
3. **图片不能堆到页面底部**——不要用 `align-self:end`,用 grid + `align-items:start`(见 Step 3.2)
4. **图片只能用标准比例**(16:10 / 4:3 / 3:2 / 1:1 / 16:9),不要复制原图的奇葩比例
5. **中文大标题 ≤ 5 字且 `nowrap`**(避免 1 字 1 行)
6. **用 Lucide,不用 emoji**
7. **标题用衬线,正文用非衬线,元数据用等宽**

#### 风格 B · 瑞士国际主义必查

1. **全程无衬线**——任何衬线字体出现都是错的(检查 `font-family` 没用 `--serif` 类变量)
2. **只有一个 accent 色**——一份 deck 不能同时出现 IKB 蓝 + 柠檬黄 + 安全橙等多个高亮色
3. **不允许渐变 / 阴影 / 圆角**——所有色块直角纯色,任何 `box-shadow` / `linear-gradient` / `border-radius` > 0 都要砍掉(rule 横线除外)
4. **极致字号对比**——主标题与正文比例 ≥ 8:1
5. **大字号必须双约束限高**——`font-size:min(Xvw, Yvh)`,只用 vw 在标准 16:9 屏会溢出(吸取 P15/P20/P22 教训)
6. **大字字重 200**(ExtraLight)——字号越大越细,瑞士风灵魂;**禁止** 600/700/800 大字
7. **卡片填充类型互斥**——`card-ink` / `card-accent` / `card-fill` / `card-outlined` 四类**不能混用**(禁止"蓝底+蓝描边"、"灰底+描边"等)
8. **多卡并列时统一样式**——3-12 张卡用同一类(优先 `card-fill` 灰底);只突出一项时单独换 `card-accent`,且**只允许一张**
9. **直角到底**——任何 `border-radius` 都不允许;装饰用 8×8 直角小方块,**不要** 9px 圆形点
10. **图标用 lucide,不自己画 SVG**——`<i data-lucide="name"></i>` + `lucide.createIcons()`,选棱角风格(避免圆胖)
11. **时间线对齐**——axis 列固定 12px + dot 绝对定位,**不要**用 grid `justify-self`(会与虚线错位)
12. **章节级标题与内容间距 ≥ 9vh**——避免拥挤(吸取 P15/P16 教训)
13. **每页一个语义化动效 recipe**——不是统一 fade-up,数字 scale 弹入、bar scaleY 拉起、SVG stroke 描线、节点序列点亮等;**禁止**所有页用同一个 generic 配方
14. **playSlide 入口 reveal 容器**——`[data-anim]` 容器先强制 opacity:1,recipe 内再用 motion `{opacity:[0,1]}` 覆盖,否则有些页会"看不见"
15. **ESC 索引页可见性**——cloned slide 必须有 CSS override 让 `[data-anim]` 在缩略图里 opacity:1
16. **Helvetica/Inter 兜底中文字体**——Windows 用户没有"苹方",必须 fallback 到 `"Microsoft YaHei UI", "Noto Sans SC"`
17. **字体粗细体例**:大字 200 / 正文 300 / `t-cat` SemiBold 600 / `t-meta` mono uppercase
18. **保留低功耗快捷键**——右下角必须提示 `B 静态`;按 `B` 切换 `body.low-power`,停止 WebGL/ASCII canvas RAF 和 Motion 入场动画
19. **装饰元素严格在 grid 内**——bars 矩阵、点阵、ring-mat 不能贴边或溢出页面
20. **底部内容预留 nav 空间**——nav 在 ~97vh,内容收尾不要过 93vh(吸取 P22 KPI 大字溢底教训)
21. **图片容器直角无阴影**——`.frame-img` 不加 `border-radius` / `box-shadow`;边界只用 hairline
22. **S15/S16/S22 图片同组一致**——同一组图片统一比例、高度、边距、线条粗细;信息图/UI 图加 `.fit-contain`
23. **组件角色要正确**——S15/S16 图片格需要 caption 信息锚点;S22 的 KPI/说明是必选;数据专用版式必须有真实数据,不能靠文案硬填
24. **通用/非通用版式要分清**——S03/S08/S11/S19 较通用;S06/S07/S20/S21/S22 是数据/案例专用;S14/S15/S17 是结构专用

### Step 5 · 本地预览

直接在浏览器打开 `index.html` 就行。macOS 下：

```bash
open "项目/XXX/ppt/index.html"
```

不需要本地服务器。图片走相对路径 `images/xxx.png`。

### Step 6 · 迭代

根据用户反馈修改——模板的 CSS 已经高度参数化，90% 的调整都是改 inline style（字号 `font-size:Xvw` / 高度 `height:Yvh` / 间距 `gap:Zvh`）。

### Step 7 · 交付分发版（生成完成后必做）

deck 收尾后,**必须主动问一次用户是否需要分发版**——本 skill 的产物默认仍是项目目录(`index.html` + `images/` + `assets/motion.min.js`),分发到 IM/邮件时容易缺资源。

**为什么这是流程的一环,不是可选 tip**:单发 `index.html` 几乎一定会触发以下两类问题:

1. `./images/logo.png` 等本地图片 → 封面 logo 破图
2. `./assets/motion.min.js` 加载失败 → 翻页入场动画消失,变成"白板秒切"
3. (Lucide CDN 通常对方有网就 OK,但断网演示会图标变方块)

而用户往往要等发出去之后才发现这些问题。

**提问模板**(直接照搬,不要重新造句):

> PPT 已生成。需要我打一个适合发给别人的分发版吗?有两种打包方式:
> - 🥇 **单文件 HTML(推荐)**:图片转 base64、动效库内嵌、图标库内嵌——一个文件双击即开,断网也完整。体积约比项目大 4-8 倍,但通常仍 < 1MB。
> - 📦 **zip 包**:保留目录结构,体积小,但对方要解压。适合后续可能二次编辑的场景。

用户选哪种,按 `references/distribution.md` 的步骤打包(包含可复制的 Node 脚本和 Playwright 自检流程)。

**例外**:用户在 Step 1 已明确说"我自己本地用,不发别人",可以跳过 Step 7。

**禁止**:
- ❌ 不要默认跳过这一步——"用户没问就不主动提"是错的,踩坑成本由用户承担
- ❌ 不要直接生成单文件版而不问用户——单文件版体积更大,有人就是要 zip 留着改
- ❌ 不要在生成 deck 的同时就把分发版一并产出——先让用户预览原版,确认满意再打包


---

## 资源文件导览

```
ang-ppt-skill/
├── SKILL.md                  ← 你正在读
├── assets/
│   ├── template.html         ← 风格 A · 电子杂志风模板（种子文件）
│   ├── template-swiss.html   ← 风格 B · 瑞士国际主义风模板（种子文件）
│   ├── template-corp.html    ← 风格 C · 企家有道企业风模板（种子文件）
│   ├── qjyd-corp/            ← 风格 C 专属资产
│   │   └── xrxs-logo.png     ← 默认产品 logo（薪人薪事，封面/Thank You 默认用这个）
│   ├── screenshot-backgrounds/ ← 截图美化内置背景(WebP):style-a 5 套 / style-b 4 套
│   └── motion.min.js         ← Motion One 本地副本（离线兜底,约 64KB,三套模板共用,统一加载路径 ./assets/motion.min.js）
├── scripts/
│   └── validate-swiss-deck.mjs ← 风格 B 静态校验:登记版式、图片槽位、SVG 文本、标题对齐
└── references/
    ├── distribution.md       ← 分发打包(Step 7 必读):单文件 HTML / zip 两种打法 + 内联代码片段
    ├── components.md         ← 组件手册（字体、色、网格、图标、callout、stat、pipeline、动效... 风格 A 适用）
    ├── layouts.md            ← 风格 A · 10 种页面布局骨架（可直接粘贴,含动效标记）
    ├── swiss-layout-lock.md  ← 风格 B · 原始 22P 版式锁,正文页必须按这里登记
    ├── layouts-swiss.md      ← 风格 B · 原始 22P 骨架说明 + 少量明确标注的实验区
    ├── swiss-map-component.md ← 风格 B · S08 地图扩展组件(MapLibre 点位/连线/卡片/控制)
    ├── themes.md             ← 风格 A · 5 套主题色预设（只能选不能自定义）
    ├── themes-swiss.md       ← 风格 B · 4 套瑞士风主题色预设（IKB / 柠檬黄 / 柠檬绿 / 安全橙）
    ├── image-prompts.md      ← GPT-M 2.0 配图类型、比例和基础提示词
    ├── screenshot-framing.md ← CleanShot X 式截图适配语义 + 内置背景资产映射
    └── checklist.md          ← 质量检查清单（P0/P1/P2/P3 分级）
```

**加载顺序建议**：
1. 先读完 `SKILL.md`(这个文件)了解整体
2. Step 1 需求澄清**第一问**先确定风格 A / B / C,然后:
   - 风格 A:读 `themes.md` 帮用户选一套主题色
   - 风格 B:读 `themes-swiss.md` 帮用户选一套主题色
   - 风格 C:**默认直接用 🌿 薄荷企业**(见 `themes-corp.md` 顶部"主题成熟度状态"——只有薄荷已调优, 其他三套暂不建议生产使用), 用户没明说要换就别主动推荐
3. **动手前 Read 对应模板的 `<style>` 块**——这是类名的唯一来源,缺类会导致整页样式崩
   - 风格 A → `assets/template.html`
   - 风格 B → `assets/template-swiss.html`
   - 风格 C → `assets/template-corp.html`
4. 读对应的 layouts 文件挑布局:
   - 风格 A → `layouts.md`(顶部有 Pre-flight 类名清单、主题节奏规划、动效 recipe 决策树)
   - 风格 B → **先读 `swiss-layout-lock.md`**,再读 `layouts-swiss.md`;正文页必须从 S01-S22 选择,每页写 `data-layout`
   - 风格 C → `layouts-corp.md`;正文页必须从 C01-C16 选择,每页写 `data-layout`(没有独立的 layout-lock 文档, 但所有版式约束直接写在 `layouts-corp.md` 的"更新一~更新十九"章节里)
5. 如果风格 B 需要地点、路线、人物住所或城市关系地图,读 `swiss-map-component.md`
6. 如果在 Codex 中生成配图,读 `image-prompts.md` 挑图片类型、比例和基础提示词;如果是用户原始截图,先读 `screenshot-framing.md`,优先使用 `assets/screenshot-backgrounds/` 的内置背景资产
7. 细节调整时读 `components.md` 查组件(含 Motion 动效系统章节,主要服务风格 A;风格 B 的组件细节在 `layouts-swiss.md` 附录)
8. 生成后先运行 `node scripts/validate-swiss-deck.mjs path/to/index.html`,再读 `checklist.md` 自检

**动效相关**:模板已把 Motion One 的加载和 recipe 逻辑内嵌到底部 module script。你不需要改 JS,只需要按 `layouts.md` / `layouts-swiss.md` 的骨架在 HTML 里加 `data-anim` / `data-animate` 即可。离线演示靠 `assets/motion.min.js`,断网时自动降级为"无动画但内容可读"。风格 B 模板必须保留 `B` 键低功耗模式:切换后停止 WebGL/ASCII canvas RAF,取消正在运行的 Web Animations,并把当前页内容直接 reveal 到静态最终态。

## 核心设计原则（哲学）

### 风格 A · 电子杂志风（5 轮迭代总结）

> 违反其中任何一条，杂志感都会垮。

1. **克制优于炫技** — WebGL 背景只在 hero 页透出，普通页几乎看不见
2. **结构优于装饰** — 不用阴影、不用浮动卡片、不用 padding box，一切信息靠**大字号 + 字体对比 + 网格留白**
3. **内容层级由字号和字体共同定义** — 最大衬线 = 主标题，中衬线 = 副标，大非衬线 = lead，小非衬线 = body，等宽 = 元数据
4. **图片是第一公民** — 图片只裁底部，保证顶部和左右完整；网格用 `height:Nvh` 固定，不要用 `aspect-ratio` 撑
5. **节奏靠 hero 页** — hero 和 non-hero 交替，才不累眼睛
6. **术语统一** — Skills 就是 Skills，不要中英混合翻译

### 风格 B · 瑞士国际主义风

> 违反其中任何一条，画面瞬间从瑞士掉到 PowerPoint。

1. **单一锚点色** — 一份 deck 只用一个 accent，不允许多色高亮拼贴
2. **极致字号对比** — 主标题与正文比例 ≥ 8:1,KPI 必须是"Data Hero"(屏幕宽度的 18-22%)
3. **无衬线只此一家** — Inter / Helvetica / Noto Sans SC,任何衬线都是错的
4. **直角纯色** — 不允许渐变 / 阴影 / 圆角(rule 横线除外)
5. **网格至上** — 所有元素吸附到 12-col grid,左对齐 + 大幅留白做非对称美学
6. **Hairline 是手术刀** — 1px 的极细分割线就够,不要加粗、不要加阴影
7. **点阵装饰只在 hero 页透出** — 正文页保持纯净底色

## 参考作品

本 skill 的两种风格分别参考了：

**风格 A · 电子杂志风**:
- *Monocle* 杂志的版式
- YC 总裁 Garry Tan "Thin Harness, Fat Skills" 那篇博客的 demo

**风格 B · 瑞士国际主义风**:
- Massimo Vignelli 的 NYC Subway / Unimark 系统
- *Helvetica Forever* 的字体设计语言
- Josef Müller-Brockmann 的网格系统经典著作
- 当代设计:Acne Studios / Off-White / IKEA / Beck Design

可以把它们当做风格锚点。

## 附录 · 把 guizang 风格转成 .pptx（可二次编辑）时的注意事项

本 skill 主产物是**单文件 HTML**（横向翻页网页 PPT）。但有时用户会要求"再给我一份可二次编辑的 .pptx"——此时通常走 `presentations` 插件的 artifact-tool 路径（`ctx.addText` / `ctx.addShape` / `ctx.addImage` 1280×720 画布），再把视觉系统**重新搭一遍**到 PPTX 文本框里。这条路径下,有一类 bug 在 HTML 版本里不会出现,但 PPTX 版本里非常容易踩——**mega number 巨字溢出宽度导致末位字符换行**(典型现象:"100" 渲染成 "10" + 下一行 "0")。

### Mega number 安全做法（用于 KPI hero / KPI triple / KPI quad 等大数字场景）

**根因**:`ctx.addText` 必须显式给 `width`,而 PPTX 渲染器对大字号 + 紧贴宽度的容忍度极低。中文/数字按"字号 × 0.55"估算字符宽度时,80pt 以上字号的实际占位常常会比估算多 10-20%,只要 `width` 给得刚好,末位就会被推到下一行。

**铁律**:

1. **数字文本框宽度** ≥ `字符数 × 字号 × 0.65 + 24px 余量`(留出 25% 安全垫,比理论值更宽松)。常见对照:
   - 110pt 大字、3 位数(如 "100")→ width ≥ **280**
   - 96pt 大字、3 位数 → width ≥ **240**
   - 84pt 大字、3 位数(含 "≥84")→ width ≥ **220**
   - 72pt 大字、3 位数 → width ≥ **200**
2. **巨字字号建议上限 96pt**——不是因为 110pt 不行,而是 110pt 在 1280×720 画布上很容易让单个 KPI 块的数字 + 单位组合超过 320px 宽度,挤掉旁边的 hairline 和 label。优先用 96pt + 强对比色 + 加粗,视觉冲击力已经足够。
3. **单位文本框定位不要用 `n.length * 字号 * 0.55`**——脆弱且容易和数字重叠。改用**固定的右侧 offset 估算**:`unitX = numLeft + n.length × digitW + 4`,其中:
   - `digitW = 字号 × 0.56`(Aptos Display Bold 经验值)
   - `≥ < % + 年 维`等单字符单位放在 `top: numTop + 字号 × 0.3` 处,字号 ≈ 数字字号的 30%-35%
4. **不要把单位塞进数字文本里**——比如不要写 `text: "100+"`。把 "100" 和 "+" 拆成两个 text shape,数字用 body 字体(Aptos)、单位用中文字体(PingFang SC),才能各自走对的字距规则。
5. **写完单页要单页渲染验证**:用 `presentations` 插件的 `render_artifact_slide.mjs --slide-module slide-NN.mjs` 出 PNG,肉眼确认所有数字都在同一行内。**整体 build 之前必做**——否则 23 页一起出问题就要全部重做。

### 颜色与字体的二次编辑友好性

- qjyd-corp 主色 `#00BFA5` 在 .pptx 里**直接以 hex 写到 fill**,不要走主题色变量(PowerPoint 的 theme colors 跨平台兼容性差,Keynote 打开会偏色)
- 中文用 `PingFang SC`(macOS)/`Microsoft YaHei`(Windows),英文/数字用 `Aptos Display` / `Aptos`(Office 365 默认字体,跨平台稳定)
- 圆角(`radius`)在 PPTX 中要谨慎用——artifact-tool 的 `geometry: "roundRect"` 在某些 PowerPoint 版本下会渲染异常,**优先用直角 hairline 代替圆角卡**(KPI 实色块除外)

### 产品 logo 嵌入

- 用 `await ctx.addImage(slide, { path: LOGO_PATH, ..., fit: "contain" })`
- `LOGO_PATH` 默认指向 **本 skill 的 `assets/qjyd-corp/xrxs-logo.png`**(可通过 `cp` 到项目本地,也可直接绝对路径引用)
- `fit: "contain"` 而不是 `"cover"`,避免 logo 被裁切;给 logo 槽位留出至少 180×90 的最小尺寸

> 这个附录只在"用户在 guizang 风格之外还要一份 .pptx"时才需要读;纯网页 PPT 不涉及。

