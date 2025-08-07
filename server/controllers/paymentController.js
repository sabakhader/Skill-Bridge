const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET);

exports.createCheckoutSession = async (req, res) => {
  const { amount, name, description } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name, description },
          unit_amount: amount * 100, // in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/payment-success`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
