import type { CSSProperties } from "react";
import { Select } from "antd";
import styles from "./DynamicSelectCard.module.css";

type DynamicSelectCardProps = {
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

export const DynamicSelectCard = ({
  title,
  description,
  accentColor,
  borderColor,
  selectBg,
  radius,
  defaultValue,
  options,
}: DynamicSelectCardProps) => {
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
