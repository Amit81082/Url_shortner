import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "URL Shortener | Amit Maurya",
  description:
    "A fast and secure URL Shortener built with Next.js, MongoDB, and Tailwind CSS. Shorten links, track usage, and manage your URLs easily.",
  keywords: [
    "URL Shortener",
    "Short Link",
    "Link Shortener",
    "Next.js URL Shortener",
    "MongoDB Project",
    "MERN Project",
    "Amit Maurya",
    "Web Developer Project",
  ],

  openGraph: {
    title: "URL Shortener | Amit Maurya",
    description:
      "Shorten long URLs instantly. Built with Next.js + MongoDB + Tailwind.",
    url: "https://url-shortner-86rw.vercel.app/",
    siteName: "URL Shortener",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "URL Shortener Project Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "URL Shortener | Amit Maurya",
    description:
      "Shorten long URLs instantly. Built with Next.js + MongoDB + Tailwind.",
    images: ["/og.png"],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={ `${geistSans.variable} ${geistMono.variable} antialiased`}

      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
