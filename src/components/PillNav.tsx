"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export type PillNavSubItem = {
  label: string;
  href: string;
};

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
  children?: PillNavSubItem[];
};

export interface PillNavProps {
  /** Texto del logo (marca). Se renderiza dentro del pill circular. */
  logoText: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  /** Color base del contenedor y del círculo de hover. */
  baseColor?: string;
  /** Color de fondo de cada pill. */
  pillColor?: string;
  /** Color del texto del pill al hacer hover. */
  hoveredPillTextColor?: string;
  /** Color del texto del pill en reposo. */
  pillTextColor?: string;
  initialLoadAnimation?: boolean;
}

/**
 * Navegación tipo "pill" con animación GSAP en hover (círculo que sube + swap de texto).
 * Adaptada desde react-bits: sin react-router (solo anclas) y con los colores de la clínica.
 */
const PillNav: React.FC<PillNavProps> = ({
  logoText,
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#1c3322",
  pillColor = "#f6f8f3",
  hoveredPillTextColor = "#f6f8f3",
  pillTextColor,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const pathname = usePathname();
  // Ruta base de un href (ignora el hash) para comparar con el pathname actual.
  const basePath = (href: string) => href.split("#")[0] || "/";
  const currentActive =
    activeHref ??
    items.find((it) => basePath(it.href) === pathname)?.href ??
    items.find((it) =>
      it.children?.some((c) => basePath(c.href) === pathname)
    )?.href;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openMobileSub, setOpenMobileSub] = useState<number | null>(null);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>(".pill-label");
        const white = pill.querySelector<HTMLElement>(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" },
          0
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" },
            0
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener("resize", onResize);

    if (document.fonts) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, { scale: 1, duration: 0.6, ease });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: "hidden" });
        gsap.to(navItems, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: "auto",
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: "auto",
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: "top center",
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: "top center",
          onComplete: () => {
            gsap.set(menu, { visibility: "hidden" });
          },
        });
      }
    }
  };

  const cssVars = {
    ["--base" as string]: baseColor,
    ["--pill-bg" as string]: pillColor,
    ["--hover-text" as string]: hoveredPillTextColor,
    ["--pill-text" as string]: resolvedPillTextColor,
    ["--nav-h" as string]: "42px",
    ["--logo" as string]: "36px",
    ["--pill-pad-x" as string]: "18px",
    ["--pill-gap" as string]: "3px",
  } as React.CSSProperties;

  return (
    <div className="fixed top-4 left-1/2 z-[1000] -translate-x-1/2 w-full px-4 md:w-auto md:px-0">
      <nav
        className={`mx-auto flex w-full items-center justify-between box-border md:w-max md:justify-center ${className}`}
        aria-label="Principal"
        style={cssVars}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Inicio"
          ref={logoRef}
          className="inline-flex items-center justify-center overflow-hidden rounded-full px-4 font-heading text-[18px] font-bold tracking-tight"
          style={{
            height: "var(--nav-h)",
            background: "var(--base, #000)",
            color: "var(--pill-bg)",
            boxShadow: "0 6px 18px -8px rgba(0,0,0,0.45)",
          }}
        >
          {logoText}
          <span style={{ color: "#4cc15c" }}>+</span>
        </Link>

        {/* Pills desktop */}
        <div
          ref={navItemsRef}
          className="relative ml-2 hidden items-center rounded-full md:flex"
          style={{ height: "var(--nav-h)", background: "transparent" }}
        >
          <ul
            role="menubar"
            className="m-0 flex h-full list-none items-stretch p-0"
            style={{ gap: "var(--pill-gap)" }}
          >
            {items.map((item, i) => {
              const isActive = currentActive === item.href;
              const pillStyle: React.CSSProperties = {
                background: "var(--pill-bg, #fff)",
                color: "var(--pill-text, var(--base, #000))",
                paddingLeft: "var(--pill-pad-x)",
                paddingRight: "var(--pill-pad-x)",
                boxShadow: "0 6px 18px -8px rgba(0,0,0,0.45)",
              };
              const basePillClasses =
                "relative overflow-hidden inline-flex items-center gap-1.5 justify-center h-full no-underline rounded-full box-border font-semibold text-[15px] leading-[0] uppercase tracking-[0.2px] whitespace-nowrap cursor-pointer px-0";

              const hasChildren = !!item.children?.length;

              const PillInner = (
                <>
                  <span
                    className="hover-circle absolute left-1/2 bottom-0 z-[1] block pointer-events-none rounded-full"
                    style={{ background: "var(--base, #000)", willChange: "transform" }}
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative z-[2] inline-flex items-center gap-1.5 leading-[1]">
                    <span
                      className="pill-label relative z-[2] inline-flex items-center gap-1.5 leading-[1]"
                      style={{ willChange: "transform" }}
                    >
                      {item.label}
                      {hasChildren && <ChevronDown size={14} strokeWidth={2.5} />}
                    </span>
                    <span
                      className="pill-label-hover absolute left-0 top-0 z-[3] inline-flex items-center gap-1.5"
                      style={{ color: "var(--hover-text, #fff)", willChange: "transform, opacity" }}
                      aria-hidden="true"
                    >
                      {item.label}
                      {hasChildren && <ChevronDown size={14} strokeWidth={2.5} />}
                    </span>
                  </span>
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[6px] z-[4] h-3 w-3 -translate-x-1/2 rounded-full"
                      style={{ background: "var(--base, #000)" }}
                      aria-hidden="true"
                    />
                  )}
                </>
              );

              return (
                <li
                  key={`${item.href}-${i}`}
                  role="none"
                  className="relative flex h-full"
                  onMouseEnter={() => {
                    handleEnter(i);
                    if (hasChildren) {
                      if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
                      setOpenDropdown(i);
                    }
                  }}
                  onMouseLeave={() => {
                    handleLeave(i);
                    if (hasChildren) {
                      dropdownTimer.current = setTimeout(() => setOpenDropdown(null), 120);
                    }
                  }}
                >
                  <Link
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    aria-haspopup={hasChildren || undefined}
                    aria-expanded={hasChildren ? openDropdown === i : undefined}
                  >
                    {PillInner}
                  </Link>

                  {/* Dropdown desktop */}
                  {hasChildren && (
                    <AnimatePresence>
                      {openDropdown === i && (
                        <motion.ul
                          initial={{ opacity: 0, y: 8, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.98 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-[calc(100%+10px)] z-[1001] m-0 min-w-[230px] list-none overflow-hidden rounded-2xl p-1.5 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.5)]"
                          style={{ background: "var(--pill-bg, #fff)" }}
                        >
                          {item.children!.map((child) => (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                className="block rounded-xl px-4 py-2.5 text-[14px] font-medium normal-case tracking-normal transition-colors hover:bg-forest hover:text-bone"
                                style={{ color: "var(--pill-text, #000)" }}
                                onClick={() => setOpenDropdown(null)}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Hamburguesa móvil */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Abrir menú"
          aria-expanded={isMobileMenuOpen}
          className="relative flex cursor-pointer flex-col items-center justify-center gap-1 rounded-full border-0 p-0 md:hidden"
          style={{
            width: "var(--nav-h)",
            height: "var(--nav-h)",
            background: "var(--base, #000)",
          }}
        >
          <span
            className="hamburger-line h-0.5 w-4 origin-center rounded"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
          <span
            className="hamburger-line h-0.5 w-4 origin-center rounded"
            style={{ background: "var(--pill-bg, #fff)" }}
          />
        </button>
      </nav>

      {/* Menú móvil */}
      <div
        ref={mobileMenuRef}
        className="absolute left-4 right-4 top-[3.2em] z-[998] origin-top rounded-[27px] shadow-[0_8px_32px_rgba(0,0,0,0.25)] md:hidden"
        style={{ ...cssVars, background: "var(--base, #f0f0f0)" }}
      >
        <ul className="m-0 flex list-none flex-col gap-[3px] p-[3px]">
          {items.map((item, i) => {
            const hasChildren = !!item.children?.length;
            const subOpen = openMobileSub === i;
            return (
              <li key={`${item.href}-m-${i}`}>
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenMobileSub(subOpen ? null : i)}
                    aria-expanded={subOpen}
                    className="flex w-full items-center justify-between rounded-[50px] px-4 py-3 text-[16px] font-medium transition-colors duration-200"
                    style={{
                      background: "var(--pill-bg, #fff)",
                      color: "var(--pill-text, #fff)",
                    }}
                  >
                    {item.label}
                    <motion.span animate={{ rotate: subOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <ChevronDown size={16} strokeWidth={2.5} />
                    </motion.span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-[50px] px-4 py-3 text-[16px] font-medium transition-colors duration-200"
                    style={{
                      background: "var(--pill-bg, #fff)",
                      color: "var(--pill-text, #fff)",
                    }}
                  >
                    {item.label}
                  </Link>
                )}

                {hasChildren && (
                  <AnimatePresence initial={false}>
                    {subOpen && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="m-0 list-none overflow-hidden px-2"
                      >
                        {item.children!.map((child) => (
                          <li key={child.label}>
                            <Link
                              href={child.href}
                              onClick={() => {
                                setIsMobileMenuOpen(false);
                                setOpenMobileSub(null);
                              }}
                              className="block rounded-xl px-4 py-2.5 text-[14px] text-bone/80 transition-colors hover:text-leaf"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
