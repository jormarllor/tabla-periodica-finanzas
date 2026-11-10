import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ElementFinancer } from "./elements";
import { aplicaDades, type ClauDada } from "./dades";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "elements");

export interface ElementContent {
  frontmatter: {
    [key: string]: unknown;
  };
  body: string;
  /** Datos vivos (src/lib/dades.ts) que usa la ficha. */
  dades: ClauDada[];
}

export function loadElementContent(element: ElementFinancer): ElementContent | null {
  const filePath = path.join(CONTENT_DIR, `${element.categoria}-${element.slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const { text, claus } = aplicaDades(content);
  return { frontmatter: data, body: text, dades: claus };
}
