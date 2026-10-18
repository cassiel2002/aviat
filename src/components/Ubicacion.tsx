"use client";

import { Phone, Clock, Mail, MapPin } from "lucide-react";
import { CONFIG, mapsQuery } from "@/lib/config";
import Reveal from "./Reveal";
import Button from "./Button";

const telHref = (t: string) => `tel:${t.replace(/[^+\d]/g, "")}`;

/** Sección "Cómo llegar": datos de contacto + CTA a Google Maps + mapa embebido. */
export default function Ubicacion() {
  return (
    <section id="ubicacion" className="py-[clamp(64px,9vw,120px)]">
      <div className="mx-auto grid w-[min(1160px,100%-40px)] grid-cols-1 items-stretch gap-[clamp(28px,5vw,64px)] md:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <div>
            <h2 className="font-heading text-[clamp(2rem,4.5vw,3.2rem)] font-bold leading-[1.05] tracking-tight text-forest">
              Cómo llegar
            </h2>

            <div className="mt-8 grid gap-5">
              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-d">
                  <MapPin size={20} />
                </span>
                <div>
                  <p className="font-heading text-lg font-semibold text-ink">
                    {CONFIG.direccion}
                  </p>
                  <p className="text-muted">{CONFIG.ciudad}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-d">
                  <Phone size={20} />
                </span>
                <div>
                  {CONFIG.telefonos.map((t) => (
                    <a
                      key={t}
                      href={telHref(t)}
                      className="block font-medium text-ink transition-colors hover:text-leaf-d"
                    >
                      {t}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-d">
                  <Clock size={20} />
                </span>
                <p className="text-ink">{CONFIG.horario}</p>
              </div>

              <div className="flex items-start gap-3.5">
                <span className="mt-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl bg-leaf/15 text-leaf-d">
                  <Mail size={20} />
                </span>
                <a
                  href={`mailto:${CONFIG.email}`}
                  className="font-medium text-ink transition-colors hover:text-leaf-d"
                >
                  {CONFIG.email}
                </a>
              </div>
            </div>

            <div className="mt-8">
              <Button
                href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="leaf"
              >
                Abrir en Google Maps
              </Button>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="min-h-[380px] overflow-hidden rounded-[28px] bg-mist ring-1 ring-ink/5">
            <iframe
              title="Mapa de ubicación de Aviat"
              src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
              loading="lazy"
              className="h-full min-h-[380px] w-full border-0"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
