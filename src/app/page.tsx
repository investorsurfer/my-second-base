'use client';

import { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import sdk from '@farcaster/frame-sdk';

const COMPLIMENTS = [
  "Your code is as clean as a fresh Base block! 💎",
  "You're building the future, one transaction at a time. 🚀",
  "WAGMI because of people like you. 🙌",
  "Your wallet address is the most beautiful hex string I've seen. ✨",
  "You're a legendary Base builder! 🏗️"
];

export default function Home() {
  const [compliment, setCompliment] = useState("");
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      const randomCompliment = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
      setCompliment(randomCompliment);
    }
  }, [isConfirmed]);

  const handlePay = () => {
    sendTransaction({
      to: '0xd0793C144c7E09c3D7e0da7a8384c31D0577f838', // <-- CHANGE THIS TO YOUR ADDRESS
      value: parseEther('0.000004'), // Approx 1 cent in ETH at 2026 prices
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0052ff] text-white p-6 text-center">
      <div className="bg-black/30 p-8 rounded-3xl border border-white/20 shadow-2xl max-w-sm">
        <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Compliment Machine</h1>
        
        {!isConfirmed ? (
          <>
            <p className="mb-6 text-blue-100">Send 1 cent to receive a professional developer compliment on-chain.</p>
            <button 
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className="w-full bg-white text-[#0052ff] font-bold py-4 rounded-2xl hover:scale-105 transition-transform"
            >
              {isPending ? "Confirm in Wallet..." : isConfirming ? "Processing..." : "Pay 1¢ for Compliment"}
            </button>
          </>
        ) : (
          <div className="animate-bounce">
            <p className="text-2xl font-bold italic">"{compliment}"</p>
            <button onClick={() => window.location.reload()} className="mt-4 text-xs underline opacity-50">Buy another?</button>
          </div>
        )}
      </div>
    </main>
  );
}