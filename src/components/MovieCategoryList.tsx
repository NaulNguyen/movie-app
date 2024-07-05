import React, { useEffect, useState } from "react";
import SlideBanner from "./SlideBanner";
import { useLocation } from "react-router-dom";
import { SlideMovieProps } from "../types";
import MovieListItem from "./MovieListItem";
import {
    BASE_IMAGE_URL,
    getDiscoveryMovieUrl,
    getPopularMovieUrl,
    getTopRatedMovieUrl,
} from "../services";
import axios from "axios";

const MovieCategoryList: React.FC<SlideMovieProps> = ({ title, onPosterClick }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [movies, setMovies] = useState<any[]>([]);

    useEffect(() => {
        const fetchMovies = async (page: number, reset = false) => {
            try {
                setLoading(true);
                let url: string | undefined;
                if (location.pathname === "/popular") {
                    url = getPopularMovieUrl(page);
                } else if (location.pathname === "/top_rated") {
                    url = getTopRatedMovieUrl(page);
                } else if (location.pathname === "/discover") {
                    url = getDiscoveryMovieUrl(page);
                }

                if (url) {
                    const response = await axios.get(url);
                    const newMovies = response.data.results;
                    if (reset) {
                        setMovies(newMovies);
                    } else {
                        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
                    }
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        setMovies([]);
        setCurrentPage(1);
        fetchMovies(1, true);
    }, [location.pathname]);

    useEffect(() => {
        if (currentPage > 1) {
            const fetchMoreMovies = async (page: number) => {
                try {
                    setLoading(true);
                    let url: string | undefined;
                    if (location.pathname === "/popular") {
                        url = getPopularMovieUrl(page);
                    } else if (location.pathname === "/top_rated") {
                        url = getTopRatedMovieUrl(page);
                    } else if (location.pathname === "/discover") {
                        url = getDiscoveryMovieUrl(page);
                    }

                    if (url) {
                        const response = await axios.get(url);
                        const newMovies = response.data.results;
                        setMovies((prevMovies) => [...prevMovies, ...newMovies]);
                    }
                } catch (error) {
                    console.error("Error fetching movies:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMoreMovies(currentPage);
        }
    }, [currentPage, location.pathname]);

    const handleLoadMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div className="pb-10">
            <SlideBanner />
            <div className="w-full text-white">
                <h1 className="font-bold text-lg mb-5 px-20 pt-7">
                    <span className="border-2 border-cyan-500 mr-2"></span> {title} Movies
                </h1>
                <div className="w-full flex flex-wrap gap-4 px-20">
                    {movies &&
                        movies.length > 0 &&
                        movies.map(
                            (movie: any) =>
                                movie.poster_path && (
                                    <MovieListItem
                                        key={movie.id}
                                        name={movie.title}
                                        poster={`${BASE_IMAGE_URL}${movie.poster_path}`}
                                        date={movie.release_date}
                                        id={movie.id}
                                        onClick={() => onPosterClick(movie.id)}
                                    />
                                )
                        )}
                </div>
                <div className="border w-32 mx-auto rounded-full mt-10 bg-green-500">
                    <button
                        className="flex content-center p-3"
                        onClick={handleLoadMore}
                        disabled={loading}>
                        <i className="fa-solid fa-rotate-right pr-2 pt-1"></i>
                        <span className="">{loading ? "Loading..." : "Load more"}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCategoryList;
