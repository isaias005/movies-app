import React, { useState, useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import MovieListItem from './MovieListItem';

const MovieList = ({ movies }) => {
  const [currentMovies, setCurrentMovies] = useState([]);

  useEffect(() => {
    return setCurrentMovies(movies);
  }, [movies])

  const handleSearch = (e) => {
    const search = e.target.value;

    if (search) {
      setCurrentMovies(
        movies.filter(movie => {
          const movieTitle = movie.title.trim().toUpperCase();
          const searchValue = search.trim().toUpperCase();
          if (movieTitle.includes(searchValue)) return true;
          return false;
        })
      );
    }
    else {
      setCurrentMovies(movies);
    }
  }

  return (
    <>
      <div className="search-bar flex-row vertical--center">
        <Icon path={mdiMagnify} size={1} className="icon--left" />
        <input className="search-input text--white" type="text" placeholder="Buscar peliculas" onChange={handleSearch} />
      </div>
      <div className="movie-list overflow-y--auto">
        {currentMovies.map(movie => <MovieListItem key={movie._id} movie={movie} />)}
      </div>
    </>
  );
}

export default MovieList;
