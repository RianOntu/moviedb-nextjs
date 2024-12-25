
import { useAuth } from "@/app/_Hooks/useAuth";

export async function getAllmovies() {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.API_KEY}`
  );
  const allMovies = await res.json();
  return allMovies;
}

export async function getRelevantMovie(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}`
  );
  const relevantMovies = await res.json();
  return relevantMovies;
}
export async function getSingleMovie(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`
  );
  const singleMovie = await response.json();
  return singleMovie;
}

export  function getAuth(){
  const { auth }=useAuth();
  return auth;
}


