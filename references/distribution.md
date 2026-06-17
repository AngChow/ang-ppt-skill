# 分发打包：把 deck 变成"发出去就能看"的版本

> 本文档对应 `SKILL.md` 的 **Step 7**。生成完 deck 后用户回答"要分发版"时读这里。
> 不要在 Step 1-6 期间读本文档——分发只是收尾动作,与版式 / 主题 / 内容无关。

---

## 1 · 为什么需要打分发版?

本 skill 的项目产物是个"目录":

```
项目/XXX/ppt/
├── index.html              ← 主文件
├── images/
│   └── logo.png            ← 封面 / Thank You 用 (风格 C 必用)
└── assets/
    └── motion.min.js       ← Motion One 入场动效库 (~64 KB)
```

直接把 `index.html` 发给别人会触发两类硬伤:

| 缺什么 | 后果 | 可见度 |
|---|---|---|
| `./images/*.png` 等本地图片 | 封面 logo 变 X 破图,正文图片格成空框 | **高(一眼能看出)** |
| `./assets/motion.min.js` | 翻页时所有 `[data-anim]` 元素从 `opacity:0` 直接变 `opacity:1`,动画"被秒切" | **中(对方不一定察觉)** |
| Lucide UMD CDN | 图标 `<i data-lucide="check">` 不渲染,变成空标签 / 方块 | **低(在线就 OK,断网才出)** |

> **典型踩坑场景**:用户把 `index.html` 邮件附件发给客户,客户双击打开,封面 logo 是 X,翻页瞬间内容刷一下出来——deck 的高级感瞬间垮一半。

---

## 2 · 何时需要打 / 怎么选

用户回答 Step 7 提问时,按下表分流:

| 用户表达 | 选什么 |
|---|---|
| "微信发给同事看一下" / "发给客户" / "邮件附件" | **🥇 单文件 HTML** |
| "我想发完之后他还能改改" / "你给我 zip" / "源码我留着" | **📦 zip 包** |
| "都给我" | **两个都打**(分发版 + zip),分别说清用途 |
| "我自己本地看就行" / "投屏演示" | 跳过,不打包 |

**单文件 vs zip 体积对比参考**(以 16 页 qjyd-corp deck 为例):

| 形态 | 体积 | 对方操作 | 离线可用? |
|---|---|---|---|
| 原项目目录 (zip 后) | ~80-120 KB | 解压 + 双击 `ppt/index.html` | ✅ |
| 单文件 HTML (内联) | ~600-900 KB | 双击 | ✅ |
| 单文件 HTML (内联 + 多张产品截图) | ~2-5 MB | 双击 | ✅ |

**红线**:单文件 > **5 MB** 时不要直接发,先按 §6 压图;> **10 MB** 时强烈建议改 zip(IM 平台可能限制附件大小)。

---

## 3 · 单文件 HTML 的内联手法(三种依赖 × 三种内联法)

### 3.1 · 图片 → `data:image/...;base64,...`

**适用**:封面 logo / 正文 `<img src="./images/xxx.png">` / 任何 `<img>` 引用本地文件。

**步骤**:

```js
const fs = await import('node:fs/promises');
const buf = await fs.readFile('项目/XXX/ppt/images/logo.png');
const dataUrl = `data:image/png;base64,${buf.toString('base64')}`;
// 在 HTML 里把 src 替换掉
html = html.replace('src="./images/logo.png"', `src="${dataUrl}"`);
```

**注意**:
- 同一张图被引用多次时,只替换一次 `src=` 字符串只会改第一处——用全局 replace 或循环遍历所有 `<img>`
- PNG 转 base64 后体积会膨胀 ~33%(base64 编码本身的开销),所以原图 100 KB → 内联后 133 KB
- 模板 C01 / C13 里 `<img onerror>` 兜底逻辑要一并清掉(避免 IDE 误报 / 控制台噪音):
  ```js
  html = html.replace(
    /onerror="this\.onerror=null;this\.src='[^']+';"/g,
    ''
  );
  ```

### 3.2 · Motion ESM 模块 → `data:text/javascript;base64,...`

**这是最容易踩坑的一步**——`motion.min.js` 是 ESM 模块,**不能用 `<script>` 内联,也不能用 blob URL**(blob URL 在某些浏览器 + CSP 组合下会导致 module specifier 失败)。

**正确做法**:把整个 JS 文件 base64 编码,作为 `data:text/javascript;base64,...` URL 给 `import()`:

```js
const motionJs = await fs.readFile('项目/XXX/ppt/assets/motion.min.js', 'utf-8');
const motionDataUrl = 'data:text/javascript;base64,' + Buffer.from(motionJs).toString('base64');

// 模板里原句:
//   motion = await import('./assets/motion.min.js');
// 替换为:
html = html.replace(
  `motion = await import('./assets/motion.min.js');`,
  `motion = await import('${motionDataUrl}');`
);
```

**为什么不能用其他方式**:
- ❌ `<script type="module">...</script>` 内联——模板里是 `await import()` 异步加载,转同步会破坏 motion-ready 时序
- ❌ `URL.createObjectURL(new Blob([js]))`——blob URL 在 `file://` 协议下表现不稳定,而且要先 DOMContentLoaded 才能 createObjectURL
- ✅ `data:text/javascript;base64,...`——浏览器对 data URL 的 ESM import 支持稳定,与 `file://` 也兼容

### 3.3 · Lucide UMD CDN → `<script>` 内联

**适用**:模板里 `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`

```js
let lucideJs = null;
try {
  const r = await fetch('https://unpkg.com/lucide@latest/dist/umd/lucide.min.js');
  if (r.ok) lucideJs = await r.text();
} catch (e) {
  console.warn('lucide CDN fetch failed:', e.message);
}

if (lucideJs) {
  html = html.replace(
    `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`,
    `<script>${lucideJs}</script>`
  );
} else {
  // 降级: CDN 抓不到时保留原 <script src=>, 并提示用户
  console.warn('[distribution] Lucide 抓取失败, 单文件版仍引用 CDN; 对方需要联网才能看到图标');
}
```

**降级策略**:Lucide 抓不到时**不要让脚本崩**,保留原 CDN 引用并在交付时告知用户"图标需要对方联网"。一定不要因为 CDN 抽风把整个分发版做不出来。

---

## 4 · 完整可复制的打包脚本(Node REPL)

把项目目录传进来,输出"项目名-单文件版.html"。

```js
const fs = await import('node:fs/promises');
const path = await import('node:path');

const projDir = '项目/XXX/ppt';                       // ← 改这里
const projectName = '项目XXX';                         // ← 改这里, 用作输出文件名前缀
const outDir = path.dirname(projDir);                 // 输出到项目根

// 1) 读 HTML 主文件
let html = await fs.readFile(`${projDir}/index.html`, 'utf-8');

// 2) 内联所有本地图片(扫 ./images/ 目录)
const imgDir = `${projDir}/images`;
const imgFiles = await fs.readdir(imgDir).catch(() => []);
const mimeMap = { '.png':'image/png', '.jpg':'image/jpeg', '.jpeg':'image/jpeg', '.webp':'image/webp', '.gif':'image/gif', '.svg':'image/svg+xml' };
for (const f of imgFiles) {
  const ext = path.extname(f).toLowerCase();
  if (!mimeMap[ext]) continue;
  const buf = await fs.readFile(`${imgDir}/${f}`);
  const enc = ext === '.svg' ? `data:image/svg+xml;utf8,${encodeURIComponent(buf.toString())}` : `data:${mimeMap[ext]};base64,${buf.toString('base64')}`;
  // 替换 ./images/<f> 形式的所有引用
  html = html.split(`./images/${f}`).join(enc);
}
// 清掉 onerror 兜底
html = html.replace(/onerror="this\.onerror=null;this\.src='[^']+';"/g, '');

// 3) 内联 motion.min.js (ESM, 用 data URL)
try {
  const motionJs = await fs.readFile(`${projDir}/assets/motion.min.js`, 'utf-8');
  const motionDataUrl = 'data:text/javascript;base64,' + Buffer.from(motionJs).toString('base64');
  html = html.replace(
    `motion = await import('./assets/motion.min.js');`,
    `motion = await import('${motionDataUrl}');`
  );
} catch (e) {
  console.warn('motion.min.js 内联失败:', e.message);
}

// 4) 内联 Lucide UMD CDN (失败则降级保留 CDN)
try {
  const r = await fetch('https://unpkg.com/lucide@latest/dist/umd/lucide.min.js');
  if (r.ok) {
    const lucideJs = await r.text();
    html = html.replace(
      `<script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>`,
      `<script>${lucideJs}</script>`
    );
  }
} catch (e) { console.warn('lucide CDN 抓取失败:', e.message); }

// 5) 写出
const outPath = `${outDir}/${projectName}-单文件版.html`;
await fs.writeFile(outPath, html, 'utf-8');
console.log('OK:', outPath, `(${(html.length/1024).toFixed(0)} KB)`);
```

---

## 5 · 打包后必做的自检

**单文件版必须用 Playwright 抽查 3 页与原版做视觉比对**——内联出错(比如 base64 截断、ESM import 失败)往往不会报错,但页面会"看起来对,其实坏了"。

```js
const pw = await import('playwright');
const browser = await pw.chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1600, height: 900 } });
const page = await ctx.newPage();

const url = 'file:///绝对路径/项目-单文件版.html';
const checkPages = [1, Math.ceil(总页数/2), 总页数];  // 封面 / 中段 / Thank You
for (const n of checkPages) {
  await page.goto(`${url}?slide=${n}&clean=1`, { waitUntil: 'load' });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/dist_check_${n}.png` });
}
await browser.close();
```

逐张比对原版截图,重点看:
- ☐ 封面 logo 显示正常(没变 X)
- ☐ Thank You 页右侧装饰圆环正常(qjyd-corp 风格 C 用)
- ☐ KPI 大数字 / accent 渐变文字正常
- ☐ 图标(Lucide `<i data-lucide>`)正常显示

**如果对比有差异**:
1. 浏览器控制台打开看错误——多半是 ESM import 失败,核对 motion data URL
2. base64 末尾意外被截断——检查 `replace` 是否漏了某个 src 引用
3. Lucide 图标是空标签——CDN 抓取失败但 `<script>` 仍是 CDN 引用形态,降级保留即可

---

## 6 · 单文件太大时:先压图

如果单文件 > 5 MB,通常是 `./images/` 目录里有大尺寸 PNG/JPG。压完再内联,体积通常能砍 60-80%。

### PNG 压缩(无损)

```bash
# 用 pngquant 量化(有轻微损失但视觉无差异, 体积可降 70%)
brew install pngquant
pngquant --quality=80-95 --skip-if-larger --strip --force --ext .png 项目/XXX/ppt/images/*.png

# 或者无损 oxipng(降幅 10-30%)
brew install oxipng
oxipng -o 4 --strip safe 项目/XXX/ppt/images/*.png
```

### JPG 压缩

```bash
# Pillow / sips 都行, 优先用 Python:
python3 -c "
from PIL import Image
import sys, os
for f in sys.argv[1:]:
    im = Image.open(f).convert('RGB')
    im.save(f, 'JPEG', quality=82, optimize=True, progressive=True)
" 项目/XXX/ppt/images/*.jpg
```

### 大图判断阈值

| 用途 | 推荐尺寸上限 | 推荐文件大小 |
|---|---|---|
| 封面 logo (透明 PNG) | 512×512 | < 50 KB |
| 正文产品截图 | 1600×1200 | < 200 KB |
| 全屏 hero 图 (C09) | 1920×1280 | < 350 KB |

**如果压完仍 > 5 MB**:改推 zip 包,不要硬塞单文件。

---

## 7 · zip 包打法

```bash
cd 项目目录
# 清掉模板演示资产 (skill 红线 12: 不要让用户拿到 c08-xinling.jpg 等)
rm -rf ppt/qjyd-corp 2>/dev/null

# .DS_Store 和 .bak 备份不进 zip
zip -qr 项目名-周报20260612.zip ppt -x '**/.DS_Store' '**/*.bak*'

# 校验 zip 内容
unzip -l 项目名-周报20260612.zip | head -20
```

**zip 包检查清单**:
- ☐ 不包含 `assets/qjyd-corp/c*-*.jpg|png` 等模板演示图(红线 12)
- ☐ 不包含 `.DS_Store` / `*.bak` / `__MACOSX`
- ☐ 包含 `ppt/index.html` + `ppt/images/` + `ppt/assets/motion.min.js`
- ☐ 解压后双击 `ppt/index.html` 能正常翻页(动效正常)

---

## 8 · 交付时的话术建议

打完包后给用户的回执,默认包含三个信息:

1. **文件路径**(绝对路径,方便用户在 Finder 里打开)
2. **文件大小**(让用户对体积心里有数)
3. **使用提示**(对方需要做什么,有没有特殊要求)

例:

> 已生成两个分发版本:
>
> 📎 `/Users/.../项目名-单文件版.html`(692 KB) — 一个文件双击即开,微信/钉钉直接发它最省心
> 📦 `/Users/.../项目名-20260612.zip`(88 KB) — 完整目录,适合后续要二次编辑
>
> **使用提示**:对方电脑联网时图标库走 CDN,不联网会变方块——如果是断网演示场景告诉我,我重新打一份完全离线的版本。
> **导出 PDF**:Chrome 打开 → 打印 → "另存为 PDF",自定义尺寸 1920×1080,关掉页眉页脚。

---

## 9 · 已知 corner cases

| 情况 | 处理 |
|---|---|
| 模板里有 `<link rel="stylesheet" href="...">` 引外部 CSS | 当前三套模板**全部 inline `<style>`**,没这问题; 若未来引入则需 fetch + `<style>` 内联 |
| 模板用了 webfont(`@font-face url(...)`) | qjyd-corp 用系统字体,无 webfont; 风格 A/B 也是 Google Fonts CDN(对方联网才能看到衬线效果) |
| 模板里 `<video>` / `<audio>` 引本地文件 | 当前三套模板都没视频; 若有须 base64 内联,但 > 5 MB 时直接放弃单文件版 |
| 用户改过模板路径,motion 不在 `./assets/motion.min.js` | 脚本里 catch 住,console.warn 后跳过 motion 内联(对方仍能看内容,只是动画消失);务必告诉用户这一点 |
| HTML 包含 `<!--[if IE]>` 等 IE 条件注释 | 当前模板不含,可忽略; 若用户手改加了,内联前要先把它清掉避免双 `-->` 解析(SKILL 红线 23) |

---

## 一行 TL;DR

> **生成完 deck → 主动问 → 默认推荐单文件 HTML → 用 §4 脚本打包 → §5 抽查 3 页 → 按 §8 话术回执用户**

