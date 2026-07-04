import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { ElementFinancer } from "./elements";

const CONTENT_DIR = path.join(process.cwd(), "src", "content", "elements");

export interface ElementContent {
  frontmatter: {
    [key: string]: unknown;
  };
  body: string;
}

export function loadElementContent(element: ElementFinancer): ElementContent | null {
  const filePath = path.join(CONTENT_DIR, `${element.categoria}-${element.slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return { frontmatter: data, body: content };
}
