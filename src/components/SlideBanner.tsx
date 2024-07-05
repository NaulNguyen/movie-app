import axios from "axios";
import React, { useEffect, useState } from "react";
import {
    BASE_IMAGE_URL,
    getDiscoveryMovieUrl,
    getPopularMovieUrl,
    getTopRatedMovieUrl,
} from "../services";
import { useLocation } from "react-router-dom";

const filterNullImages = (movies: any) => {
    const filteredMovies = movies.filter(
        (movie: { backdrop_path: null }) => movie.backdrop_path !== null
    );

    return filteredMovies;
};

const SlideBanner = () => {
    const location = useLocation();
    const [movies, setMovies] = useState<any[]>([]);
    const [currentBannerIndex, setCurrentBannerIndex] = useState<number>(0);
    const [bannerMovie, setBannerMovie] = useState<any | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url: string | undefined;
                if (location.pathname === "/popular") {
                    url = getPopularMovieUrl();
                } else if (location.pathname === "/top_rated") {
                    url = getTopRatedMovieUrl();
                } else if (location.pathname === "/discover") {
                    url = getDiscoveryMovieUrl();
                }

                if (url) {
                    const response = await axios.get(url);
                    const filteredMovies = filterNullImages(response.data.results);
                    setMovies(filteredMovies);
                } else {
                    console.error("No valid URL found for the current path.");
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, [location.pathname]);

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

    if (movies.length === 0 || !bannerMovie) {
        return null;
    }

    return (
        <div className="relative h-full w-full">
            <img
                src={`${BASE_IMAGE_URL}${bannerMovie.backdrop_path}`}
                alt={bannerMovie.title}
                className="w-full h-screen object-cover transition-opacity duration-500"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 w-96 ml-10 flex items-center justify-center">
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
                    <p className="text-xs mb-4 line-clamp-3">{bannerMovie.overview}</p>
                    <button className="bg-green-500 w-36 px-5 py-2 rounded-lg flex-none block">
                        <div className="flex items-center">
                            <i className="fa-solid fa-play mr-3"></i>
                            <p>Play Now</p>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SlideBanner;
