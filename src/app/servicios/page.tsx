import type { Metadata } from "next";
import Servicios from "@/components/Servicios";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `Servicios | ${CONFIG.nombre}`,
  description: `Servicios de ${CONFIG.nombre}: ${CONFIG.servicios
    .map((s) => s.titulo)
    .join(", ")}.`,
};

export default function ServiciosPage() {
  return (
    <div className="bg-forest pt-20 sm:pt-24">
      <Servicios />
    </div>
  );
}
