import React, { useState } from "react";
import { Banner, Footer, Header, MovieList, MovieDetailsModal } from "../components";

const movieCategories = [
    { movieType: "popular", title: "Popular Movies" },
    { movieType: "top_rated", title: "Top Rated Movies" },
    { movieType: "discover", title: "Discovery Movies" },
];

const HomePage = () => {
    const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handlePosterClick = (movieId: number) => {
        setSelectedMovieId(movieId.toString());
        setIsModalOpen(true);
        const nextURL = `/movie/${movieId}`;
        window.history.pushState({}, "", nextURL);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        const nextURL = "/";
        window.history.pushState({}, "", nextURL);
    };

    return (
        <div className="bg-black justify-between">
            <Header />
            <Banner />
            <main className="flex-grow px-20">
                {movieCategories.map((category, index) => (
                    <MovieList
                        key={index}
                        movieType={category.movieType}
                        title={category.title}
                        onPosterClick={handlePosterClick}
                    />
                ))}
            </main>
            <div className="px-20">
                <Footer />
            </div>
            {isModalOpen && (
                <MovieDetailsModal movieId={selectedMovieId} onClose={handleCloseModal} />
            )}
        </div>
    );
};

export default HomePage;
