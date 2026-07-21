import { componentCommunicationNote } from "./component-communication/note";
import { contextNote } from "./context/note";
import { cssModulesNote } from "./css-modules/note";
import { derivedStateNote } from "./derived-state/note";
import { dynamicStylesNote } from "./dynamic-styles/note";
import { refNote } from "./ref/note";
import { stateNote } from "./state/note";
import type { NoteDefinition } from "./types";

export const noteRoutes: NoteDefinition[] = [
  componentCommunicationNote,
  contextNote,
  refNote,
  stateNote,
  derivedStateNote,
  cssModulesNote,
  dynamicStylesNote,
];
