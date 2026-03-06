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
  keywords: [
    "Ahad Sheikh",
    "Ahad Sheikh developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Ahad Sheikh" }],
  creator: "Ahad Sheikh",
  metadataBase: new URL("https://ahadsheikh.vercel.app"),
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Ahad Sheikh - Frontend Developer",
    description:
      "Building AHs Lab and other cool things. Frontend Developer Specializing in Interactive UI & Performance.",
    url: "https://ahadsheikh.vercel.app",
    siteName: "Ahad Sheikh",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ahad Sheikh - Frontend Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahad Sheikh - Frontend Developer",
    description:
      "Building AHs Lab and other cool things. Frontend Developer Specializing in Interactive UI & Performance.",
    images: ["/og-image.png"],
    creator: "@AhadSheikh1814_",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.webp",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ahad Sheikh",
  url: "https://ahadsheikh.vercel.app",
  jobTitle: "Frontend Developer",
  sameAs: [
    "https://github.com/ahadsheikh1814",
    "https://x.com/AhadSheikh1814_",
  ],
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
        {/* google serch console - */}
        <meta
          name="google-site-verification"
          content="f8sGcHre4r-fcTDQVnnND06gJ2Cm0ji45B0bkNdbKw4"
        />
        {/* - google serch console */}
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </body>
    </html>
  );
}
