import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_IMAGE_URL, getPopularMovieUrl } from "../services";

const Banner = () => {
    const [movies, setMovies] = useState<any[]>([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
    const [bannerMovie, setBannerMovie] = useState<any | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const url = getPopularMovieUrl();
                const response = await axios.get(url);
                setMovies(response.data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [movies.length]);

    useEffect(() => {
        if (movies.length > 0) {
            setBannerMovie(movies[currentBannerIndex]);
        }
    }, [currentBannerIndex, movies]);

    if (!bannerMovie) {
        return null;
    }

    return (
        <div className="relative w-full top-0">
            <img
                src={`${BASE_IMAGE_URL}${bannerMovie.backdrop_path}`}
                alt={bannerMovie.title}
                className="w-full h-screen object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-96 ml-10 mt-20 flex items-center justify-center">
                <div className="text-white transition-opacity duration-700" key={bannerMovie.id}>
                    <h2 className="text-lg font-bold mb-2">{bannerMovie.title}</h2>
                    <div className="flex gap-2">
                        <i className="fa fa-star text-amber-300"></i>{" "}
                        <p className="text-white text-xs mb-2 font-bold">
                            {bannerMovie.vote_average.toFixed(1)}
                        </p>
                        <span className="border border-gray-300 h-4"></span>
                        <p className="text-gray-300 text-xs mb-2">{bannerMovie.release_date}</p>
                    </div>
                    <p className="text-xs">{bannerMovie.overview}</p>
                </div>
            </div>
        </div>
    );
};

export default Banner;
