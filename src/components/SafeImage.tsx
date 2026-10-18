"use client";

import { useState } from "react";
import clsx from "clsx";

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
}

/**
 * Imagen con fade-in al cargar. Mientras carga, deja ver el fondo neutro del
 * contenedor padre (sin bloque verde). Si la fuente falla, se oculta.
 */
export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={clsx(
        "h-full w-full object-cover transition-opacity duration-700 ease-out",
        loaded ? "opacity-100" : "opacity-0",
        className
      )}
    />
  );
}
