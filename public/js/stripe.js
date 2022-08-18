import axios from 'axios';
// import Stripe from 'stripe';

export const bookTour = async (tourId) => {
  try {
    // Get checkout session from endpoint
    const stripe = Stripe(
      'pk_test_51LXX1nEXQ1MmZrzRLsCdxMcj3sQdCwYFBV43kYLUFbg2Yu8zukkqca2azprscVFSoMW1zUguulIflpVB2q01jPFr00cq6BIhkL'
    );

    const session = await axios(
      `/api/v1/booking/checkout-session/${tourId}`,
      {
        method: 'GET',
      }
    );
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
  }
  //
};
