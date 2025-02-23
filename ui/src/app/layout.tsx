import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Green vibes | community",
  description:
    "Join our vibrant plants community! Explore expert tips, connect with fellow enthusiasts, and cultivate your green thumb. Discover a supportive space for plant lovers to share triumphs, troubleshoot challenges, and grow together.",
};

function RootLayout({ children }: { children: React.ReactNode; params: any }) {
  return (
    <html lang="en">
      <body className={lora.className}>
        <header>
          <h1 className="invisible">
            Welcome to Green vibes: Thrive with Confidence!
          </h1>
          <Header />
        </header>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

export default RootLayout;
