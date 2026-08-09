import type { ReactNode } from "react";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { siteAntdTheme } from "../styles/antdTheme";

type Props = {
  children: ReactNode;
};

export function SiteAntdProvider({ children }: Props) {
  return (
    <ConfigProvider locale={zhCN} theme={siteAntdTheme}>
      {children}
    </ConfigProvider>
  );
}
