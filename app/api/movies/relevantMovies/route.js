export async function GET(req) {
    const { searchParams } = new URL(req.url);
  
    const id = searchParams.get("id");
    console.log('GET_id',id);
    
    const url =`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.NEXT_PUBLIC_API_KEY}`;
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
  
      const relevantMovies = await response.json();
      return new Response(JSON.stringify(relevantMovies), { status: 200 });
    } catch (error) {
      console.error("Error fetching TMDB data:", error);
      return new Response(JSON.stringify({ error: "Internal server error" }), {
        status: 500,
      });
    }
  }
  