"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CONFIG, mapsQuery } from "@/lib/config";
import Button from "./Button";
import SafeImage from "./SafeImage";

const easeOut = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easeOut } },
};

/** Hero principal: texto con stagger de entrada + imagen con parallax sutil al hacer scroll. */
export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-b from-moss to-bone pt-28 pb-16 text-ink sm:pt-32 sm:pb-24 lg:pt-36 lg:pb-28"
    >
      {/* Halo decorativo suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-[30%] -right-[12%] h-[70vw] max-h-[900px] w-[70vw] max-w-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(91,189,122,0.18), transparent 65%)",
        }}
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto grid w-[min(1160px,100%-40px)] grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16"
      >
        <div>
          <motion.small
            variants={item}
            className="mb-2 inline-flex items-center gap-2 rounded-full bg-leaf/15 px-3.5 py-1.5 text-[0.9rem] font-semibold text-leaf-d"
          >
            Bienvenido a {CONFIG.nombre}
          </motion.small>

          <motion.h1
            variants={item}
            className="mb-5 font-heading text-[clamp(2.7rem,6.6vw,5.4rem)] font-extrabold leading-[1.03] tracking-tight text-forest"
          >
            Cuidamos lo que más importa:{" "}
            <span className="accent-serif text-leaf-d">Vos.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mb-8 max-w-[56ch] text-[1.15rem] leading-relaxed text-muted"
          >
            {CONFIG.subtitulo} en pleno centro de la ciudad, con espacios
            diseñados para que te sientas en calma desde que llegás.
          </motion.p>

          <motion.div variants={item} className="flex flex-wrap gap-3.5">
            <Button href="/la-clinica" variant="leaf">
              Conocé la clínica
            </Button>
            <Button
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              variant="dark"
            >
              Ver en Google Maps
            </Button>
          </motion.div>
        </div>

        <motion.div
          variants={item}
          className="relative aspect-[5/4.6] overflow-hidden rounded-[28px] bg-mist shadow-[0_30px_70px_-35px_rgba(31,42,36,0.35)] ring-1 ring-ink/5"
        >
          <motion.div style={{ y: imageY }} className="absolute inset-0 -top-6">
            <SafeImage
              src={CONFIG.img.fachada}
              alt={`Frente del ${CONFIG.subtitulo} ${CONFIG.nombre}`}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
