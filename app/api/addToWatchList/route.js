

import Movie from "@/app/models/WatchList";
// import { getAuth } from "@/app/utils/getAllMovies";

export async function POST(req) {
  const { movie } = await req.json();
//   const auth = await getAuth();

  const watchlist = {
    movie_name: movie.original_title,
    release_year: new Date(movie.release_date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }),
    user_email: auth.email, 
  };

  const movieCreated = await Movie.create(watchlist);

  if (movieCreated) {
    return new Response('Movie added to watch list', { status: 200 });
  } else {
    return new Response('Failed to add movie', { status: 500 });
  }
}
