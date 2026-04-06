import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Second Base",
  description: "A professional Base & Farcaster App",
  other: {
    "fc:frame": JSON.stringify({
      version: "next",
      imageUrl: "https://placehold.co/600x400/0052ff/white?text=My+Second+Base",
      button: {
        title: "Launch App",
        action: {
          type: "launch_frame",
          name: "My Second Base",
          url: "https://your-app-url.vercel.app",
          splashImageUrl: "https://placehold.co/200x200/0052ff/white",
          splashBackgroundColor: "#0052ff",
        },
      },
    }),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}