"use client";
import React, { useEffect, useState } from "react";
import { getAllmovies } from "../utils/getAllMovies";
import Navbar from "../components/Navbar";

const MovieSlotApp = () => {
  const [slots, setSlots] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllmovies().then((data) => setMovies(data));
  }, []);

  const handleAddSlot = () => {
    setSlots((prev) => [...prev, { id: prev.length, movie: null }]);
  };

  const handleOpenSearch = (slotId) => {
    setActiveSlot(slotId);
    setIsOpen(true);
  };

  const handleSelectMovie = (movie) => {
    setSlots((prev) =>
      prev.map((slot) => (slot.id === activeSlot ? { ...slot, movie } : slot))
    );
    setIsOpen(false);
    setSearchText("");
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-8">
        <div class="flex justify-between items-center mb-8">
          <h1 class="text-3xl font-bold">Compare Movies</h1>
          <button
            onClick={handleAddSlot}
            class="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Add Movie +
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {slots.map((slot) => (
            <div
              key={slot.id}
              className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]"
            >
              <div className="flex justify-end mb-4">
                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() =>
                    setSlots((prev) => prev.filter((s) => s.id !== slot.id))
                  }
                >
                  ✕
                </button>
              </div>
              {slot.movie ? (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w500${slot.movie.poster_path}`}
                    alt={slot.movie.original_title}
                    className="w-32 h-48 object-cover rounded mb-4"
                  />
                  <h3 className="text-white text-center font-bold">
                    {slot.movie.original_title}
                  </h3>
                  <p className="text-gray-400">
                    {new Date(slot.movie.release_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>
              ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                  <button
                    onClick={() => handleOpenSearch(slot.id)}
                    className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    Select Movie
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {isOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Search Movie</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Type movie name..."
                className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="max-h-96 overflow-y-auto">
                {movies.results
                  .filter((movie) =>
                    movie.original_title
                      .toLowerCase()
                      .includes(searchText.toLowerCase())
                  )
                  .map((movie) => (
                    <div
                      key={movie._id}
                      className="flex items-center gap-4 p-2 hover:bg-zinc-800 cursor-pointer rounded"
                      onClick={() => handleSelectMovie(movie)}
                    >
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div>
                        <h3 className="font-bold">{movie.original_title}</h3>
                        <p className="text-sm text-gray-400">
                          {movie.release_date.split("-")[0]}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieSlotApp;
