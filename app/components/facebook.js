"use client";
import Link from "next/link";
import React from "react";

function Facebook() {
  return (
    <Link
      className="text-center cursor-pointer"
      href={`https://www.facebook.com/sharer/sharer.php?u=example.org" target="_blank`}
    >
      <img
        src="http://facebook.com/favicon.ico"
        alt="Facebook"
        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
      />
      <p className="text-sm">Facebook</p>
    </Link>
  );
}

export default Facebook;
