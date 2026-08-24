import {
  CodeBlockTab,
  CodeBlockTabs,
  CodeBlockTabsList,
  CodeBlockTabsTrigger,
} from "fumadocs-ui/components/codeblock";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

export type SourceCodeFile = {
  title: string;
  lang: string;
  code: string;
};

type Props = {
  label: string;
  files: SourceCodeFile[];
};

export function SourceCodeTabs({ label, files }: Props) {
  const firstFile = files[0];

  if (!firstFile) return null;

  return (
    <CodeBlockTabs defaultValue={firstFile.title} aria-label={label}>
      <CodeBlockTabsList aria-label={`${label}文件`}>
        {files.map((file) => (
          <CodeBlockTabsTrigger key={file.title} value={file.title}>
            {file.title}
          </CodeBlockTabsTrigger>
        ))}
      </CodeBlockTabsList>

      {files.map((file) => (
        <CodeBlockTab key={file.title} value={file.title}>
          <DynamicCodeBlock
            lang={file.lang}
            code={file.code}
            codeblock={{
              viewportProps: { "aria-label": file.title },
            }}
          />
        </CodeBlockTab>
      ))}
    </CodeBlockTabs>
  );
}
