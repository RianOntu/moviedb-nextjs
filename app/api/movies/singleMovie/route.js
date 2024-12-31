export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  console.log('GET_id',id);
  if (!id) {
    return res.status(400).json({ error: 'Movie ID is required' });
  }

  
  const url =`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${process.env.TOKEN}`,
      },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error:"Failed to fetch data from TMDB" }),
        { status: response.status }
      );
    }

    const singleMovie = await response.json();
    return new Response(JSON.stringify(singleMovie), { status: 200 });
  } catch (error) {
    console.error("Error fetching TMDB data:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}
