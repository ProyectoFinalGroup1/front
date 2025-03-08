import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext";
import ExcludeWrapper from "@/components/ExcludeWrapper";
import ChatbotComponent from "@/chatBot/Chatbot";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Valle de Paz - Cementerio Parque",
  description: "Un lugar de paz y descanso eterno. Atención las 24 hs.",
  openGraph: {
    title: "Valle de Paz - Cementerio Parque",
    description: "Un lugar de paz y descanso eterno. Atención las 24 hs.",
    images: ["/images/logo.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <AuthProvider>
          <Toaster position="top-right" />
          <ExcludeWrapper>
            <Navbar />
          </ExcludeWrapper>
          <main className="flex-1 " >{children}</main>
          <Footer />
        <ChatbotComponent />
        </AuthProvider>
      </body>
    </html>
  );
}

