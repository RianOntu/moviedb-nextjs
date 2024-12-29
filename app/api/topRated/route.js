const URL = `${process.env.BASE_URL}/3/movie/top_rated?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;

export async function GET() {
  try {
    const response = await fetch(URL, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from TMDB" }),
        { status: response.status }
      );
    }

    const topRatedMovies = await response.json();
    return new Response(JSON.stringify(topRatedMovies), { status: 200 });
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
