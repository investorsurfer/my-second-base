'use client';

import { useState, useEffect } from 'react';
import { useSendTransaction, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit'; // This is the key import
import sdk from '@farcaster/frame-sdk';

const COMPLIMENTS = [
  "Your code is as clean as a fresh Base block! 💎",
  "You're building the future, one transaction at a time. 🚀",
  "WAGMI because of people like you. 🙌"
];

export default function Home() {
  const { isConnected } = useAccount();
  const [compliment, setCompliment] = useState("");
  const { data: hash, sendTransaction, isPending } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      const random = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
      setCompliment(random);
    }
  }, [isConfirmed]);

  const handlePay = () => {
    sendTransaction({
      to: '0xYOUR_ACTUAL_WALLET_ADDRESS', // Make sure this is YOUR address
      value: parseEther('0.000004'), 
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0052ff] text-white p-6 text-center">
      <div className="bg-black/30 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter">Compliment Bot</h1>
        
        {/* This replaces the old alert button */}
        <div className="flex justify-center mb-8 font-sans">
          <ConnectButton label="Connect Wallet" />
        </div>

        {isConnected && !isConfirmed && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="mb-6 text-blue-100 text-sm">Connected! Send 1¢ to receive an on-chain compliment.</p>
            <button 
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className="w-full bg-white text-[#0052ff] font-bold py-4 rounded-2xl hover:scale-105 transition-all"
            >
              {isPending ? "Check Wallet..." : "Pay 1¢ for Compliment"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}