import Link from "next/link";

interface PageHeaderProps {
  crumbs: { label: string; href?: string }[];
  marker: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}

/** Subpage opener: breadcrumb, marker, condensed headline, intro. */
export function PageHeader({ crumbs, marker, title, children }: PageHeaderProps) {
  return (
    <header className="border-b border-rule px-5 pb-16 pt-32 md:px-10 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-[1280px]">
        <nav aria-label="Breadcrumb" className="mb-10">
          <ol className="stamp flex flex-wrap items-center gap-2">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {i > 0 && <span aria-hidden>/</span>}
                {c.href ? (
                  <Link href={c.href} className="hover:text-laterite-deep">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="marker mb-6">{marker}</p>
        <h1 className="font-display max-w-[16ch] text-display text-ink">{title}</h1>
        {children && (
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-relaxed text-ink-soft">{children}</div>
        )}
      </div>
    </header>
  );
}
