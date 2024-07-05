import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import SearchMovie from "./SearchMovie";
import { SearchMovieProps } from "../types";
import MovieDetailsModal from "./MovieDetailsModal";

const SEARCH_MOVIE_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "92b418e837b833be308bbfb1fb2aca1e";

const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchMovieProps[]>([]);
    const [selectedMovie, setSelectedMovie] = useState<SearchMovieProps | null>(null);
    const location = useLocation();

    const getLinkClass = (path: string) => {
        return location.pathname === path ? "font-extrabold" : "font-light";
    };

    const handleCloseModal = () => {
        setSelectedMovie(null);
        const nextURL = `${location.pathname}`;
        window.history.pushState({}, "", nextURL);
    };

    const handlePosterClick = (movie: SearchMovieProps) => {
        setSelectedMovie(movie);
        const basePath = location.pathname === "/" ? "" : location.pathname;
        const nextURL = `${basePath}/movie/${movie.id}`;
        window.history.pushState({}, "", nextURL);
    };

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await axios.get(SEARCH_MOVIE_URL, {
                    params: {
                        api_key: API_KEY,
                        query: searchQuery,
                    },
                });
                setSearchResults(response.data.results);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        const debounceFetch = setTimeout(fetchSearchResults, 300);

        return () => clearTimeout(debounceFetch);
    }, [searchQuery]);

    return (
        <>
            <div className="flex justify-between absolute z-10 w-full pt-5 items-center px-10">
                <div className="flex items-center md:justify-between">
                    <div className="md:hidden mr-4">
                        <i
                            className={`fa-solid ${
                                showMenu ? "fa-x" : "fa-bars"
                            } text-white cursor-pointer`}
                            onClick={() => setShowMenu(!showMenu)}></i>
                    </div>
                    <Link to="/" className="text-center">
                        <p className="font-extrabold text-4xl text-white">Cinema</p>
                    </Link>
                </div>
                <div className="hidden md:flex space-x-10">
                    <Link to="/" onClick={() => setShowMenu(false)}>
                        <p className={`px-4 py-2 text-white ${getLinkClass("/")}`}>Home</p>
                    </Link>
                    <Link to="/popular" onClick={() => setShowMenu(false)}>
                        <p className={`px-4 py-2 text-white ${getLinkClass("/popular")}`}>
                            Popular
                        </p>
                    </Link>
                    <Link to="/top_rated" onClick={() => setShowMenu(false)}>
                        <p className={`px-4 py-2 text-white ${getLinkClass("/top_rated")}`}>
                            Top Rated
                        </p>
                    </Link>
                    <Link to="/discover" onClick={() => setShowMenu(false)}>
                        <p className={`px-4 py-2 text-white ${getLinkClass("/discover")}`}>
                            Discovery
                        </p>
                    </Link>
                </div>
                <div className="relative w-96 hidden md:block">
                    <i className="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 mr-2 right-0 text-white"></i>
                    <input
                        type="text"
                        className="border rounded-md border-white w-full pl-2 h-9 bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        placeholder="Search your movie..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <SearchMovie
                            searchQuery={searchQuery}
                            searchResults={searchResults}
                            onPosterClick={handlePosterClick}
                        />
                    )}
                </div>
                <div className="md:hidden">
                    <i
                        className={`fa-solid ${
                            showSearch ? "fa-x" : "fa-magnifying-glass"
                        } text-white cursor-pointer`}
                        onClick={() => setShowSearch(!showSearch)}></i>
                </div>
            </div>
            {showSearch && (
                <div className="mt-2 relative px-10 md:hidden">
                    <i className="fa-solid fa-magnifying-glass absolute top-1/2 transform -translate-y-1/2 mr-2 right-10 text-white"></i>
                    <input
                        type="text"
                        className="border rounded-md border-white w-full pl-2 h-9 bg-black bg-opacity-50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                        placeholder="Search your movie..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    {searchQuery && (
                        <SearchMovie
                            searchQuery={searchQuery}
                            searchResults={searchResults}
                            onPosterClick={handlePosterClick}
                        />
                    )}
                </div>
            )}
            {showMenu && (
                <div>
                    <Link to="/">
                        <p className="px-4 py-2 text-white hover:bg-gray-700 border-b">Home</p>
                    </Link>
                    <Link to="/popular">
                        <p className="px-4 py-2 text-white hover:bg-gray-700 border-b">Popular</p>
                    </Link>
                    <Link to="/trending">
                        <p className="px-4 py-2 text-white hover:bg-gray-700 border-b">Trending</p>
                    </Link>
                </div>
            )}
            {selectedMovie && (
                <MovieDetailsModal
                    movieId={selectedMovie.id.toString()}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default Header;
