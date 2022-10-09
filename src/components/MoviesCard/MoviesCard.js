import React from 'react';

function MoviesCard ({ card }) {
  const [isLiked, setIsLiked] = React.useState(true); // пока устанавливаем без связи с БД
  const cardLikeButtonClassName = `card__heart${isLiked ? ' card__heart_active' : ""}`;

  function handleLikeClick() {
    // onCardLike(card);
    setIsLiked(!isLiked);
  }

  return (
    <section className="card">
      <img className="card__image" src={card.image} alt={card.title} />
      <div className="card__title-block">
        <p className="card__title">{card.title}</p>
        <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
            aria-label="Нравится"
          ></button>
      </div>
      <p className="card__length">{card.length}</p>
    </section>
  );
}

export default MoviesCard;
