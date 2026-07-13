import Link from "next/link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <p className="eyebrow relative mb-6">404</p>
      <h1 className="relative font-display text-giant uppercase leading-[0.9] text-text">
        Nothing built
        <br />
        <span className="text-copper">here yet.</span>
      </h1>
      <p className="relative mt-8 max-w-md text-muted">
        That page doesn&apos;t exist. Head back to {site.name}&apos;s homepage,
        or browse what we build.
      </p>
      <div className="relative mt-10 flex flex-col items-center gap-5 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-copper px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:bg-text"
        >
          Return home
        </Link>
        <Link
          href="/services"
          className="rounded-full border border-text/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-text transition-colors hover:text-copper"
        >
          View services
        </Link>
      </div>
    </div>
  );
}
