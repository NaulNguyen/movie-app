import { useSelector } from "react-redux";
import { GlobalState } from "../global";

const useAppAccessor = () => {
    const getMovieDataMain = useSelector((state: GlobalState) => {
        return state.movieMain;
    });

    return {
        getMovieDataMain: () => getMovieDataMain,
    };
};

export default useAppAccessor;
