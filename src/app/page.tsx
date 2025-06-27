'use client';

import { useState } from 'react';
import WalletConnect from '@/components/mountainshares/WalletConnect';
import PurchaseForm from '@/components/mountainshares/PurchaseForm';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState<string>('');

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            🏔️ MountainShares
          </h1>
          <p className="text-lg text-gray-600">
            West Virginia's Democratic Digital Currency
          </p>
          <p className="text-sm text-gray-500 mt-2">
            2% of every purchase supports local West Virginia programs
          </p>
        </div>
        
        <WalletConnect onWalletConnect={setWalletAddress} />
        
        <div className="mt-8">
          <PurchaseForm walletAddress={walletAddress} />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Powered by Arbitrum One • Secured by OpenZeppelin</p>
          <p>Backend API: Vercel Pro Plan • Payment Processing: Stripe</p>
        </div>
      </div>
    </main>
  );
}
