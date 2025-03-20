import Stripe from "stripe";

// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

export async function doPayment(req, res) {
    try {
        const { amount, currency = 'vnd' } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
          amount: amount , // Convert to cents
          currency,
          automatic_payment_methods: {
            enabled: true,
          },
        });
    
        res.json({ 
          clientSecret: paymentIntent.client_secret,
        });
      } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).json({ error: error.message });
      }
    }