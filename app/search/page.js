import Navbar from "../components/Navbar";

async function SearchPage({ searchParams }) {
  const query = searchParams.query;
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.api_key
    }&query=${encodeURIComponent(query)}`
  );

  const data = await res.json();
  const results = data.results;
  console.log("results", results);

  return (
    <>
      <Navbar />
      <div className="bg-black text-white min-h-screen">
        <main className="container mx-auto px-4 pt-24">
          <h1 className="text-2xl font-bold">Search Results for "{query}"</h1>
          <p className="text-gray-400">Found {results.length} results</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {results.map((movie) => (
              <a
                key={movie.id}
                href={`/movie/${movie.id}`}
                className="bg-zinc-900 rounded-lg overflow-hidden hover:scale-105 transition-transform"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${
                    movie.poster_path == null ? "/" : movie.poster_path
                  }`}
                  alt={movie.title}
                  className="w-full aspect-[2/3] object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{movie.title}</h3>
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{movie.release_date?.split("-")[0]}</span>
                    <span>⭐ {movie.vote_average}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
}

export default SearchPage;
