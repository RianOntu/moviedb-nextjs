import React from "react";
import Link from "next/link";
import { registerUser } from "../_actions/actions";

function RegisterUser() {
  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-6">
            Create Your Account
          </h1>
          <form action={registerUser} id="signupForm" className="space-y-4">
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <div className="text-left text-moviedb-gray text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  className="mr-2"
                  required
                />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-moviedb-gray">
            Already have an account?{" "}
            <Link href="/login" className="text-white hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterUser;
