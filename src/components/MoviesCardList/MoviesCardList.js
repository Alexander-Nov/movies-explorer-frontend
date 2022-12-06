import React from 'react';
import { useLocation } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';
import { CurrentUserContext } from "../../contexts/currentUserContext";

function MoviesCardList ({ movieList, savedMovies, baseUrl, onLike, onDislike }) {

  const currentUser = React.useContext(CurrentUserContext);
  const userLocationPath = useLocation().pathname;

  let slicedMoviesArray = movieList.slice(0, 12);
  const [moviesArrayForRender, setMoviesArrayForRender] = React.useState([]);

  React.useEffect(() => {
    setMoviesArrayForRender(slicedMoviesArray);
  }, []);

  return (
    <section className="movies-card-list">

      {movieList.map((movieItem, i) => {
        if (userLocationPath === "/saved-movies") {
          if (movieItem.owner === currentUser._id) {
            return (
              <MoviesCard
                key={movieItem._id} // это из сохраненных
                card={movieItem}
                baseUrl={baseUrl}
                onLike={onLike}
                onDislike={onDislike}
                savedMovies={savedMovies}
              />
            )
          }
        } else {
          return (
            <MoviesCard
              key={movieItem.id} // это из БД Яндекса
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
