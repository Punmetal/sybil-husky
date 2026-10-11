import styles from "./site.module.css";

/** Map readable component classes into the shared, scoped CSS module. */
export function css(names: string) {
  return names
    .split(/\s+/)
    .filter(Boolean)
    .map((name) => styles[name] || name)
    .join(" ");
}
