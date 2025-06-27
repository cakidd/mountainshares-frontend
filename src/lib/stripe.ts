// Load Stripe.js from CDN instead of npm package
export const loadStripe = (publishableKey: string) => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve(null);
      return;
    }

    if (window.Stripe) {
      resolve(window.Stripe(publishableKey));
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.onload = () => {
      resolve(window.Stripe ? window.Stripe(publishableKey) : null);
    };
    document.head.appendChild(script);
  });
};

declare global {
  interface Window {
    Stripe: any;
  }
}
