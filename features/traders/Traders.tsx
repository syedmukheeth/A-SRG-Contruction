import Image from "next/image";
import { traders, tel } from "@/lib/site";

export function Traders() {
  return (
    <section aria-labelledby="traders-title" className="bg-laterite text-plaster">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-20 md:grid-cols-12 md:gap-8 md:px-10 md:py-24">
        <div className="md:col-span-6">
          <p className="marker text-plaster">Our materials store</p>
          <h2 id="traders-title" className="font-display mt-6 text-display text-plaster">
            {traders.name}
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-plaster">
            {traders.what}, sold under the ASRG name on Nandikotkur Road. Come in and choose
            fittings and finishes in person.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {traders.brands.map((b) => (
              <li key={b} className="border border-plaster/50 px-3 py-1.5 font-mono text-xs uppercase tracking-[0.06em]">
                {b}
              </li>
            ))}
          </ul>
          <div className="mt-10 space-y-2 text-plaster">
            <p>{traders.address}</p>
            <a href={tel(traders.phone)} className="inline-block font-mono underline underline-offset-4 hover:text-plaster">
              {traders.contact} · {traders.phone}
            </a>
          </div>
        </div>
        <figure className="md:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden bg-laterite-deep">
            <Image
              src={traders.image}
              alt={`${traders.name} store front on Nandikotkur Road, beside D-Mart, Kurnool`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <figcaption className="stamp mt-3 text-plaster">Nandikotkur Road, beside D-Mart</figcaption>
        </figure>
      </div>
    </section>
  );
}
