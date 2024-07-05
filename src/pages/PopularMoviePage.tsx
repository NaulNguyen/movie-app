import React, { useState } from "react";
import { Header, SlideMovie, MovieDetailsModal } from "../components";

const PopularMoviePage: React.FC = () => {
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePosterClick = (movieId: number) => {
        setSelectedMovieId(movieId.toString());
        setIsModalOpen(true);
        const nextURL = `/popular/movie/${movieId}`;
        window.history.pushState({}, "", nextURL);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const nextURL = "/popular";
        window.history.pushState({}, "", nextURL);
    };

    return (
        <div className="bg-black justify-between">
            <Header />
            <div className="relative w-full">
                <SlideMovie title="Popular" onPosterClick={handlePosterClick} />
            </div>
            {isModalOpen && (
                <MovieDetailsModal movieId={selectedMovieId} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default PopularMoviePage;
