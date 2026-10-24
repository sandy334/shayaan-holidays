/** Image loader for the static GitHub Pages export: serves originals under the base path. */
export default function staticImageLoader({ src }: { src: string; width: number; quality?: number }): string {
  return src.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${src}` : src;
}
