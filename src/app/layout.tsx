import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/themeContext";
import { CartProvider } from "@/lib/cartContext";
import { AuthProvider } from '@/lib/authContext';
import { ToastProvider } from '@/lib/toastContext';
import { Toaster } from "@/components/ui/Toast";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "StyleHub - Fashion Store",
  description: "Your one-stop shop for trendy fashion items",
  keywords: "clothing, fashion, men's clothing, women's clothing, online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} transition-colors duration-200`}>
        <ThemeProvider>
          <CartProvider>
            <AuthProvider>
              <ToastProvider>
                {children}
                <Toaster />
              </ToastProvider>
            </AuthProvider>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
