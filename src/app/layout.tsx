import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Uttam Galva Innovative Solutions | Steel Construction Expo Asia 2026",
    template: "%s | Uttam Galva Innovative Solutions",
  },
  description: "Visitor Feedback & Review Form - Uttam Galva Innovative Solutions Pvt Ltd at Steel Construction Expo Asia 2026, Mumbai (Stall 608).",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="site-shell flex min-h-screen flex-col">
        <Header />
        <main className="relative z-10 flex w-full flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
