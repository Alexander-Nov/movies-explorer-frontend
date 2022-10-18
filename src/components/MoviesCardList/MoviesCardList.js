import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import initialMovies from '../../utils/initialMovies';

function MoviesCardList (props) {

  return (
    <section className="movies-card-list">
      <MoviesCard
        card={initialMovies[0]}
      />
      <MoviesCard
        card={initialMovies[1]}
      />
      <MoviesCard
        card={initialMovies[2]}
      />
      <MoviesCard
        card={initialMovies[3]}
      />
      <MoviesCard
        card={initialMovies[4]}
      />
      <MoviesCard
        card={initialMovies[5]}
      />
      <MoviesCard
        card={initialMovies[6]}
      />
      <MoviesCard
        card={initialMovies[7]}
      />
      <MoviesCard
        card={initialMovies[8]}
      />
      <MoviesCard
        card={initialMovies[9]}
      />
      <MoviesCard
        card={initialMovies[10]}
      />
      <MoviesCard
        card={initialMovies[11]}
      />
    </section>
  );
}

export default MoviesCardList;
