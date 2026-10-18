import type { Metadata } from "next";
import { Hind_Siliguri, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import { Toaster } from "react-hot-toast";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "বাজার দর - আজকের নিত্যপ্রয়োজনীয় পণ্যের বাজার দর",
  description: "আজকের নিত্যপ্রয়োজনীয় পণ্যের নির্ভরযোগ্য বাজার দর প্ল্যাটফর্ম। শাকসবজি, চাল, ডাল, মাছ, মাংস ও অন্যান্য পণ্যের প্রতিদিনের দরদাম জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      className={`${hindSiliguri.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#f4f6f5] text-gray-800">
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#ffffff",
              color: "#1c241e",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
              borderRadius: "12px",
              fontSize: "14px",
              fontFamily: "var(--font-hind-siliguri), sans-serif",
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

