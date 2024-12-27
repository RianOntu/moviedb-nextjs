'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Navbar from "../components/Navbar";
import { GetAllWatchlistedMovies } from "../utils/getAllWatchlistedMovies";

function ServerPage() {
  const [watchListedMovies, setWatchListedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const movies = await GetAllWatchlistedMovies();
        setWatchListedMovies(movies || []);
      } catch (err) {
        console.error("Error fetching movies:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);
console.log(watchListedMovies);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-light">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-body text-light min-h-screen">
      <Navbar />

      <div className="container mx-auto pt-24 pb-8 h-full">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">Watch Later</h1>
          <p className="text-light/70 mt-2">
            Movies you've saved to watch in the future
          </p>
        </header>

        <div
          id="watchLaterList"
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {watchListedMovies.length > 0 ? (
            watchListedMovies.map((movie) => (
              <div
                key={movie._id}
                className="bg-moviedb-black rounded-lg overflow-hidden shadow-lg group relative"
                style={{ position: "relative", height: "450px", width: "100%" }}
              >
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/original/${
                    movie.movie_image || "/placeholder.jpg"
                  }`}
                  alt={movie.movie_name}
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <h2 className="text-xl font-bold text-light mb-2">
                    {movie.movie_name}
                  </h2>
                  <div className="flex justify-between items-center">
                    <span className="text-primary">
                      {new Date(movie.release_year).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }
                      )}
                    </span>
                    <button className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div id="emptyState" className="text-center py-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24 mx-auto text-moviedb-gray mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                />
              </svg>
              <h2 className="text-2xl font-bold text-light mb-2">
                Your Watch Later list is empty
              </h2>
              <p className="text-light/70 mb-6">
                Explore movies and add them to your list to watch later
              </p>
              <a
                href="#"
                className="bg-primary text-dark px-6 py-2 rounded-full hover:bg-primary/80 transition"
              >
                Explore Movies
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ServerPage;
