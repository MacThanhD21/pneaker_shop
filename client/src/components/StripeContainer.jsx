
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const PUBLIC_API_KEY = 'pk_test_51R77pLQwfT84hjKCzAvbl7o8KL2hQl38yObJXhIPOJzJGU4Bnn7rB2fzhMuc3zJlrIKE84et861x0kzNB2i0xSPE007wNbm1oF'

const stripePromise = loadStripe(PUBLIC_API_KEY);

const StripeContainer = ({ children }) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeContainer;