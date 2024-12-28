import Movie from "@/app/models/WatchList";

export async function DELETE(req, res) {
  if (req.method === "DELETE") {
    const { movieId } = await req.json();

    if (!movieId) {
      return res.status(400).json({ error: "Movie ID is required" });
    }

    try {
      const result = await Movie.deleteOne({_id:movieId})

      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Movie not found" });
      }

      return res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
      console.error("Error deleting movie:", error);
      return res.status(500).json({ error: "Failed to delete movie" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
