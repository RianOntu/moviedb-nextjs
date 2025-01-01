import { useAuth } from "@/app/_Hooks/useAuth";

export async function getAllmovies() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/movies`);
  const allMovies = await res.json();
  return allMovies;
}
export async function getCredits(id) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const response = await res.json();
  return response;
}
export async function getRelevantMovie(id) {
  
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/movies/relevantMovies?id=${id}`
  );
  const relevantMovies = await res.json();


  await new Promise((resolve) => setTimeout(resolve, 3000));

  return relevantMovies;
}

export async function getSingleMovie(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/movies/singleMovie?id=${id}`
  );
  const singleMovie = await response.json();
  return singleMovie;
}

export function getAuth() {
  const { auth } = useAuth();
  return auth;
}
