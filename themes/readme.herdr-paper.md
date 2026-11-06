# Herdr Paper 主题颜色映射说明

配色来源:**Herdr 内置 `paper` 主题的真实色值**,通过临时 mod 在运行中的 Herdr 窗口执行 `theme()` dump 提取。
base 为 `light`,外观浅。

## Herdr `paper` 原始色板(dump)

| 令牌 | 值 |
| --- | --- |
| `background` | `#ffffff` |
| `canvas` | `#fafaf9` |
| `chrome` | `#f1f1ee` |
| `popover` | `#ffffff` |
| `raised` | `#f6f6f6` |
| `border` | `#00000017` |
| `foreground` | `#1b1b1e` |
| `terminal_foreground` | `#25272c` |
| `muted` | `#69696b` |
| `ring` | `#5f5f62` |
| `accent` | `#1f62d0` |
| `selection` | `#cfdcf5` |
| `working` | `#9a6700` |
| `blocked` | `#c93c2c` |
| `done` | `#2f6fe4` |

ANSI 16 色:`#25272c`, `#c62a2a`, `#1a7f37`, `#8f5d00`, `#1f62d0`, `#7a45c8`, `#0f6f74`, `#5f6068`, `#7b7e87`, `#d1242f`, `#1f883d`, `#9a6700`, `#0969da`, `#8250df`, `#1b7c83`, `#111214`

## 映射规则(与 Herdr Dark Graphite 相同,全部取自运行窗口 `theme()` dump)

- `claude`/`permission`/`suggestion`/`promptBorder` → `accent`
- `text` → `foreground`,`inverseText` → `background`,`inactive` → `muted`,`subtle` → `border`(alpha)合成到背景
- `remember` → `ansi5`,`merged` → `ansi13`,`planMode` → `ansi6`,`fastMode` → `ansi3`
- `success`/`autoAccept` → `ansi2`,`error` → `blocked`,`warning`/`bashBorder`/子代理 orange → `working`,`ide` → `done`
- Diff 六色 = 背景 ⊕ `ansi2`/`ansi1`(α=0.22 / 0.12 / 0.45),公式 `out = bg·(1-α) + top·α`
- `userMessageBackground`/`bash`/`memory` → `popover`,hover → `raised`,侧栏 → `background`(与内容区同色,避免浮层色差),选区 → `selection`
- Shimmer:claude/permission/promptBorder → `ansi12`,success → `ansi10`,error → `ansi9`,warning → `ansi11`,inactive → `ring`
- 子代理:red `ansi9`、blue `ansi12`、green `ansi10`、yellow `ansi11`、purple `ansi5`、pink `ansi13`、cyan `ansi14`、orange `working`

注:paper 为浅色,`border`/`selected` 等是黑色 alpha(`#00000017`),`subtle` 合成后为浅灰。shimmer 取亮 ANSI 色(在浅底上即加深的强调变体)。

