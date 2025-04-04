import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

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
  generator: "Next.js",
  title: "KanyeSays",
  description: "Your daily dose of Kanye West quotes",
  applicationName: "KanyeSays",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Kanye West",
    "Ye",
    "Quotes",
    "KanyeSays",
    "Wisdom",
  ],
  authors: [{ name: "shrekajerk", url: "https://x.com/shrekajerk" }],
  creator: "shrekajerk",
  publisher: "shrekajerk",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "KanyeSays",
    description: "Your daily dose of Kanye West quotes",
    url: "https://kanye-says.vercel.app",
    siteName: "KanyeSays",
    images: [
      {
        url: "/close.png",
        width: 800,
        height: 600,
      },
      {
        url: "https://kanye.eduardev.com/images/bg-g.png",
        width: 1800,
        height: 1600,
      },
    ],
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/close.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/close.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    shortcut: "/close.png",
    apple: "/close.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
