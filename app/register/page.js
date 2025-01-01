"use client";
import React, { useState } from "react";
import Link from "next/link";
import { registerUser } from "../_actions/actions";

function RegisterUser() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check password match
      if (formData.password !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const createdUser = await registerUser(formData);
      console.log("createdUser", createdUser);

      if (createdUser) {
        // Registration successful
        setLoading(false);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
      console.error(error);
    }
  };

  return (
    <div className="bg-moviedb-black min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-black/70 rounded-lg p-8 shadow-xl">
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-6">
            Create Your Account
          </h1>
          <form onSubmit={handleSubmit} id="signupForm" className="space-y-4">
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              placeholder="First Name"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              placeholder="Last Name"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full p-3 bg-moviedb-gray text-white rounded focus:outline-none focus:ring-2 focus:ring-moviedb-red"
              required
            />
            <div className="text-left text-moviedb-gray text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                I agree to the Terms of Service and Privacy Policy
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-moviedb-red text-white py-3 rounded hover:bg-red-700 transition duration-300"
              disabled={loading}
            >
              {loading ? "Signing Up..." : "Sign Up"}
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
