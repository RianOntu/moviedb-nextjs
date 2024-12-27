"use client";
import React from "react";
import { useEffect, useState } from "react";

import ServerPage from "../watch/page";

export function getAuthStatus(foundUser) {
  localStorage.setItem("auth", JSON.stringify(foundUser));
}

export function getAuthInWatch() {
  const userEmailTemp = localStorage.getItem("auth");
  const userEmail = JSON.parse(userEmailTemp);
  
  
  return userEmail
}



export default function ClientPage() {
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const email = getAuthInWatch();
    setUserEmail(email);
  }, []);

  return userEmail && <ServerPage userEmail={userEmail} /> 
}
