import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Plants care",
  description: "With care for plants",
};

function RootLayout({ children }: { children: React.ReactNode; params: any }) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
