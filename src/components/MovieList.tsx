import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MovieListItem from "./MovieListItem";
import { MovieListProps } from "../types";
import {
    BASE_IMAGE_URL,
    getDiscoveryMovieUrl,
    getPopularMovieUrl,
    getTopRatedMovieUrl,
} from "../services";
import { useDispatch } from "react-redux";
import useAppAccessor from "../hook/useappAccessor";
import {
    getDiscoverMovieData,
    getPopularMovieData,
    getTopRatedMovieData,
} from "../actions/movie.action";

const MovieList: React.FC<MovieListProps> = ({ movieType, title, onPosterClick }) => {
    const { getMovieDataMain } = useAppAccessor();
    const { popularMovieData, topRatedMovieData, discoverMovieData } = getMovieDataMain();
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                let url;
                if (movieType === "popular") {
                    url = getPopularMovieUrl();
                } else if (movieType === "top_rated") {
                    url = getTopRatedMovieUrl();
                } else if (movieType === "discover") {
                    url = getDiscoveryMovieUrl();
                }

                if (url) {
                    const response = await axios.get(url);
                    if (movieType === "popular") {
                        dispatch(getPopularMovieData(response.data.results));
                    } else if (movieType === "top_rated") {
                        dispatch(getTopRatedMovieData(response.data.results));
                    } else if (movieType === "discover") {
                        dispatch(getDiscoverMovieData(response.data.results));
                    }
                }
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [dispatch, movieType]);

    const movies =
        movieType === "popular"
            ? popularMovieData
            : movieType === "top_rated"
            ? topRatedMovieData
            : discoverMovieData;

    return (
        <div className="text-white pt-10">
            <div className="flex justify-between">
                <h1 className="font-bold text-lg mb-5">
                    <span className="border-2 border-cyan-500 mr-2"></span> {title}
                </h1>
                <Link className="text-gray-400 text-md" to={`/${movieType}`}>
                    More
                </Link>
            </div>
            <div className={"flex overflow-x-auto space-x-4 snap-x snap-mandatory hide-scrollbar"}>
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
            <span className="block border-t border-gray-400 mt-11"></span>
        </div>
    );
};

export default MovieList;
