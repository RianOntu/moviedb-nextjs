
import Link from "next/link";
import React from "react";
import Navbar from "../components/Navbar";

function Page() {
  
  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        <main className="container mx-auto px-4 pt-24 pb-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Compare Movies</h1>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
              Add Movie +
            </button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-zinc-900 rounded-lg p-4 flex flex-col">
              <div className="flex justify-end mb-4">
                <button
                  onclick="removeSlot('slot-1732378356021')"
                  className="text-gray-400 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-5 gap-8">
                <div className="col-span-2 h-full">
                  <img
                    src="https://image.tmdb.org/t/p/original/yfK7zxNL63VWfluFuoUaJj5PdNw.jpg"
                    alt="Snowden"
                    className="w-full rounded-lg mb-4 object-contain max-h-full"
                  />
                  <h2 className="text-xl font-bold mb-2 text-center">
                    Snowden
                  </h2>
                </div>
                <div className="w-full space-y-4 col-span-3">
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Rating:</span>
                    <span className="float-right">7.1/10</span>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Release Year:</span>
                    <span className="float-right">2016</span>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Runtime:</span>
                    <span className="float-right">134 min</span>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Budget:</span>
                    <span className="float-right">$40.0M</span>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Revenue:</span>
                    <span className="float-right">$37.4M</span>
                  </div>
                  <div className="bg-zinc-800 p-3 rounded">
                    <span className="text-gray-400">Genres:</span>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                        Drama{" "}
                      </span>
                      <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                        History{" "}
                      </span>
                      <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                        Crime{" "}
                      </span>
                      <span className="bg-zinc-700 px-2 py-1 rounded-full text-sm">
                        Thriller
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-lg p-4 flex flex-col min-h-[400px]">
              <div className="flex justify-end mb-4">
                <button  className="text-gray-400 hover:text-white">✕</button>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center">
                <Link
                  href=""
                  className="bg-zinc-800 text-white px-6 py-3 rounded hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  Select Movie
                </Link>
              </div>
            </div>
          </div>
        </main>

        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 hidden">
          <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Search Movie</h2>
              <button className="text-gray-400 hover:text-white">✕</button>
            </div>
            <input
              type="text"
              placeholder="Type movie name..."
              className="w-full bg-zinc-800 text-white px-4 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <div className="max-h-96 overflow-y-auto"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page;
