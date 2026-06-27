import { Section } from "@/components/Section";
import { services } from "@/lib/site";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <Section id="services">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-6">What we build</p>
            <h2 className="font-display text-giant uppercase leading-[0.9] text-text">
              From concrete
              <br />
              <span className="text-copper">to dreams.</span>
            </h2>
          </div>
          <p className="max-w-sm text-muted">
            Six disciplines, one standard. Every plan engineered to outlast the
            people who commission it.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <ServiceCard key={s.id} service={s} index={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
