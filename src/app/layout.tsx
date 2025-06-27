import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MountainShares",
  description: "Decentralized mountain property ownership",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script src="https://js.stripe.com/v3/" async></script>
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
