


import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


const PUBLIC_API_KEY = 'pk_test_51R4Xf4GTM9kjEgZEfqer5WAVeLo6JPh88EzoR8CqjbcPFMOvtszxV1C84BoFKp1lv11sBrnsDWFQiKuJtr6skKYh00KiefLUzY'

const stripePromise = loadStripe(PUBLIC_API_KEY); 

const StripeContainer = ({ children }) => {
    return (
      <Elements stripe={stripePromise}>
        {children}
      </Elements>
    );
  };
  
  export default StripeContainer;