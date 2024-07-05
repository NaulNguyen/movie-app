import {
    GET_DISCOVER_MOVIE_DATA,
    GET_POPULAR_MOVIE_DATA,
    GET_TOP_RATED_MOVIE_DATA,
} from "./movie.actionTypes";

//khoi tao mot action getdata

export function getPopularMovieData(data: any): any {
    return (dispatch: any) => {
        dispatch({
            type: GET_POPULAR_MOVIE_DATA,
            payload: data,
        });
    };
}

export function getTopRatedMovieData(data: any): any {
    return (dispatch: any) => {
        dispatch({
            type: GET_TOP_RATED_MOVIE_DATA,
            payload: data,
        });
    };
}

export function getDiscoverMovieData(data: any): any {
    return (dispatch: any) => {
        dispatch({
            type: GET_DISCOVER_MOVIE_DATA,
            payload: data,
        });
    };
}
