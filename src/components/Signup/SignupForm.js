import React, { useState, useEffect } from 'react';
import { Icon } from '@mdi/react';
import { mdiMovieRoll, mdiLoading } from '@mdi/js';
import { Link, useHistory } from 'react-router-dom';
import { withAuth } from '../../hoc/Auth';

const SignupForm = ({ auth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(()=>{
    if (auth.currentUser) {
      history.push("/movies");
    }
  }, [auth.currentUser, history])

  const handleSignup = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !photo) {
      console.log("Rellena todos los campos");
      setLoading(false);
      return false;
    }

    if (password.length < 6) {
      throw new Error("La contraseña tiene que ser mayor o igual a 6 caracteres");
    }

    if (password !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
      setLoading(false);
      return false;
    }

    if (!(/^(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)$/.test(photo))) {
      console.log("Inserta un URL de foto valido");
      setLoading(false);
      return false;
    }

    auth.signup(name, email, photo, password)
      .then(res => {
        setLoading(false);
        history.push("/movies");
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      })
  }

  return (
    <div className="login-form text--white">
      <h1 className="flex-row horizontal--center"><Icon path={mdiMovieRoll} size={1.5} className="icon--left" />Movies App</h1>
      <form className="form" onSubmit={handleSignup}>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userName">Nombre</label>
          <input className="input" type="text" name="userName" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userEmail">Email</label>
          <input className="input" type="email" name="userEmail" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userPassword">Contraseña</label>
          <input className="input" type="password" name="userPassword" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label className="label" htmlFor="userConfirmPassword">Confirmar contraseña</label>
          <input className="input" type="password" name="userConfirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>
        <div className="form-group flex-column">
          <label htmlFor="userPhoto">Foto (URL)</label>
          <input className="input text--white" type="text" name="userPhoto" value={photo} onChange={(e) => setPhoto(e.target.value)} />
        </div>
        {
          loading ?
            <>
              <div className="form-group flex-column">
                <button className="button horizontal--center" type="submit" disabled><Icon path={mdiLoading} size={1} className="icon--left" spin />Registrarse</button>
              </div>
            </>
            :
            <>
              <div className="form-group flex-column">
                <button className="button horizontal--center" type="submit">Registrarse</button>
              </div>
            </>
        }
        <div className="form-group flex-column">
          <Link to="/" className="text--accent">Ya tienes una cuenta?</Link>
        </div>
      </form>
    </div>
  );
}

export default withAuth(SignupForm);
