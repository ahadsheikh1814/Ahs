import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/provider/theme-provider";
import Navbar from "@/components/layout/Navbar";
import Container from "@/components/layout/Container";
import MsgBtn from "@/components/messages/MsgBtn";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahad Sheikh",
  description: "Personal website of Ahad Sheikh, a web devloper.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.webp",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Ahref - */}
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="30Lno/g3E8Kntz1N4m8amA"
          async
        ></script>
        {/* - Ahref */}
      </head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MsgBtn />
          <Navbar />
          <Container>
            {children}
            <Footer />
          </Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
