
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckout = async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: req.body.items.map(i => ({ price_data: { currency: 'inr', product_data: { name: i.name }, unit_amount: Math.round(i.price*100) }, quantity: i.quantity })),
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/dashboard`,
    cancel_url: `${process.env.CLIENT_URL}/cart`
  });
  res.json({ url: session.url });
};
