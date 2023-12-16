import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "StockFlow | Parintins Show Fogos",
  description: "Sistema de gestão/controle de estoque e ponto de venda.",
  authors: [
    {
      name: "Thiago Henrique Fragata",
      url: "https://postfolio-thiagofragata.vercel.app",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Toaster />
        {children}
      </body>
    </html>
  );
}
