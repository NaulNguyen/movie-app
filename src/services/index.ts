export const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/original";
export const API_KEY = "92b418e837b833be308bbfb1fb2aca1e";
export const BASE_URL = "https://api.themoviedb.org";
export const SEARCH_MOVIE_URL = `${BASE_URL}/3/search/movie?api_key=${API_KEY}&query=`;

export const getPopularAndTopRatedMovieUrl = (movieType: string) => {
    return `${BASE_URL}/3/movie/${movieType}?api_key=${API_KEY}&page=1`;
};
export const getDiscoveryMovieUrl = (page = 1) => {
    return `${BASE_URL}/3/discover/movie?api_key=${API_KEY}&sort_by=primary_release_date.desc&page=${page}`;
};

export const getPopularMovieUrl = (page = 1) => {
    return `${BASE_URL}/3/movie/popular?api_key=${API_KEY}&page=${page}`;
};

export const getTopRatedMovieUrl = (page = 1) => {
    return `${BASE_URL}/3/movie/top_rated?api_key=${API_KEY}&page=${page}`;
};

export const getMovieDetailsUrl = (movieId: string) => {
    return `${BASE_URL}/3/movie/${movieId}?api_key=${API_KEY}`;
};
