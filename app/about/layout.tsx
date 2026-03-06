import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | Ahad Sheikh",
  description:
    "About Ahad Sheikh – a web developer passionate about building modern, user-friendly applications.",
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
  return <section>{children}</section>;
}
