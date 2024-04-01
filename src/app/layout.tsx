import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ThemeButton from "./ui/common/theme";
import { ThemeElement } from "./ui/common/theme";
import "./globals.css";
import "@radix-ui/themes/styles.css"


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
        <ThemeElement children={children}/>
      </body>
    </html>
  );
}
