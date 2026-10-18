import Link from "next/link";
import { CONFIG, whatsappBaseUrl } from "@/lib/config";

const telHref = `tel:${CONFIG.telefonos[0].replace(/[^+\d]/g, "")}`;

interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Clínica",
    links: [
      { href: "/la-clinica", label: "Sobre nosotros" },
      { href: "/la-clinica#instalaciones", label: "Instalaciones" },
      { href: "/servicios", label: "Servicios" },
    ],
  },
  {
    title: "Pacientes",
    links: [
      { href: "/servicios", label: "Consultorios" },
      { href: "/la-clinica", label: "Instalaciones" },
      { href: "/ubicacion", label: "Ubicación" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { href: telHref, label: "Teléfono" },
      { href: `mailto:${CONFIG.email}`, label: "Email" },
      { href: whatsappBaseUrl, label: "WhatsApp", external: true },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/", label: "Política de privacidad" },
      { href: "/", label: "Términos" },
      { href: "/", label: "Aviso legal" },
    ],
  },
];

/** Footer con columnas de enlaces y aviso de copyright. */
export default function Footer() {
  return (
    <footer className="bg-forest px-0 pt-16 pb-8 text-white/75">
      <div className="mx-auto w-[min(1160px,100%-40px)]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-1">
            <Link
              href="/"
              className="flex items-center font-heading text-2xl font-bold tracking-tight text-white"
            >
              {CONFIG.nombre}
              <span className="ml-0.5 text-leaf">+</span>
            </Link>
            <p className="mt-3 max-w-[28ch] text-[0.95rem]">{CONFIG.subtitulo}</p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-3.5 font-body text-[0.95rem] font-semibold text-white">
                {col.title}
              </h4>
              <ul className="grid list-none gap-2.5 p-0">
                {col.links.map((link, i) => {
                  const isInternal =
                    link.href.startsWith("/") && !link.external;
                  const cls =
                    "text-[0.95rem] no-underline transition-colors hover:text-leaf";
                  return (
                    <li key={`${link.label}-${i}`}>
                      {isInternal ? (
                        <Link href={link.href} className={cls}>
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className={cls}
                          {...(link.external
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap justify-between gap-2 border-t border-white/18 pt-6 text-[0.85rem]">
          <span>
            © {new Date().getFullYear()} {CONFIG.nombre}. Todos los derechos
            reservados.
          </span>
          <span>{CONFIG.direccion}</span>
        </div>
      </div>
    </footer>
  );
}
