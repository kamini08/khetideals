"use client"
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

export default function CheckoutForm() {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);
  
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
      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });
  
      const { clientSecret } = await res.json();
  
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
  