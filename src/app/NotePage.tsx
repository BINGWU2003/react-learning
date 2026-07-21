import { Suspense, useEffect } from "react";
import type { NoteDefinition } from "../notes/types";
import { CodeComparison } from "../shared/components/CodeComparison";

type NotePageProps = {
  note: NoteDefinition;
};

export function NotePage({ note }: NotePageProps) {
  const { Demo } = note;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [note.path]);

  return (
    <article className="note-page">
      <header className="note-header">
        <p className="note-label">{note.label}</p>
        <h1>{note.title}</h1>
        <p className="note-description">{note.description}</p>
      </header>

      <section className="note-section" aria-labelledby="demo-title">
        <div className="section-heading">
          <p>Interactive React example</p>
          <h2 id="demo-title">运行示例</h2>
        </div>
        <div className="note-demo">
          <Suspense fallback={<div className="demo-loading">正在加载示例…</div>}>
            <Demo />
          </Suspense>
        </div>
      </section>

      <CodeComparison react={note.react} vue={note.vue} />
    </article>
  );
}
