import React, { useState } from "react";
import { SearchMovieProps } from "../types";
import { BASE_IMAGE_URL } from "../services";

interface SearchMovieComponentProps {
    searchQuery: string;
    searchResults: SearchMovieProps[];
    onPosterClick: (movie: SearchMovieProps) => void;
}

const SearchMovie: React.FC<SearchMovieComponentProps> = ({
    searchQuery,
    searchResults,
    onPosterClick,
}) => {
    const [hoveredMovie, setHoveredMovie] = useState<SearchMovieProps | null>(null);
    const [tooltipPosition, setTooltipPosition] = useState<{ top: number; left: number } | null>(
        null
    );

    const handleMouseEnter = (event: React.MouseEvent, movie: SearchMovieProps) => {
        setHoveredMovie(movie);
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
            top: rect.top + window.scrollY,
            left: rect.left - 270 + window.scrollX,
        });
    };

    const handleMouseLeave = () => {
        setHoveredMovie(null);
        setTooltipPosition(null);
    };

    return (
        <div className="relative">
            <div className="absolute bg-white w-full mt-1 overflow-y-auto h-96 rounded-lg shadow-lg z-20 hide-scrollbar">
                {searchResults && searchResults.length > 0 ? (
                    searchResults.map((movie) => (
                        <div
                            className="cursor-pointer"
                            key={movie.id}
                            onMouseEnter={(e) => handleMouseEnter(e, movie)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => onPosterClick(movie)}>
                            <div className="flex items-center p-2 hover:bg-gray-200">
                                <img
                                    src={`${BASE_IMAGE_URL}${movie.poster_path}`}
                                    alt={movie.title}
                                    className="w-15 h-20 mr-2"
                                />
                                <div>
                                    <h3 className="text-sm font-bold">{movie.title}</h3>
                                    <p className="text-xs text-gray-500">
                                        {movie.release_date.split("-")[0]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="p-2 text-gray-500">No results found for "{searchQuery}"</p>
                )}
            </div>
            {hoveredMovie && tooltipPosition && (
                <div
                    className="fixed bg-white p-2 rounded shadow-lg w-64 z-30 pointer-events-none"
                    style={{ top: tooltipPosition.top, left: tooltipPosition.left }}>
                    <img
                        src={`${BASE_IMAGE_URL}${hoveredMovie.backdrop_path}`}
                        alt={hoveredMovie.title}
                        className="w-full h-32 object-cover mb-2 rounded"
                    />
                    <p className="font-bold ">{hoveredMovie.title}</p>
                    <p className="text-sm  line-clamp-3">{hoveredMovie.overview}</p>
                    <div
                        className="absolute top-12 -right-2 transform -translate-y-1/2"
                        style={{
                            width: 0,
                            height: 0,
                            borderLeft: "10px solid white",
                            borderTop: "10px solid transparent",
                            borderBottom: "10px solid transparent",
                        }}
                    />
                </div>
            )}
        </div>
    );
};

export default SearchMovie;
