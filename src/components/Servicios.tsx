"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Reveal, { staggerContainer, staggerItem } from "./Reveal";
import MagicBento, { type BentoCardData } from "./MagicBento";

const labels = [
  "Quirófano",
  "Ambulatorio",
  "Internación",
  "Traumatología",
  "Quemados",
  "Diagnóstico",
];

const cards: BentoCardData[] = CONFIG.servicios.map((s, i) => ({
  title: s.titulo,
  description: s.descripcion,
  label: labels[i % labels.length],
}));

/** Sección "Servicios": pilares (bento) + áreas detalladas + especialidades. */
export default function Servicios() {
  return (
    <>
      {/* Banda de pilares con MagicBento */}
      <section
        id="servicios"
        className="bg-forest py-[clamp(64px,9vw,120px)] text-white"
      >
        <div className="mx-auto w-[min(1160px,100%-40px)]">
          <div className="mb-12 grid grid-cols-1 items-end gap-10 md:grid-cols-2">
            <Reveal>
              <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight">
                Qué hacemos en {CONFIG.nombre}
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="max-w-[56ch] text-[1.15rem] text-white/80">
                Centro quirúrgico y de medicina ambulatoria: cirugía,
                internación, traumatología y diagnóstico, en un mismo lugar.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <MagicBento
              cards={cards}
              textAutoHide={false}
              enableStars
              enableSpotlight
              enableBorderGlow
              enableTilt={false}
              enableMagnetism={false}
              clickEffect
              spotlightRadius={400}
              particleCount={12}
              glowColor="91, 189, 122"
            />
          </Reveal>
        </div>
      </section>

      {/* Áreas detalladas */}
      <section className="bg-bone py-[clamp(64px,9vw,120px)]">
        <div className="mx-auto w-[min(1160px,100%-40px)]">
          <Reveal>
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-[0.2em] text-leaf-d">
              Áreas de atención
            </span>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mb-12 max-w-[20ch] font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight text-forest">
              Especialidades quirúrgicas y de diagnóstico
            </h2>
          </Reveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-6 md:grid-cols-3"
          >
            {CONFIG.areas.map((area) => (
              <motion.article
                key={area.titulo}
                variants={staggerItem}
                className="rounded-3xl border border-ink/10 bg-white p-7 shadow-[0_20px_50px_-40px_rgba(31,42,36,0.5)]"
              >
                <h3 className="font-heading text-xl font-bold tracking-tight text-forest">
                  {area.titulo}
                </h3>
                <p className="mt-2 text-[0.95rem] text-muted">
                  {area.descripcion}
                </p>
                <ul className="mt-5 grid gap-2">
                  {area.items.map((it) => (
                    <li
                      key={it}
                      className="flex items-start gap-2.5 text-[0.95rem] text-ink"
                    >
                      <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-leaf" />
                      {it}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Especialidades (nómina completa) */}
      <section className="bg-moss py-[clamp(56px,8vw,110px)]">
        <div className="mx-auto w-[min(1160px,100%-40px)]">
          <Reveal>
            <h2 className="mb-3 font-heading text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-tight text-forest">
              Especialidades médicas
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mb-10 max-w-[60ch] text-muted">
              Contamos con atención en consultorios externos de diversas
              especialidades. Consultá disponibilidad y horarios al momento de
              pedir tu turno.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="flex flex-wrap gap-2.5"
          >
            {CONFIG.especialidades.map((esp) => (
              <motion.li
                key={esp}
                variants={staggerItem}
                className="rounded-full border border-leaf/40 bg-white px-4 py-2 text-[0.9rem] font-medium text-forest"
              >
                {esp}
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </section>
    </>
  );
}
