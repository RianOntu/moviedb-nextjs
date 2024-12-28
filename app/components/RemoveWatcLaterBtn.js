"use client";
import React from "react";

function RemoveWatcLaterBtn({
  movieId,
  watchListedMovies,
  setWatchListedMovies,
}) {
  async function removeMovieFromDB(movieId) {
    try {
      const movies =
        watchListedMovies &&
        watchListedMovies.filter((movie) => movie._id != movieId);
      setWatchListedMovies(movies);
      const response = await fetch("/api/deleteMovie", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ movieId }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete movie");
      }
      alert("Movie delted from DB")
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  }

  return (
    <>
      <button
        onClick={() => removeMovieFromDB(movieId)}
        className="bg-moviedb-red text-light px-3 py-1 rounded-full hover:bg-moviedb-red/80 transition"
      >
        Remove
      </button>
    </>
  );
}

export default RemoveWatcLaterBtn;
