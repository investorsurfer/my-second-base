import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Second Base",
  description: "A professional Base & Farcaster App",
  other: {
    "base:app_id": "69d2b14a759b9a105ccd8305",
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://placehold.co/600x400/0052ff/white?text=My+Second+Base",
      button: {
        title: "Launch App",
        action: {
          type: "launch_frame",
          name: "My Second Base",
          url: "https://my-second-base.vercel.app", // Make sure this matches your real URL
          splashImageUrl: "https://placehold.co/200x200/0052ff/white",
          splashBackgroundColor: "#0052ff",
        },
      },
    }),
  },
};

import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69d2b14a759b9a105ccd8305" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}