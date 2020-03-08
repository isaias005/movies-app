import React, { useState, useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiMovieRoll, mdiLoading } from '@mdi/js';
import { Link, useHistory } from 'react-router-dom';
import { withAuth } from '../../hoc/Auth';

const LoginForm = ({ auth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    if (auth.currentUser) {
      history.push("/movies");
    }
  }, [auth.currentUser, history])

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      console.log("Rellena todos los campos");
      setLoading(false);
      return false;
    }

    auth.login(email, password)
      .then(() => {
        setLoading(false);
        history.push("/movies");
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }

  return (
    <div className="login-form text--white">
      <h1 className="flex-row horizontal--center"><Icon path={mdiMovieRoll} size={1.5} className="icon--left" />Movies App</h1>
      <form className="form" onSubmit={handleLogin}>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userEmail">Email</label>
          <input className="input" type="email" name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userPassword">Contraseña</label>
          <input className="input" type="password" name="userPassword" autoComplete="on" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {
          loading ?
            <>
              <div className="form-group flex-column">
                <button className="button horizontal--center" type="submit" disabled><Icon path={mdiLoading} size={1} className="icon--left" spin />Conectarse</button>
              </div>
            </>
            :
            <>
              <div className="form-group flex-column">
                <button className="button horizontal--center" type="submit">Conectarse</button>
              </div>
            </>
        }
        <div className="form-group flex-column">
          <Link to="/signup" className="text--accent">No tienes una cuenta?</Link>
        </div>
      </form>
    </div>
  );
}

export default withAuth(LoginForm);
