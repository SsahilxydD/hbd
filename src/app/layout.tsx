import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "For You",
  description: "A private moment.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
