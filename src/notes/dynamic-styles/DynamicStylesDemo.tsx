import type { CSSProperties } from "react";
import { Select } from "antd";
import styles from "./DynamicStylesDemo.module.css";

type DynamicStylesCardProps = {
  title: string;
  description: string;
  accentColor: string;
  borderColor: string;
  selectBg: string;
  radius: number;
  defaultValue: string;
  options: { value: string; label: string }[];
};

type DynamicStyle = CSSProperties & {
  "--card-accent": string;
  "--select-border": string;
  "--select-bg": string;
  "--select-radius": string;
};

const DynamicStylesCard = ({
  title,
  description,
  accentColor,
  borderColor,
  selectBg,
  radius,
  defaultValue,
  options,
}: DynamicStylesCardProps) => {
  const dynamicStyle: DynamicStyle = {
    "--card-accent": accentColor,
    "--select-border": borderColor,
    "--select-bg": selectBg,
    "--select-radius": `${radius}px`,
  };

  return (
    <section className={styles.page} style={dynamicStyle}>
      <h2>{title}</h2>
      <p>{description}</p>
      <Select defaultValue={defaultValue} options={options} />
    </section>
  );
};

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
];

export function DynamicStylesDemo() {
  return (
    <div className="demo-grid">
      <DynamicStylesCard
        title="动态组件 A"
        description="props 传入蓝色背景和 24px 圆角。"
        accentColor="#0958d9"
        borderColor="#1677ff"
        selectBg="#d6eaff"
        radius={24}
        defaultValue="react"
        options={options}
      />
      <DynamicStylesCard
        title="动态组件 B"
        description="props 传入紫色背景和 8px 圆角。"
        accentColor="#531dab"
        borderColor="#9254de"
        selectBg="#f3e8ff"
        radius={8}
        defaultValue="vue"
        options={options}
      />
    </div>
  );
}
