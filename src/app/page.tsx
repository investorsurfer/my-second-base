'use client';

import { useEffect } from 'react';
import sdk from '@farcaster/frame-sdk';

export default function Home() {
  useEffect(() => {
    // This tells Farcaster the app is loaded
    sdk.actions.ready();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0052ff] text-white p-4">
      <div className="bg-black/20 p-8 rounded-2xl backdrop-blur-md border border-white/10 text-center max-w-sm">
        <h1 className="text-3xl font-bold mb-2">My Second Base</h1>
        <p className="text-blue-100 mb-8 font-mono text-sm">Base Network • Farcaster Enabled</p>
        
        <button 
          onClick={() => alert("Connecting via Base...")}
          className="w-full bg-white text-[#0052ff] font-bold py-3 px-6 rounded-xl hover:bg-blue-50 transition-colors mb-4"
        >
          Connect Wallet
        </button>
        
        <p className="text-xs text-blue-200 opacity-70">
          Deployed via Vercel & GitHub Codespaces
        </p>
      </div>
    </main>
  );
}