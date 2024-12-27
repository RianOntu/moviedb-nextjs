import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    movie_id: {
      type: Number,
      required: true,
      trim: true,
    },
    movie_name: {
      type: String,
      required: true,
      trim: true,
    },
    movie_image: {
      type: String,
      required: true,
      trim: true,
    },
    release_year: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Movie =
  mongoose.models.watchlists ?? mongoose.model("watchlists", movieSchema);

export default Movie;
