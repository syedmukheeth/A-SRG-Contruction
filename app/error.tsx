"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center px-6 text-center">
      <div className="blueprint-grid absolute inset-0 opacity-40" />
      <p className="eyebrow relative mb-6">Error</p>
      <h1 className="relative font-display text-giant uppercase leading-[0.9] text-text">
        Something
        <br />
        <span className="text-copper">went wrong.</span>
      </h1>
      <p className="relative mt-8 max-w-md text-muted">
        An unexpected error occurred while loading this page.
      </p>
      <div className="relative mt-10 flex flex-col items-center gap-5 sm:flex-row">
        <button
          type="button"
          onClick={() => unstable_retry()}
          className="rounded-full bg-copper px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-ink transition-colors hover:bg-text"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-full border border-text/25 px-8 py-4 font-mono text-xs uppercase tracking-[0.22em] text-text transition-colors hover:text-copper"
        >
          Return home
        </Link>
      </div>
    </div>
  );
}
