import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeElement } from "./ui/common/theme";
import "./globals.css";
import "@radix-ui/themes/styles.css"
import ReduxProvider from "@/redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog Book",
  description: "My Little pet blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider><ThemeElement>{children}</ThemeElement></ReduxProvider>
        
      </body>
    </html>
  );
}
