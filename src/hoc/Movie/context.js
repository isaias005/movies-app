import React from 'react';

const MovieContext = React.createContext(null);

export const withMovie = Component => props => (
  <MovieContext.Consumer>
    {movie => {
      return (
        <Component {...props} movie={movie} />
      )
    }}
  </MovieContext.Consumer>
);

export default MovieContext;