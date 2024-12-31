"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Popular() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL}/api/popular`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch popular movies");
        }
        const data = await response.json();
        setMovies(data.results || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPopularMovies();
  }, []);
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Popular on MOVIE DB</h2>
      <div id="popularMovies" className="flex space-x-4 overflow-x-auto pb-4">
        {movies.map((movie) => (
          <Link href={`movie/${movie.id}`} key={movie.id}>
            <div className="flex-shrink-0 relative w-48 h-[292px] cursor-pointer hover:scale-105 transition-transform bg-black rounded-lg overflow-hidden">
              <Image
                src={`https://image.tmdb.org/t/p/original${
                  movie.poster_path || movie.backdrop_path
                }`}
                alt={movie.original_title}
                fill
                className="object-cover"
                quality={75}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Popular;
