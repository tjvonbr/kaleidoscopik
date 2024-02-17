import { Header } from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "wetbrush",
  description: "Create your own AI-gnerated coloring books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
