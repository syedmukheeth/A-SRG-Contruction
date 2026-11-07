import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps {
  href: string;
  variant?: "solid" | "line" | "light";
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}

const styles = {
  solid: "bg-laterite text-plaster hover:bg-laterite-deep",
  line: "border border-ink text-ink hover:bg-ink hover:text-plaster",
  light: "border border-plaster/60 text-plaster hover:bg-plaster hover:text-ink",
} as const;

export function Button({ href, variant = "solid", external, className, children }: ButtonProps) {
  const cls = cn(
    "group inline-flex items-center gap-3 px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-200",
    styles[variant],
    className,
  );
  const arrow = (
    <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
      →
    </span>
  );

  if (external || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("http")) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
        {arrow}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
      {arrow}
    </Link>
  );
}
