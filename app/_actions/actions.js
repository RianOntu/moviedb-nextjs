'use server';

import { redirect } from "next/navigation";
import { createUser } from "../_query/query";

export async function registerUser(formData) {
  const updatedForm = {};
  formData.forEach((value, key) => {
    updatedForm[key] = value;
  });

  // Convert agreeTerms to boolean
  updatedForm.agreeTerms = updatedForm.agreeTerms === "on";

  // Password confirmation check
  if (updatedForm.password !== updatedForm.confirmPassword) {
    throw new Error("Passwords do not match.");
  }

  // Remove confirmPassword before storing in the database
  delete updatedForm.confirmPassword;

  // Validation check for required fields
  const requiredFields = ["first_name", "last_name", "email", "password", "agreeTerms"];
  for (const field of requiredFields) {
    if (!updatedForm[field]) {
      throw new Error(`Field ${field} is required.`);
    }
  }

  try {
    const createdUser = await createUser(updatedForm);
    console.log("User successfully created:", createdUser);
    redirect("/login");
  } catch (error) {
    console.error("Error in user creation:", error);
    throw error;
  }
}
