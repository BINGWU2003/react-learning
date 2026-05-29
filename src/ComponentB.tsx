import { Select } from "antd";
import styles from "./ComponentB.module.css";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "solid", label: "Solid" },
];

export const ComponentB = () => (
  <section className={styles.page}>
    <h2>B 组件</h2>
    <p>
      本文件里也写的是 <code>.page :global(.ant-select-content)</code>。
    </p>
    <Select defaultValue="react" options={options} />
  </section>
);
