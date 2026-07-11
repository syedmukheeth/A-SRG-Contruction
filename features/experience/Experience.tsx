import { Section } from "@/components/Section";
import { stats } from "@/lib/site";
import { StatCounter } from "./StatCounter";

/** Cinematic numbers, 46 years, 500+ projects, 1000+ families. */
export function Experience() {
  return (
    <Section id="experience" className="surface-concrete">
      <div className="mx-auto max-w-[1300px]">
        <p className="eyebrow mb-12">By the numbers</p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-8">
          {stats.map((s) => (
            <StatCounter
              key={s.label}
              value={s.value}
              suffix={s.suffix}
              label={s.label}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
