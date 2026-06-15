# themes-corp.md · 风格 C 主题色预设 (4 套)

> 风格 C · 企家有道企业风 (qjyd-corp) 的主题色规则与 4 套预设。
> 一份 deck **只能用一套**, 不允许中途换 accent, 不允许混搭。
> 切换主题时, 整体替换 `template-corp.html` 顶部 `:root{}` 块里标有"主题色"注释的所有变量。

## 切换主题的标准操作

1. 选定主题 (问用户 / 基于内容主题推荐)
2. 找到本文档对应主题的 `:root` 完整代码块
3. **整体替换** `assets/template-corp.html` 顶部 `:root{ /* 主题色 */ ... }` 段落
4. 其他 CSS 都走 `var(--...)`, 无需任何其他改动

## 推荐选择决策

| 用户场景 | 推荐主题 |
|---|---|
| 默认 / 不知道选啥 / 通用商务提案 | **🌿 1 薄荷企业** |
| 技术分享 / 数据汇报 / 研发对外发布 | **🌊 2 青墨科技** |
| 销售提案 / 增长汇报 / 营销活动 | **🌅 3 暖橙提案** |
| 职级评审 / 个人述职 / 团队复盘 / 年终总结 | **🌌 4 深空述职** |

---

## 🌿 1. 薄荷企业 (默认)

**适合**: 通用 / 销售面向客户做产品介绍 / 商务提案 / 客户对接
**情绪**: 清爽、专业、可信、科技
**视觉锚点**: 薪人薪事产品 UI (登录页、管理后台、薪灵对话)

```css
:root {
  /* ============ 主题色 ============ */
  --accent:       #00BFA5;   /* 海洋青 / 绿松石, 来自 logo + UI */
  --accent-rgb:   0,191,165;
  --accent-on:    #ffffff;
  --accent-dark:  #00A896;   /* 渐变深色端 / hover */
  --accent-soft:  #E6F8F5;   /* 浅底 / 选中态 */
  --accent-bright:#2EDFC4;   /* 暗底高亮, accent 提亮版 */

  --ink:          #1F2D3D;
  --ink-rgb:      31,45,61;
  --text-2:       #5A6B7B;
  --text-3:       #8A97A3;
  --text-on-dark: #ffffff;

  --paper:        #FFFFFF;
  --paper-rgb:    255,255,255;
  --paper-soft:   #F3F7FA;
  --paper-dark:   #1F2D3D;

  --grey-1:       #EAF0F5;
  --grey-2:       #D5DEE6;
  --grey-3:       #A6B2BD;
}
```

---

## 🌊 2. 青墨科技

**适合**: 技术分享 / 数据汇报 / 研发团队对外讲产品架构 / B 端技术 demo
**情绪**: 沉稳、专业、信任、技术
**视觉锚点**: 偏深的青墨色 (取自公司 PPT theme1.xml 中 `#006586`), 更冷更稳

```css
:root {
  --accent:       #006586;   /* 深青墨 */
  --accent-rgb:   0,101,134;
  --accent-on:    #ffffff;
  --accent-dark:  #004E68;
  --accent-soft:  #E0F0F6;
  --accent-bright:#4AB0D0;

  --ink:          #1A2733;
  --ink-rgb:      26,39,51;
  --text-2:       #4E6172;
  --text-3:       #7E8E9C;
  --text-on-dark: #ffffff;

  --paper:        #FFFFFF;
  --paper-rgb:    255,255,255;
  --paper-soft:   #F2F6F8;
  --paper-dark:   #1A2733;

  --grey-1:       #E5ECF0;
  --grey-2:       #CCD5DC;
  --grey-3:       #98A4AE;
}
```

---

## 🌅 3. 暖橙提案

**适合**: 销售提案 / 增长汇报 / 营销活动方案 / 客户案例集
**情绪**: 进取、热情、推动、行动派
**视觉锚点**: 取自公司 PPT theme1.xml 中 `#FF644E` 朱红 + `#fdcd8c` 暖橙调和

```css
:root {
  --accent:       #FF7847;   /* 暖橙朱红 */
  --accent-rgb:   255,120,71;
  --accent-on:    #ffffff;
  --accent-dark:  #E55A2B;
  --accent-soft:  #FFEDE4;
  --accent-bright:#FF9876;

  --ink:          #2A1F1A;   /* 偏暖的深棕墨 */
  --ink-rgb:      42,31,26;
  --text-2:       #5C4A40;
  --text-3:       #8A7A6E;
  --text-on-dark: #ffffff;

  --paper:        #FFFFFF;
  --paper-rgb:    255,255,255;
  --paper-soft:   #FAF6F2;   /* 暖白底 */
  --paper-dark:   #2A1F1A;

  --grey-1:       #F0E8E2;
  --grey-2:       #D9CCC2;
  --grey-3:       #A89A8E;
}
```

---

## 🌌 4. 深空述职

**适合**: 职级评审 / 个人述职 / 团队复盘 / 年终总结
**情绪**: 沉稳、深度、内省、有分量
**视觉锚点**: 取自职级评审模板的深底 `#202833` + 薄荷点缀
**特点**: **唯一一个默认 dark 主底**的主题, 平时正文页就是深底反白; light 页用浅版

```css
:root {
  /* 深空述职是"反色"主题: paper 是深色, ink 是浅色 */
  --accent:       #00BFA5;   /* 薄荷青点缀 */
  --accent-rgb:   0,191,165;
  --accent-on:    #1A2028;
  --accent-dark:  #00A896;
  --accent-soft:  #1A2A2E;   /* 深底上的浅 accent 卡片底 */
  --accent-bright:#2EDFC4;

  --ink:          #F0F4F8;   /* 主文字: 浅冷白 */
  --ink-rgb:      240,244,248;
  --text-2:       #B8C2CC;
  --text-3:       #8A95A0;
  --text-on-dark: #F0F4F8;

  --paper:        #1A2028;   /* 主底: 深空蓝灰 */
  --paper-rgb:    26,32,40;
  --paper-soft:   #232A33;   /* 卡片底, 比主底略浅 */
  --paper-dark:   #0D1218;   /* 比 paper 更深, 用于二级 dark */

  --grey-1:       #2D353F;
  --grey-2:       #3D4754;
  --grey-3:       #5A6675;
}
```

---

## 主题适用矩阵 (帮你快速决策)

| 场景 | 1 薄荷 | 2 青墨 | 3 暖橙 | 4 深空 |
|---|---|---|---|---|
| 销售面客 / 产品介绍 | ⭐ | ✓ | | |
| 商务提案 / 合同对齐 | ⭐ | ✓ | ✓ | |
| 技术分享 / 产品架构 | ✓ | ⭐ | | |
| 数据汇报 / 季度业绩 | ✓ | ⭐ | ✓ | |
| 增长 / 营销 / 案例 | | | ⭐ | |
| 客户案例集 | | | ⭐ | |
| 职级评审 / 述职 | | | | ⭐ |
| 团队复盘 / 年终总结 | | | | ⭐ |
| 通用 / 不确定 | ⭐ | | | |

## 硬规则 (违反会塌)

1. **一份 deck 一套主题** — 不允许中途换 accent 色
2. **不接受用户自定义 hex** — 委婉拒绝, 展示 4 套让选
3. **不混搭** — 不要 ink 取 1 号、paper 取 4 号这种交叉取值
4. **深空述职是反色主题** — 设计版式时要确认所有插画 / 图标 / 卡片在 dark 底上都能看清; 浅 accent 用 `--accent-bright` 而不是 `--accent`
5. **暖橙提案的 hero 大色块** — 用 `--accent` 时白字 `--accent-on` 必须保持纯白, 不允许带 alpha
