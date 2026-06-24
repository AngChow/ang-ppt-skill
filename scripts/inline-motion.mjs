/**
 * inline-motion.mjs
 * 把 assets/motion.min.js (ES module) 内联到模板 HTML 中, 解决 file:// 下
 * import() 被 CORS 阻止导致动画不加载的问题.
 *
 * 用法:
 *   node scripts/inline-motion.mjs              # 处理三个模板
 *   node scripts/inline-motion.mjs template-corp # 只处理指定模板
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const MOTION_PATH = join(ROOT, 'assets', 'motion.min.js');
const TEMPLATES = [
  'assets/template.html',
  'assets/template-swiss.html',
  'assets/template-corp.html'
];

/**
 * 把 ES module 的 export 语句转成 IIFE 格式 (挂载到 window.__motionInline)
 */
function convertESMToIIFE(src) {
  // 去掉 sourcemap 注释
  src = src.replace(/\/\/# sourceMappingURL=.+$/gm, '').trimEnd();

  // 找到 export 语句: "export{...};export default null;"
  // 用字符串搜索而不是正则, 更稳健
  const exportKeyword = 'export{';
  const exportIdx = src.lastIndexOf(exportKeyword);
  if (exportIdx === -1) throw new Error('Cannot find "export{" in motion.min.js');

  // 找到对应的 "};" 结束位置 (从 exportIdx 开始搜索)
  const braceStart = src.indexOf('{', exportIdx);
  let depth = 0;
  let endIdx = -1;
  for (let i = braceStart; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) { endIdx = i; break; }
    }
  }
  if (endIdx === -1) throw new Error('Cannot find closing } for export statement');

  // endIdx 指向 }, 后面应该跟 ;
  const exportContent = src.slice(braceStart + 1, endIdx);
  // 后面的 "export default null;" 也要去掉
  const afterExport = src.slice(endIdx + 1).replace(/^\s*;\s*/, '').replace(/export\s+default\s+null\s*;?\s*/, '').trim();
  const beforeExport = src.slice(0, exportIdx).trim();

  // 解析 export 条目: "localVar as exportName" 或 "exportName" (简写)
  const entries = exportContent.split(',').map(s => s.trim()).filter(Boolean);
  const pairs = entries.map(s => {
    const m = s.match(/^([\w$]+)\s+as\s+([\w$]+)$/);
    if (m) return { local: m[1], exported: m[2] };
    // 简写: "foo" → { local: "foo", exported: "foo" }
    if (/^[\w$]+$/.test(s)) return { local: s, exported: s };
    throw new Error(`Cannot parse export entry: "${s}"`);
  });

  // 生成 window.__motionInline 挂载
  const mountLines = pairs.map(p => `  ${p.exported}: ${p.local}`).join(',\n');
  const mount = `window.__motionInline={\n${mountLines}\n};`;

  // 组装 IIFE
  return `(function(){\n${beforeExport}\n${mount}\n})();`;
}

/**
 * 处理单个模板: 找到 motion 加载块, 替换为内联 IIFE
 */
function processTemplate(tplPath, motionIIFE) {
  let html = readFileSync(tplPath, 'utf-8');

  // 找到 <script type="module"> 中的 motion 加载块
  // 块从 "let motion;" 开始, 到 "if(motion){" 之前结束
  const startMarker = 'let motion;';
  const endMarker = 'if(motion){';

  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) throw new Error(`Cannot find "let motion;" in ${tplPath}`);

  const endIdx = html.indexOf(endMarker, startIdx);
  if (endIdx === -1) throw new Error(`Cannot find "if(motion){" after "let motion;" in ${tplPath}`);

  // 找到包含 startMarker 的 <script type="module"> 标签的开始
  const scriptTagEnd = html.lastIndexOf('<script type="module">', startIdx);
  if (scriptTagEnd === -1) throw new Error(`Cannot find <script type="module"> before "let motion;" in ${tplPath}`);
  const scriptTagStart = html.lastIndexOf('<script', scriptTagEnd);

  // 构建替换: 在原 <script type="module"> 前插入 IIFE <script>,
  // 然后把 motion 加载块替换为直接使用 window.__motionInline
  const oldBlock = html.slice(startIdx, endIdx);

  // 新的加载逻辑: 直接用内联的 motion, 保留 CDN fallback
  const newBlock = `let motion;
const __cleanShot = new URLSearchParams(location.search).get('clean')==='1';
if(__cleanShot){
  /* 截图模式: 不加载 motion, 直接 reveal 所有动画元素 */
  document.querySelectorAll('[data-anim]').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
  document.querySelectorAll('[data-animate="pipeline"] [data-anim]').forEach(el=>el.style.opacity='1');
} else {
  /* Motion One 已内联 (IIFE), 不受 file:// CORS 限制 */
  motion = window.__motionInline || null;
  if(!motion){
    /* 兜底: 内联失败时尝试 CDN (http(s):// 场景) */
    try {
      motion = await import('https://cdn.jsdelivr.net/npm/motion@11.11.17/+esm');
    } catch(e) {
      console.warn('[motion] inline + CDN both failed, disabling animations', e);
      document.querySelectorAll('[data-anim]').forEach(el=>{el.style.opacity='1';el.style.transform='none'});
      document.querySelectorAll('[data-animate="pipeline"] [data-anim]').forEach(el=>el.style.opacity='1');
    }
  }
}

`;

  // 在 <script type="module"> 标签前插入 IIFE <script> 标签
  const iifeScript = `<script>\n/* Motion One (IIFE 内联, 解决 file:// 下 import() 被 CORS 阻止的问题) */\n${motionIIFE}\n</script>\n\n`;

  // 替换
  const newHtml = html.slice(0, scriptTagStart) + iifeScript + html.slice(scriptTagStart, startIdx) + newBlock + html.slice(endIdx);

  writeFileSync(tplPath, newHtml, 'utf-8');
  return { oldLen: oldBlock.length, newLen: newBlock.length, htmlLen: newHtml.length };
}

// ===== 主逻辑 =====
console.log('Reading motion.min.js...');
const motionSrc = readFileSync(MOTION_PATH, 'utf-8');
console.log(`  Size: ${(motionSrc.length / 1024).toFixed(1)} KB`);

console.log('Converting ES module to IIFE...');
const motionIIFE = convertESMToIIFE(motionSrc);
console.log(`  IIFE size: ${(motionIIFE.length / 1024).toFixed(1)} KB`);

const targets = process.argv[2]
  ? [`assets/${process.argv[2].replace(/^assets\//, '')}`]
  : TEMPLATES;

for (const tpl of targets) {
  const tplPath = join(ROOT, tpl);
  console.log(`\nProcessing ${tpl}...`);
  try {
    const result = processTemplate(tplPath, motionIIFE);
    console.log(`  ✅ Success! HTML size: ${(result.htmlLen / 1024).toFixed(1)} KB`);
  } catch (e) {
    console.error(`  ❌ ${e.message}`);
  }
}

console.log('\nDone! All templates have motion.min.js inlined.');
