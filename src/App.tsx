import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import {
    HomePage,
    PopularMoviePage,
    NotFoundPage,
    TopRatedPage,
    DiscoveryMoviePage,
} from "./pages";
import store from "./store";

function App() {
    return (
        <BrowserRouter>
            <div>
            <Provider store={store}>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/notFound" element={<NotFoundPage />} />
                    <Route path="/popular" element={<PopularMoviePage />} />
                    <Route path="/top_rated" element={<TopRatedPage />} />
                    <Route path="/discover" element={<DiscoveryMoviePage />} />
                </Routes>
                </Provider>
            </div>
        </BrowserRouter>
    );
}

export default App;
