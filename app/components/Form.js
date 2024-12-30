"use client";
import React, { useState, useEffect } from "react";
import SingleMovieSvgOne from "../svgs/SingleMovieSvgOne";
import SingleMovieSvgTwo from "../svgs/SingleMovieSvgTwo";
import { useRouter } from "next/navigation";

function Form({ singleMovie, addedToWatchLater }) {
  const router=useRouter();
  const [watchLaterMovies, setWatchLaterMovies] = useState(
    addedToWatchLater || []
  );
  const [added, setAdded] = useState(false);

  const auth = JSON.parse(localStorage.getItem("auth"));
  const userEmail = auth?.email;

  const handleAddToWatchList = async (event) => {
    event.preventDefault();
    if(!userEmail){
      router.push('/login')
    }
    
    setAdded(true);
    if (
      !singleMovie ||
      !singleMovie.original_title ||
      !singleMovie.poster_path ||
      !singleMovie.release_date
    ) {
      console.error("Invalid movie data:", singleMovie);
      return;
    }

    const isMovieInWatchlist = watchLaterMovies.some(
      (movie) => movie.movie_name === singleMovie.original_title
    );

    if (isMovieInWatchlist) {
      alert("This movie is already in your watchlist!");
      return;
    }

    try {
      const response = await fetch(`/api/addToWatchList`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          movie: singleMovie,
          userEmail: userEmail,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to watchlist");
      }

      const newMovie = await response.json();
      setWatchLaterMovies((prevMovies) => [...prevMovies, newMovie]);

    
      alert("Movie added to the watchlist!");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="text-center">
        <form onSubmit={handleAddToWatchList}>
          <button
            type="submit"
            className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg"
          >
            <div className="text-center">
              <SingleMovieSvgOne />
            </div>
            Add to Watch List
          </button>
        </form>
      </div>

      <div className="text-center">
        {(added || watchLaterMovies.length > 0) && (
          <button className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-lg text-green-600">
            <SingleMovieSvgTwo />
            Added to Watch List
          </button>
        )}
      </div>
    </>
  );
}

export default Form;
