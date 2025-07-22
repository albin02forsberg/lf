"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { SideNav } from "@/components/layout/side-nav";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSideNavExpanded, setIsSideNavExpanded] = useState(true);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SpeedInsights />
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <SideNav isExpanded={isSideNavExpanded} />
          <div className={`flex flex-col sm:gap-4 sm:py-4 transition-all duration-300 ${isSideNavExpanded ? 'sm:pl-60' : 'sm:pl-14'}`}>
            <Header isSideNavExpanded={isSideNavExpanded} setIsSideNavExpanded={setIsSideNavExpanded} />
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}

