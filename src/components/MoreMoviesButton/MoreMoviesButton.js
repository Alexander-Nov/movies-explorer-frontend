import React from 'react';

function MoreMoviesButton ({ onMoreMoviesClick }) {

  function handleMoreMovies() {
    onMoreMoviesClick();
  }

  return (
    <div className="more-movies-button-area">
      <button className="more-movies-button-area__button" type="button" onClick={handleMoreMovies}>Ещё</button>
    </div>
  );
}

export default MoreMoviesButton;
