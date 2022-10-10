import React from "react";
import { Route } from "react-router-dom";

function MoviesCard({ card }) {
  const [isLiked, setIsLiked] = React.useState(true); // пока устанавливаем без связи с БД
  const cardLikeButtonClassName = `card__heart${isLiked ? " card__heart_active" : ""}`;

  function handleLikeClick() {
    // onCardLike(card);
    setIsLiked(!isLiked);
  }

  function handleDeleteClick() {

  }

  return (
    <section className="card">
      <img className="card__image" src={card.image} alt={card.title} />
      <div className="card__title-block">
        <p className="card__title">{card.title}</p>

        <Route path="/movies">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
        </Route>

        <Route path="/saved-movies">
          <button
            className="card__delete-button card__delete-button_hidden"
            type="button"
            onClick={handleDeleteClick}
            aria-label="Удалить из избранного"
          ></button>
        </Route>

      </div>
      <p className="card__length">{card.length}</p>
    </section>
  );
}

export default MoviesCard;
