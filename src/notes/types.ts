import type { ComponentType } from "react";
import type { Language } from "prism-react-renderer";

export type CodeSample = {
  fileName: string;
  language: string;
  syntax: Language;
  code: string;
};

export type NoteDefinition = {
  path: string;
  title: string;
  label: string;
  description: string;
  keywords: string[];
  Demo: ComponentType;
  react: CodeSample;
  vue: CodeSample;
};
