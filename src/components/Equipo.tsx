"use client";

import { motion } from "framer-motion";
import { CONFIG } from "@/lib/config";
import Reveal, { staggerContainer, staggerItem } from "./Reveal";
import SafeImage from "./SafeImage";

/** Sección "Equipo médico". Se oculta por completo si CONFIG.equipo está vacío. */
export default function Equipo() {
  if (CONFIG.equipo.length === 0) return null;

  return (
    <section id="equipo" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto w-[min(1160px,100%-40px)]">
        <Reveal>
          <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight">
            Equipo médico
          </h2>
        </Reveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-12 grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-7"
        >
          {CONFIG.equipo.map((m) => (
            <motion.figure key={m.nombre} variants={staggerItem} className="m-0">
              <div className="group mb-3.5 aspect-[4/5] overflow-hidden rounded-2xl bg-mist">
                <SafeImage
                  src={m.foto ?? ""}
                  alt={m.nombre}
                  className="transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>
              <figcaption>
                <strong className="font-heading">{m.nombre}</strong>
                <span className="block text-[0.95rem] text-muted">
                  {m.especialidad}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
