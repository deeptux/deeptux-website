import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ),
  title: {
    default: "Deeptux IT Solutions",
    template: "%s · Deeptux IT Solutions",
  },
  description:
    "Tailored Tech. Professional Depth. Solutions that fit. Web, e-commerce, bespoke apps, IoT, and security systems from Pampanga, Philippines.",
  icons: {
    icon: "/brand/deeptux-logo.jpg",
    apple: "/brand/deeptux-logo.jpg",
  },
  openGraph: {
    title: "Deeptux IT Solutions",
    description:
      "Tailored Tech. Professional Depth. Solutions that fit. Interactive 3D experience—mobile-first.",
    type: "website",
    images: [{ url: "/brand/deeptux-logo.jpg", alt: "Deeptux IT Solutions" }],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
