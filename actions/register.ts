"use server";

import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import * as z from "zod";
import { RegisterSchema } from "../schemas";
import { getUserByEmail } from "../data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "../src/lib/mail";
import { getAllCoordinates } from "../data/user";
export const register = async (values: any) => {
  const { recaptcha_token, ...value } = values;
  const validatedFields = RegisterSchema.safeParse(value);

  if (!validatedFields.success) {
    return { error: "Invalid Fields" };
  }
  // const coordinates = await getAllCoordinates();
  // console.log(
  //   coordinates.map((coord) => {
  //     console.log(coord.latitude);
  //     console.log(coord.longitude);
  //   })
  // );

  if (!recaptcha_token) {
    return { error: "reCAPTCHA token not found! Refresh and try again" };
  }
  const recaptchaSecretKey = process.env.RECAPTCHA_SECRET_KEY;

  // Verify reCAPTCHA token
  const recaptchaResponse = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${recaptcha_token}`,
    { method: "POST" }
  );
  const recaptchaResult = await recaptchaResponse.json();

  console.log(recaptchaResult);
  if (!recaptchaResult.success) {
    return { error: recaptchaResult["error-codes"] };
  }

  const { email, password, name, number, role, latitude, longitude } =
    validatedFields.data;
  // console.log(validatedFields.data);
  if (
    role.toLocaleLowerCase() !== "farmer" &&
    role.toLocaleLowerCase() !== "buyer"
  ) {
    return { error: "Role should be entered properly" };
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  const caseRole = role.toLowerCase();

  if (existingUser) {
    return { error: "Email already exists" };
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      number,
      role: caseRole,
      latitude,
      longitude,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
