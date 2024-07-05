export interface MovieListItemProps {
    name: string;
    poster: string;
    date: string;
    id: number;
    onClick: (id: number) => void;
}

export interface MovieListProps {
    movieType: string;
    title: string;
    onPosterClick: (movieId: number) => void;
}

export interface SlideMovieProps {
    title: string;
    onPosterClick: (id: number) => void;
}

export interface MovieDetailsModalProps {
    movieId: string | null;
    onClose: () => void;
}

export interface SearchMovieProps {
    id: string;
    title: string;
    poster_path: string;
    release_date: string;
    backdrop_path: string;
    overview: string;
}
