"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

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
    <div className="flex min-h-[80vh] w-full flex-col justify-center px-5 pb-20 pt-32 md:px-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="marker">Error</p>
        <h1 className="font-display mt-6 max-w-[12ch] text-display text-ink">
          Something <span className="text-laterite">went wrong.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">This page failed to load.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="bg-laterite px-6 py-4 font-mono text-xs font-medium uppercase tracking-[0.08em] text-plaster transition-colors hover:bg-laterite-deep"
          >
            Try again
          </button>
          <Button href="/" variant="line">
            Homepage
          </Button>
        </div>
      </div>
    </div>
  );
}
