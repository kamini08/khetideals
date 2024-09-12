import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dotenv from "dotenv"

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

// Handle POST request to create a PaymentIntent
export async function POST(req:Request) {
  try {
    const { amount } = await req.json();

    // Create a PaymentIntent with the amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: 'inr',
      payment_method_types: ['card'],
    });

    // Return the client secret to the client
    return NextResponse.json({ clientSecret: paymentIntent.client_secret }, { status: 200 });
  } catch (error:any) {
    console.error('Error creating PaymentIntent:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

