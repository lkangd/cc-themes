# Herdr Dark Graphite 主题颜色映射说明

配色来源:**Herdr 内置 `graphite` 主题的真实色值**,通过临时 mod 在运行中的
Herdr 窗口执行 `theme()` dump 提取(非人工设计值)。

## Herdr graphite 原始色板(dump 结果)

| 令牌 | 值 | 令牌 | 值 |
| --- | --- | --- | --- |
| `background`/`surface` | `#17191d` | `accent`/`ansi4` | `#96b2d7` |
| `canvas` | `#131518` | `ansi12` | `#b0cbef` |
| `chrome` | `#101114` | `ansi2` | `#a6bd91` |
| `popover` | `#25272b` | `ansi10` | `#bad5a2` |
| `raised` | `#2c2e31` | `ansi1` | `#dc8c95` |
| `border` | `#ffffff18`(alpha) | `ansi9` | `#f0a5ad` |
| `selected` | `#ffffff17`(alpha) | `ansi3`/`ansi11` | `#d8be87` / `#ead2a1` |
| `input` | `#ffffff24`(alpha) | `working` | `#e5c07b` |
| `foreground` | `#eeeeef` | `blocked` | `#f0705f` |
| `terminal_foreground`/`ansi7` | `#d2d4d9` | `done` | `#76a8ff` |
| `muted` | `#98999b` | `ansi6`/`ansi14` | `#8cbdc3` / `#a4d5db` |
| `ring` | `#adaeb0` | `ansi5`/`ansi13` | `#b5a2ce` / `#cbb7e6` |
| `selection` | `#394454` | `dim`/`idle`/`unknown` | `#696a6d` |

## Claude Code 令牌映射

| 类别          | 令牌                    | Graphite 颜色 | 来源                                   |
| ------------- | ----------------------- | ------------- | -------------------------------------- |
| **品牌/强调** | `claude`                | `#96b2d7`     | `accent`                               |
|               | `permission`            | `#96b2d7`     | `accent`(同 Dracula/Catppuccin 惯例) |
|               | `remember`              | `#b5a2ce`     | `ansi5`                                |
|               | `suggestion`            | `#96b2d7`     | `accent`                               |
| **文本**      | `text`                  | `#eeeeef`     | `foreground`                           |
|               | `inverseText`           | `#17191d`     | `background`                           |
|               | `inactive`              | `#98999b`     | `muted`                                |
|               | `subtle`                | `#2d2f32`     | `border #ffffff18` 以 α=24/255 合成到 `#17191d` 上的结果 |
| **状态**      | `success`               | `#a6bd91`     | `ansi2`(绿)                          |
|               | `error`                 | `#f0705f`     | `blocked`                              |
|               | `warning`               | `#e5c07b`     | `working`(琥珀)                      |
|               | `merged`                | `#cbb7e6`     | `ansi13`                               |
| **输入/模式** | `promptBorder`          | `#96b2d7`     | `accent`                               |
|               | `planMode`              | `#8cbdc3`     | `ansi6`(青)                          |
|               | `autoAccept`            | `#a6bd91`     | `ansi2`                                |
|               | `bashBorder`            | `#e5c07b`     | `working`(同 Dracula 用警示色)       |
|               | `ide`                   | `#76a8ff`     | `done`(蓝,与 accent 区分)           |
|               | `fastMode`              | `#d8be87`     | `ansi3`(黄)                          |
| **Diff**      | `diffAdded`             | `#363d37`     | `#17191d` ⊕ `ansi2` @ α=0.22           |
|               | `diffRemoved`           | `#423237`     | `#17191d` ⊕ `ansi1` @ α=0.22           |
|               | `diffAddedDimmed`       | `#282d2b`     | `#17191d` ⊕ `ansi2` @ α=0.12           |
|               | `diffRemovedDimmed`     | `#2f272b`     | `#17191d` ⊕ `ansi1` @ α=0.12           |
|               | `diffAddedWord`         | `#576351`     | `#17191d` ⊕ `ansi2` @ α=0.45           |
|               | `diffRemovedWord`       | `#704d53`     | `#17191d` ⊕ `ansi1` @ α=0.45           |
| **全屏**      | `userMessageBackground` | `#25272b`     | `popover`(背景之上的浮层)            |
|               | `userMessageBackgroundHover` | `#2c2e31` | `raised`                              |
|               | `composerSidebarBackground` | `#101114` | `chrome`(Herdr 侧栏/栏的真实底色)    |
|               | `bashMessageBackgroundColor` | `#25272b` | `popover`                             |
|               | `memoryBackgroundColor` | `#25272b`     | `popover`                              |
|               | `selectionBg`           | `#394454`     | `selection`(终端选区原色)            |

## Shimmer(提亮变体,全部取自亮 ANSI 色)

`claudeShimmer`/`permissionShimmer`/`promptBorderShimmer` → `#b0cbef`(`ansi12`),
`successShimmer` → `#bad5a2`(`ansi10`),`errorShimmer` → `#f0a5ad`(`ansi9`),
`warningShimmer` → `#ead2a1`(`ansi11`),`inactiveShimmer` → `#adaeb0`(`ring`)。

## 子代理颜色(全部取自 graphite 原值)

red `#f0a5ad`(`ansi9`)、blue `#b0cbef`(`ansi12`)、green `#bad5a2`(`ansi10`)、
yellow `#ead2a1`(`ansi11`)、purple `#b5a2ce`(`ansi5`)、pink `#cbb7e6`(`ansi13`)、
cyan `#a4d5db`(`ansi14`)、orange `#e5c07b`(`working`;graphite 无橙色,取其琥珀)。

## 派生说明

仅两类值不是原样取自 graphite:①`subtle` 与 diff 六色是 alpha 合成/混色,公式
`out = bg·(1-α) + top·α`,基色固定为 `background #17191d`,系数已在表中标注;
②graphite 缺少橙色与粉色系子代理色,分别以 `working` 琥珀和 `ansi13` 亮紫代替。
base 为 `dark`,因为使用十六进制颜色值而非 ANSI 颜色。
