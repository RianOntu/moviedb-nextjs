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
  const [singleMovie, setSingleMovie] = useState({});

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
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
        );
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };
    fetchGenres();
  }, []);
  useEffect(() => {
    const fetchSingleMovieDetails = async () => {
      const actSlot = slots.find((slot) => slot.id === activeSlot);
      if (actSlot && actSlot.movie) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${actSlot.movie.id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          );
          const data = await response.json();
          
  
          setSingleMovie(data); 
        } catch (error) {
          console.error("Error fetching single movie details:", error);
        }
      }
    };
  
    fetchSingleMovieDetails();
  }, [slots, activeSlot, movies]);
  
  const getGenreNames = (genreIds) => {
    return genreIds
      .map((id) => {
        const genre = genres.find((g) => g.id === id);
        return genre ? genre.name : null;
      })
      .filter((name) => name);
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
              className="bg-zinc-900 rounded-lg p-4 flex flex-col"
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
                <div className="grid grid-cols-5 gap-8">
                  <div className="col-span-2 h-full">
                    <img
                      src={`https://image.tmdb.org/t/p/original${slot.movie.poster_path}`}
                      alt={slot.movie.original_title}
                      className="w-full rounded-lg mb-4 object-contain max-h-full"
                    />
                    <h2 className="text-xl font-bold mb-2 text-center">
                      {slot.movie.original_title}
                    </h2>
                  </div>
                  <div className="w-full space-y-4 col-span-3">
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Rating:</span>
                      <span className="float-right">
                        {slot.movie.vote_average}/10
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Release Year:</span>
                      <span className="float-right">
                        {slot.movie.release_date.split("-")[0]}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Runtime:</span>
                      <span className="float-right">
                        {singleMovie.runtime} min
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Budget:</span>
                      <span className="float-right">
                        ${singleMovie.budget?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Revenue:</span>
                      <span className="float-right">
                        ${singleMovie.revenue?.toLocaleString() || "N/A"}
                      </span>
                    </div>
                    <div className="bg-zinc-800 p-3 rounded">
                      <span className="text-gray-400">Genres:</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {getGenreNames(slot.movie.genre_ids).map((genre) => (
                          <span
                            key={genre}
                            className="bg-zinc-700 px-2 py-1 rounded-full text-sm"
                          >
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div class="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
                  <div className="flex-grow flex flex-col items-center justify-center">
                    <button
                      onClick={() => handleOpenSearch(slot.id)}
                      className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Select Movie
                    </button>
                  </div>
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
