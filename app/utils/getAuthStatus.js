"use client";
import React from "react";
import { useEffect, useState } from "react";

import ServerPage from "../watch/page";

export function getAuthStatus(foundUser) {
  localStorage.setItem("auth", JSON.stringify(foundUser));
}

export function getAuthInWatch() {
  if (typeof window !== "undefined") {
    const userEmailTemp = localStorage.getItem("auth");
    return JSON.parse(userEmailTemp);
  }
  return null; 
}



export default function ClientPage() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = getAuthInWatch();
    setUserEmail(email);
  }, []);

  return userEmail && <ServerPage userEmail={userEmail} /> 
}
