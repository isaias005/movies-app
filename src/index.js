import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth, { AuthContext } from './hoc/Auth'
import Movie, { MovieContext } from './hoc/Movie'

ReactDOM.render(
  <AuthContext.Provider value={new Auth()}>
    <MovieContext.Provider value={new Movie()}>
      <App />
    </MovieContext.Provider>
  </AuthContext.Provider>,
  document.getElementById('root')
);
