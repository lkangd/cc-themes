# Catppuccin Mocha 主题颜色映射说明

色值取自 [Catppuccin](https://github.com/catppuccin/catppuccin) 的 Mocha 调色板。强调色用 Mauve（Catppuccin 的默认强调色），Claude 品牌色用 Peach，贴近 Claude 原本的橙色。

| 类别          | 令牌                         | Mocha 颜色             | 说明                         |
| ------------- | ---------------------------- | ---------------------- | ---------------------------- |
| **品牌/强调** | `claude`                     | `#fab387` Peach        | 主品牌色，微调器和助手标签   |
|               | `permission`                 | `#cba6f7` Mauve        | 对话框边框                   |
|               | `suggestion`                 | `#cba6f7` Mauve        | 菜单选中项、建议与插件高亮   |
|               | `remember`                   | `#b4befe` Lavender     | 内存和 CLAUDE.md 指示器      |
| **文本**      | `text`                       | `#cdd6f4` Text         | 默认前景文本                 |
|               | `inverseText`                | `#1e1e2e` Base         | 彩色背景上的文本             |
|               | `inactive`                   | `#7f849c` Overlay 1    | 次要文本（插件的 dimColor）  |
|               | `subtle`                     | `#585b70` Surface 2    | 淡色边框                     |
| **状态**      | `success`                    | `#a6e3a1` Green        | 成功消息                     |
|               | `error`                      | `#f38ba8` Red          | 错误消息                     |
|               | `warning`                    | `#fab387` Peach        | 警告消息                     |
|               | `merged`                     | `#cba6f7` Mauve        | 合并 PR 状态                 |
| **输入/模式** | `promptBorder`               | `#cba6f7` Mauve        | 输入框边框                   |
|               | `planMode`                   | `#94e2d5` Teal         | Plan Mode                    |
|               | `autoAccept`                 | `#a6e3a1` Green        | 自动接受模式                 |
|               | `bashBorder`                 | `#f5c2e7` Pink         | Shell 命令边框               |
|               | `ide`                        | `#89b4fa` Blue         | IDE 指示                     |
|               | `fastMode`                   | `#f9e2af` Yellow       | 快速模式                     |
| **Diff**      | `diffAdded/Removed` 等       | Green/Red 混入 Base    | 25%、12%（Dimmed）、45%（Word） |
| **全屏**      | `userMessageBackground`      | `#313244` Surface 0    | 用户消息背景                 |
|               | `userMessageBackgroundHover` | `#45475a` Surface 1    | 用户消息悬停背景             |
|               | `composerSidebarBackground`  | `#181825` Mantle       | 右侧停靠栏（插件 Pane）背景  |
|               | `bashMessageBackgroundColor` | `#313244` Surface 0    | Shell 命令消息背景           |
|               | `memoryBackgroundColor`      | `#313244` Surface 0    | 记忆消息背景                 |
|               | `selectionBg`                | `#585b70` Surface 2    | 选择文本背景                 |

shimmer 变体是对应颜色混入 30% 白色；8 个子代理颜色取 Red、Blue、Green、Yellow、Mauve、Peach、Pink、Sky。base 为 `dark`。

终端也用 Catppuccin Mocha（底色 `#1e1e2e` Base）时最协调：停靠栏用 Mantle，比终端略深一档，与 Catppuccin 各编辑器移植里侧栏的做法一致。
