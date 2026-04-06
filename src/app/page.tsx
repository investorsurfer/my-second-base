'use client';

import { useState, useEffect } from 'react';
import { 
  useSendTransaction, 
  useWaitForTransactionReceipt, 
  useAccount, 
  useSwitchChain 
} from 'wagmi';
import { parseEther } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import sdk from '@farcaster/frame-sdk';

const COMPLIMENTS = [
  "Your code is as clean as a fresh Base block! 💎",
  "You're building the future, one transaction at a time. 🚀",
  "WAGMI because of people like you. 🙌",
  "Your wallet address is the most beautiful hex string I've seen. ✨",
  "You're a legendary Base builder! 🏗️"
];

export default function Home() {
  const { isConnected, chainId } = useAccount();
  const { switchChain } = useSwitchChain();
  const [compliment, setCompliment] = useState("");
  
  const { data: hash, sendTransactionAsync, isPending, error: sendError } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

  // UPDATED: Using your provided receiving address
  const RECEIVER_ADDRESS = '0xd0793C144c7E09c3D7e0da7a8384c31D0577f838' as `0x${string}`;

  useEffect(() => {
    sdk.actions.ready();
  }, []);

  useEffect(() => {
    if (isConfirmed) {
      const random = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
      setCompliment(random);
    }
  }, [isConfirmed]);

  const handlePay = async () => {
    if (chainId !== 8453) {
      switchChain({ chainId: 8453 });
      return;
    }

    try {
      if (sendTransactionAsync) {
        await sendTransactionAsync({
          to: RECEIVER_ADDRESS,
          value: parseEther('0.000004'),
          gas: BigInt(21000),
          type: 'legacy', 
        });
      }
    } catch (e) {
      console.error("Wallet Trigger Failed:", e);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0052ff] text-white p-6 text-center">
      <div className="bg-black/30 p-8 rounded-3xl border border-white/10 shadow-2xl max-w-sm w-full">
        <h1 className="text-3xl font-black mb-4 uppercase tracking-tighter italic">Compliment Bot</h1>
        
        <div className="flex justify-center mb-8">
          <ConnectButton />
        </div>

        {isConnected && !isConfirmed && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <p className="mb-6 text-blue-100 text-sm">
              {chainId === 8453 ? "Ready! Send 1¢ for a compliment." : "Switch to Base to continue."}
            </p>
            
            <button 
              onClick={handlePay}
              disabled={isPending || isConfirming}
              className="w-full bg-white text-[#0052ff] font-bold py-4 rounded-2xl hover:scale-105 transition-all shadow-lg disabled:opacity-50"
            >
              {chainId !== 8453 ? "Switch to Base" : isPending ? "Confirm in Wallet..." : isConfirming ? "Processing..." : "Pay 1¢ for Compliment"}
            </button>
            
            {sendError && (
              <div className="mt-4 p-2 bg-red-900/30 rounded border border-red-500/50">
                <p className="text-[10px] text-red-200 break-words font-mono uppercase">
                  {sendError.name === 'UserRejectedRequestError' ? "Transaction Cancelled" : "Check Wallet / Balance"}
                </p>
              </div>
            )}
          </div>
        )}

        {isConfirmed && (
          <div className="animate-in zoom-in duration-500">
            <div className="bg-white/10 p-6 rounded-xl mb-4 border border-white/20 text-xl font-bold italic">
              "{compliment}"
            </div>
            <button onClick={() => window.location.reload()} className="text-xs underline opacity-50 hover:opacity-100">
              Get another?
            </button>
          </div>
        )}
      </div>
    </main>
  );
}