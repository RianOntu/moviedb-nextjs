"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_Hooks/useAuth";
import { userLogin } from "../_actions/actions";
import { getAuthStatus } from "../utils/getAuthStatus";

function Page() {
  const [error, setError] = useState(null);
  const { setAuth } = useAuth();
  const router = useRouter();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      if (!formData.get("email") || !formData.get("password")) {
        throw new Error("Please provide Email and Password");
      }
      const foundUser = await userLogin(formData);
      console.log("founduser", foundUser);

      if (foundUser) {
        // setAuth(foundUser);
        getAuthStatus(foundUser);
        router.push("/");
      } else {
        throw new Error("Email or Password Not Matched");
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  }
  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center mb-6">
          <h1 className="text-white text-3xl font-bold mb-4">Sign In</h1>

          <form onSubmit={handleSubmit} id="loginForm" className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email or phone number"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <button
              type="submit"
              className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 flex justify-between text-moviedb-gray text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <div className="mt-6 text-moviedb-gray">
            New to moviedb?
            <Link href="/register" className="text-white hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
