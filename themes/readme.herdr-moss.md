# Herdr Moss 主题颜色映射说明

配色来源:**Herdr 内置 `moss` 主题的真实色值**,通过临时 mod 在运行中的 Herdr 窗口执行 `theme()` dump 提取。
base 为 `dark`,外观暗。

## Herdr `moss` 原始色板(dump)

| 令牌 | 值 |
| --- | --- |
| `background` | `#151c19` |
| `canvas` | `#121815` |
| `chrome` | `#0e1311` |
| `popover` | `#232a27` |
| `raised` | `#2a302e` |
| `border` | `#ffffff18` |
| `foreground` | `#eeeeef` |
| `terminal_foreground` | `#cdd7ce` |
| `muted` | `#979a99` |
| `ring` | `#adafaf` |
| `accent` | `#99b9cd` |
| `selection` | `#354a40` |
| `working` | `#e5c07b` |
| `blocked` | `#f0705f` |
| `done` | `#76a8ff` |

ANSI 16 色:`#435248`, `#df978d`, `#a0c4a2`, `#d4bc8b`, `#99b9cd`, `#bba4c8`, `#8bbdb5`, `#cdd7ce`, `#82968a`, `#f1afa3`, `#b8dab9`, `#e9d2a5`, `#b1d0e2`, `#d1bddc`, `#a4d6ca`, `#eff5ee`

## 映射规则(与 Herdr Dark Graphite 相同,全部取自运行窗口 `theme()` dump)

- `claude`/`permission`/`suggestion`/`promptBorder` → `accent`
- `text` → `foreground`,`inverseText` → `background`,`inactive` → `muted`,`subtle` → `border`(alpha)合成到背景
- `remember` → `ansi5`,`merged` → `ansi13`,`planMode` → `ansi6`,`fastMode` → `ansi3`
- `success`/`autoAccept` → `ansi2`,`error` → `blocked`,`warning`/`bashBorder`/子代理 orange → `working`,`ide` → `done`
- Diff 六色 = 背景 ⊕ `ansi2`/`ansi1`(α=0.22 / 0.12 / 0.45),公式 `out = bg·(1-α) + top·α`
- `userMessageBackground`/`bash`/`memory` → `popover`,hover → `raised`,侧栏 → `background`(与内容区同色,避免浮层色差),选区 → `selection`
- Shimmer:claude/permission/promptBorder → `ansi12`,success → `ansi10`,error → `ansi9`,warning → `ansi11`,inactive → `ring`
- 子代理:red `ansi9`、blue `ansi12`、green `ansi10`、yellow `ansi11`、purple `ansi5`、pink `ansi13`、cyan `ansi14`、orange `working`

