import React from 'react';
import { withAuth } from '../../hoc/Auth/context';
import MovieList from '../Movies/MovieList';

const Favorites = ({ auth }) => {
  return (
    <div className="content-container text--white">
      <h1 className="text--center">Favoritos</h1>
      {
        auth.currentUser.favoriteMovies.length > 0 ?
          <MovieList movies={auth.currentUser.favoriteMovies} />
          :
          <h2 className="empty-text text--light text--center">No hay nada aqui. Agrega favoritos desde la pagina de nuevos lanzamientos.</h2>
      }
    </div>
  );
}

export default withAuth(Favorites);
