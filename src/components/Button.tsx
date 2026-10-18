import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type Variant = "leaf" | "dark" | "line";

const base =
  "inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 font-semibold text-[1rem] transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0";

const variants: Record<Variant, string> = {
  leaf: "bg-leaf text-forest hover:bg-[#63d172] shadow-[0_10px_24px_-10px_rgba(76,193,92,0)] hover:shadow-[0_10px_24px_-10px_rgba(76,193,92,0.8)]",
  dark: "bg-ink text-white hover:bg-forest",
  line: "border border-white/45 text-white bg-transparent hover:bg-white/10",
};

interface CommonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
}

type AnchorButtonProps = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type NativeButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonProps = AnchorButtonProps | NativeButtonProps;

/** Botón compartido (ancla o <button>) con las tres variantes del sitio original. */
export default function Button({
  variant = "leaf",
  children,
  className,
  ...props
}: ButtonProps) {
  const classes = clsx(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorProps } = props as AnchorButtonProps;
    // Rutas internas → next/link (navegación cliente + transición). Externas → <a>.
    const isInternal = href.startsWith("/") && !href.startsWith("//");
    if (isInternal) {
      return (
        <Link href={href} className={classes} {...anchorProps}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={classes} {...anchorProps}>
        {children}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;
  return (
    <button className={classes} {...buttonProps}>
      {children}
    </button>
  );
}
