"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);

    if (newQuery.trim()) {
      router.push(`/search?query=${newQuery}`);
    }

    if (newQuery) {
      await fetchSearchResults(newQuery);
    }
  };

  const fetchSearchResults = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${query}`
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-b from-black to-transparent">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-red-600 text-4xl font-bold">
            MOVIE DB
          </Link>
          <div className="ml-8 space-x-4">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/compare" className="text-white hover:text-gray-300">
              Compare Movies
            </Link>

            <Link href="/watch" className="text-white hover:text-gray-300">
              Watch Later
            </Link>

            <Link href="/login" className="text-white hover:text-gray-300">
              Login
            </Link>
          </div>
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={handleSearch}
            className="bg-black bg-opacity-50 text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:border-white"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
