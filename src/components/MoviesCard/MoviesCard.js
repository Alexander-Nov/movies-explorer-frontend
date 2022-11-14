import React from "react";
import { Route } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/currentUserContext";

function MoviesCard({ card, baseUrl, onLike, onDislike, savedMovies }) {
  const [isLiked, setIsLiked] = React.useState(false); // пока устанавливаем без связи с БД
  const filmDurationHours = Math.round(card.duration / 60);
  const filmDurationMinutes = card.duration % 60;
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    if (savedMovies) {
      setIsLiked(savedMovies.some(item => (item.movieId === card.id) && (item.owner === currentUser._id)));
    }
  }, []);




  function handleLikeClick() {
    setIsLiked(true);
    onLike(
      {
        "country": card.country,
        "director": card.director,
        "duration": card.duration,
        "year": card.year,
        "description": card.description,
        "image": card.image.url,
        "trailerLink": card.trailerLink,
        "nameRU": card.nameRU,
        "nameEN": card.nameEN,
        "thumbnail": card.image.previewUrl,
        "movieId": card.id
      }
  );
  }

  function handleDislikeClick() {
    setIsLiked(false);
    onDislike(card);
  }

  function handleDislikeClickFromSaved() {
    onDislike(card);
  }

  return (
    <section className="card">
      <a href={card.trailerLink} target="_blanc" className="card__link">
        <img className="card__image" src={`${baseUrl}${card.image.url || card.image}`} alt={card.nameRU} />
      </a>
      <div className="card__title-block">
      <a href={card.trailerLink} target="_blanc" className="card__link">
        <p className="card__title">{card.nameRU}</p>
      </a>

        <Route path="/movies">
          <button
            className={`card__heart${isLiked ? " card__heart_active" : ""}`}
            type="button"
            onClick={isLiked ? handleDislikeClick : handleLikeClick}
            aria-label="Нравится"
          ></button>
        </Route>

        <Route path="/saved-movies">
          <button
            className="card__delete-button"
            type="button"
            onClick={handleDislikeClickFromSaved}
            aria-label="Удалить из избранного"
          ></button>
        </Route>

      </div>
      <p className="card__length">{`${filmDurationHours}ч ${filmDurationMinutes}м`}</p>
    </section>
  );
}

export default MoviesCard;
