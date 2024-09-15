import { NextResponse } from "next/server";
import Stripe from "stripe";
// import dotenv from "dotenv";

// Initialize Stripe
const stripe = new Stripe(
  "sk_test_51PdxcLRoQg51LGuW9hTkP3Bsp9H4KUstaV5khrLS6B7TelcdXCF3VOvGwmMBi6RqrZU4bP4i6aHrDMvzuV3VGiGD00kTGCCUzT",
  {
    apiVersion: "2024-06-20",
  }
);

// Handle POST request to create a PaymentIntent
export async function POST(req: Request) {
  try {
    const { amount } = await req.json();
    const parts = req.url.split("/");
    const contractId = parts[parts.length - 1].toString();
    console.log(contractId);

    // Create a PaymentIntent with the amount
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert amount to cents
      currency: "inr",
      payment_method_types: ["card"],
    });

    // Return the client secret to the client
    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret, contractId },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error creating PaymentIntent:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
