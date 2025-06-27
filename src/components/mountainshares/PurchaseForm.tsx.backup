'use client';

import { useState } from 'react';

interface PurchaseFormProps {
  walletAddress?: string;
}

export default function PurchaseForm({ walletAddress }: PurchaseFormProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handlePurchase = async () => {
    if (!walletAddress || !email) {
      alert('Please connect wallet and enter email');
      return;
    }

    setLoading(true);
    
    try {
      // Call your EXISTING backend API directly
      const response = await fetch('https://mountainshares-backend-3nzzsyxfi-mountainshares-team.vercel.app/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity,
          customerEmail: email,
          walletAddress
        })
      });
      
      const data = await response.json();
      
      if (data.url) {
        // Direct redirect to Stripe checkout (no Stripe.js needed)
        window.location.href = data.url;
      } else {
        alert('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      alert('Purchase failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const totalCost = (quantity * 1.35).toFixed(2);
  const governanceFee = (quantity * 0.02).toFixed(2);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-800 mb-4">
        🏔️ MountainShares Purchase
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="flex justify-between">
            <span>Token Cost:</span>
            <span>${quantity}.00</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Governance Fee (2%):</span>
            <span>${governanceFee}</span>
          </div>
          <div className="flex justify-between">
            <span>Stripe Fee:</span>
            <span>${(quantity * 0.33).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg border-t pt-2">
            <span>Total:</span>
            <span>${totalCost}</span>
          </div>
        </div>
        
        <button
          onClick={handlePurchase}
          disabled={loading || !walletAddress || !email}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Processing...' : `Purchase ${quantity} MountainShares`}
        </button>
        
        {!walletAddress && (
          <p className="text-red-500 text-sm">Please connect your wallet first</p>
        )}
      </div>
    </div>
  );
}
