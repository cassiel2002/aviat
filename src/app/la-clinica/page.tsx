import type { Metadata } from "next";
import SobreNosotros from "@/components/SobreNosotros";
import Instalaciones from "@/components/Instalaciones";
import Equipo from "@/components/Equipo";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `La clínica | ${CONFIG.nombre}`,
  description: `Conocé ${CONFIG.nombre}: ${CONFIG.subtitulo}. Instalaciones, espacios y equipo.`,
};

export default function LaClinicaPage() {
  return (
    <div className="pt-24 sm:pt-28">
      <SobreNosotros />
      <Instalaciones />
      <Equipo />
    </div>
  );
}
