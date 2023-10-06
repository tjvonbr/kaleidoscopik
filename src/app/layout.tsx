import { Header } from "@/components/Header";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kaleidoscopik",
  description: "Create your own AI-gnerated coloring books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
