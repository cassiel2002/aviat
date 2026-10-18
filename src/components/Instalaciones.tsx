"use client";

import { CONFIG } from "@/lib/config";
import Reveal from "./Reveal";
import SafeImage from "./SafeImage";
import InstalacionesAccordion from "./InstalacionesAccordion";

/** Sección "Instalaciones": encabezado + acordeón desplegable de sectores + galería ancha. */
export default function Instalaciones() {
  return (
    <section id="instalaciones" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1160px,100%-40px)]">
        <div className="mb-14 grid grid-cols-1 items-end gap-10 md:grid-cols-2">
          <Reveal>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight">
              Un lugar pensado para tu tranquilidad
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-[56ch] text-[1.15rem] text-muted">
              Conocé nuestros espacios: habitaciones, circulaciones y accesos
              diseñados con elegancia y naturaleza.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <InstalacionesAccordion items={CONFIG.galeria} />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 aspect-[21/9] overflow-hidden rounded-[28px] bg-mist max-md:aspect-[4/3]">
            <SafeImage
              src={CONFIG.img.pasillo}
              alt="Pasillo de consultorios de Aviat"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
