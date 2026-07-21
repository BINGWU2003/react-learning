import styles from "./ReactDemo.module.css";

export function ReactDemo() {
  return (
    <section className={styles.card}>
      <span className={styles.badge}>CSS Modules</span>
      <h2>局部作用域卡片</h2>
      <p>
        JSX 使用 <code>styles.card</code>，构建后生成唯一类名。
      </p>
      <span className={styles.button}>
        仅影响当前组件
      </span>
    </section>
  );
}
