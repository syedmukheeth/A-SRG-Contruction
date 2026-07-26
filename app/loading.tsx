/**
 * Route-transition state. Deliberately not a full-screen panel: every route is
 * statically prerendered, so a takeover reads as a second splash screen for
 * what is usually a sub-100ms wait. A slim indeterminate rail under the nav
 * says "working" without blanking the page the user is looking at.
 */
export default function Loading() {
  return (
    <div className="min-h-[60vh] w-full">
      <span
        role="status"
        aria-label="Loading"
        className="fixed inset-x-0 top-20 z-40 block h-px overflow-hidden bg-copper/15"
      >
        <span className="route-rail block h-full w-1/3 bg-copper" />
      </span>
    </div>
  );
}
