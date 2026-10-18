import type { Metadata, Viewport } from "next";
import { Syne, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { CONFIG, navItems } from "@/lib/config";
import PillNav from "@/components/PillNav";
import Footer from "@/components/Footer";
import WhatsappFloat from "@/components/WhatsappFloat";
import SmoothScroll from "@/components/SmoothScroll";

const syne = Syne({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${CONFIG.nombre} | ${CONFIG.subtitulo}`,
  description: `${CONFIG.nombre}: ${CONFIG.subtitulo}. ${CONFIG.direccion}. Pedí tu turno online.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1c3322",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${syne.variable} ${jakarta.variable} ${instrument.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bone text-ink font-body">
        <SmoothScroll />
        <PillNav
          logoText={CONFIG.nombre}
          items={navItems}
          baseColor="#2f6b4f"
          pillColor="#ffffff"
          pillTextColor="#2f6b4f"
          hoveredPillTextColor="#ffffff"
          ease="power2.easeOut"
          initialLoadAnimation={false}
        />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsappFloat />
      </body>
    </html>
  );
}
