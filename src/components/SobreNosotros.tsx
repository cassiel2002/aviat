"use client";

import { CONFIG } from "@/lib/config";
import Reveal from "./Reveal";

/** Bloque editorial "Sobre nosotros" para la página de la clínica. */
export default function SobreNosotros() {
  return (
    <section className="py-[clamp(56px,8vw,110px)]">
      <div className="mx-auto w-[min(1000px,100%-40px)]">
        <Reveal>
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-leaf-d">
            Sobre nosotros
          </span>
        </Reveal>
        <Reveal delay={0.08}>
          <h1 className="font-heading text-[clamp(2.4rem,6vw,4.4rem)] font-extrabold leading-[1.02] tracking-tight text-forest">
            Cuidamos lo que más importa:{" "}
            <span className="accent-serif text-leaf-d">Vos.</span>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p className="mt-7 max-w-[62ch] text-[1.2rem] leading-relaxed text-muted">
            {CONFIG.nombre} es un {CONFIG.subtitulo.toLowerCase()} ubicado en{" "}
            {CONFIG.direccion}, {CONFIG.ciudad}. Desde 2009 combinamos atención
            profesional con espacios diseñados para que cada paciente se sienta
            en calma, desde la consulta hasta la recuperación.
          </p>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { k: "Centro quirúrgico", v: "Cirugía ambulatoria e internación" },
            { k: "Multiespecialidad", v: "Consultorios externos y diagnóstico" },
            { k: "Desde 2009", v: "En el corazón de La Rioja" },
          ].map((it, i) => (
            <Reveal key={it.k} delay={0.1 + i * 0.08}>
              <div className="rounded-2xl border border-ink/10 bg-mist/50 p-6">
                <p className="font-heading text-xl font-bold text-forest">
                  {it.k}
                </p>
                <p className="mt-1 text-muted">{it.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
