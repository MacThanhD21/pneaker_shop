import Stripe from "stripe";
import axios from "axios";
// Initialize Stripe with secret key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);




export async function doStripePayment(req, res) {
  try {
    const { amount, currency = 'vnd' } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Convert to cents
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

const generateAccessToken = async () => {
  const auth = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`).toString("base64");

  try {
    const response = await axios.post(`${PAYPAL_API}/v1/oauth2/token`, "grant_type=client_credentials", {
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    return response.data.access_token;
  } catch (error) {
    console.error("Error fetching access token:", error);
    throw new Error("Failed to generate PayPal access token");
  }
};


const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
const PAYPAL_API = "https://api-m.sandbox.paypal.com";


export async function doPaypalPayment(req, res) {
  const { orderID } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const response = await axios.get(`${PAYPAL_API}/v2/checkout/orders/${orderID}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const order = response.data;

    if (order.status === "COMPLETED") {
      return res.json({ verified: true, order });
    } else {
      return res.json({ verified: false });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({ verified: false, error: "Payment verification failed" });
  }
}

