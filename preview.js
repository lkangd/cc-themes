const MANIFEST_PATH = "themes/index.json";
const REFRESH_INTERVAL_MS = 1500;

const FALLBACK_THEMES = [
  {
    id: "dracula",
    name: "Dracula",
    path: "themes/dracula.json",
    theme: {
      name: "Dracula",
      base: "dark",
      overrides: {
        claude: "#bd93f9",
        text: "#f8f8f2",
        inverseText: "#282a36",
        inactive: "#6272a4",
        subtle: "#44475a",
        permission: "#bd93f9",
        remember: "#8be9fd",
        success: "#50fa7b",
        error: "#ff5555",
        warning: "#ffb86c",
        merged: "#ff79c6",
        promptBorder: "#bd93f9",
        planMode: "#8be9fd",
        autoAccept: "#50fa7b",
        bashBorder: "#ffb86c",
        ide: "#8be9fd",
        fastMode: "#f1fa8c",
        diffAdded: "#1b3525",
        diffRemoved: "#3d1f2e",
        userMessageBackground: "#2d2f42",
        selectionBg: "#44475a"
      }
    }
  }
];

const TOKEN_USAGE = {
  claude: "品牌强调、助手标签、主视觉点。",
  text: "默认前景文本。",
  inverseText: "彩色背景上的反相文本。",
  inactive: "次要文本和弱提示。",
  subtle: "分隔线、选择背景、次级块面。",
  permission: "权限提示和确认框边框。",
  remember: "记忆提示、CLAUDE.md 指示器。",
  success: "成功反馈。",
  error: "错误信息和失败状态。",
  warning: "警告信息。",
  merged: "合并状态和里程碑提示。",
  promptBorder: "输入框焦点边框。",
  planMode: "Plan Mode 状态。",
  autoAccept: "自动接受模式。",
  bashBorder: "Shell 命令容器边框。",
  ide: "IDE 连接状态。",
  fastMode: "快速模式。",
  diffAdded: "Diff 新增行背景。",
  diffRemoved: "Diff 删除行背景。",
  diffAddedDimmed: "Diff 新增弱背景。",
  diffRemovedDimmed: "Diff 删除弱背景。",
  diffAddedWord: "Diff 新增词背景。",
  diffRemovedWord: "Diff 删除词背景。",
  userMessageBackground: "用户消息背景。",
  selectionBg: "选择文本背景。"
};

const CSS_TOKEN_MAP = {
  text: "--theme-fg",
  inverseText: "--theme-bg",
  inactive: "--theme-comment",
  subtle: "--theme-current",
  claude: "--theme-accent",
  permission: "--theme-accent",
  remember: "--theme-remember",
  planMode: "--theme-remember",
  ide: "--theme-remember",
  success: "--theme-success",
  autoAccept: "--theme-success",
  warning: "--theme-warning",
  bashBorder: "--theme-bash-border",
  merged: "--theme-merged",
  error: "--theme-error",
  fastMode: "--theme-fast",
  userMessageBackground: "--theme-user",
  diffAdded: "--theme-diff-added",
  diffRemoved: "--theme-diff-removed",
  promptBorder: "--theme-prompt-border"
};

const state = {
  themes: [],
  selectedId: "",
  lastManifestRaw: "",
  lastRawByPath: new Map(),
  timer: null,
  usingFallback: false
};

const elements = {
  select: document.querySelector("#themeSelect"),
  palette: document.querySelector("#palette"),
  syncDot: document.querySelector("#syncDot"),
  syncStatus: document.querySelector("#syncStatus"),
  runtimeHint: document.querySelector("#runtimeHint"),
  updatedAt: document.querySelector("#updatedAt"),
  themePath: document.querySelector("#themePath"),
  themePathInline: document.querySelector("#themePathInline")
};

document.addEventListener("DOMContentLoaded", init);
document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    refreshManifestAndTheme();
  }
});

async function init() {
  state.themes = await loadManifest({ fallbackOnError: true });
  renderThemeOptions();
  elements.select.addEventListener("change", handleThemeChange);

  const initialTheme = state.themes[0];
  if (initialTheme) {
    elements.select.value = initialTheme.id;
    state.selectedId = initialTheme.id;
    await refreshSelectedTheme();
    state.timer = window.setInterval(refreshManifestAndTheme, REFRESH_INTERVAL_MS);
  }
}

async function loadManifest({ fallbackOnError } = { fallbackOnError: false }) {
  try {
    const raw = await fetchText(MANIFEST_PATH);
    const manifest = JSON.parse(raw);
    if (!Array.isArray(manifest) || manifest.length === 0) {
      throw new Error("Theme manifest is empty.");
    }

    state.lastManifestRaw = raw;
    state.usingFallback = false;
    return manifest;
  } catch (error) {
    if (!fallbackOnError) {
      throw error;
    }

    state.usingFallback = true;
    setSyncState("error", "无法实时读取主题列表，正在使用内置 Dracula 预览。");
    return FALLBACK_THEMES;
  }
}

function renderThemeOptions() {
  elements.select.innerHTML = "";

  for (const theme of state.themes) {
    const option = document.createElement("option");
    option.value = theme.id;
    option.textContent = theme.name;
    elements.select.append(option);
  }

  elements.select.disabled = state.themes.length === 0;
}

async function refreshManifestAndTheme() {
  if (!state.usingFallback) {
    await refreshManifest();
  }

  await refreshSelectedTheme();
}

async function refreshManifest() {
  try {
    const raw = await fetchText(MANIFEST_PATH);
    if (raw === state.lastManifestRaw) {
      return;
    }

    const nextThemes = JSON.parse(raw);
    if (!Array.isArray(nextThemes) || nextThemes.length === 0) {
      throw new Error("Theme manifest is empty.");
    }

    const selectedStillExists = nextThemes.some((theme) => theme.id === state.selectedId);
    state.themes = nextThemes;
    state.lastManifestRaw = raw;
    state.selectedId = selectedStillExists ? state.selectedId : nextThemes[0].id;
    renderThemeOptions();
    elements.select.value = state.selectedId;
  } catch (error) {
    setSyncState("error", `主题列表读取失败：${error.message}`);
  }
}

async function handleThemeChange(event) {
  state.selectedId = event.target.value;
  state.lastRawByPath.clear();
  await refreshSelectedTheme();
}

async function refreshSelectedTheme() {
  const themeEntry = state.themes.find((theme) => theme.id === state.selectedId) ?? state.themes[0];
  if (!themeEntry) {
    return;
  }

  try {
    const { theme, raw } = await loadTheme(themeEntry);
    const previousRaw = state.lastRawByPath.get(themeEntry.path);

    if (previousRaw !== raw) {
      applyTheme(theme, themeEntry);
      state.lastRawByPath.set(themeEntry.path, raw);
    }

    if (state.usingFallback) {
      setSyncState("error", "当前为内置预览；通过本地服务打开后可实时读取 JSON。");
    } else {
      setSyncState("live", `已同步 ${theme.name ?? themeEntry.name}`);
    }
  } catch (error) {
    const fallback = themeEntry.theme ?? FALLBACK_THEMES[0].theme;
    applyTheme(fallback, themeEntry);
    setSyncState("error", `读取失败：${error.message}`);
  }
}

async function loadTheme(themeEntry) {
  if (state.usingFallback && themeEntry.theme) {
    return {
      theme: themeEntry.theme,
      raw: JSON.stringify(themeEntry.theme)
    };
  }

  const raw = await fetchText(themeEntry.path);
  return {
    theme: JSON.parse(raw),
    raw
  };
}

async function fetchText(path) {
  const response = await fetch(`${path}?t=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}`);
  }
  return response.text();
}

function applyTheme(theme, themeEntry) {
  const overrides = theme.overrides ?? {};
  const root = document.documentElement;

  for (const [token, cssVariable] of Object.entries(CSS_TOKEN_MAP)) {
    if (overrides[token]) {
      root.style.setProperty(cssVariable, overrides[token]);
    }
  }

  updateThemeFields(theme, themeEntry, overrides);
  renderPalette(overrides);
}

function updateThemeFields(theme, themeEntry, overrides) {
  document.querySelectorAll("[data-theme-field]").forEach((node) => {
    const field = node.dataset.themeField;
    node.textContent = theme[field] ?? themeEntry[field] ?? "-";
  });

  document.querySelectorAll("[data-token-text]").forEach((node) => {
    const token = node.dataset.tokenText;
    node.textContent = overrides[token] ?? "-";
  });

  elements.themePath.textContent = themeEntry.path;
  elements.themePathInline.textContent = themeEntry.path;
  elements.updatedAt.textContent = new Date().toLocaleTimeString("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });
}

function renderPalette(overrides) {
  elements.palette.innerHTML = "";

  Object.entries(overrides).forEach(([token, color]) => {
    if (token.endsWith("_FOR_SUBAGENTS_ONLY")) {
      return;
    }

    const swatch = document.createElement("article");
    swatch.className = "swatch";
    swatch.innerHTML = `
      <div class="chip" style="background: ${escapeAttribute(color)}"></div>
      <div>
        <strong>${escapeHtml(token)}</strong>
        <span>${escapeHtml(color)}</span>
        <div class="usage">${escapeHtml(TOKEN_USAGE[token] ?? "来自主题 overrides 的颜色令牌。")}</div>
      </div>
    `;
    elements.palette.append(swatch);
  });
}

function setSyncState(type, message) {
  elements.syncDot.classList.toggle("is-live", type === "live");
  elements.syncDot.classList.toggle("is-error", type === "error");
  elements.syncStatus.textContent = message;
  elements.runtimeHint.hidden = type === "live";
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
