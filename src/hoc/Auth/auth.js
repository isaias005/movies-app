class Auth {
  authAPI = "https://movies-app-backend.herokuapp.com/api/v1/auth";

  currentUser = null;

  async login(email, password) {
    try {
      const response = await fetch(
        `${this.authAPI}/login`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: email, password: password })
        }
      );
      await this.getCurrentUser();
      this.loginErrorHandler(response, () => {
        return response;
      });
    } catch (err) {
      throw err;
    }
  }

  async logout() {
    try {
      const response = await fetch(
        `${this.authAPI}/logout`,
        {
          method: "get",
          credentials: "include"
        }
      );
      if (response.status !== 200) {
        throw new Error("Error al cerrar sesion");
      } else {
        this.currentUser = null;
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  async signup(name, email, photo, password) {
    try {
      const response = await fetch(
        `${this.authAPI}/register`,
        {
          method: "post",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ name: name, email: email, photo: photo, password: password })
        }
      );
      await this.getCurrentUser();
      this.signupErrorHandler(response, () => {
        return true;
      })
    } catch (err) {
      throw err;
    }
  }

  async updateCurrentUser(email, name, photo, favoriteMovies) {
    try {
      const response = await fetch(
        `${this.authAPI}/updatedetails`,
        {
          method: "put",
          credentials: "include",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email: email, name: name, photo: photo, favoriteMovies: favoriteMovies })
        }
      )
      if (response.status !== 200) {
        throw new Error("Error al actualizar usuario");
      } else {
        await this.getCurrentUser();
        return response;
      }
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      const response = await fetch(
        `${this.authAPI}/me`,
        {
          method: "get",
          credentials: "include"
        }
      );
      if (response.status !== 200) {
        return null;
      }
      const user = await response.json();
      this.setCurrentUser(user.data);
      return user.data;
    } catch (err) {
      throw err;
    }
  }

  setCurrentUser(data) {
    this.currentUser = data;
  }

  loginErrorHandler(response, callback) {
    if (response.status === 200) {
      callback();
    } else if (response.status === 404) {
      throw new Error("Email o contraseña incorrectos");
    } else if (response.status === 400) {
      throw new Error("Rellena todos los campos");
    } else {
      throw new Error("Conexion con el servidor fallida");
    }
  }

  signupErrorHandler(response, callback) {
    if (response.status === 200) {
      callback();
    } else if (response.status === 400) {
      throw new Error("Rellena todos los campos");
    } else {
      throw new Error("Conexion con el servidor fallida");
    }
  }

}

export default Auth;