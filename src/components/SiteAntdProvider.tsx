import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect, useState, type ReactNode } from "react";
import { getSiteAntdTheme } from "../styles/antdTheme";

type Props = {
  children: ReactNode;
};

export function SiteAntdProvider({ children }: Props) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const syncTheme = () => setIsDark(root.classList.contains("dark"));
    const observer = new MutationObserver(syncTheme);

    syncTheme();
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, []);

  return (
    <ConfigProvider locale={zhCN} theme={getSiteAntdTheme(isDark)}>
      {children}
    </ConfigProvider>
  );
}
