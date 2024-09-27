import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Providers } from "./providers";
import { Link } from "@chakra-ui/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "BadmintonESP Extractor",
  description: "Aplicación para extraer datos de FESBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0c1545] text-white`}
      >
        <Providers>{children}</Providers>
      </body>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
      <a className="flex flex-end text-blue-400">
      Leer más...
      </a>
      <a  className="flex flex-end text-blue-400">
        Web Creada por Javier Coronas - 2024
      </a>
      <a 
        href="mailto:javcor3@gmail.com?subject=Reporte de error en la web" 
        className="flex flex-end text-blue-400"
      >
        Reportar un error
      </a>
      </footer>
    </html>
  );
}
