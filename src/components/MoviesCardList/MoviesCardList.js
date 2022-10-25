import React from 'react';
// import { Route, Switch, useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from "../../contexts/currentUserContext";

function MoviesCardList ({ movieList, savedMovies, setSavedMovies, baseUrl, onLike, onDislike, shortFilmsOnlyStatus }) {

  const currentUser = React.useContext(CurrentUserContext);
  const userLocationPath = useLocation().pathname;

  let slicedMoviesArray = movieList.slice(0, 12);
  const [moviesArrayForRender, setMoviesArrayForRender] = React.useState([]);
  // console.log(moviesArrayForRender);
  React.useEffect(() => {
    setMoviesArrayForRender(slicedMoviesArray);
  }, []);



  //   React.useEffect(() => {
  //   const savedMoviesAtLocalStorage= JSON.parse(localStorage.getItem('currentlySavedMovies'));
  //   console.log(savedMoviesAtLocalStorage);
  //   // if (savedMoviesAtLocalStorage) {
  //     // setSavedMovies(savedMoviesAtLocalStorage);
  //   // }
  // }, []);

  // React.useEffect(() => {
  //   console.log(movieList);
  // }, []);

  return (
    <section className="movies-card-list">

      {movieList.map((movieItem, i) => {
        if (userLocationPath === "/saved-movies") {
          // console.log(movieItem);
          // console.log(currentUser._id);
          if (movieItem.owner === currentUser._id) {
            return (
              <MoviesCard
                key={movieItem._id} // key={userLocationPath === "/movies" ? movieItem.id : i} это из сохраненных
                card={movieItem}
                baseUrl={baseUrl}
                onLike={onLike}
                onDislike={onDislike}
              />
            )
          }
        } else {
          return (
            <MoviesCard
              key={movieItem.id} // key={movieItem.id || movieItem._id} это из БД Яндекса
              card={movieItem}
              baseUrl={baseUrl}
              onLike={onLike}
              onDislike={onDislike}
              savedMovies={savedMovies}
            />
          )
        }
      }

        )}

    </section>
  );
}

export default MoviesCardList;
