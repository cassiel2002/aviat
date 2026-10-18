import type { Metadata } from "next";
import Ubicacion from "@/components/Ubicacion";
import { CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: `Ubicación | ${CONFIG.nombre}`,
  description: `Encontrá ${CONFIG.nombre} en ${CONFIG.direccion}, ${CONFIG.ciudad}.`,
};

export default function UbicacionPage() {
  return (
    <div className="pt-28 sm:pt-32">
      <Ubicacion />
    </div>
  );
}
