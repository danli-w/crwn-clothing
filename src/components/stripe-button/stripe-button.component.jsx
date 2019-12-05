import React from 'react';
import StripeCheckout from 'react-stripe-checkout';


const StripeCheckoutButton =({ price }) => {
    const priceForStripe = price*100;
    const publishableKey = 'pk_test_dInGiNGIpTZIVGJ7knO9DRSl00ulWH7Elk';


    const onToken = token =>{
        console.log(token);
        alert('Payment Success');
    }
    return (
        <StripeCheckout 
            label ='Pay Now'
            name ='CRWN Clothing Ltd.'
            billingAddress
            shippingAddress
            image = 'https://svgshare.com/i/CUz.svg'
            description = {`Your total is $${price}`}
            amount ={priceForStripe}
            panelLabel = 'Pay Now'
            token ={onToken}
            stripeKey={publishableKey}
        />
    );
};

export default StripeCheckoutButton;
