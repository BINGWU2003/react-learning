import { ConfigProvider, theme as antdTheme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useSyncExternalStore, type ReactNode } from "react";
import type { ThemeConfig } from "antd";

const lightTheme: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
};

const darkTheme: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
};

function subscribeTheme(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  return () => observer.disconnect();
}

function getThemeSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerThemeSnapshot() {
  return false;
}

type Props = {
  children: ReactNode;
};

export function SiteAntdProvider({ children }: Props) {
  const isDark = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  return (
    <ConfigProvider locale={zhCN} theme={isDark ? darkTheme : lightTheme}>
      {children}
    </ConfigProvider>
  );
}
