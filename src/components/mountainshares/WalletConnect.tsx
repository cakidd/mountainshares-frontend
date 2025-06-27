'use client';

import { useState } from 'react';

interface WalletConnectProps {
  onWalletConnect: (address: string) => void;
}

interface KycStatus {
  verified: boolean;
  whitelisted: boolean;
  kycLevel: number;
  registryConfigured: boolean;
  merkleRootConfigured: boolean;
  status: string;
}

export default function WalletConnect({ onWalletConnect }: WalletConnectProps) {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [kycStatus, setKycStatus] = useState<KycStatus | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts'
        });
        
        const address = accounts[0];
        setWalletAddress(address);
        onWalletConnect(address);
        
        // Check KYC status with your existing endpoint
        await checkKycStatus(address);
      } catch (error) {
        console.error('Failed to connect wallet:', error);
      }
    } else {
      alert('Please install MetaMask to use MountainShares');
    }
  };

  const checkKycStatus = async (address: string) => {
    try {
      const response = await fetch('https://mountainshares-backend-3nzzsyxfi-mountainshares-team.vercel.app/api/merkle-kyc-simple', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          walletAddress: address,
          kycLevel: 1
        })
      });
      
      const data = await response.json();
      setKycStatus(data);
    } catch (error) {
      console.error('KYC check failed:', error);
    }
  };

  return (
    <div className="text-center p-4">
      {!walletAddress ? (
        <button
          onClick={connectWallet}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="space-y-2">
          <p className="text-green-600">
            ✅ Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </p>
          {kycStatus && (
            <div className="text-sm">
              <p>KYC Status: {kycStatus.verified ? '✅ Verified' : '⏳ Pending'}</p>
              <p>Registry: {kycStatus.registryConfigured ? '✅' : '❌'}</p>
              <p>Merkle Root: {kycStatus.merkleRootConfigured ? '✅' : '❌'}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
