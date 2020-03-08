import React, { useState, useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiStar, mdiHeartOutline, mdiHeart, mdiLoading, mdiEye } from '@mdi/js';
import Modal from '../Modal';
import { withAuth } from '../../hoc/Auth';

const MovieListItem = ({ movie, auth }) => {
  const [liked, setLiked] = useState(false);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const budgetFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  useEffect(() => {
    if (auth.currentUser.favoriteMovies.length > 0) {
      if (auth.currentUser.favoriteMovies.some(_movie => _movie._id === movie._id)) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    }
  }, [auth.currentUser, movie])

  const handleLike = (movieId) => {
    setLoading(true);
    if (liked) {
      auth.currentUser.favoriteMovies = auth.currentUser.favoriteMovies.filter(_movie => _movie._id !== movieId);
      auth.updateCurrentUser(auth.currentUser.email, auth.currentUser.name, auth.currentUser.photo, auth.currentUser.favoriteMovies)
        .then(() => {
          setLiked(false);
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
        })
    } else {
      auth.currentUser.favoriteMovies = [...auth.currentUser.favoriteMovies, movie]
      auth.updateCurrentUser(auth.currentUser.email, auth.currentUser.name, auth.currentUser.photo, auth.currentUser.favoriteMovies)
        .then(() => {
          setLiked(true);
          setLoading(false);
        })
        .catch(err => {
          setLoading(true);
          console.log(err);
        })
    }
  }

  const showMovieDetails = () => {
    setModal(true);
  }

  const movieLikeAction = () => {
    if (liked) return <Icon path={mdiHeart} size={1.5} className="movie--liked" onClick={() => { handleLike(movie._id) }} />
    return <Icon path={mdiHeartOutline} size={1.5} onClick={() => { handleLike(movie._id) }} />
  }

  const movieDetailsAction = () => {
    return <Icon path={mdiEye} size={1.5} className="icon--right" onClick={showMovieDetails} />
  }

  return (
    <>
      {
        modal ?
          <Modal handleClose={() => { setModal(false) }}>
            <div className="flex-row">
              <div className="form-group flex-grow flex-row horizontal--center">
                <img src={movie.photo} className="movie__image" alt={movie.title} />
              </div>
              <div className="form-group horizontal--center flex-grow flex-column">
                <div className="form-group flex-column">
                  <h1>{movie.title}</h1>
                  <p className="text--light">{movie.genres.join(", ")}</p>
                </div>
                <div className="form-group flex-row">
                  <p><span className="text--accent text--bold">Actores: </span>{movie.actors.join(", ")}</p>
                </div>
                <div className="form-group flex-row">
                  <p><span className="text--accent text--bold">Fecha de estreno: </span>{movie.releaseYear}</p>
                </div>
                <div className="form-group flex-row">
                  <p><span className="text--accent text--bold">Director: </span>{movie.director}</p>
                </div>
                <div className="form-group flex-row">
                  <p><span className="text--accent text--bold">Presupuesto:</span> {budgetFormatter.format(movie.budget)}</p>
                </div>
                <div className="form-group flex-row">
                  <span className="movie__rating"><Icon path={mdiStar} size={1} className="icon--left" />9.5</span>
                </div>
              </div>
            </div>
          </Modal>
          :
          false
      }
      <div className="movie-card movie-list-item flex-column">
        <div className="movie-media">
          <div className="movie__actions flex-row vertical--center horizontal--center">
            {
              loading ?
                <Icon path={mdiLoading} size={2} spin />
                :
                <>
                  {movieLikeAction()}
                  {movieDetailsAction()}
                </>
            }
          </div>
          <img src={movie.photo} className="movie__image" alt={movie.title} />
        </div>
        <div className="movie-info vertical--center flex-row">
          <div>
            <p className="movie__title">{movie.title}</p>
            <p className="movie__genres text--light">{movie.genres.join(", ")}</p>
          </div>
          <span className="movie__rating"><Icon path={mdiStar} size={1} className="icon--left" />{movie.rating}</span>
        </div>
      </div>
    </>
  );
}

export default withAuth(MovieListItem);
