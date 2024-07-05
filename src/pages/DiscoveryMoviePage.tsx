import React, { useState } from "react";
import { Header, SlideMovie, MovieDetailsModal } from "../components";

const DiscoveryMoviePage: React.FC = () => {
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePosterClick = (movieId: number) => {
        setSelectedMovieId(movieId.toString());
        setIsModalOpen(true);
        const nextURL = `/discover/movie/${movieId}`;
        window.history.pushState({}, "", nextURL);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const nextURL = "/discover";
        window.history.pushState({}, "", nextURL);
    };

    return (
        <div className="bg-black justify-between">
            <Header />
            <div className="relative w-full">
                <SlideMovie title="Discovery" onPosterClick={handlePosterClick} />
            </div>
            {isModalOpen && (
                <MovieDetailsModal movieId={selectedMovieId} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default DiscoveryMoviePage;
