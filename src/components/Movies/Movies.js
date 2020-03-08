import React, { useState, useEffect } from 'react';
import MovieList from './MovieList';
import LoadingSpinner from '../LoadingSpinner';
import { withMovie } from '../../hoc/Movie/context';

const Movies = ({ movie }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movie.getAllMovies()
      .then(res => {
        setLoading(false);
        setMovies(res);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }, [movie])

  if (loading) return <LoadingSpinner />

  return (
    <div className="content-container text--white">
      <h1 className="text--center">Nuevos Lanzamientos</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default withMovie(Movies);
