import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] w-full flex-col justify-center px-5 pb-20 pt-32 md:px-10">
      <div className="mx-auto w-full max-w-[1280px]">
        <p className="marker">404</p>
        <h1 className="font-display mt-6 max-w-[12ch] text-display text-ink">
          Nothing built <span className="text-laterite">here yet.</span>
        </h1>
        <p className="mt-6 max-w-md text-lg text-ink-soft">That page doesn&apos;t exist.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/">Back to the homepage</Button>
          <Button href="/services" variant="line">
            Services
          </Button>
        </div>
      </div>
    </div>
  );
}
