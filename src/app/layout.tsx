import type { Metadata } from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "Review Challenge",
  description: "GReview - Challenge Spikes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-[#7B61FF]`}>{children}</body>
    </html>
  );
}
