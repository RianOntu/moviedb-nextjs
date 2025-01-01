"use server";

import { redirect } from "next/navigation";
import { createUser, findUserByCredentials } from "../_query/query";


export async function registerUser(formData) {
 
  const created = await createUser(formData);
  if (created) {
    redirect("/login");
  }
}

export async function userLogin(formData) {
  try {
    const credential = {};
    credential.email = formData.get("email");
    credential.password = formData.get("password");
    const found = await findUserByCredentials(credential);
    return found;
  } catch (error) {
    throw error;
  }
}
