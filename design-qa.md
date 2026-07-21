# Design QA：useCallback 关系总览布局

## 对比证据

- Source visual truth: `C:\Users\LX\AppData\Local\Temp\codex-clipboard-0f97c16a-9000-4966-81f5-4b38648204fe.png`
- Implementation screenshot: `D:\files\hjc-code\react-learning\.design-qa\callback-after-cards.png`
- Combined comparison: `D:\files\hjc-code\react-learning\.design-qa\callback-cards-comparison.png`
- Viewport: 1395 × 663；桌面端、浅色主题、`/callback/`
- State: Mermaid 已渲染；React 与 Vue 关系卡片同时可见
- Full-view evidence: 修改后 `.flow-overview` 与下方 `.framework-comparison` 的实际宽度均为 `1091.2px`，页面 `scrollWidth` 与视口宽度均为 `1395px`，没有横向溢出。
- Focused-region evidence: 两张 `.flow-card` 的 `top` 均为 `363.5px`、高度均为 `430.875px`、宽度均为 `537.6px`；两个 Mermaid SVG 的宽高均为 `480 × 256px`，没有内部横向溢出。

## Findings

- 没有剩余 P0/P1/P2 问题。
- 字体与排版：沿用项目现有字体、字重、字号和行高，没有因本次修复产生换行或层级漂移。
- 间距与布局节奏：已移除第二张流程图卡片继承的相邻 Markdown 上边距；两卡片顶部、底部和高度一致。关系总览已解除 `48rem` 阅读宽度限制，与下方 Demo 双栏同宽。
- 颜色与视觉令牌：React 蓝、Vue 绿、边框、背景和阴影均沿用现有令牌，没有变化。
- 图像与资源质量：Mermaid 仍以矢量 SVG 渲染，缩放清晰，未裁切、未溢出；本次没有引入替代图形或占位资源。
- 文案与内容：标题、关系说明、节点和数据流文案均保持不变。

## Comparison History

1. 初始截图发现 P2：Vue 卡片受 Markdown 相邻元素规则影响向下偏移；关系总览受 `max-width: 48rem` 限制，比下方 Demo 区域窄。
2. 修复：在 `.flow-card` 上显式设置 `margin: 0`；将 `.flow-overview` 从阅读宽度限制选择器中排除。
3. 修复后证据：React/Vue 卡片 `top`、高度一致；总览和 Demo 容器宽度一致；组合对比图显示原红框间隙已消失，双栏扩展到下方卡片相同宽度。

## Interaction And Runtime Checks

- React 源码标签从 `ReactDemo.tsx` 切换到 `ProductList.tsx` 成功，选中状态为 `true`，对应源码面板可见。
- 浏览器控制台 error 数量：0。
- `pnpm build`：通过。
- `pnpm lint`：通过。
- `git diff --check`：通过。

## Follow-up Polish

- 无必要的 P3 跟进项。

final result: passed
