import Movie from "@/app/models/WatchList";
import { connectMongoDB } from "@/dbConnect/connectMongo";
import { NextResponse } from "next/server";


export async function POST(req) {
  await connectMongoDB()
  try {
    const { movie, userEmail } = await req.json();

    if (!movie.original_title || !movie.poster_path || !movie.release_date) {
      return NextResponse.json({ error: "Invalid movie data" }, { status: 400 });
    }

 
    const existingMovie = await Movie.findOne({
      user_email: userEmail,
      movie_name: movie.original_title,
    });

    if (existingMovie) {
      return NextResponse.json({ error: "Movie already exists in watchlist" }, { status: 409 });
    }

    // Add the movie to the watchlist
    const watchlist = {
      movie_id:movie.id,
      movie_name: movie.original_title,
      movie_image: movie.poster_path,
      release_year: new Date(movie.release_date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      user_email: userEmail,
    };

    const movieCreated = await Movie.create(watchlist);

    if (movieCreated) {
      return new Response("Movie added to watch list", { status: 200 });
    } else {
      return new Response("Failed to add movie", { status: 500 });
    }
  } catch (error) {
    console.error("API error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
export async function GET(req) {
  await connectMongoDB()
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get('email'); 

  console.log('userEmail:', userEmail);

  try {
    if (!userEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const watchListedMovies = await Movie.find({ user_email: userEmail });
    return NextResponse.json(watchListedMovies);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

