import MoreLikeThis from "@/app/components/MoreLikeThis";
import Movie from "@/app/models/WatchList";
import { getRelevantMovie, getSingleMovie } from "@/app/utils/getAllMovies";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Suspense } from "react";
const Form = dynamic(() => import("@/app/components/Form"), { ssr: false });
export async function generateMetadata({ params }, parent) {
  const singleMovie = await getSingleMovie(params.movieID);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: singleMovie.original_title.slice(0, 100),
    description: singleMovie.overview.slice(0, 100),
    openGraph: {
      images: [
        {
          url: `http://localhost:3000/api/og?title=${singleMovie.original_title.slice(0,100)}`,
          width: 1200,
          height: 600,
        },
      ],
    },
  };
}

async function Page({ params }) {
  const singleMovie = await getSingleMovie(params.movieID);
  const relevantmoviePromise = getRelevantMovie(params.movieID);

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.movieID}/credits?api_key=${process.env.API_KEY}`
  );
  const temp_casts = await res.json();
  const casts = temp_casts.cast.slice(0, 13);

  const addedToWatchLater = await Movie.find({
    movie_id: parseInt(params.movieID),
  });
  console.log("addedwatch", addedToWatchLater);

  return (
    <>
      <div id="movieDetails" className="min-h-screen pt-20 mb-8">
        <div className="relative h-screen">
          <div className="absolute inset-0">
            <Image
              fill
              src={`https://image.tmdb.org/t/p/original${
                singleMovie.backdrop_path == null
                  ? "/"
                  : singleMovie.backdrop_path
              }`}
              alt={singleMovie.original_title}
              className="w-full h-full object-cover object-top  z-1"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70"></div>
          </div>

          <div className="container mx-auto px-4 pt-32">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="relative md:w-1/3">
                <Image
                  fill
                  src={`https://image.tmdb.org/t/p/original${
                    singleMovie.poster_path == null
                      ? "/"
                      : singleMovie.poster_path
                  }`}
                  alt={singleMovie.original_title}
                  className="w-full rounded-lg shadow-lg object-cover"
                />
              </div>

              <div className="md:w-2/3 z-30">
                <h1 className="text-4xl font-bold mb-4">
                  {singleMovie.original_title}
                </h1>

                <div className="flex items-center mb-4 space-x-4">
                  <span className="text-green-500">
                    {new Date(singleMovie.release_date).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </span>
                  <span>| </span>
                  <span>127 min</span>
                </div>

                <p className="text-lg mb-6">{singleMovie.overview}</p>

                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Genres</h3>
                  <div className="flex flex-wrap gap-2">
                    {singleMovie.genres.map((genre) => (
                      <span className="px-3 py-1 bg-gray-800 rounded-full text-sm">
                        {genre.name}{" "}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Cast</h3>
                  <div className="flex flex-wrap gap-4">
                    {casts.map((cast) => (
                      <div className="text-center">
                        <img
                          src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                          alt={cast.original_name}
                          className="w-24 h-24 rounded-full object-cover mb-2"
                        />
                        <p className="text-sm">{cast.original_name}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex flex-wrap items-center gap-4">
                    <Form
                      singleMovie={singleMovie}
                      addedToWatchLater={addedToWatchLater}
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-gray-400 mb-2">Share on social media</h3>
                  <div className="flex flex-wrap gap-4">
                    <button className="text-center cursor-pointer">
                      <img
                        src="http://facebook.com/favicon.ico"
                        alt="Facebook"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">Facebook</p>
                    </button>

                    <button className="text-center cursor-pointer">
                      <img
                        src="http://x.com/favicon.ico"
                        alt="X"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">X</p>
                    </button>

                    <button className="text-center cursor-pointer">
                      <img
                        src="http://linkedin.com/favicon.ico"
                        alt="Linkedin"
                        className="w-8 h-8 rounded-full object-cover mb-2 mx-auto"
                      />
                      <p className="text-sm">Linkedin</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<div className="loading">Loading...</div>}>
        <MoreLikeThis relevantmoviePromise={relevantmoviePromise} />
      </Suspense>
    </>
  );
}

export default Page;
