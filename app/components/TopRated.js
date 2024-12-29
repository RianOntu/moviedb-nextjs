'use client'
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function TopRated() {
   const [movies, setMovies] = useState([]);
  
    useEffect(() => {
      const fetchTopRatedMovies = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/topRated");
          if (!response.ok) {
            throw new Error("Failed to fetch top rated movies");
          }
          const data = await response.json();
          setMovies(data.results || []);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchTopRatedMovies();
    }, []);
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Top Rated</h2>
      <div id="topRatedMovies" className="flex space-x-4 overflow-x-auto pb-4">
      {movies.map((movie) => (
          <Link href={`movie/${movie._id}`} key={movie._id}>
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

export default TopRated;
