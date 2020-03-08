class Movie {
  movieAPI = "https://movies-app-backend.herokuapp.com/api/v1/movies";

  async getAllMovies() {
    try {
      const response = await fetch(`${this.movieAPI}`);
      if (response.status !== 200) {
        return false;
      }
      const movies = await response.json();
      return movies.data;
    } catch (err) {
      throw err;
    }
  }

  async getSingleMovie(id) {
    try {
      const response = await fetch(`${this.movieAPI}/movies/${id}`);
      if (response.status !== 200) {
        throw new Error("Error al conseguir pelicula");
      } else {
        const movie = await response.json();
        return movie.data;
      }
    } catch (err) {
      throw err;
    }
  }

  async addSingleMovie(title, photo, actors, genres, director, releaseYear, budget, rating) {
    try {
      const response = await fetch(
        `${this.movieAPI}`,
        {
          method: 'post',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: title, photo: photo, actors: actors, genres: genres, director: director, releaseYear: releaseYear, budget: budget, rating: rating })
        }
      )
      if (response.status !== 201 && response.status !== 400) {
        throw new Error("Error al añadir pelicula");
      } else if (response.status === 400) {
        throw new Error("Rellena todos los campos");
      } else {
        const movie = await response.json();
        return movie.data;
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteMovie(id) {
    try {
      const response = await fetch(
        `${this.movieAPI}/${id}`,
        {
          method: 'delete',
          credentials: 'include'
        }
      );
      if (response.status !== 200) {
        throw new Error("Error al eliminar pelicula");
      } else {
        const result = await response.json();
        return result;
      }
    } catch (err) {
      throw err;
    }
  }

  async updateSingleMovie(id,title, photo, actors, genres, director, releaseYear, budget, rating) {
    try {
      const response = await fetch(
        `${this.movieAPI}/${id}`,
        {
          method: 'put',
          credentials: 'include',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title: title, photo: photo, actors: actors, genres: genres, director: director, releaseYear: releaseYear, budget: budget, rating: rating })
        }
      )
      if (response.status !== 200) {
        throw new Error("Error al actualizar pelicula");
      } else {
        const movie = await response.json();
        return movie.data;
      }
    } catch (err) {
      throw err;
    }
  }
}

export default Movie;