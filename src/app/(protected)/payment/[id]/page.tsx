"use client";

// import { useEffect, useCallback } from 'react';
// // import Image from 'next/image';
// import "../../../styles/payment.css";

// function Payment() {

//   useEffect(() => {
//     const script = document.createElement('script');
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//     script.async = true;
//     document.body.appendChild(script);

//     return () => {
//       document.body.removeChild(script);
//     }
//   }, []);

//   const pay = useCallback(() => {
//     const amount = document.getElementById('amount').value;

//     if (!amount || amount <= 0) {
//       alert('Please enter a valid amount.');
//       return;
//     }

//     const options = {
//       key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay Key ID
//       amount: amount * 100, // Amount in paise
//       currency: 'INR',
//       name: 'Your Company Name',
//       description: 'Payment for your transaction',
//       image: '/path-to-your-logo.png', // Replace with the path to your logo
//       handler: function (response) {
//         if (response.error) {
//           alert('Payment failed: ' + response.error.description);
//         } else {
//           alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
//           // Optionally, send response.razorpay_payment_id to your server for further processing
//         }
//       },
//       prefill: {
//         name: 'Customer Name',
//         email: 'customer.email@example.com',
//         contact: '1234567890'
//       },
//       notes: {
//         address: 'Customer Address'
//       },
//       theme: {
//         color: '#388e3c'
//       },
//       modal: {
//         ondismiss: function() {
//           alert('Payment process was canceled.');
//         }
//       }
//     };

//     const rzp1 = new Razorpay(options);
//     rzp1.open();
//   }, []);

//   return (
//     <div className="payment">
//       <div className="container">
//         <div className="product-details">
//           <h2>Product Name</h2>
//           <img
//             src="https://via.placeholder.com/600x400"
//             alt="Product Image"
//             width={600}
//             height={400}
//           />
//           <p>
//             This is a detailed description of the product. It provides information about the features, specifications, and benefits of the product. Make sure to include any relevant details that will help the user understand what they are purchasing.
//           </p>
//           <p><strong>Price: ₹999</strong></p>
//         </div>

//         <div className="payment-container">
//           <h1>Make a Payment</h1>
//           <label htmlFor="amount">Amount (INR):</label>
//           <input
//             type="number"
//             id="amount"
//             placeholder="Enter amount"
//             required
//             aria-label="Amount in INR"
//           />
//           <button onClick={pay}>Pay Now</button>
//           <p aria-live="polite">Your payment will be processed securely via Razorpay.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Payment;

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import "@/components/styles/payment.css";
import { useParams } from "next/navigation";
// import dotenv from "dotenv"

// Load Stripe
const stripePromise = loadStripe(
  "pk_test_51PdxcLRoQg51LGuWG0n0LEZxTh3YhLaqj3y8gRpS8BQLsQLydXycX10pfzgAa3NCke8gkKofe28q3vLGu3cENrKK00VK3BJ4MF"
);

function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const contractId: any = id;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    // const amount = parseFloat(document.getElementById('amount').value);
    const amountInput = document.getElementById("amount") as HTMLInputElement;
    const amount: number = parseFloat(amountInput.value);

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    setLoading(true);

    // Call your backend to create a PaymentIntent
    const res = await fetch(`/api/payment/${contractId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount }),
    });

    const { clientSecret, contractId: any } = await res.json();

    // Confirm the card payment
    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardNumberElement)!, // Add '!' to assert non-null assertion
        },
      }
    );

    if (error) {
      alert("Payment failed: " + error.message);
    } else if (paymentIntent.status === "succeeded") {
      alert("Payment successful! Payment ID: " + paymentIntent.id);
      const response = await fetch("/api/contract/completeContract", {
        method: "PUT",
        body: JSON.stringify({ contractId, paymentIntent: paymentIntent.id }),
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Amount (INR):
        <input
          type="number"
          id="amount"
          placeholder="Enter amount"
          required
          aria-label="Amount in INR"
        />
      </label>

      {/* <div className="card-details-box">
        <label htmlFor="card-element">Card Details:</label>
        <CardElement id="card-element" className="card-element" />
      </div> */}

      <div className="card-details-box text-black">
        <label htmlFor="card-number">Card Number:</label>
        <CardNumberElement id="card-number" className="card-element" />

        <label htmlFor="card-expiry">Expiration Date:</label>
        <CardExpiryElement id="card-expiry" className="card-element" />

        <label htmlFor="card-cvc">CVC:</label>
        <CardCvcElement id="card-cvc" className="card-element" />
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
}

export default function Payment() {
  return (
    <div className="payment">
      <div className="container">
        {/* <div className="product-details">
          <h2>Product Name</h2>
          <img src="https://via.placeholder.com/600x400" alt="Product Image" />
          <p>
            This is a detailed description of the product. It provides information about the features, specifications, and benefits of the product. Make sure to include any relevant details that will help the user understand what they are purchasing.
          </p>
          <p><strong>Price: ₹999</strong></p>
        </div> */}

        <div className="payment-container">
          <h1>
            <strong>Make a Payment</strong>
          </h1>
          <Elements stripe={stripePromise}>
            <CheckoutForm/>
          </Elements>
          <p aria-live="polite">
            Your payment will be processed securely via Stripe.
          </p>
        </div>
      </div>
    </div>
  );
}
