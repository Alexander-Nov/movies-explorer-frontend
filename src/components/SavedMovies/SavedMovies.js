import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { mainApi } from "../../utils/MainApi";
import { MovieContext } from "../../contexts/MovieContext";

function SavedMovies ({ isLoading, movieIsFound, movieList, savedMovies, setSavedMovies, baseUrl, onLike, onDislike })  {

  // const { moviesCards, savedMovies } = React.useContext(MovieContext);

React.useEffect(() => {
  mainApi.
  getMovies()
  .then((resMovies) => {
    setSavedMovies(resMovies);
    // console.log(resMovies);
  })
  .catch((err) => {
    console.log(err);
  });
}, []);

// React.useEffect(() => {
//   return () => {
//     setSavedMovies(JSON.parse(localStorage.getItem('currentlySavedMovies')));
//   };
// }, []);

  return (
    <div className="movies">
      <SearchForm />
      <MoviesCardList
        movieList={savedMovies}
        savedMovies={savedMovies}
        baseUrl={baseUrl}
        onLike={onLike}
        onDislike={onDislike}
      />
    </div>
  );
}

export default SavedMovies;
