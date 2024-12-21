"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Trending() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/trendings");
        if (!response.ok) {
          throw new Error("Failed to fetch trending movies");
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTrendingMovies();
  }, []);
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Trending Now</h2>
      <div id="trendingMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <Link href={`/movie/${movie.id}`}>
            <div className="flex-shrink-0 relative  w-48 h-[292px] cursor-pointer hover:scale-105 transition-transform">
              <Image
                fill
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.original_title}
                className="rounded-lg w-full content-evenly object-cover"
                quality={75}
              />
            </div>
            <div className="mt-2">
              <h3 className="text-light text-sm font-bold truncate">
                {movie.original_title}
              </h3>
              <p className="text-primary text-xs">
                {movie.release_date.split("-")[0]}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Trending;
