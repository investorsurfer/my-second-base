import type { Metadata } from "next";
import "./globals.css";
import { Providers } from './providers';

export const metadata: Metadata = {
  title: "My Second Base",
  description: "A professional Base & Farcaster App",
  other: {
    // Base Smart Wallet Identification
    "base:app_id": "69d2b14a759b9a105ccd8305",
    
    // Farcaster v2 "Next" Frame Specification
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://placehold.co/600x400/0052ff/white?text=Compliment+Bot",
      button: {
        title: "Launch App",
        action: {
          type: "launch_frame",
          name: "Compliment Bot",
          url: "https://my-second-base.vercel.app", 
          splashImageUrl: "https://farcaster.xyz/splash.png",
          splashBackgroundColor: "#0052ff",
        },
      },
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Redundant but safe: manually defining the App ID for older parsers */}
        <meta name="base:app_id" content="69d2b14a759b9a105ccd8305" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}