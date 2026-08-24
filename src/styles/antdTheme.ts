import { theme, type ThemeConfig } from "antd";

const shared: ThemeConfig = {
  token: {
    borderRadius: 6,
    controlHeight: 36,
    fontFamily: "inherit",
    boxShadow: "none",
  },
  components: {
    Button: {
      fontWeight: 650,
      primaryShadow: "none",
      defaultShadow: "none",
      dangerShadow: "none",
    },
    Input: {
      activeShadow: "0 0 0 3px rgb(127 127 127 / 16%)",
    },
  },
};

const lightTheme: ThemeConfig = {
  ...shared,
  algorithm: theme.defaultAlgorithm,
  token: {
    ...shared.token,
    colorPrimary: "#18181b",
    colorInfo: "#2563eb",
    colorBgBase: "#ffffff",
    colorBgContainer: "#ffffff",
    colorBgElevated: "#ffffff",
    colorBorder: "#d4d4d8",
    colorBorderSecondary: "#e4e4e7",
    colorText: "#18181b",
    colorTextSecondary: "#71717a",
  },
};

const darkTheme: ThemeConfig = {
  ...shared,
  algorithm: theme.darkAlgorithm,
  token: {
    ...shared.token,
    colorPrimary: "#fafafa",
    colorInfo: "#60a5fa",
    colorBgBase: "#09090b",
    colorBgContainer: "#18181b",
    colorBgElevated: "#18181b",
    colorBorder: "#3f3f46",
    colorBorderSecondary: "#27272a",
    colorText: "#fafafa",
    colorTextSecondary: "#a1a1aa",
  },
};

export function getSiteAntdTheme(isDark: boolean) {
  return isDark ? darkTheme : lightTheme;
}
