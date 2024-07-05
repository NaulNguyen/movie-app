import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_IMAGE_URL, getMovieDetailsUrl } from "../services";
import { MovieDetailsModalProps } from "../types";

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movieId,
  onClose,
}) => {
  const [movie, setMovie] = useState<any | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!movieId) return;
      try {
        const url = getMovieDetailsUrl(movieId);
        const response = await axios.get(url);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="relative bg-white rounded-lg overflow-hidden max-w-5xl h-4/5 w-full">
        <div className="relative h-full">
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 text-white z-20 bg-black bg-opacity-80 rounded-full px-3 py-1"
          >
            <i className="fa-solid fa-x text-sm"></i>
          </button>
          <img
            src={`${BASE_IMAGE_URL}${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute left-0 bottom-0 w-full bg-gradient-to-t from-black from-10% via-gray-950 via-40% to-transparent to-50% p-6">
            <div className="text-white">
              <div className="mb-3">
                {movie.genres.map((genre: { id: number; name: string }) => (
                  <span
                    key={genre.id}
                    className="text-xs bg-black bg-opacity-50 text-white mr-3 px-2 py-1 rounded-full"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
              <h2 className="text-3xl font-bold mb-2">{movie.title}</h2>
              <div className="flex items-center gap-2 mb-2">
                <i className="fa fa-star text-amber-300"></i>
                <p className="text-white text-sm font-bold">
                  {movie.vote_average.toFixed(1)}
                </p>
                <div className="border border-gray-300 h-5"></div>
                <p className="text-gray-300 text-sm">
                  {movie.release_date.split("-")[0]}
                </p>
              </div>
              <button className="bg-green-500 w-36 px-5 py-2 rounded-lg flex-none block my-3">
                <div className="flex items-center">
                  <i className="fa-solid fa-play mr-3"></i>
                  <p>Play Now</p>
                </div>
              </button>
              <h2 className="text-xl font-bold mb-3">Overview</h2>
              <p className="text-sm text-gray-300">{movie.overview}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
