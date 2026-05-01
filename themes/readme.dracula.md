# Dracula 主题颜色映射说明

| 类别          | 令牌                    | Dracula 颜色           | 说明                       |
| ------------- | ----------------------- | ---------------------- | -------------------------- |
| **品牌/强调** | `claude`                | `#bd93f9` Purple       | 主品牌色，微调器和助手标签 |
|               | `permission`            | `#bd93f9` Purple       | 对话框边框                 |
|               | `remember`              | `#8be9fd` Cyan         | 内存和 CLAUDE.md 指示器    |
| **文本**      | `text`                  | `#f8f8f2` Foreground   | 默认前景文本               |
|               | `inverseText`           | `#282a36` Background   | 彩色背景上的文本           |
|               | `inactive`              | `#6272a4` Comment      | 次要文本                   |
|               | `subtle`                | `#44475a` Current Line | 淡色边框                   |
| **状态**      | `success`               | `#50fa7b` Green        | 成功消息                   |
|               | `error`                 | `#ff5555` Red          | 错误消息                   |
|               | `warning`               | `#ffb86c` Orange       | 警告消息                   |
|               | `merged`                | `#ff79c6` Pink         | 合并 PR 状态               |
| **输入/模式** | `promptBorder`          | `#bd93f9` Purple       | 输入框边框                 |
|               | `planMode`              | `#8be9fd` Cyan         | Plan Mode                  |
|               | `autoAccept`            | `#50fa7b` Green        | 自动接受模式               |
|               | `bashBorder`            | `#ffb86c` Orange       | Shell 命令边框             |
|               | `fastMode`              | `#f1fa8c` Yellow       | 快速模式                   |
| **Diff**      | `diffAdded/Removed`     | 绿/红色调背景          | 基于 Dracula 背景色调      |
| **全屏**      | `userMessageBackground` | `#2d2f42`              | 用户消息背景               |
|               | `selectionBg`           | `#44475a`              | 选择文本背景               |

同时配置了 shimmer 动画变体和全部 8 个子代理颜色。base 为 `dark`，因为 dracula 使用的是十六进制颜色值而非 ANSI 颜色。
