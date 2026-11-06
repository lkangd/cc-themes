# Herdr Atom One Dark 主题颜色映射说明

配色来源:**Herdr 内置 `atom-one-dark` 主题的真实色值**,通过临时 mod 在运行中的 Herdr 窗口执行 `theme()` dump 提取。
base 为 `dark`,外观暗。

## Herdr `atom-one-dark` 原始色板(dump)

| 令牌 | 值 |
| --- | --- |
| `background` | `#21252b` |
| `canvas` | `#1c1f24` |
| `chrome` | `#16191d` |
| `popover` | `#2e3238` |
| `raised` | `#35393e` |
| `border` | `#ffffff18` |
| `foreground` | `#eeeeef` |
| `terminal_foreground` | `#abb2bf` |
| `muted` | `#9c9ea1` |
| `ring` | `#b0b2b4` |
| `accent` | `#61afef` |
| `selection` | `#323844` |
| `working` | `#e5c07b` |
| `blocked` | `#e06c75` |
| `done` | `#61afef` |

ANSI 16 色:`#454c59`, `#e06c75`, `#98c379`, `#e5c07b`, `#61afef`, `#c678dd`, `#56b6c2`, `#abb2bf`, `#767676`, `#e06c75`, `#98c379`, `#e5c07b`, `#61afef`, `#c678dd`, `#56b6c2`, `#abb2bf`

## 映射规则(与 Herdr Dark Graphite 相同,全部取自运行窗口 `theme()` dump)

- `claude`/`permission`/`suggestion`/`promptBorder` → `accent`
- `text` → `foreground`,`inverseText` → `background`,`inactive` → `muted`,`subtle` → `border`(alpha)合成到背景
- `remember` → `ansi5`,`merged` → `ansi13`,`planMode` → `ansi6`,`fastMode` → `ansi3`
- `success`/`autoAccept` → `ansi2`,`error` → `blocked`,`warning`/`bashBorder`/子代理 orange → `working`,`ide` → `done`
- Diff 六色 = 背景 ⊕ `ansi2`/`ansi1`(α=0.22 / 0.12 / 0.45),公式 `out = bg·(1-α) + top·α`
- `userMessageBackground`/`bash`/`memory` → `popover`,hover → `raised`,侧栏 → `chrome`,选区 → `selection`
- Shimmer:claude/permission/promptBorder → `ansi12`,success → `ansi10`,error → `ansi9`,warning → `ansi11`,inactive → `ring`
- 子代理:red `ansi9`、blue `ansi12`、green `ansi10`、yellow `ansi11`、purple `ansi5`、pink `ansi13`、cyan `ansi14`、orange `working`

注:该主题 ansi1–3 与 ansi9–14 同值(Herdr 内置即如此),故部分 shimmer 与基色相同。

