import React, { useState } from "react";
import { MovieListItemProps } from "../types";

const MovieListItem: React.FC<MovieListItemProps> = ({ name, poster, date, id, onClick }) => {
    const [loaded, setLoaded] = useState(false);

    const handleImageLoad = () => {
        setLoaded(true);
    };
    return (
        <div
            className="flex-shrink-0 w-36 text-white snap-start cursor-pointer relative group"
            onClick={() => onClick(id)}>
            <div className="w-full h-48 relative">
                {!loaded && (
                    <div
                        className="bg-gray-300 animate-pulse rounded-md"
                        style={{ width: "144px", height: "192px" }}></div>
                )}
                <img
                    src={poster}
                    alt={name}
                    onLoad={handleImageLoad}
                    className="w-full h-full object-cover rounded-lg"
                    loading="lazy"
                />
                <div className="flex-col absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-bold text-center">{name}</p>
                    <p>{date.split("-")[0]}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieListItem;
