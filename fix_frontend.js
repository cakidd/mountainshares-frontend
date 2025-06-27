// Updated handlePurchase function
const handlePurchase = async () => {
  console.log("Stripe Key Debug:", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  
  if (!walletAddress || !email) {
    alert('Please connect wallet and enter email');
    return;
  }

  setLoading(true);

  try {
    console.log('Making API call to backend...');
    const response = await fetch('https://mountainshares-backend-3nzzsyxfi-mountainshares-team.vercel.app/api/create-checkout-session', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        quantity,
        customerEmail: email,
        walletAddress
      })
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', response.headers);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Response data:', data);

    if (data.url) {
      console.log('Redirecting to:', data.url);
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
