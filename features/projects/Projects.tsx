import { projects } from "@/lib/site";
import { ProjectRow } from "./ProjectRow";

export function Projects() {
  return (
    <section id="projects" className="relative w-full px-6 py-32 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-24 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
            Selected
            <br />
            <span className="text-copper">work.</span>
          </h2>
          <p className="max-w-sm text-muted">
            A fraction of 500+ delivered. Each one a standing argument for the
            next.
          </p>
        </div>

        <div className="space-y-32 lg:space-y-44">
          {projects.map((p, i) => (
            <ProjectRow key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
