import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeElement } from "./ui/common/theme";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import ReduxProvider from "@/redux/provider";
import { SessionProvider } from "next-auth/react";
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
      <body suppressHydrationWarning={true} className={inter.className}>
        <SessionProvider>
          <ReduxProvider>
            <ThemeElement>{children}</ThemeElement>
          </ReduxProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
