"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Template de ruta: transición de entrada suave entre páginas.
 * Un fade corto sin desplazamiento para evitar saltos al cambiar de módulo.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
