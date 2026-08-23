import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

type Props = {
  title: string;
  lang: string;
  code: string;
};

export function SourceCodeBlock({ title, lang, code }: Props) {
  return (
    <DynamicCodeBlock
      lang={lang}
      code={code}
      codeblock={{
        title,
        viewportProps: { "aria-label": title },
      }}
    />
  );
}
