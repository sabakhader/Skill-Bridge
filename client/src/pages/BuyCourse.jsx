import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_...');

export default function BuyCourse() {
  const handleCheckout = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/payment/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: 50, name: 'Course Title', description: 'Great course!' })
    });

    const { id } = await res.json();
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: id });
  };

  return <button onClick={handleCheckout}>Buy for $50</button>;
}
