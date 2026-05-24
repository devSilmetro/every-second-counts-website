import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Every Second Count — When Violence Strikes, Every Second Count.",
  description:
    "Every Second Count is a U.S. nonprofit building life-saving evacuation technology for schools, places of worship, and community spaces — and supporting families impacted by gun violence.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300..700;1,8..60,300..700&family=Public+Sans:ital,wght@0,300..700;1,300..700&family=JetBrains+Mono:wght@400;500&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
