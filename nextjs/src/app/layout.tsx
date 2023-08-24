import "./globals.css";
import type { Metadata } from "next";
import { Inter, Roboto } from "next/font/google";
import ThemeRegistry from "./components/ThemeRegistry/ThemeRegistry";
import { Navbar } from "./components/Navbat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rastreamento",
  description: "Rastreamento de veiculos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <ThemeRegistry>
          <Navbar />
          {children}
        </ThemeRegistry>
      </body>
    </html>
  );
}
