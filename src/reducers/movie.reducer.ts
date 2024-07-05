import {
    GET_DISCOVER_MOVIE_DATA,
    GET_POPULAR_MOVIE_DATA,
    GET_TOP_RATED_MOVIE_DATA,
} from "../actions/movie.actionTypes";

const initialState = {
    popularMovieData: {},
    topRatedMovieData: {},
    discoverMovieData: {},
};

export default function movieMain(state = initialState, action: any) {
    switch (action.type) {
        case GET_POPULAR_MOVIE_DATA: {
            return {
                ...state,
                popularMovieData: action.payload,
            };
        }
        case GET_TOP_RATED_MOVIE_DATA: {
            return {
                ...state,
                topRatedMovieData: action.payload,
            };
        }
        case GET_DISCOVER_MOVIE_DATA: {
            return {
                ...state,
                discoverMovieData: action.payload,
            };
        }

        default:
            return state;
    }
}
