"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import type { GaleriaItem } from "@/lib/config";
import SafeImage from "./SafeImage";

const easeOut = [0.16, 1, 0.3, 1] as const;

interface Props {
  items: GaleriaItem[];
}

/**
 * Acordeón de instalaciones: lista de ítems que al expandirse muestran la
 * imagen y descripción del sector. Una preview grande acompaña a la derecha.
 */
export default function InstalacionesAccordion({ items }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      {/* Lista desplegable */}
      <ul className="flex flex-col border-t border-ink/12">
        {items.map((item, i) => {
          const isOpen = active === i;
          return (
            <li key={item.titulo} className="border-b border-ink/12">
              <button
                type="button"
                onClick={() => setActive(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span
                  className={`font-heading text-[clamp(1.2rem,2.4vw,1.7rem)] font-semibold tracking-tight transition-colors ${
                    isOpen ? "text-forest" : "text-ink/70"
                  }`}
                >
                  {item.titulo}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: easeOut }}
                  className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full transition-colors ${
                    isOpen ? "bg-leaf text-forest" : "bg-mist text-forest"
                  }`}
                >
                  <Plus size={18} strokeWidth={2.5} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: easeOut }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pr-12 text-muted">{item.texto}</p>
                    {/* Imagen inline para mobile (en desktop se ve en el panel derecho) */}
                    <div className="mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-mist lg:hidden">
                      <SafeImage src={item.src} alt={item.alt} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Panel de imagen (desktop) con crossfade */}
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-[28px] bg-mist shadow-[0_30px_70px_-40px_rgba(31,42,36,0.4)] ring-1 ring-ink/5 lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="absolute inset-0"
          >
            {active >= 0 && (
              <SafeImage src={items[active].src} alt={items[active].alt} />
            )}
          </motion.div>
        </AnimatePresence>

        {active >= 0 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6">
            <span className="font-heading text-xl font-semibold text-white">
              {items[active].titulo}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
