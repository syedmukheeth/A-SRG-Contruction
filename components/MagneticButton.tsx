"use client";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  children: React.ReactNode;
}

/**
 * Magnetic CTA. Primary = filled copper; ghost = hairline outline.
 */
export function MagneticButton({
  href = "#",
  variant = "primary",
  className,
  children,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLAnchorElement>({ strength: 0.5 });

  return (
    <a
      ref={ref}
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] transition-colors duration-500 will-change-transform",
        variant === "primary"
          ? "bg-copper text-ink"
          : "border border-text/25 text-text hover:text-ink",
        className,
      )}
    >
      {/* fill sweep */}
      <span
        className={cn(
          "absolute inset-0 z-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100",
          variant === "primary" ? "bg-text" : "bg-copper",
        )}
      />
      <span className="relative z-10">{children}</span>
      <span className="relative z-10 inline-block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
        →
      </span>
    </a>
  );
}
