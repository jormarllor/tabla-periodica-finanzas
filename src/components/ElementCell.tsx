import Link from "next/link";
import type { CSSProperties } from "react";
import { CATEGORIES, type ElementFinancer } from "@/lib/elements";

interface Props {
  element: ElementFinancer;
  style?: CSSProperties;
  fluid?: boolean;
}

function symbolLen(s: string): "short" | "medium" | "long" {
  const longestWord = s.split(/\s+/).reduce((m, w) => Math.max(m, w.length), 0);
  if (longestWord > 9) return "long";
  if (longestWord > 5) return "medium";
  return "short";
}

export default function ElementCell({ element, style, fluid }: Props) {
  const color = CATEGORIES[element.categoria].color;
  const len = symbolLen(element.simbol);
  const multi = /\s/.test(element.simbol);
  return (
    <Link
      href={`/${element.categoria}/${element.slug}`}
      className={fluid ? "pt-cell pt-fluid" : "pt-cell"}
      style={{ background: color, ...style }}
    >
      <span className="pt-number">{element.id}</span>
      <span className="pt-symbol" data-len={len} data-multi={multi}>
        {element.simbol}
      </span>
      <span className="pt-name">{element.nom}</span>
    </Link>
  );
}
