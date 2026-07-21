import { Highlight, themes } from "prism-react-renderer";
import type { CodeSample } from "../../notes/types";
import styles from "./CodeComparison.module.css";

type CodePanelProps = {
  framework: "React" | "Vue 3";
  sample: CodeSample;
  tone: "react" | "vue";
};

type CodeComparisonProps = {
  react: CodeSample;
  vue: CodeSample;
};

function CodePanel({ framework, sample, tone }: CodePanelProps) {
  return (
    <section className={`${styles.panel} ${styles[tone]}`}>
      <header className={styles.panelHeader}>
        <div>
          <strong>{framework}</strong>
          <span>{sample.fileName}</span>
        </div>
        <small>{sample.language}</small>
      </header>
      <Highlight
        theme={themes.vsDark}
        code={sample.code.trim()}
        language={sample.syntax}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`${className} ${styles.codeBlock}`}
            style={{ ...style, background: "transparent" }}
            tabIndex={0}
          >
            <code>
              {tokens.map((line, lineIndex) => (
                <span
                  key={`line-${lineIndex}`}
                  {...getLineProps({ line })}
                  className={styles.line}
                >
                  <span className={styles.lineNumber} aria-hidden="true">
                    {lineIndex + 1}
                  </span>
                  <span className={styles.lineContent}>
                    {line.map((token, tokenIndex) => (
                      <span
                        key={`token-${lineIndex}-${tokenIndex}`}
                        {...getTokenProps({ token })}
                      />
                    ))}
                  </span>
                </span>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </section>
  );
}

export function CodeComparison({ react, vue }: CodeComparisonProps) {
  return (
    <section className={styles.comparison} aria-labelledby="code-comparison-title">
      <div className={styles.heading}>
        <p>Same feature, different mental model</p>
        <h2 id="code-comparison-title">React / Vue 代码对比</h2>
      </div>
      <div className={styles.grid}>
        <CodePanel framework="React" sample={react} tone="react" />
        <CodePanel framework="Vue 3" sample={vue} tone="vue" />
      </div>
    </section>
  );
}
