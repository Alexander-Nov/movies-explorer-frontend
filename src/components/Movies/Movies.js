import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoreMoviesButton from "../MoreMoviesButton/MoreMoviesButton";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";

function Movies({ isLoading, movieIsFound }) {
  return (
    <div className="movies">
      <SearchForm />
      {movieIsFound ? (
        <div className="movies__results">
          <MoviesCardList />
          <MoreMoviesButton />
        </div>
      ) : (
        <MoviesNotFound isLoading={isLoading} />
      )}
    </div>
  );
}

export default Movies;
