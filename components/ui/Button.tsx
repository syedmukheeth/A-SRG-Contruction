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
  solid: "bg-laterite text-plaster before:bg-laterite-deep",
  line: "border border-ink text-ink before:bg-ink hover:text-plaster",
  light: "border border-plaster/60 text-plaster before:bg-plaster hover:text-ink",
} as const;

export function Button({ href, variant = "solid", external, className, children }: ButtonProps) {
  const cls = cn(
    "group relative isolate inline-flex items-center gap-3 overflow-hidden px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.08em] transition-colors duration-300",
    "before:absolute before:inset-0 before:-z-10 before:origin-left before:scale-x-0 before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:scale-x-100 focus-visible:before:scale-x-100",
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
