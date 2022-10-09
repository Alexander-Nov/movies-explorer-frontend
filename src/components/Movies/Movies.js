import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMoviesButton from '../MoreMoviesButton/MoreMoviesButton';

function Movies (props)  {
  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList />
      <MoreMoviesButton />
    </div>
  );
}

export default Movies;
