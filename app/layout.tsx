import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import NavMenu from "@/components/NavMenu";
import { Toaster } from "@/components/ui/sonner";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "MOBBI",
  description: "MOBBI journal for creating entries of mobbing incidents",
};

export const revalidate = 0; //

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased p-4",
          fontSans.variable
        )}
      >
        <main className="space-y-2">
          <NavMenu />
          {children}
        </main>
        <Toaster richColors expand position="top-right" />
      </body>
    </html>
  );
}
