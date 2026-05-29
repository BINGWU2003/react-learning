import { Select } from "antd";
import styles from "./ComponentA.module.css";

const options = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "orange", label: "Orange" },
];

export const ComponentA = () => (
  <section className={styles.page}>
    <h2>A 组件</h2>
    <p>
      本文件里写的是 <code>.page :global(.ant-select-content)</code>。
    </p>
    <Select defaultValue="apple" options={options} />
  </section>
);
