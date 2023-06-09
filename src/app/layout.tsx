"use client";
import { Navbar } from "@/Components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";
import { Alert } from "@/Components/Alert";
import { MoralisProvider } from "react-moralis";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className={inter.className}>
        <MoralisProvider initializeOnMount={false}>
          <Navbar />
          {children}
        </MoralisProvider>
      </body>
    </html>
  );
}
