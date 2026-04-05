import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrintNest | Premium Expressive Tees",
  description: "Express your style with PrintNest's premium printed t-shirts for men, women, and couples. Modern, high-quality streetwear for Gen Z.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-neon-green selection:text-black`}>
        <CartProvider>
          <WishlistProvider>
            <Toaster position="bottom-right" toastOptions={{
              style: {
                background: '#0a0a0a',
                color: '#fff',
                borderRadius: '0px',
                border: '1px solid #1a1a1a',
                fontSize: '12px',
                fontWeight: 'bold',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              },
              success: {
                iconTheme: {
                  primary: '#39FF14',
                  secondary: '#000',
                },
              },
            }} />
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
