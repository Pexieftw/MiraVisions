import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mira Visions",
    template: "%s | Mira Visions"
  },
  description: "Transform your vision into reality with Mira Visions. Expert design studio specializing in stunning websites, powerful brand identities, UI/UX design, and digital experiences. Premium quality, lightning-fast delivery.",
  keywords: [
    "web design",
    "brand identity",
    "UI/UX design", 
    "website development",
    "digital design",
    "graphic design",
    "Shopify development",
    "WordPress sites",
    "mobile apps",
    "creative media",
    "design studio"
  ],
  authors: [{ name: "Mira Visions" }],
  creator: "Mira Visions",
  publisher: "Mira Visions",
  metadataBase: new URL("https://miravisions.com"), 
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://miravisions.com", 
    siteName: "Mira Visions",
    title: "Mira Visions - Expert Design Studio | Digital Experiences & Brand Identity",
    description: "Transform your vision into reality with expert design services. Stunning websites, powerful brand identities, and digital experiences that drive results.",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Mira Visions - Expert Design Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mira Visions - Expert Design Studio | Digital Experiences & Brand Identity",
    description: "Transform your vision into reality with expert design services. Stunning websites, powerful brand identities, and digital experiences that drive results.",
    images: ["/og-image.png"], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  //verification: {
  //  google: "code", 
  //},
  category: "Design Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="android-chrome-192x192" href="/android-chrome-192x192.png" sizes="192x192" />
        <link rel="android-chrome-512x512" href="/android-chrome-512x512.png" sizes="512x512" />
        
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}